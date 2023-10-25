<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * CollectionAttributeFilter class.
 */
final class CollectionAttributeFilter extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'collection-attribute-filter';

	/**
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content    Block content.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {
		if ( is_admin() || empty( $block->context['filterData'] ) ) {
			return $content;
		}

		return $content;
	}
}
