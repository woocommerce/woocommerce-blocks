<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * CartOrderSummaryHeadingBlock class.
 */
class CartOrderSummaryHeadingBlock extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'cart-order-summary-heading-block';

	/**
	 * Parent Block name.
	 *
	 * @var string
	 */
	protected $parent_block_name = 'cart';

	/**
	 * Get the editor script handle for this block type.
	 *
	 * @param string $key Data to get, or default to everything.
	 * @return array|string;
	 */
	protected function get_block_type_editor_script( $key = null ) {
		$script = [
			'handle'       => 'wc-' . $this->parent_block_name . '-block',
			'path'         => $this->asset_api->get_block_asset_build_path( $this->parent_block_name ),
			'dependencies' => [ 'wc-blocks' ],
		];
		return $key ? $script[ $key ] : $script;
	}
}
