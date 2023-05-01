<?php
namespace Automattic\WooCommerce\StoreApi\Routes\V1;

use Automattic\WooCommerce\StoreApi\Payments\PaymentContext;
use Automattic\WooCommerce\StoreApi\Payments\PaymentResult;
use Automattic\WooCommerce\StoreApi\Exceptions\InvalidStockLevelsInCartException;
use Automattic\WooCommerce\StoreApi\Exceptions\RouteException;

/**
 * CheckoutOrder class.
 */
class CheckoutOrder extends AbstractCartRoute {

	/**
	 * The route identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'checkout-order';

	/**
	 * The routes schema.
	 *
	 * @var string
	 */
	const SCHEMA_TYPE = 'checkout-order';

	/**
	 * Holds the current order being processed.
	 *
	 * @var \WC_Order
	 */
	private $order = null;

	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/checkout/(?P<id>[\d]+)';
	}

	/**
	 * Checks if a nonce is required for the route.
	 *
	 * @param \WP_REST_Request $request Request.
	 * @return bool
	 */
	protected function requires_nonce( \WP_REST_Request $request ) {
		return true;
	}

	/**
	 * Check if authorized to get the order.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return boolean|WP_Error
	 */
	public function is_authorized( \WP_REST_Request $request ) {
		$order_id    = absint( $request['id'] );
		$order_key   = wc_clean( wp_unslash( $request->get_param( 'key' ) ) );
		$user_id     = get_current_user_id();
		$this->order = $this->order_controller->get_order( $order_id );

		if ( $user_id !== $this->order->get_user_id() ) {
			return false;
		}

		try {
			$this->order_controller->validate_order_key( $order_id, $order_key );
		} catch ( RouteException $error ) {
			return new \WP_Error(
				$error->getErrorCode(),
				$error->getMessage(),
				array( 'status' => $error->getCode() )
			);
		}

		return true;
	}

	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			[
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'get_response' ],
				'permission_callback' => [ $this, 'is_authorized' ],
				'args'                => array_merge(
					[
						'payment_data' => [
							'description' => __( 'Data to pass through to the payment method when processing payment.', 'woo-gutenberg-products-block' ),
							'type'        => 'array',
							'items'       => [
								'type'       => 'object',
								'properties' => [
									'key'   => [
										'type' => 'string',
									],
									'value' => [
										'type' => [ 'string', 'boolean' ],
									],
								],
							],
						],
					],
					$this->schema->get_endpoint_args_for_item_schema( \WP_REST_Server::CREATABLE )
				),
			],
			'schema'      => [ $this->schema, 'get_public_item_schema' ],
			'allow_batch' => [ 'v1' => true ],
		];
	}

	/**
	 * Prepare a single item for response. Handles setting the status based on the payment result.
	 *
	 * @param mixed            $item Item to format to schema.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response $response Response data.
	 */
	public function prepare_item_for_response( $item, \WP_REST_Request $request ) {
		$response     = parent::prepare_item_for_response( $item, $request );
		$status_codes = [
			'success' => 200,
			'pending' => 202,
			'failure' => 400,
			'error'   => 500,
		];

		if ( isset( $item->payment_result ) && $item->payment_result instanceof PaymentResult ) {
			$response->set_status( $status_codes[ $item->payment_result->status ] ?? 200 );
		}

		return $response;
	}

	/**
	 * Process an order.
	 *
	 * 1. Process Request
	 * 2. Process Customer
	 * 3. Validate Order
	 * 4. Process Payment
	 *
	 * @throws RouteException On error.
	 * @throws InvalidStockLevelsInCartException On error.
	 *
	 * @param \WP_REST_Request $request Request object.
	 *
	 * @return \WP_REST_Response
	 */
	protected function get_route_post_response( \WP_REST_Request $request ) {
		/**
		 * Process request data.
		 *
		 * Note: Customer data is persisted from the request first so that OrderController::update_addresses_from_cart
		 * uses the up to date customer address.
		 */
		$this->update_customer_from_request( $request );
		$this->update_order_from_request( $request );

		/**
		 * Process customer data.
		 *
		 * Update order with customer details, and sign up a user account as necessary.
		 */
		$this->process_customer( $request );

		/**
		 * Validate order.
		 *
		 * This logic ensures the order is valid before payment is attempted.
		 */
		$this->order_controller->validate_order_before_payment( $this->order );

		/**
		 * Fires before an order is processed by the Checkout Block/Store API.
		 *
		 * This hook informs extensions that $order has completed processing and is ready for payment.
		 *
		 * This is similar to existing core hook woocommerce_checkout_order_processed. We're using a new action:
		 * - To keep the interface focused (only pass $order, not passing request data).
		 * - This also explicitly indicates these orders are from checkout block/StoreAPI.
		 *
		 * @since 7.2.0
		 *
		 * @see https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/3238
		 * @example See docs/examples/checkout-order-processed.md

		 * @param \WC_Order $order Order object.
		 */
		do_action( 'woocommerce_store_api_checkout_order_processed', $this->order );

		/**
		 * Process the payment and return the results.
		 */
		$payment_result = new PaymentResult();

		if ( $this->order->needs_payment() ) {
			$this->process_payment( $request, $payment_result );
		} else {
			$this->process_without_payment( $request, $payment_result );
		}

		return $this->prepare_item_for_response(
			(object) [
				'order'          => wc_get_order( $this->order ),
				'payment_result' => $payment_result,
			],
			$request
		);
	}

	/**
	 * Updates the current customer session using data from the request (e.g. address data).
	 *
	 * Address session data is synced to the order itself later on by OrderController::update_order_from_cart()
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 */
	private function update_customer_from_request( \WP_REST_Request $request ) {
		$customer = wc()->customer;

		// Billing address is a required field.
		foreach ( $request['billing_address'] as $key => $value ) {
			if ( is_callable( [ $customer, "set_billing_$key" ] ) ) {
				$customer->{"set_billing_$key"}( $value );
			}
		}

		// If shipping address (optional field) was not provided, set it to the given billing address (required field).
		$shipping_address_values = $request['shipping_address'] ?? $request['billing_address'];

		foreach ( $shipping_address_values as $key => $value ) {
			if ( is_callable( [ $customer, "set_shipping_$key" ] ) ) {
				$customer->{"set_shipping_$key"}( $value );
			} elseif ( 'phone' === $key ) {
				$customer->update_meta_data( 'shipping_phone', $value );
			}
		}

		/**
		 * Fires when the Checkout Block/Store API updates a customer from the API request data.
		 *
		 * @since 8.2.0
		 *
		 * @param \WC_Customer $customer Customer object.
		 * @param \WP_REST_Request $request Full details about the request.
		 */
		do_action( 'woocommerce_store_api_checkout_update_customer_from_request', $customer, $request );

		$customer->save();
	}

	/**
	 * Update the current order using the posted values from the request.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 */
	private function update_order_from_request( \WP_REST_Request $request ) {
		$this->order->set_customer_note( $request['customer_note'] ?? '' );
		$this->order->set_payment_method( $this->get_request_payment_method_id( $request ) );

		wc_do_deprecated_action(
			'__experimental_woocommerce_blocks_checkout_update_order_from_request',
			array(
				$this->order,
				$request,
			),
			'6.3.0',
			'woocommerce_store_api_checkout_update_order_from_request',
			'This action was deprecated in WooCommerce Blocks version 6.3.0. Please use woocommerce_store_api_checkout_update_order_from_request instead.'
		);

		wc_do_deprecated_action(
			'woocommerce_blocks_checkout_update_order_from_request',
			array(
				$this->order,
				$request,
			),
			'7.2.0',
			'woocommerce_store_api_checkout_update_order_from_request',
			'This action was deprecated in WooCommerce Blocks version 7.2.0. Please use woocommerce_store_api_checkout_update_order_from_request instead.'
		);

		/**
		 * Fires when the Checkout Block/Store API updates an order's from the API request data.
		 *
		 * This hook gives extensions the chance to update orders based on the data in the request. This can be used in
		 * conjunction with the ExtendSchema class to post custom data and then process it.
		 *
		 * @since 7.2.0
		 *
		 * @param \WC_Order $order Order object.
		 * @param \WP_REST_Request $request Full details about the request.
		 */
		do_action( 'woocommerce_store_api_checkout_update_order_from_request', $this->order, $request );

		$this->order->save();
	}

	/**
	 * For orders which do not require payment, just update status.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @param PaymentResult    $payment_result Payment result object.
	 */
	private function process_without_payment( \WP_REST_Request $request, PaymentResult $payment_result ) {
		// Transition the order to pending, and then completed. This ensures transactional emails fire for pending_to_complete events.
		$this->order->update_status( 'pending' );
		$this->order->payment_complete();

		// Mark the payment as successful.
		$payment_result->set_status( 'success' );
		$payment_result->set_redirect_url( $this->order->get_checkout_order_received_url() );
	}

	/**
	 * Fires an action hook instructing active payment gateways to process the payment for an order and provide a result.
	 *
	 * @throws RouteException On error.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @param PaymentResult    $payment_result Payment result object.
	 */
	private function process_payment( \WP_REST_Request $request, PaymentResult $payment_result ) {
		try {
			// Transition the order to pending before making payment.
			$this->order->update_status( 'pending' );

			// Prepare the payment context object to pass through payment hooks.
			$context = new PaymentContext();
			$context->set_payment_method( $this->get_request_payment_method_id( $request ) );
			$context->set_payment_data( $this->get_request_payment_data( $request ) );
			$context->set_order( $this->order );

			/**
			 * Process payment with context.
			 *
			 * @hook woocommerce_rest_checkout_process_payment_with_context
			 *
			 * @throws \Exception If there is an error taking payment, an \Exception object can be thrown with an error message.
			 *
			 * @param PaymentContext $context        Holds context for the payment, including order ID and payment method.
			 * @param PaymentResult  $payment_result Result object for the transaction.
			 */
			do_action_ref_array( 'woocommerce_rest_checkout_process_payment_with_context', [ $context, &$payment_result ] );

			if ( ! $payment_result instanceof PaymentResult ) {
				throw new RouteException( 'woocommerce_rest_checkout_invalid_payment_result', __( 'Invalid payment result received from payment method.', 'woo-gutenberg-products-block' ), 500 );
			}
		} catch ( \Exception $e ) {
			throw new RouteException( 'woocommerce_rest_checkout_process_payment_error', $e->getMessage(), 402 );
		}
	}

	/**
	 * Gets the chosen payment method ID from the request.
	 *
	 * @throws RouteException On error.
	 * @param \WP_REST_Request $request Request object.
	 * @return string
	 */
	private function get_request_payment_method_id( \WP_REST_Request $request ) {
		$payment_method = $this->get_request_payment_method( $request );
		return is_null( $payment_method ) ? '' : $payment_method->id;
	}

	/**
	 * Gets the chosen payment method from the request.
	 *
	 * @throws RouteException On error.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WC_Payment_Gateway|null
	 */
	private function get_request_payment_method( \WP_REST_Request $request ) {
		$available_gateways      = WC()->payment_gateways->get_available_payment_gateways();
		$request_payment_method  = wc_clean( wp_unslash( $request['payment_method'] ?? '' ) );
		$requires_payment_method = $this->order->needs_payment();

		if ( empty( $request_payment_method ) ) {
			if ( $requires_payment_method ) {
				throw new RouteException(
					'woocommerce_rest_checkout_missing_payment_method',
					__( 'No payment method provided.', 'woo-gutenberg-products-block' ),
					400
				);
			}
			return null;
		}

		if ( ! isset( $available_gateways[ $request_payment_method ] ) ) {
			throw new RouteException(
				'woocommerce_rest_checkout_payment_method_disabled',
				sprintf(
					// Translators: %s Payment method ID.
					__( 'The %s payment gateway is not available.', 'woo-gutenberg-products-block' ),
					esc_html( $request_payment_method )
				),
				400
			);
		}

		return $available_gateways[ $request_payment_method ];
	}

	/**
	 * Gets and formats payment request data.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return array
	 */
	private function get_request_payment_data( \WP_REST_Request $request ) {
		static $payment_data = [];
		if ( ! empty( $payment_data ) ) {
			return $payment_data;
		}
		if ( ! empty( $request['payment_data'] ) ) {
			foreach ( $request['payment_data'] as $data ) {
				$payment_data[ sanitize_key( $data['key'] ) ] = wc_clean( $data['value'] );
			}
		}

		return $payment_data;
	}

	/**
	 * Updates the order with user details (e.g. address).
	 *
	 * @throws RouteException API error object with error details.
	 * @param \WP_REST_Request $request Request object.
	 */
	private function process_customer( \WP_REST_Request $request ) {
		$this->order_controller->sync_customer_data_with_order( $this->order );
	}
}
