<?php

namespace Automattic\WooCommerce\StoreApi\Routes\V1\AI;

use Automattic\WooCommerce\Blocks\Patterns\ProductUpdater;
use Automattic\WooCommerce\StoreApi\Routes\V1\AbstractRoute;

/**
 * Product class.
 */
class Product extends AbstractRoute {
	/**
	 * The route identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'ai/product';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const SCHEMA_TYPE = 'ai/product';

	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/ai/product';
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
				'permission_callback' => [ Middleware::class, 'is_authorized' ],
				'args'                => [
					'index'                => [
						'description' => __( 'The business description for a given store.', 'woo-gutenberg-products-block' ),
						'type'        => 'integer',
					],
					'products_information' => [
						'description' => __( 'The business description for a given store.', 'woo-gutenberg-products-block' ),
						'type'        => 'object',
					],
				],
			],
			'schema'      => [ $this->schema, 'get_public_item_schema' ],
			'allow_batch' => [ 'v1' => true ],
		];
	}

	/**
	 * Ensure the content and images in patterns are powered by AI.
	 *
	 * @param  \WP_REST_Request $request Request object.
	 *
	 * @return bool|string|\WP_Error|\WP_REST_Response
	 */
	protected function get_route_post_response( \WP_REST_Request $request ) {
		$product_updater = new ProductUpdater();

		$real_products = $product_updater->fetch_product_ids();

		if ( is_array( $real_products ) && count( $real_products ) > 0 ) {
			return rest_ensure_response( true );
		}

		$dummy_products = $product_updater->fetch_product_ids( 'dummy' );

		if ( ! is_array( $dummy_products ) ) {
			return new \WP_Error( 'failed_to_fetch_dummy_products', __( 'Failed to fetch dummy products.', 'woo-gutenberg-products-block' ) );
		}

		// Identify dummy products that need to have their content updated.
		$dummy_products_ids = $product_updater->fetch_product_ids( 'dummy' );

		if ( ! is_array( $dummy_products_ids ) ) {
			return new \WP_Error( 'failed_to_fetch_dummy_products', __( 'Failed to fetch dummy products.', 'woo-gutenberg-products-block' ) );
		}

		$dummy_products = array_map(
			function ( $product ) {
				return wc_get_product( $product->ID );
			},
			$dummy_products_ids
		);

		$index                = $request['index'];
		$products_information = $request['products_information'];

		if ( $product_updater->should_update_dummy_product( $dummy_products[ $index ] ) ) {
			$product_updater->update_product_content( $dummy_products[ $index ], $products_information );
		}

		return rest_ensure_response( true );
	}

}
