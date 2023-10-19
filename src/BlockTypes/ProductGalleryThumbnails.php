<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;
use Automattic\WooCommerce\Blocks\Utils\ProductGalleryUtils;

/**
 * ProductGalleryThumbnails class.
 */
class ProductGalleryThumbnails extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-gallery-thumbnails';

	/**
	 * It isn't necessary to register block assets because it is a server-side block.
	 */
	protected function register_block_type_assets() {
		return null;
	}

	/**
	 * Get the frontend style handle for this block type.
	 *
	 * @return null
	 */
	protected function get_block_type_style() {
		return null;
	}

	/**
	 * Register the context
	 *
	 * @return string[]
	 */
	protected function get_block_type_uses_context() {
		return [ 'productGalleryClientId', 'postId', 'thumbnailsNumberOfThumbnails', 'thumbnailsMaxNumberOfColumns', 'thumbnailsMinNumberOfColumns', 'thumbnailsPosition' ];
	}

	/**
	 * Include and render the block.
	 *
	 * @param array    $attributes Block attributes. Default empty array.
	 * @param string   $content    Block content. Default empty string.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {
		if ( isset( $block->context['thumbnailsPosition'] ) && '' !== $block->context['thumbnailsPosition'] && 'off' !== $block->context['thumbnailsPosition'] ) {
			if ( ! empty( $content ) ) {
				parent::register_block_type_assets();
				$this->register_chunk_translations( [ $this->block_name ] );
				return $content;
			}

			$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

			$post_id = $block->context['postId'] ?? '';
			$product = wc_get_product( $post_id );

			if ( $product ) {
				$post_thumbnail_id      = $product->get_image_id();
				$product_gallery_images = ProductGalleryUtils::get_product_gallery_images( $post_id, 'full', array(), 'wc-block-product-gallery-thumbnails__thumbnail' );

				if ( $product_gallery_images && $post_thumbnail_id ) {
					$html                  = '';
					$number_of_thumbnails  = isset( $block->context['thumbnailsNumberOfThumbnails'] ) ? $block->context['thumbnailsNumberOfThumbnails'] : 3;
					$max_number_of_columns = isset( $block->context['thumbnailsMaxNumberOfColumns'] ) ? $block->context['thumbnailsMaxNumberOfColumns'] : 4;

					if ( 'bottom' === $block->context['thumbnailsPosition'] ) {
						$product_gallery_images = array_slice( $product_gallery_images, 0, $number_of_thumbnails );

						$images_remaining = count( $product_gallery_images );
						while ( $images_remaining > 0 ) {
							$current_images_per_group = min( $max_number_of_columns, $images_remaining );
							$current_group_images     = array_splice( $product_gallery_images, 0, $current_images_per_group );

							$html .= '<div class="wc-block-product-gallery-thumbnails__wrapper">';
							foreach ( $current_group_images as $product_gallery_image_html ) {
								$processor = new \WP_HTML_Tag_Processor( $product_gallery_image_html );
								if ( $processor->next_tag( 'img' ) ) {
									$processor->set_attribute(
										'data-wc-on--click',
										'actions.woocommerce.thumbnails.handleClick'
									);
									$html .= $processor->get_updated_html();
								}
							}
							$html             .= '</div>';
							$images_remaining -= $current_images_per_group;
						}
					} else {
						$base_images_per_group = (int) floor( $number_of_thumbnails / $max_number_of_columns );
						$extra_images          = $number_of_thumbnails - ( $base_images_per_group * $max_number_of_columns );

						for ( $i = 0; $i < $max_number_of_columns; $i++ ) {
							$current_images_per_group = $base_images_per_group + ( $i < $extra_images ? 1 : 0 );
							$current_group_images     = array_splice( $product_gallery_images, 0, $current_images_per_group );

							$html .= '<div class="wc-block-product-gallery-thumbnails__wrapper">';

							foreach ( $current_group_images as $product_gallery_image_html ) {
								$processor = new \WP_HTML_Tag_Processor( $product_gallery_image_html );
								if ( $processor->next_tag( 'img' ) ) {
									$processor->set_attribute(
										'data-wc-on--click',
										'actions.woocommerce.thumbnails.handleClick'
									);
									$html .= $processor->get_updated_html();
								}
							}

							$html .= '</div>';
						}
					}

					return sprintf(
						'<div class="wc-block-product-gallery-thumbnails wp-block-woocommerce-product-gallery-thumbnails %1$s" style="%2$s">
                            %3$s
                        </div>',
						esc_attr( $classes_and_styles['classes'] ),
						esc_attr( $classes_and_styles['styles'] ),
						$html
					);
				}
			}
			return;
		}
	}
}
