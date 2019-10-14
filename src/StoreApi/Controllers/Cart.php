<?php
/**
 * Cart controller.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\StoreApi\Controllers;

defined( 'ABSPATH' ) || exit;

use \WP_Error as RestError;
use \WP_REST_Server as RestServer;
use \WP_REST_Controller as RestContoller;
use Automattic\WooCommerce\Blocks\StoreApi\Schemas\CartItemSchema;
use Automattic\WooCommerce\Blocks\StoreApi\Utilities\CartController;

/**
 * Cart API.
 */
class Cart extends RestContoller {
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
	protected $rest_base = 'cart';

	/**
	 * Schema class instance.
	 *
	 * @var CartItemSchema
	 */
	protected $item_schema;

	/**
	 * Setup API class.
	 */
	public function __construct() {
		$this->item_schema = new CartItemSchema();
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
			],
			true
		);

		// Individual cart items.
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\s]+)',
			[
				'args'   => [
					'id' => [
						'description' => __( 'Unique identifier for the resource.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
					],
				],
				[
					'methods'  => RestServer::READABLE,
					'callback' => [ $this, 'get_item' ],
					'args'     => [
						'context' => $this->get_context_param( [ 'default' => 'view' ] ),
					],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
	}

	/**
	 * Cart item schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		return $this->item_schema->get_item_schema();
	}

	/**
	 * Get a collection of cart items.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_items( $request ) {
		$controller = new CartController();
		$cart       = $controller->get_items();
		$items      = [];

		foreach ( $cart as $cart_item ) {
			$data    = $this->prepare_item_for_response( $cart_item, $request );
			$items[] = $this->prepare_response_for_collection( $data );
		}

		$response = rest_ensure_response( $items );

		return $response;
	}

	/**
	 * Get a single cart items.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_item( $request ) {
		$controller = new CartController();
		$cart_item  = $controller->get_item( $request['id'] );

		if ( ! $cart_item ) {
			return new RestError( 'woocommerce_rest_cart_invalid_id', __( 'Invalid cart item ID.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		$data     = $this->prepare_item_for_response( $cart_item, $request );
		$response = rest_ensure_response( $data );

		return $response;
	}

	/**
	 * Prepares a single item output for response.
	 *
	 * @param array            $cart_item    Cart item array.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response Response object.
	 */
	public function prepare_item_for_response( $cart_item, $request ) {
		$data = $this->item_schema->get_item_response( $cart_item );

		return rest_ensure_response( $data );
	}
}
