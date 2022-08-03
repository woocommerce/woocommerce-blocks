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

	protected function initialize() {
		parent::initialize();
		add_filter(
			'pre_render_block',
			array( $this, 'update_query' ),
			10,
			2
		);

	}

	public function on_sale_query( $query, $block, $page ) {
		$wp_query = array(
			'post_type'      => 'product',
			'posts_per_page' => $query['posts_per_page'],
			'meta_query'     => array(
				'relation' => 'OR',
				array( // Simple products type
					'key'     => '_sale_price',
					'value'   => 0,
					'compare' => '>',
					'type'    => 'numeric',
				),
				array( // Variable products type
					'key'     => '_min_variation_sale_price',
					'value'   => 0,
					'compare' => '>',
					'type'    => 'numeric',
				),
			),
		);

		return $wp_query;
	}


	public function update_query( $block_content, $block ) {
		if ( $block['blockName'] === 'core/query' && isset( $block['attrs']['productQuery']['onSale'] ) && $block['attrs']['productQuery']['onSale'] === true ) {
			add_filter( 'gigitux', array( $this, 'on_sale_query' ), 10, 3 );
		}
	}

}
