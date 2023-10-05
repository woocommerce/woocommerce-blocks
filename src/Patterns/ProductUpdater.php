<?php

namespace Automattic\WooCommerce\Blocks\Patterns;

/**
 *
 */
class ProductUpdater {

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
				'title'       => 'Product 1',
				'description' => 'Product 1 description',
				'image'       => $placeholder_images[0] ?? $default_image,
			],
			[
				'title'       => 'Product 2',
				'description' => 'Product 2 description',
				'image'       => $placeholder_images[1] ?? $default_image,
			],
			[
				'title'       => 'Product 3',
				'description' => 'Product 3 description',
				'image'       => $placeholder_images[2] ?? $default_image,
			],
			[
				'title'       => 'Product 4',
				'description' => 'Product 4 description',
				'image'       => $placeholder_images[3] ?? $default_image,
			],
			[
				'title'       => 'Product 5',
				'description' => 'Product 5 description',
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
