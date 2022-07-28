<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * AttributeFilter class.
 */
class ProductQuery extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-query';

	/**
	 * Extra data passed through from server to client for block.
	 *
	 * @param array $attributes  Any attributes that currently are available from the block.
	 *                           Note, this will be empty in the editor context when the block is
	 *                           not in the post content on editor load.
	 */

	// protected function initialize() {
	// parent::initialize();

	// do_action( 'qm/debug', 'initialize' );

	// add_filter( 'query_vars', array( $this, 'themeslug_query_vars' ) );

	// add_filter(
	// 'pre_render_block',
	// array( $this, 'wporg_block_wrapper' ),
	// 10,
	// 2
	// );

		// $wp_query = new \WP_Query(
		// array(
		// 'post_type'      => 'product',
		// 'posts_per_page' => 8,
		// 'meta_query'     => array(
		// 'relation' => 'OR',
		// array( // Simple products type
		// 'key'     => '_sale_price',
		// 'value'   => 0,
		// 'compare' => '>',
		// 'type'    => 'numeric',
		// ),
		// array( // Variable products type
		// 'key'     => '_min_variation_sale_price',
		// 'value'   => 0,
		// 'compare' => '>',
		// 'type'    => 'numeric',
		// ),
		// ),
		// )
		// );

		// add_filter(
		// 'gigitux',
		// function ( $array ) {
		// do_action( 'qm/debug', "sto nell'init" );
		// do_action( 'qm/debug', $array );
		// return array(
		// 'post_type'      => 'product',
		// 'posts_per_page' => 8,
		// 'meta_query'     => array(
		// 'relation' => 'OR',
		// array( // Simple products type
		// 'key'     => '_sale_price',
		// 'value'   => 0,
		// 'compare' => '>',
		// 'type'    => 'numeric',
		// ),
		// array( // Variable products type
		// 'key'     => '_min_variation_sale_price',
		// 'value'   => 0,
		// 'compare' => '>',
		// 'type'    => 'numeric',
		// ),
		// ),
		// );
		// }
		// );
	// }

	// public function wporg_block_wrapper( $block_content, $block ) {

	// if ( $block['blockName'] === 'core/query' && $block['attrs']['onSale'] === true ) {

	// global $wp_query;

	// $wp_query = new \WP_Query(
	// array(
	// 'post_type'      => 'product',
	// 'posts_per_page' => 2,
	// 'meta_query'     => array(
	// 'relation' => 'OR',
	// array( // Simple products type
	// 'key'     => '_sale_price',
	// 'value'   => 0,
	// 'compare' => '>',
	// 'type'    => 'numeric',
	// ),
	// array( // Variable products type
	// 'key'     => '_min_variation_sale_price',
	// 'value'   => 0,
	// 'compare' => '>',
	// 'type'    => 'numeric',
	// ),
	// ),
	// )
	// );

	// do_action( 'qm/debug', 1 );

	// }
	// return $block_content;
	// }

	// function themeslug_query_vars( $qvars ) {
	// $qvars[] = 'filter-stock';
	// return $qvars;
	// }

}
