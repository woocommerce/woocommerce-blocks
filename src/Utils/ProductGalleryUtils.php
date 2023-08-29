<?php
namespace Automattic\WooCommerce\Blocks\Utils;

/**
 * Utility methods used for the Product Gallery block.
 */
class ProductGalleryUtils {

	/**
	 * Get all Product Gallery images.
	 *
	 * @param int $post_id Post ID.
	 * @return array
	 */
	public static function get_product_gallery_images( $post_id ) {
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

					/**
					 * Filter the HTML markup for a single product image in the gallery.
					 *
					 * @param string $product_gallery_image_html The HTML markup for the product gallery image.
					 * @param int    $product_gallery_image_id  The ID of the product gallery image.
					 *
					 * @since 7.9.0
					 */
					$product_gallery_images[ $product_gallery_image_id ] = apply_filters( 'woocommerce_single_product_image_thumbnail_html', wc_get_gallery_image_html( $product_gallery_image_id ), $product_gallery_image_id ); // phpcs:disable WordPress.XSS.EscapeOutput.OutputNotEscaped
				}
			}
		}

		return $product_gallery_images;
	}
}
