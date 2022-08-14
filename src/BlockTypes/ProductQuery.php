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
	protected $block_name  = 'product-query';
	const PRODUCT_QUERY    = 'product-query';
	const PRODUCTS_ON_SALE = 'query-on-sale';



	/**
	 * Initialize this block type.
	 *
	 * - Hook into WP lifecycle.
	 * - Register the block with WordPress.
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

	/**
	 * Update the query for the product query block.
	 *
	 * @param WP_Block $block Block instance.
	 * @param array    $current_block Block.
	 */
	public function update_query( $block, $current_block ) {

		if ( 'core/query' !== $current_block['blockName'] ) {
			return;
		}

		add_filter(
			'gutenberg_build_query_vars_from_query_block',
			function( $query, $block, $page ) use ( $current_block ) {
				return $this->get_query_by_attributes( $query, $block, $page, $current_block );
			},
			10,
			3
		);
	}

	/**
	 * Return a custom query based on the attributes.
	 *
	 * @param array    $query Query.
	 * @param WP_Block $block Block instance.
	 * @param int      $page Page.
	 * @param array    $current_block Block.
	 * @return array
	 */
	public function get_query_by_attributes( $query, $block, $page, $current_block ) {
		if ( ! isset( $current_block['attrs']['__woocommerceVariationProps'] ) ) {
			return $query;
		}

		$variation_props     = $current_block['attrs']['__woocommerceVariationProps'];
		$common_query_values = array(
			'post_type'      => 'product',
			'post_status'    => 'publish',
			'posts_per_page' => $query['posts_per_page'],
			'orderby'        => $query['orderby'],
			'order'          => $query['order'],
		);
		$on_sale_query       = $this->get_on_sale_products_query( $variation_props );

		return array_merge( $query, $common_query_values, $on_sale_query );
	}



	/**
	 * Return a query for on sale products.
	 *
	 * @param array $variation_props Query.
	 * @return array
	 */
	private function get_on_sale_products_query( $variation_props ) {
		if ( ! isset( $variation_props['attributes']['query']['onSale'] ) || true !== $variation_props['attributes']['query']['onSale'] ) {
			return array();
		}

		return array(
			'meta_query' => array(
				'relation' => 'OR',
				array(
					'key'     => '_sale_price',
					'value'   => 0,
					'compare' => '>',
					'type'    => 'numeric',
				),
				array(
					'key'     => '_min_variation_sale_price',
					'value'   => 0,
					'compare' => '>',
					'type'    => 'numeric',
				),
			),
		);
	}
}
