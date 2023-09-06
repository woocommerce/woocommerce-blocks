<?php
namespace Automattic\WooCommerce\Blocks\Utils;

/**
 * Utility methods used for the Product Gallery block.
 */
class ProductGalleryUtils {

	/**
	 * Get all Product Gallery images.
	 *
	 * @param int    $post_id Post ID.
	 * @param string $size Image size.
	 * @param array  $attributes Attributes.
	 * @return array
	 */
	public static function get_product_gallery_images( $post_id, $size = 'full', $attributes = array() ) {
		$product_gallery_images = array();
		$product                = wc_get_product( $post_id );

		if ( $product ) {
			// Main product featured image.
			$featured_image_id = $product->get_image_id();
			// All other product gallery images.
			$product_gallery_image_ids = $product->get_gallery_image_ids();

			if ( $featured_image_id && $product_gallery_image_ids ) {
				// Add the featured image to the beginning of the product gallery images array.
				array_unshift( $product_gallery_image_ids, $featured_image_id );

				foreach ( $product_gallery_image_ids as $product_gallery_image_id ) {
					$product_image_html = wp_get_attachment_image(
						$product_gallery_image_id,
						$size,
						false,
						$attributes
					);

					$product_image_html_processor = new \WP_HTML_Tag_Processor( $product_image_html );
					$product_image_html_processor->next_tag();
					$product_image_html_processor->set_attribute(
						'data-wc-context',
						wp_json_encode(
							array(
								'woocommerce' => array(
									'imageId' => strval( $product_gallery_image_id ),
								),
							)
						)
					);

					$product_gallery_images[] = $product_image_html_processor->get_updated_html();
				}
			}
		}

		return $product_gallery_images;
	}
}
