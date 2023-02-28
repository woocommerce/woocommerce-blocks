<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * SingleProductServerSide class.
 */
class SingleProductServerSide extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'single-product-server-side';


	/**
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block instance.
	 *
	 * @return string Rendered block output.
	 */
	protected function render( $attributes, $content, $block ) {
		$classname = $attributes['className'] ?? '';

		return sprintf(
			'<div class="wp-block-woocommerce-single-product-server-side %1$s">
				Single Product
			</div>',
			esc_attr( $classname ),
		);
	}
}
