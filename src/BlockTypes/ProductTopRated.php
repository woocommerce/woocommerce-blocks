<?php
/**
 * Top rated products block.
 *
 * @package WooCommerce/Blocks
 */

namespace WooCommerce\Blocks\BlockTypes;

defined( 'ABSPATH' ) || exit;

/**
 * ProductTopRated class.
 */
class ProductTopRated extends AbstractProductGrid {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-top-rated';

	/**
	 * This function is not necessary in this block.
	 *
	 * @param array $query_args Query args.
	 */
	protected function set_block_query_args( &$query_args ) {}
}
