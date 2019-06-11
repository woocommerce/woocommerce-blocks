<?php
/**
 * Display the Newest Products block in the post content.
 * NOTE: DO NOT edit this file in WooCommerce core, this is generated from woocommerce-gutenberg-products-block.
 *
 * @package WooCommerce\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handler for getting newest products for display.
 */
class WGPB_Block_Product_New extends WGPB_Block_Grid_Base {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-new';

	/**
	 * Set args specific to this block
	 *
	 * @param array $query_args Query args.
	 */
	protected function set_block_query_args( &$query_args ) {
		$query_args['orderby'] = 'date';
		$query_args['order']   = 'DESC';
	}
}
