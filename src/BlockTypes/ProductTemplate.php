<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * ProductTemplate class.
 */
class ProductTemplate extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-template';

	/**
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block instance.
	 *
	 * @return string | void Rendered block output.
	 */
	protected function render( $attributes, $content, $block ) {
		return '<div>Product Template</div>';
	}
}
