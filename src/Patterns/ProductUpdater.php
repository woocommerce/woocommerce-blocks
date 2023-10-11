<?php

namespace Automattic\WooCommerce\Blocks\Patterns;

/**
 * Pattern Images class.
 */
class ProductUpdater {

	/**
	 * Generate AI content and assign AI-managed images to Products.
	 *
	 * @param array $vertical_images The vertical images.
	 *
	 * @return void
	 */
	public function generate_content( $vertical_images ) {
		$real_products = $this->get_real_product_ids();

		if ( count( $real_products ) > 0 ) {
			return;
		}
		$dummy_products = $this->get_dummy_products();

		$dummy_products_count = count( $dummy_products );
		while ( $dummy_products_count < 6 ) {
			$this->create_new_product();

			$dummy_products       = $this->get_dummy_products();
			$dummy_products_count = count( $dummy_products );
		}

		// Identify dummy products that need to have their content updated.
		$dummy_products_to_update = [];
		foreach ( $dummy_products as $dummy_product ) {
			$current_product_hash     = $this->get_hash_for_product( $dummy_product );
			$ai_modified_product_hash = $this->get_hash_for_ai_modified_product( $dummy_product );

			$dummy_product = wc_get_product( $dummy_product->get_id() );
			$date_created  = $dummy_product->get_date_created()->date( 'Y-m-d H:i:s' );
			$date_modified = $dummy_product->get_date_modified()->date( 'Y-m-d H:i:s' );

			// If the store owner modified the product, we don't want to override the content.
			if ( ( $date_created === $date_modified && is_null( $ai_modified_product_hash ) ) || ( $current_product_hash !== $ai_modified_product_hash && ! is_null( $ai_modified_product_hash ) ) ) {
				$dummy_products_to_update[] = $dummy_product;
			}
		}

		if ( empty( $dummy_products_to_update ) ) {
			return;
		}

		$ai_selected_products_images = $this->get_images_information( $vertical_images );
		$products_information_list   = $this->assign_ai_selected_images_to_dummy_products_information_list( $ai_selected_products_images );

		$responses = $this->generate_product_content( $products_information_list );

		foreach ( $responses as $key => $response ) {
			if ( is_wp_error( $response ) || empty( $response ) ) {
				continue;
			}

			if ( ! isset( $response['completion'] ) ) {
				continue;
			}

			$product_content = json_decode( $response['completion'], true );

			if ( is_null( $product_content ) ) {
				continue;
			}

			$i = 0;
			foreach ( $dummy_products_to_update as $dummy_product ) {
				$this->update_product_content( $dummy_product, $product_content[ $i ] );
				++ $i;
			}
		}
	}

	/**
	 * Creates a new product and assigns the _headstart_post meta to it.
	 *
	 * @return bool|int
	 */
	public function create_new_product() {
		$product = new \WC_Product();

		$product->set_name( 'My Awesome Product' );
		$product->set_status( 'publish' );
		$product->set_description( 'Product description' );
		$product->set_price( 25 );
		$product->set_regular_price( 25 );

		$saved_product = $product->save();

		return update_post_meta( $saved_product, '_headstart_post', true );
	}

	/**
	 * Return all existing products that have the _headstart_post meta assigned to them.
	 *
	 * @return array
	 */
	public function get_dummy_products() {
		$product_query = array(
			'post_type'   => 'product',
			'post_status' => 'publish',
			'fields'      => 'ids',
			'meta_query'  => array(
				'relation' => 'AND',
				array(
					'key'     => '_headstart_post',
					'compare' => 'EXISTS',
				),
			),
		);

		$product_ids = get_posts( $product_query );

		return array_map(
			function( $product_id ) {
				return wc_get_product( $product_id );
			},
			$product_ids
		);
	}

