<?php

namespace Automattic\WooCommerce\StoreApi\Routes\V1;

use Automattic\WooCommerce\Blocks\AI\Connection;
use Automattic\WooCommerce\Blocks\Images\Pexels;
use Automattic\WooCommerce\Blocks\Patterns\PatternUpdater;
use Automattic\WooCommerce\Blocks\Patterns\ProductUpdater;
use Automattic\WooCommerce\StoreApi\Exceptions\RouteException;

/**
 * Patterns class.
 */
class ProductPattern extends AbstractRoute {
	/**
	 * The route identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'product-patterns';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const SCHEMA_TYPE = 'product-patterns';

	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/product-patterns';
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
	 * Permission callback.
	 *
	 * @throws RouteException If the user is not allowed to make this request.
	 *
	 * @return true|\WP_Error
	 */
	public function is_authorized() {
		try {
			if ( ! current_user_can( 'manage_options' ) ) {
				throw new RouteException( 'woocommerce_rest_invalid_user', __( 'You are not allowed to make this request. Please make sure you are logged in.', 'woo-gutenberg-products-block' ), 403 );
			}
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
	 * Ensure the content and images in patterns are powered by AI.
	 *
	 * @param  \WP_REST_Request $request Request object.
	 *
	 * @return bool|string|\WP_Error|\WP_REST_Response
	 */
	protected function get_route_post_response( \WP_REST_Request $request ) {
		$allow_ai_connection = get_option( 'woocommerce_blocks_allow_ai_connection' );

		if ( ! $allow_ai_connection ) {
			return rest_ensure_response(
				$this->error_to_response(
					new \WP_Error(
						'ai_connection_not_allowed',
						__( 'AI content generation is not allowed on this store. Update your store settings if you wish to enable this feature.', 'woo-gutenberg-products-block' )
					)
				)
			);
		}

		$real_products = $this->fetch_product_ids();

		if ( is_array( $real_products ) && count( $real_products ) > 0 ) {
			return true;
		}

		$dummy_products = $this->fetch_product_ids( 'dummy' );

		if ( ! is_array( $dummy_products ) ) {
			return new \WP_Error( 'failed_to_fetch_dummy_products', __( 'Failed to fetch dummy products.', 'woo-gutenberg-products-block' ) );
		}

		// Identify dummy products that need to have their content updated.
		$dummy_products_ids = $this->fetch_product_ids( 'dummy' );

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

		if ( $this->should_update_dummy_product( $dummy_products[ $index ] ) ) {
			$this->update_product_content( $dummy_products[ $index ], $products_information );
		}

		return rest_ensure_response( true );
	}

		/**
		 * Update the product content with the AI-generated content.
		 *
		 * @param \WC_Product $product The product.
		 * @param array       $ai_generated_product_content The AI-generated content.
		 *
		 * @return string|void
		 */
	public function update_product_content( $product, $ai_generated_product_content ) {
		if ( ! $product instanceof \WC_Product ) {
			return;
		}

		if ( ! isset( $ai_generated_product_content['image']['src'] ) || ! isset( $ai_generated_product_content['image']['alt'] ) || ! isset( $ai_generated_product_content['title'] ) || ! isset( $ai_generated_product_content['description'] ) ) {
			return;
		}

		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';

		// Since the media_sideload_image function is expensive and can take longer to complete
		// the process of downloading the external image and uploading it to the media library,
		// here we are increasing the time limit and the memory limit to avoid any issues.
		set_time_limit( 150 );
		wp_raise_memory_limit();

		$product_image_id = media_sideload_image( $ai_generated_product_content['image']['src'], $product->get_id(), $ai_generated_product_content['image']['alt'], 'id' );

		if ( is_wp_error( $product_image_id ) ) {
			return null;
		}

		$product->set_name( $ai_generated_product_content['title'] );
		$product->set_description( $ai_generated_product_content['description'] );
		$product->set_image_id( $product_image_id );

		$product->save();

		$this->create_hash_for_ai_modified_product( $product );
	}



	public function create_new_product() {
		$product      = new \WC_Product();
		$random_price = wp_rand( 5, 50 );

		$product->set_name( 'My Awesome Product' );
		$product->set_status( 'publish' );
		$product->set_description( 'Product description' );
		$product->set_price( $random_price );
		$product->set_regular_price( $random_price );

		$saved_product = $product->save();

		return update_post_meta( $saved_product, '_headstart_post', true );
	}

	/**
	 * Return all existing products that have the _headstart_post meta assigned to them.
	 *
	 * @param string $type The type of products to fetch.
	 *
	 * @return array
	 */
	public function fetch_product_ids( $type = 'user_created' ) {
		global $wpdb;

		if ( 'user_created' === $type ) {
			return $wpdb->get_results( $wpdb->prepare( "SELECT ID FROM {$wpdb->posts} WHERE ID NOT IN ( SELECT p.ID FROM {$wpdb->posts} p JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id WHERE pm.meta_key = %s AND p.post_type = 'product' AND p.post_status = 'publish' ) AND post_type = 'product' AND post_status = 'publish' LIMIT 6", '_headstart_post' ) );
		}

		return $wpdb->get_results( $wpdb->prepare( "SELECT p.ID FROM {$wpdb->posts} p JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id WHERE pm.meta_key = %s AND p.post_type = 'product' AND p.post_status = 'publish'", '_headstart_post' ) );
	}

		/**
		 * Verify if the dummy product should have its content generated and managed by AI.
		 *
		 * @param \WC_Product $dummy_product The dummy product.
		 *
		 * @return bool
		 */
	public function should_update_dummy_product( $dummy_product ): bool {
		$current_product_hash     = $this->get_hash_for_product( $dummy_product );
		$ai_modified_product_hash = $this->get_hash_for_ai_modified_product( $dummy_product );

		$date_created  = $dummy_product->get_date_created();
		$date_modified = $dummy_product->get_date_modified();

		if ( ! $date_created instanceof \WC_DateTime || ! $date_modified instanceof \WC_DateTime ) {
			return false;
		}

		$formatted_date_created  = $dummy_product->get_date_created()->date( 'Y-m-d H:i:s' );
		$formatted_date_modified = $dummy_product->get_date_modified()->date( 'Y-m-d H:i:s' );

		$timestamp_created  = strtotime( $formatted_date_created );
		$timestamp_modified = strtotime( $formatted_date_modified );

		$dummy_product_not_modified = abs( $timestamp_modified - $timestamp_created ) < 60;

		if ( $current_product_hash === $ai_modified_product_hash || $dummy_product_not_modified ) {
			return true;
		}

		return false;
	}


	/**
	 * Return the hash for a product based on its name, description and image_id.
	 *
	 * @param \WC_Product $product The product.
	 *
	 * @return false|string
	 */
	public function get_hash_for_product( $product ) {
		if ( ! $product instanceof \WC_Product ) {
			return false;
		}

		return md5( $product->get_name() . $product->get_description() . $product->get_image_id() );
	}

	/**
	 * Return the hash for a product that had its content AI-generated.
	 *
	 * @param \WC_Product $product The product.
	 *
	 * @return false|mixed
	 */
	public function get_hash_for_ai_modified_product( $product ) {
		if ( ! $product instanceof \WC_Product ) {
			return false;
		}

		return get_post_meta( $product->get_id(), '_ai_generated_content', true );
	}

	/**
	 * Create a hash with the AI-generated content and save it as a meta for the product.
	 *
	 * @param \WC_Product $product The product.
	 *
	 * @return bool|int
	 */
	public function create_hash_for_ai_modified_product( $product ) {
		if ( ! $product instanceof \WC_Product ) {
			return false;
		}

		$content = $this->get_hash_for_product( $product );

		return update_post_meta( $product->get_id(), '_ai_generated_content', $content );
	}


}
