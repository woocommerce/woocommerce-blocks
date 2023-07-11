<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * ProductPriceOriginalPrice class.
 */
class ProductPriceOriginalPrice extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'original-price';

	/**
	 * API version name.
	 *
	 * @var string
	 */
	protected $api_version = '2';

	/**
	 * Register the context.
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
		$post_id = $block->context['postId'];
		$product = wc_get_product( $post_id );

		if ( ! $product || ! $product->is_on_sale() ) {
			return null;
		}

		$classname          = $attributes['className'] ?? '';
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		if ( ! $product->is_type( 'variable' ) ) {
			$display_price = wc_price( $product->get_regular_price() ) . $product->get_price_suffix();
		} else {
			// For variable products, show the max price of the variations on sale.
			$display_price = wc_price( $product->get_variation_price( 'max', true ) ) . $product->get_price_suffix();
		}

		return sprintf(
			'<div class="wp-block-woocommerce-original-price %1$s %2$s" style="%3$s">%4$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			esc_attr( $classes_and_styles['styles'] ),
			$display_price
		);
	}
}
