<?php
/**
 * Checkout route.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Routes;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Utilities\CartController;

/**
 * Checkout class.
 */
class Checkout extends AbstractRoute {
	/**
	 * Get the namespace for this route.
	 *
	 * @return string
	 */
	public function get_namespace() {
		return 'wc/store';
	}

	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/checkout';
	}

	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			[
				'methods'  => \WP_REST_Server::CREATABLE,
				'callback' => [ $this, 'get_response' ],
				// @todo Determine the args we want to accept here.
				'args'     => [
					'payment_method' => [
						'description' => __( 'The ID of the payment method being used to process the payment.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
					],
					'order_id'       => [
						'description' => __( 'The order ID being processed.', 'woo-gutenberg-products-block' ),
						'type'        => 'number',
					],
					'order_key'      => [
						'description' => __( 'The order key; used to validate the order is valid.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
					],
				],
			],
			'schema' => [ $this->schema, 'get_public_item_schema' ],
		];
	}

	/**
	 * Convert the cart into a new draft order, or update an existing draft order, and return an updated cart response.
	 *
	 * @throws RouteException On error.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	protected function get_route_post_response( \WP_REST_Request $request ) {
		$order_id = $this->get_order_id(); // Get from session or args?

		if ( ! $order_id ) {
			throw new RouteException( 'woocommerce_rest_checkout_missing_order_id', __( 'No order was found for this session pending payment. Was an order created via /cart/create-order yet?', 'woo-gutenberg-products-block' ), 404 );
		}

		$order              = wc_get_order( $order_id );
		$order_key          = wp_unslash( $request['order_key'] );
		$order_key_is_valid = $order && hash_equals( $order->get_order_key(), $order_key );

		if ( ! $order_key_is_valid ) {
			throw new RouteException( 'woocommerce_rest_checkout_invalid_order', __( 'Invalid order. Please provide a valid order ID and key.', 'woo-gutenberg-products-block' ), 400 );
		}

		if ( ! $order->needs_payment() ) {
			return $this->process_checkout_without_payment( $order, $request );
		}

		// @todo Add order and payment gateway processing here.
		$payment_method_id     = wc_clean( wp_unslash( $request['payment_method'] ) );
		$available_gateways    = WC()->payment_gateways->get_available_payment_gateways();
		$payment_method_object = isset( $available_gateways[ $payment_method_id ] ) ? $available_gateways[ $payment_method_id ] : false;

		if ( ! $payment_method_object ) {
			throw new RouteException( 'woocommerce_rest_checkout_invalid_payment_method', __( 'Invalid payment method provided.', 'woo-gutenberg-products-block' ), 400 );
		}

		try {
			/**
			 * At this stage some logic is called that may not work or be needed in API context. @todo
			 *  - gateway->validate_fields which won't work in this context
			 *  - process_customer Creates accounts, updates customer data to match submitted order details such as addresses
			 *  - order is created but we already have one
			 *
			 * Also @todo there are filters ran by core - which should we apply here? e.g:
			 *  - woocommerce_checkout_no_payment_needed_redirect
			 *  - woocommerce_payment_successful_result
			 */

			// Before sending the order to gateways for processing, update the status to pending payment and set the correct gateway.
			$order->set_status( 'pending' );
			$order->set_payment_method( $payment_method_object );
			$order->save();

			$payment_result = $this->get_payment_result( $payment_method_object->process_payment( $order->get_id() ) );

			if ( 'success' === $payment_result['result'] ) {
				return $this->get_checkout_success_response_for_order( $order, $request, $payment_result );
			}

			// If we reached this point, payment was not successful.
			return $this->get_checkout_fail_response_for_order( $order, $request, $payment_result );
		} catch ( Exception $e ) {
			throw new RouteException( 'woocommerce_rest_checkout_payment_error', $e->getMessage(), 400 );
		}
	}

	/**
	 * Wrapper for process_payment to give consistent response.
	 *
	 * @param array $raw_result Raw result from the gateway process_payment method.
	 * @return array
	 */
	protected function get_payment_result( $raw_result = array() ) {
		return wp_parse_args(
			$raw_result,
			[
				'result'   => 'unknown',
				'redirect' => '',
			]
		);
	}

	/**
	 * For orders which do not require payment, just update status and create a response.
	 *
	 * @param \WC_Order        $order Order object.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	protected function process_checkout_without_payment( \WC_Order $order, \WP_REST_Request $request ) {
		$order->payment_complete();

		return $this->get_checkout_success_response_for_order(
			$order,
			$request,
			[
				'result'   => 'success',
				'redirect' => $order->get_checkout_order_received_url(),
			]
		);
	}

	/**
	 * Get checkout response object.
	 *
	 * @param \WC_Order        $order Order object.
	 * @param \WP_REST_Request $request Request object.
	 * @param array            $payment_result Result of the payment.
	 * @return \WP_REST_Response
	 */
	protected function get_checkout_response_for_order( \WC_Order $order, \WP_REST_Request $request, $payment_result = array() ) {
		// @todo we need to determine the fields we want to return after processing e.g. redirect URLs.
		return $this->prepare_item_for_response(
			(object) [
				'order'        => $order,
				'redirect_url' => $order->get_checkout_order_received_url(),
			],
			$request
		);
	}

	/**
	 * Get checkout response object.
	 *
	 * @param \WC_Order        $order Order object.
	 * @param \WP_REST_Request $request Request object.
	 * @param array            $payment_result Result of the payment.
	 * @return \WP_REST_Response
	 */
	protected function get_checkout_success_response_for_order( \WC_Order $order, \WP_REST_Request $request, $payment_result = array() ) {
		// @todo we need to determine the fields we want to return after processing e.g. redirect URLs.
		$response = $this->get_checkout_response_for_order( $order, $request, $payment_result );
		$response->set_status( 200 );
		return $response;
	}

	/**
	 * Get checkout response object.
	 *
	 * @param \WC_Order        $order Order object.
	 * @param \WP_REST_Request $request Request object.
	 * @param array            $payment_result Result of the payment.
	 * @return \WP_REST_Response
	 */
	protected function get_checkout_fail_response_for_order( \WC_Order $order, \WP_REST_Request $request, $payment_result = array() ) {
		// @todo we need to determine the fields we want to return after processing e.g. redirect URLs.
		$response = $this->get_checkout_response_for_order( $order, $request, $payment_result );
		$response->set_status( 400 );
		return $response;
	}
}
