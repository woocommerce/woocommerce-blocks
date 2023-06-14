<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * FilledCartBlock class.
 */
class FilterWrapper extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'filter-wrapper';

	/**
	 * Get the frontend style handle for this block type.
	 *
	 * @see $this->register_block_type()
	 * @return string[]|null
	 */
	protected function get_block_type_style() {
		return array_merge( [ 'wc-blocks-style' ] );
	}
}
