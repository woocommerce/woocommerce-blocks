<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\ProductGalleryUtils;

/**
 * ProductGallery class.
 */
class ProductGallery extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-gallery';

	/**
	 * Get the frontend style handle for this block type.
	 *
	 * @return null
	 */
	protected function get_block_type_style() {
		return null;
	}

	/**
	 *  Register the context
	 *
	 * @return string[]
	 */
	protected function get_block_type_uses_context() {
		return [ 'postId' ];
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
		// This is a temporary solution. We have to refactor this code when the block will have to be addable on every page/post https://github.com/woocommerce/woocommerce-blocks/issues/10882.
		global $product;
		$classname          = $attributes['className'] ?? '';
		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => trim( sprintf( 'woocommerce %1$s', $classname ) ) ) );
		$html               = sprintf(
			'<div %1$s>
				%2$s
			</div>',
			$wrapper_attributes,
			$content
		);

		$p                          = new \WP_HTML_Tag_Processor( $content );
		$post_id                    = $block->context['postId'] ?? '';
		$product                    = wc_get_product( $post_id );
		$product_gallery_images_urls = array();
		$number_of_thumbnails = $block->attributes['thumbnailsNumberOfThumbnails'] ?? 0;

		if ( $product ) {
			$product_gallery_images_urls = $this->get_product_gallery_images_urls(
				get_post_thumbnail_id( $post_id ),
				$product->get_gallery_image_ids(),
				$number_of_thumbnails
			);
		}
		$p = new \WP_HTML_Tag_Processor( $content );

		if ( $p->next_tag() ) {
			$p->set_attribute( 'data-wc-interactive', true );
			$p->set_attribute(
				'data-wc-context',
				wp_json_encode(
					array(
						'productGallery' => array(
							'selectedThumbnailIndex' => 0,
							'thumbnailsUrls' => $product_gallery_images_urls['thumbnails'],
							'largeImagesUrls' => $product_gallery_images_urls['large_images'],
						),
						'woocommerce' => array(
							'selectedImage' => $product->get_image_id(),
						),
					)
				)
			);
			$html = $p->get_updated_html();
		}

		return $html;
	}

	private function get_product_gallery_images_urls( $main_post_thumbnail_id, $gallery_thumbnails_ids, $number_of_thumbnails ) {
		$main_thumbnail_id = $main_post_thumbnail_id;
		$gallery_images_ids    = $gallery_thumbnails_ids;

		if ( ! $number_of_thumbnails || ! $gallery_images_ids ) {
			return array(
				'large_images' => array(),
				'thumbnails'   => array(),
			);
		}
		array_unshift( $gallery_images_ids, $main_thumbnail_id );
		$images_urls       = array();
		$thumbnails_urls   = array();

		foreach ( $gallery_images_ids as $index => $gallery_image_id ) {
			if ( $index >= $number_of_thumbnails ) {
				break;
			}
			$images_urls[ $index ]     = wp_get_attachment_image_src( $gallery_image_id, 'full' )[0];
			$thumbnails_urls[ $index ] = wp_get_attachment_image_src( $gallery_image_id, 'thumbnail' )[0];
		}

		return array(
			'large_images' => $images_urls,
			'thumbnails'   => $thumbnails_urls,
		);
	}

	/**
	 * Get the Interactivity API's view script handle for this block type.
	 *
	 * @param string $key Data to get, or default to everything.
	 */
	protected function get_block_type_script( $key = null ) {
		$script = [
			'handle'       => 'wc-' . $this->block_name . '-frontend',
			'path'         => $this->asset_api->get_block_asset_build_path( $this->block_name . '-frontend' ),
			'dependencies' => [ 'wc-interactivity' ],
		];

		return $key ? $script[ $key ] : $script;
	}
}
