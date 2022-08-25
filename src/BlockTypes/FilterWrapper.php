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
	 * Register script and style assets for the block type before it is registered.
	 *
	 * This registers the scripts; it does not enqueue them.
	 */
	protected function register_block_type_assets() {}
}