	/**
	 * Get the ID of products that don't have the _headstart_post meta assigned to them.
	 *
	 * @return array
	 */
	public function get_real_product_ids() {
		$product_query = array(
			'post_type'   => [ 'product', 'product_variation' ],
			'post_status' => 'publish',
			'fields'      => 'ids',
			'meta_query'  => array(
				'relation' => 'AND',
				array(
					'key'     => '_headstart_post',
					'compare' => 'NOT EXISTS',
				),
			),
		);

		return get_posts( $product_query );
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

		$product_image_id = media_sideload_image( $ai_generated_product_content['image']['src'], $product->get_id(), $ai_generated_product_content['image']['alt'], 'id' );

		if ( is_wp_error( $product_image_id ) ) {
			return $product_image_id->get_error_message();
		}

		$product->set_name( $ai_generated_product_content['title'] );
		$product->set_description( $ai_generated_product_content['description'] );
		$product->set_image_id( $product_image_id );

		$product->save();

		$this->create_hash_for_ai_modified_product( $product );
	}

	/**
	 * Assigns the default content for the products.
	 *
	 * @param array $ai_selected_products_images The images information.
	 *
	 * @return array[]
	 */
	public function assign_ai_selected_images_to_dummy_products_information_list( $ai_selected_products_images ) {
		$default_image = [
			'src' => esc_url( 'images/block-placeholders/product-image-gallery.svg' ),
			'alt' => 'The placeholder for a product image.',
		];

		return [
			[
				'title'       => 'A product title',
				'description' => 'A product description',
				'image'       => $ai_selected_products_images[0] ?? $default_image,
			],
			[
				'title'       => 'A product title',
				'description' => 'A product description',
				'image'       => $ai_selected_products_images[1] ?? $default_image,
			],
			[
				'title'       => 'A product title',
				'description' => 'A product description',
				'image'       => $ai_selected_products_images[2] ?? $default_image,
			],
			[
				'title'       => 'A product title',
				'description' => 'A product description',
				'image'       => $ai_selected_products_images[3] ?? $default_image,
			],
			[
				'title'       => 'A product title',
				'description' => 'A product description',
				'image'       => $ai_selected_products_images[4] ?? $default_image,
			],
		];
	}

	/**
	 * Get the images information.
	 *
	 * @param array $vertical_images The vertical images.
	 *
	 * @return array
	 */
	public function get_images_information( $vertical_images ) {
		if ( is_wp_error( $vertical_images ) ) {
			return [
				'src' => esc_url( 'images/block-placeholders/product-image-gallery.svg' ),
				'alt' => 'The placeholder for a product image.',
			];
		}

		$count              = 0;
		$placeholder_images = [];
		foreach ( $vertical_images as $vertical_image ) {
			if ( $count >= 6 ) {
				break;
			}

			$src = $vertical_image['meta']['pexels_object']['src']['medium'] ?? 'images/block-placeholders/product-image-gallery.svg';
			$alt = $vertical_image['meta']['pexels_object']['alt'] ?? 'The placeholder for a product image.';

			$placeholder_images[] = [
				'src' => esc_url( $src ),
				'alt' => esc_attr( $alt ),
			];

			++ $count;
		}

		return $placeholder_images;
	}

	/**
	 * Generate the product content.
	 *
	 * @param array $products_default_content The default content for the products.
	 *
	 * @return array|int|string|\WP_Error
	 */
	public function generate_product_content( $products_default_content ) {
		$ai_connection = new \Automattic\WooCommerce\Blocks\AI\Connection();

		$site_id = $ai_connection->get_site_id();

		if ( is_wp_error( $site_id ) ) {
			return $site_id;
		}

		$token = $ai_connection->get_jwt_token( $site_id );

		if ( is_wp_error( $token ) ) {
			return $token;
		}

		$store_description = get_option( 'woo_ai_describe_store_description' );

		if ( ! $store_description ) {
			return new \WP_Error( 'missing_store_description', __( 'The store description is required to generate the content for your site.', 'woo-gutenberg-products-block' ) );
		}

		$prompt = [ sprintf( 'Given the following store description: "%1s" and the assigned value for the alt property in the json bellow, generate new titles and descriptions for each one of the products listed bellow and assign them as the new values for the json: %2s. The response should be only a JSON string, with no intro or explanations.', $store_description, wp_json_encode( $products_default_content ) ) ];

		return $ai_connection->fetch_ai_responses( $token, $prompt );
	}
}
