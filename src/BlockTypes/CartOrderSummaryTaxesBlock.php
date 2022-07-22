<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * CartOrderSummaryTaxesBlock class.
 * 
 * @internal
 */
class CartOrderSummaryTaxesBlock extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'cart-order-summary-taxes-block';

	/**
	 * Chunks build folder.
	 *
	 * @var string
	 */
	protected $chunks_folder = 'checkout-order-summary-taxes';

	/**
	 * API version name.
	 *
	 * @var string
	 */
	protected $api_version = '2';

	/**
	 * Register script and style assets for the block type before it is registered.
	 *
	 * This registers the scripts; it does not enqueue them.
	 */
	protected function register_block_type_assets() {
		parent::register_block_type_assets();
		$chunks        = $this->get_chunks_paths( $this->chunks_folder );
		$this->register_chunk_translations( array_merge( $chunks ) );
	}
}
