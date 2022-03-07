Warning: Class 'Automattic\WooCommerce\StoreApi\Routes\V1\Batch' not found in /Users/mikejolley/Developer/plugins/woocommerce-gutenberg-products-block/src/StoreApi/deprecated.php on line 43

Warning: Class 'Automattic\WooCommerce\StoreApi\Routes\V1\Checkout' not found in /Users/mikejolley/Developer/plugins/woocommerce-gutenberg-products-block/src/StoreApi/deprecated.php on line 57

Warning: Class 'Automattic\WooCommerce\StoreApi\Routes\V1\ProductReviews' not found in /Users/mikejolley/Developer/plugins/woocommerce-gutenberg-products-block/src/StoreApi/deprecated.php on line 64
<?php
namespace Automattic\WooCommerce\StoreApi\Routes\V1;

/**
 * Cart class.
 */
class Cart extends AbstractCartRoute {
	/**
	 * The route identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'cart';

	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/cart';
	}

	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			[
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_response' ],
				'permission_callback' => '__return_true',
				'args'                => [
					'context' => $this->get_context_param( [ 'default' => 'view' ] ),
				],
			],
			'schema' => [ $this->schema, 'get_public_item_schema' ],
		];
	}

	/**
	 * Handle the request and return a valid response for this endpoint.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	protected function get_route_response( \WP_REST_Request $request ) {
		return rest_ensure_response( $this->schema->get_item_response( $this->cart_controller->get_cart_instance() ) );
	}
}
