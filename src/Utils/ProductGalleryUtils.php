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
	 * @param string $class Image class.
	 * @return array
	 */
	public static function get_product_gallery_images( $post_id, $size = 'full', $class = '' ) {
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
					$product_gallery_images[ $product_gallery_image_id ] = strtr(
						'{image}',
						array(
							'{image}' => wp_get_attachment_image(
								$product_gallery_image_id,
								$size,
								false,
								array(
									'class' => $class,
								)
							),
						)
					);
				}
			}
		}

		return $product_gallery_images;
	}
}
