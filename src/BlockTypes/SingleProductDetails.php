<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * SingleProductDetails class.
 */
class SingleProductDetails extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'single-product-details';

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
		$tabs = $this->render_tabs();

		$classname = $attributes['className'] ?? '';

		return sprintf(
			'<div class="wp-block-woocommerce-single-product-details %1$s">
				%2$s
			</div>',
			esc_attr( $classname ),
			$tabs,
		);
	}

	protected function render_tabs(){
		ob_start();

		while ( have_posts() ) {
			the_post();
			woocommerce_output_product_data_tabs();
		}

		$tabs = ob_get_clean();

		return $tabs;
	}
}
