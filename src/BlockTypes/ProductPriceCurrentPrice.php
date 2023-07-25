<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * ProductPriceCurrentPrice class.
 */
class ProductPriceCurrentPrice extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'current-price';

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

		if ( ! $product ) {
			return null;
		}

		$classname          = $attributes['className'] ?? '';
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		// For variable products, show the price range.
		if ( ! $product->is_type( 'variable' ) ) {
			$price_display = wc_price( wc_get_price_to_display( $product ) ) . $product->get_price_suffix();
		} else {
			$prices        = $product->get_variation_prices( 'min' );
			$max_price     = wc_price( $product->get_variation_price( 'max', true ) ) . $product->get_price_suffix();
			$min_price     = wc_price( current( $prices['price'] ) ) . $product->get_price_suffix();
			$price_display = $min_price . ' - ' . $max_price;
		}

		return sprintf(
			'<div class="wp-block-woocommerce-current-price %1$s %2$s" style="%3$s">%4$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			esc_attr( $classes_and_styles['styles'] ),
			$price_display
		);
	}
}
