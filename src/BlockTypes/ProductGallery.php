<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\ProductGalleryUtils;
use Automattic\WooCommerce\Blocks\Utils\BlockTemplateUtils;

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
	 *  Register the context
	 *
	 * @return string[]
	 */
	protected function get_block_type_uses_context() {
		return [ 'postId' ];
	}

	/**
	 * Return the dialog content.
	 *
	 * @return string
	 */
	protected function render_dialog() {
		$template_part = BlockTemplateUtils::get_template_part( 'product-gallery' );

		$parsed_template = parse_blocks(
			$template_part
		);

		$html = array_reduce(
			$parsed_template,
			function( $carry, $item ) {
				return $carry . render_block( $item );
			},
			''
		);

		$html_processor = new \WP_HTML_Tag_Processor( $html );

		$html_processor->next_tag(
			array(
				'class_name' => 'wp-block-woocommerce-product-gallery',
			)
		);

		$html_processor->remove_attribute( 'data-wc-context' );

		$gallery_dialog = strtr(
			'
		<div class="wc-block-product-gallery-dialog__overlay" hidden data-wc-bind--hidden="!selectors.woocommerce.isDialogOpen">
			<dialog data-wc-bind--open="selectors.woocommerce.isDialogOpen">
			<div class="wc-block-product-gallery-dialog__header">
			<div class="wc-block-product-galler-dialog__header-right">
				<button class="wc-block-product-gallery-dialog__close" data-wc-on--click="actions.woocommerce.dialog.handleCloseButtonClick">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="24" height="24" rx="2"/>
						<path d="M13 11.8L19.1 5.5L18.1 4.5L12 10.7L5.9 4.5L4.9 5.5L11 11.8L4.5 18.5L5.5 19.5L12 12.9L18.5 19.5L19.5 18.5L13 11.8Z" fill="black"/>
					</svg>
				</button>
			</div>
			</div>
			<div class="wc-block-product-gallery-dialog__body">
				{{html}}
			</div>
			</dialog>
		</div>',
			array(
				'{{html}}' => $html_processor->get_updated_html(),
			)
		);
		return $gallery_dialog;
	}


	/**
	 * This function remove the div wrapper.
	 * The content has a <div> with the class wp-block-woocommerce-product-gallery>.
	 * We don't need since that we add it in the render method.
	 *
	 * @param string $content Block content.
	 * @return string Rendered block type output.
	 */
	private function remove_div_wrapper( $content ) {
		$parsed_string = preg_replace( '/<div class="wp-block-woocommerce-product-gallery">/', '', $content );
		$parsed_string = preg_replace( '/<\/div>$/', '', $parsed_string );
		return $parsed_string;
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
		$post_id                = $block->context['postId'] ?? '';
		$product_gallery_images = ProductGalleryUtils::get_product_gallery_images( $post_id, 'thumbnail', array() );
		$classname_single_image = '';
		// This is a temporary solution. We have to refactor this code when the block will have to be addable on every page/post https://github.com/woocommerce/woocommerce-blocks/issues/10882.
		global $product;

		if ( count( $product_gallery_images ) < 2 ) {
			// The gallery consists of a single image.
			$classname_single_image = 'is-single-product-gallery-image';
		}

		$classname          = $attributes['className'] ?? '';
		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => trim( sprintf( 'wc-block-product-gallery %1$s %2$s', $classname, $classname_single_image ) ) ) );
		$gallery            = ( true === $attributes['fullScreenOnClick'] && isset( $attributes['mode'] ) && 'full' !== $attributes['mode'] ) ? $this->render_dialog() : '';
		$html               = sprintf(
			'<div %1$s>
				%2$s
				%3$s
			</div>',
			$wrapper_attributes,
			$content,
			$gallery
		);

		$post_id = $block->context['postId'] ?? '';
		$product = wc_get_product( $post_id );
		$p       = new \WP_HTML_Tag_Processor( $html );

		if ( $p->next_tag() ) {
			$p->set_attribute( 'data-wc-interactive', true );
			$p->set_attribute(
				'data-wc-context',
				wp_json_encode(
					array(
						'woocommerce' => array(
							'selectedImage' => $product->get_image_id(),
							'isDialogOpen'  => false,
						),
					)
				)
			);
			$html = $p->get_updated_html();
		}

		return $html;
	}
}
