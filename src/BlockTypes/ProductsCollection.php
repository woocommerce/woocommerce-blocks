<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * ProductsCollection class.
 */
class ProductsCollection extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'products-collection';

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
		return '<div>Products Collection</div>';
	}
}
