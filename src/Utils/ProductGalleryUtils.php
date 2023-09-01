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
	 * @return array
	 */
	public static function get_product_gallery_images( $post_id, $size = 'full' ) {
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
						'<div class="wp-block-woocommerce-product-gallery-thumbnails__thumbnail">
							{image}
						</div>',
						array(
							'{image}' => wp_get_attachment_image(
								$product_gallery_image_id,
								$size,
								false,
								array(
									'class' => 'wp-block-woocommerce-product-gallery-thumbnails__image',
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
