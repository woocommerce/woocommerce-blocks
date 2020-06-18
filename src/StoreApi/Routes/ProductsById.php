<?php
/**
 * Products route.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\StoreApi\Routes;

defined( 'ABSPATH' ) || exit;

/**
 * ProductsById class.
 */
class ProductsById extends AbstractRoute {
	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/products/(?P<id>[\d]+)';
	}

	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			'args'   => array(
				'id' => array(
					'description' => __( 'Unique identifier for the resource.', 'woo-gutenberg-products-block' ),
					'type'        => 'integer',
				),
			),
			[
				'methods'  => \WP_REST_Server::READABLE,
				'callback' => [ $this, 'get_response' ],
				'args'     => array(
					'context' => $this->get_context_param(
						array(
							'default' => 'view',
						)
					),
					'cache'   => array(
						'description' => __( 'Controls whether to not to bypass the cache.', 'woo-gutenberg-products-block' ),
						'type'        => 'boolean',
						'default'     => true,
					),
				),
			],
			'schema' => [ $this->schema, 'get_public_item_schema' ],
		];
	}

	/**
	 * Get a single item.
	 *
	 * @throws RouteException On error.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	protected function get_route_response( \WP_REST_Request $request ) {
		$product_id = (int) $request['id'];
		$response   = $request['cache'] ? $this->get_cached_response( $product_id ) : false;

		if ( ! $response ) {
			$object = wc_get_product( $product_id );

			if ( ! $object || 0 === $object->get_id() ) {
				throw new RouteException( 'woocommerce_rest_product_invalid_id', __( 'Invalid product ID.', 'woo-gutenberg-products-block' ), 404 );
			}

			$response = $this->schema->get_item_response( $object );
			if ( $request['cache'] ) {
				$this->set_cached_response( $product_id, $response );
			}
		}

		return rest_ensure_response( $response );
	}
}
