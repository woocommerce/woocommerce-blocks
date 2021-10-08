<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * ProductBestSellers class.
 */
class ProductBestSellers extends AbstractProductGrid {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-best-sellers';

	/**
	 * Set args specific to this block
	 *
	 * @param array $query_args Query args.
	 */
	protected function set_block_query_args( &$query_args ) {
		$query_args['orderby'] = 'popularity';
		if ( $this->attributes['daysLimit'] > 0 ) {
			$query_args['date'] = array( 'after' => gmdate( 'Y-m-d', strtotime( '-' . $this->attributes['daysLimit'] . ' days' ) ) );
		}
	}

	/**
	 * Get a set of attributes shared across most of the grid blocks.
	 *
	 * @return array List of block attributes with type and defaults.
	 */
	protected function get_block_type_attributes() {

		return array_merge(
			parent::get_block_type_attributes(),
			array( 'daysLimit' => $this->get_schema_number( 0 ) )
		);
	}
}
