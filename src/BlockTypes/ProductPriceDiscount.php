<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * ProductPriceDiscount class.
 */
class ProductPriceDiscount extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'discount';

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
	 * Calculates the discount between two prices.
	 *
	 * @param int $was_price Original price.
	 * @param int $is_price Sale price.
	 * @return int Percentage amount of discount
	 */
	protected function calculate_discount_value( $was_price, $is_price ) {
		return $was_price - $is_price;
	}

	/**
	 * Calculates the percentage discount between two prices.
	 *
	 * @param int $was_price Original price.
	 * @param int $is_price Sale price.
	 * @return int Percentage amount of discount
	 */
	protected function calculate_discount_percentage( $was_price, $is_price ) {
		if ( $was_price > 0 ) {
			$percentage_discount = floor( ( $this->calculate_discount_value( $was_price, $is_price ) / $was_price ) * 100 );
		} else {
			$percentage_discount = 0;
		}
		return $percentage_discount;
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
			$percentage_discount = $this->calculate_discount_percentage( $product->get_regular_price(), wc_get_price_to_display( $product ) );
		} else {
			$prices              = $product->get_variation_prices( 'min' );
			$percentage_discount = $this->calculate_discount_percentage( $product->get_variation_price( 'max', true ), current( $prices['price'] ) );
		}

		return sprintf(
			'<div class="wp-block-woocommerce-discount-amount %1$s %2$s" style="%3$s">%4$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			esc_attr( $classes_and_styles['styles'] ),
			$percentage_discount . '%'
		) . $content;
	}
}
