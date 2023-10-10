<?php

namespace Automattic\WooCommerce\Blocks\Patterns;

/**
 *
 */
class ProductUpdater {

	/**
	 * @return array|WP_Error|int|string|void|\WP_Error
	 */
	public function generate_content() {
		$allow_ai_connection = get_option( 'woocommerce_blocks_allow_ai_connection' );

		if ( ! $allow_ai_connection ) {
			return new \WP_Error( 'ai_connection_not_allowed',
				__( 'AI content generation is not allowed on this store. Update your store settings if you wish to enable this feature.',
					'woocommerce' ) );
		}

		$placeholder_images = $this->fetch_product_images();

		if ( is_wp_error( $placeholder_images ) ) {
			return $placeholder_images;
		}

		$products = $this->get_placeholder_products();

		while ( count( $products ) < 5 ) {
			$this->create_new_product();

			$products = $this->get_placeholder_products();
		}

		$products_default_content = $this->get_default_product_content_with_images( $placeholder_images );

		$responses = $this->generate_product_content( $products_default_content );

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
			foreach ( $products as $product ) {
				$this->update_product_content( $product, $product_content[ $i ] );
				++ $i;
			}
		}
	}

	public function create_new_product() {
		$product = new \WC_Product();

		$product->set_name( 'My Awesome Product' );
		$product->set_status( 'publish' );
		$product->set_description( 'Product description' );
		$product->set_price( 25 );
		$product->set_regular_price( 25 );

		$product_id = $product->save();

		return add_post_meta( $product_id, '_headstart_post', true );
	}

	public function get_placeholder_products() {
		$product_query = array(
			'post_type' => 'product',
			'post_status' => 'publish',
			'fields' => 'ids',
			'meta_query' => array(
				'relation' => 'AND',
				array(
					'key' => '_headstart_post',
					'compare' => 'EXISTS'
				)
			)
		);

		$product_ids = get_posts( $product_query );

		return array_map( function( $product_id ) {
			return wc_get_product( $product_id );
		}, $product_ids );
	}

	public function create_hash_for_ai_modified_product( $product ) {
		if ( ! $product instanceof \WC_Product ) {
			return false;
		}

		$content = $product->get_name() . $product->get_description() . $product->get_image_id();

		return add_post_meta( $product->get_id(), '_ai_generated_content', $content );
	}

	/**
	 * @param $product
	 * @param $ai_generated_product_content
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

		$product_image_id = media_sideload_image( $ai_generated_product_content['image']['src'], $product->get_id(), $ai_generated_product_content['image']['alt'], 'id' );

		if ( is_wp_error( $product_image_id ) ) {
			return $product_image_id->get_error_message();
		}

		$product->set_name( $ai_generated_product_content['title'] );
		$product->set_description( $ai_generated_product_content['description'] );
		$product->set_image_id( $product_image_id );

		$product->save();
	}

	/**
	 * Fetch the default content for the dummy products.
	 *
	 * @param $placeholder_images
	 *
	 * @return array[]
	 */
	public function get_default_product_content_with_images( $placeholder_images ) {
		$default_image = [
			'src' => esc_url( 'images/block-placeholders/product-image-gallery.svg' ),
			'alt' => 'The placeholder for a product image.',
		];

		return [
			[
				'title'       => 'A product title',
				'description' => 'A product description',
				'image'       => $placeholder_images[0] ?? $default_image,
			],
			[
				'title'       => 'A product title',
				'description' => 'A product description',
				'image'       => $placeholder_images[1] ?? $default_image,
			],
			[
				'title'       => 'A product title',
				'description' => 'A product description',
				'image'       => $placeholder_images[2] ?? $default_image,
			],
			[
				'title'       => 'A product title',
				'description' => 'A product description',
				'image'       => $placeholder_images[3] ?? $default_image,
			],
			[
				'title'       => 'A product title',
				'description' => 'A product description',
				'image'       => $placeholder_images[4] ?? $default_image,
			],
		];
	}

	/**
	 * @return array|WP_Error|int|string|\WP_Error
	 */
	public function fetch_product_images() {
		$verticals_selector = new \Automattic\WooCommerce\Blocks\Verticals\VerticalsSelector();

		$vertical_id = ( $verticals_selector )->get_vertical_id();

		if ( is_wp_error( $vertical_id ) ) {
			return $vertical_id;
		}

		if ( ! is_int( $vertical_id ) ) {
			return new \WP_Error( 'invalid_vertical_id', __( 'The vertical id is invalid.', 'woo-gutenberg-products-block' ) );
		}

		$placeholder_images = [];
		$vertical_images = ( new \Automattic\WooCommerce\Blocks\Verticals\Client() )->get_vertical_images( $vertical_id );

		if ( is_wp_error( $vertical_images ) ) {
			return [
				'src' => esc_url( 'images/block-placeholders/product-image-gallery.svg' ),
				'alt' => 'The placeholder for a product image.',
			];
		}

		$count = 0;
		foreach ( $vertical_images as $vertical_image ) {
			if ( $count >= 5 ) {
				break;
			}

			if ( ! isset( $vertical_image['guid'] ) ) {
				continue;
			}

			$src = str_replace( 'http://', 'https://', $vertical_image['guid'] );
			$alt = $vertical_image['meta']['pexels_object']['alt'] ?? 'The placeholder for a product image.';

			$placeholder_images[] = [
				'src' => esc_url( $src ),
				'alt' => $alt,
			];

			++ $count;
		}

		return $placeholder_images;
	}

	/**
	 * @param $products_default_content
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

		$prompt = [ sprintf( 'Given the following store description: "%1s" and the assigned value for the alt property in the json bellow, generate new titles and descriptions for each one of the products listed bellow and assign them as the new values for the json: %2s. The response should be only a JSON string, with no intro or explanations.', $store_description, json_encode( $products_default_content ) ) ];

		return $ai_connection->fetch_ai_responses( $token, $prompt );
	}
}
