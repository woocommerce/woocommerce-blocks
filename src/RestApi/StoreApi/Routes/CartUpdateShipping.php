<?php
/**
 * Cart update shipping route.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Routes;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Utilities\CartController;

/**
 * CartUpdateShipping class.
 */
class CartUpdateShipping extends AbstractRoute {
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
		return '/cart/update-shipping';
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
				'callback' => [ $this, 'post_response' ],
				'args'     => [
					'address_1' => array(
						'description'       => __( 'First line of the address being shipped to.', 'woo-gutenberg-products-block' ),
						'type'              => 'string',
						'default'           => '',
						'sanitize_callback' => 'wc_clean',
						'validate_callback' => 'rest_validate_request_arg',
					),
					'address_2' => [
						'description'       => __( 'Second line of the address being shipped to.', 'woo-gutenberg-products-block' ),
						'type'              => 'string',
						'default'           => '',
						'sanitize_callback' => 'wc_clean',
						'validate_callback' => 'rest_validate_request_arg',
					],
					'city'      => [
						'description'       => __( 'City of the address being shipped to.', 'woo-gutenberg-products-block' ),
						'type'              => 'string',
						'default'           => '',
						'sanitize_callback' => 'wc_clean',
						'validate_callback' => 'rest_validate_request_arg',
					],
					'state'     => [
						'description'       => __( 'ISO code, or name, for the state, province, or district of the address being shipped to.', 'woo-gutenberg-products-block' ),
						'type'              => 'string',
						'default'           => '',
						'sanitize_callback' => 'wc_clean',
						'validate_callback' => 'rest_validate_request_arg',
					],
					'postcode'  => [
						'description'       => __( 'Zip or Postcode of the address being shipped to.', 'woo-gutenberg-products-block' ),
						'type'              => 'string',
						'default'           => '',
						'sanitize_callback' => 'wc_clean',
						'validate_callback' => 'rest_validate_request_arg',
					],
					'country'   => [
						'description'       => __( 'ISO code for the country of the address being shipped to.', 'woo-gutenberg-products-block' ),
						'type'              => 'string',
						'default'           => '',
						'sanitize_callback' => 'wc_clean',
						'validate_callback' => 'rest_validate_request_arg',
					],
				],
			],
			'schema' => [ $this->schema, 'get_public_item_schema' ],
		];
	}

	/**
	 * Handle the request and return a valid response for this endpoint.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function post_response( \WP_REST_Request $request ) {
		if ( ! wc_shipping_enabled() ) {
			return new \WP_Error( 'woocommerce_rest_shipping_disabled', __( 'Shipping is disabled.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		$controller = new CartController();
		$cart       = $controller->get_cart_instance();

		if ( ! $cart || ! $cart instanceof \WC_Cart ) {
			return new \WP_Error( 'woocommerce_rest_cart_error', __( 'Unable to retrieve cart.', 'woo-gutenberg-products-block' ), array( 'status' => 500 ) );
		}

		$cart_shipping_rate_controller = new CartShippingRates();
		$request                       = $cart_shipping_rate_controller->validate_shipping_address( $request );

		if ( is_wp_error( $request ) ) {
			return $request;
		}

		// Update customer session.
		WC()->customer->set_props(
			array(
				'shipping_country'   => isset( $request['country'] ) ? $request['country'] : null,
				'shipping_state'     => isset( $request['state'] ) ? $request['state'] : null,
				'shipping_postcode'  => isset( $request['postcode'] ) ? $request['postcode'] : null,
				'shipping_city'      => isset( $request['city'] ) ? $request['city'] : null,
				'shipping_address_1' => isset( $request['address_1'] ) ? $request['address_1'] : null,
				'shipping_address_2' => isset( $request['address_2'] ) ? $request['address_2'] : null,
			)
		);
		WC()->customer->save();

		$cart->calculate_shipping();
		$cart->calculate_totals();

		return rest_ensure_response( $this->schema->get_item_response( $cart ) );
	}
}
