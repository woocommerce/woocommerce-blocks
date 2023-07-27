<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * ProductGalleryPager class.
 */
class ProductGalleryPager extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-gallery-pager';

	/**
	 * It isn't necessary register block assets because it is a server side block.
	 */
	protected function register_block_type_assets() {
		return null;
	}

	/**
	 *  Register the context
	 *
	 * @return string[]
	 */
	protected function get_block_type_uses_context() {
		return [ 'query', 'queryId', 'postId' ];
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
		$post_id           = isset( $block->context['postId'] ) ? $block->context['postId'] : '';
		$product           = wc_get_product( $post_id );
		$classname          = $attributes['className'] ?? '';
		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => trim( sprintf( 'woocommerce %1$s', $classname ) ) ) );
		$html = $this->render_dots_pager();

		return sprintf(
			'<div %1$s>
				%2$s
			</div>',
			$wrapper_attributes,
			$html
		);
	}

	private function render_digits_pager( ) {
		return sprintf(
			'<ul class="wp-block-woocommerce-product-gallery-pager__pager">
				<li class="wp-block-woocommerce-product-gallery__pager-item is-active">1</li>
				<li class="wp-block-woocommerce-product-gallery__pager-item">2</li>
				<li class="wp-block-woocommerce-product-gallery__pager-item">3</li>
				<li class="wp-block-woocommerce-product-gallery__pager-item">4</li>
			</ul>',
		);
	}

	private function render_dots_pager( ) {
		return sprintf(
			'<ul class="wp-block-woocommerce-product-gallery-pager__pager">
				<li class="wp-block-woocommerce-product-gallery__pager-item is-active">%1$s</li>
				<li class="wp-block-woocommerce-product-gallery__pager-item">%2$s</li>
				<li class="wp-block-woocommerce-product-gallery__pager-item">%2$s</li>
				<li class="wp-block-woocommerce-product-gallery__pager-item">%2$s</li>
			</ul>',
			$this->get_selected_dot_icon(),
			$this->get_dot_icon(),
		);
	}

	private function get_dot_icon( ) {
		return sprintf(
			'<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="6" cy="6" r="6" fill="black" fill-opacity="0.2"/>
			</svg>',
		);
	}

	private function get_selected_dot_icon( ) {
		return sprintf(
			'<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="6" cy="6" r="6" fill="black"/>
			</svg>',
		);
	}
}
