<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * Used in templates to wrap page content. Allows content to be populated at template level.
 *
 * @internal
 */
class PageContentWrapper extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'page-content-wrapper';

	/**
	 * Get the frontend style handle for this block type.
	 *
	 * @return null
	 */
	protected function get_block_type_style() {
		return null;
	}
}
