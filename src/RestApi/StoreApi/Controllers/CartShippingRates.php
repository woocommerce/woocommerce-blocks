<?php
/**
 * Cart shipping rates controller.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Controllers;

defined( 'ABSPATH' ) || exit;

use \WP_Error as RestError;
use \WP_REST_Server as RestServer;
use \WP_REST_Controller as RestController;
use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas\CartShippingRateSchema;
use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Utilities\CartController;

/**
 * Cart Shipping Rates API.
 */
class CartShippingRates extends RestController {
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
		if ( ! wc_shipping_enabled() ) {
			return new RestError( 'woocommerce_rest_shipping_disabled', __( 'Shipping is disabled.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		$controller = new CartController();
		$cart       = $controller->get_cart_instance();

		if ( ! $cart || ! $cart instanceof \WC_Cart ) {
			return new RestError( 'woocommerce_rest_cart_error', __( 'Unable to retrieve cart.', 'woo-gutenberg-products-block' ), array( 'status' => 500 ) );
		}

		if ( ! $cart->needs_shipping() ) {
			return rest_ensure_response( [] );
		}

		$packages = $controller->get_shipping_packages();
		$response = [];

		foreach ( $packages as $key => $package ) {
			$package['key'] = $key;
			$response[]     = $this->prepare_response_for_collection( $this->prepare_item_for_response( $package, $request ) );
		}

		return rest_ensure_response( $response );
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
	 * @param array            $package Shipping package complete with rates from WooCommerce.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response $response Response data.
	 */
	public function prepare_item_for_response( $package, $request ) {
		return rest_ensure_response( $this->schema->get_item_response( $package ) );
	}
}
