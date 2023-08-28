<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * CollectionStockFilter class.
 */
class CollectionStockFilter extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'collection-stock-filter';

	/**
	 * Extra data passed through from server to client for block.
	 *
	 * @param array $attributes  Any attributes that currently are available from the block.
	 *                           Note, this will be empty in the editor context when the block is
	 *                           not in the post content on editor load.
	 */
	protected function enqueue_data( array $attributes = [] ) {
		parent::enqueue_data( $attributes );

		$data = array();

		wc_store(
			array(
				'state' => array(
					'filters' => $data,
				),
			)
		);
	}
}
