<?php
/**
 * Cart shippnig rates controller.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Controllers;

defined( 'ABSPATH' ) || exit;

use \WP_Error as RestError;
use \WP_REST_Server as RestServer;
use \WP_REST_Controller as RestContoller;
use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas\CartShippingRateSchema;
use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Utilities\CartController;

/**
 * Cart Shipping Rates API.
 */
class CartShippingRates extends RestContoller {
	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'wc/store';

	/**
	 * Route base.
	 *
	 * @var string
	 */
	protected $rest_base = 'cart/shipping-rates';

	/**
	 * Schema class instance.
	 *
	 * @var object
	 */
	protected $schema;

	/**
	 * Setup API class.
	 */
	public function __construct() {
		$this->schema = new CartShippingRateSchema();
	}

	/**
	 * Register routes.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'  => RestServer::READABLE,
					'callback' => [ $this, 'get_items' ],
					'args'     => [
						'context' => $this->get_context_param( [ 'default' => 'view' ] ),
					],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
	}

	/**
	 * Get shipping rates for the cart.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_items( $request ) {
		$controller = new CartController();
		$cart       = $controller->get_cart_instance();

		if ( ! $cart || ! $cart instanceof \WC_Cart ) {
			return new RestError( 'woocommerce_rest_cart_error', __( 'Unable to retrieve cart.', 'woo-gutenberg-products-block' ), array( 'status' => 500 ) );
		}

		if ( empty( $request['country'] ) ) {
			return new RestError( 'woocommerce_rest_cart_error', __( 'Shipping destination country is required.', 'woo-gutenberg-products-block' ), array( 'status' => 400 ) );
		}

		$cart_items = $controller->get_cart_items(
			function( $item ) {
				return ! empty( $item['data'] ) && $item['data']->needs_shipping();
			}
		);

		if ( empty( $cart_items ) ) {
			return new RestError( 'woocommerce_rest_cart_error', __( 'There are no shippable items in the cart.', 'woo-gutenberg-products-block' ), array( 'status' => 400 ) );
		}

		$packages_to_quote    = $this->get_shipping_packages( $request );
		$packages_with_quotes = WC()->shipping()->calculate_shipping( $packages_to_quote );
		$packages_response    = [];

		foreach ( $packages_with_quotes as $package_id => $package ) {
			$packages_response[] = $this->prepare_response_for_collection( $this->prepare_item_for_response( $package_id, $package ) );
		}

		return rest_ensure_response( $packages_response );
	}

	/**
	 * Cart item schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		return $this->schema->get_item_schema();
	}

	/**
	 * Prepares a single item output for response.
	 *
	 * @param int   $package_id Package index (ID).
	 * @param array $package    Shipping package complete with rates from WooCommerce.
	 * @return \WP_REST_Response Response object.
	 */
	public function prepare_item_for_response( $package_id, $package ) {
		return rest_ensure_response( $this->schema->get_item_response( $package_id, $package ) );
	}

	/**
	 * Get the query params available for this endpoint.
	 *
	 * @return array
	 */
	public function get_collection_params() {
		$params                       = array();
		$params['context']            = $this->get_context_param();
		$params['context']['default'] = 'view';

		$params['address_1'] = array(
			'description'       => __( 'First line of address being shipped to.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'default'           => '',
			'sanitize_callback' => 'wc_clean',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['address_2'] = array(
			'description'       => __( 'Second line of address being shipped to.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'default'           => '',
			'sanitize_callback' => 'wc_clean',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['city'] = array(
			'description'       => __( 'City name being shipped to.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'default'           => '',
			'sanitize_callback' => 'wc_clean',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['state'] = array(
			'description'       => __( 'ISO code or name of the state, province or district being shipped to.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'default'           => '',
			'sanitize_callback' => 'wc_clean',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['postcode'] = array(
			'description'       => __( 'Postal code being shipped to.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'default'           => '',
			'sanitize_callback' => 'wc_clean',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['country'] = array(
			'description'       => __( 'ISO code of the country being shipped to.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'default'           => '',
			'sanitize_callback' => 'wc_clean',
			'validate_callback' => 'rest_validate_request_arg',
		);

		return $params;
	}

	/**
	 * Get packages to calculate shipping for.
	 *
	 * Based on WC_Cart::get_shipping_packages but allows the destination to be customised.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return array of cart items
	 */
	protected function get_shipping_packages( $request ) {
		$controller = new CartController();
		$cart_items = $controller->get_cart_items(
			function( $item ) {
				return ! empty( $item['data'] ) && $item['data']->needs_shipping();
			}
		);

		return apply_filters(
			'woocommerce_cart_shipping_packages',
			array(
				array(
					'contents'      => $cart_items,
					'contents_cost' => array_sum( wp_list_pluck( $cart_items, 'line_total' ) ),
					'destination'   => array(
						'country'   => $request['country'],
						'state'     => $request['state'],
						'postcode'  => $request['postcode'],
						'city'      => $request['city'],
						'address_1' => $request['address_1'],
						'address_2' => $request['address_2'],
					),
				),
			)
		);
	}
}
