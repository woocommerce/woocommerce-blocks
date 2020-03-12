<?php
/**
 * Products route.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Routes;

defined( 'ABSPATH' ) || exit;

/**
 * ProductsById class.
 */
class ProductsById extends AbstractRoute {
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
				),
			],
			'schema' => [ $this->schema, 'get_public_item_schema' ],
		];
	}

	/**
	 * Get a single item.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_response( $request ) {
		$object = wc_get_product( (int) $request['id'] );

		if ( ! $object || 0 === $object->get_id() ) {
			return new \WP_Error( 'woocommerce_rest_product_invalid_id', __( 'Invalid product ID.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		return rest_ensure_response( $this->schema->get_item_response( $object ) );
	}
}
