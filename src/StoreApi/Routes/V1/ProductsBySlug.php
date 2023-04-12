<?php
namespace Automattic\WooCommerce\StoreApi\Routes\V1;

use Automattic\WooCommerce\StoreApi\Exceptions\RouteException;

/**
 * ProductsBySlug class.
 */
class ProductsBySlug extends AbstractRoute {
	/**
	 * The route identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'products-by-slug';

	/**
	 * The routes schema.
	 *
	 * @var string
	 */
	const SCHEMA_TYPE = 'product';

	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/products/(?P<slug>[\S]+)';
	}

	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			'args'   => array(
				'slug' => array(
					'description' => __( 'Slug of the resource.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
				),
			),
			[
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_response' ],
				'permission_callback' => '__return_true',
				'args'                => array(
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
	 * @throws RouteException On error.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	protected function get_route_response( \WP_REST_Request $request ) {
		$object = wc_get_product( get_page_by_path( $request['slug'], OBJECT, 'product' ) );

		if ( ! $object || 0 === $object->get_id() ) {
			throw new RouteException( 'woocommerce_rest_product_invalid_slug', __( 'Invalid product slug.', 'woo-gutenberg-products-block' ), 404 );
		}

		return rest_ensure_response( $this->schema->get_item_response( $object ) );
	}
}
