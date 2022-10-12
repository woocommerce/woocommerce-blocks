<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * ProductQuery class.
 */
class ProductQuery extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-query';

	/**
	 * The Block with its attributes before it gets rendered
	 *
	 * @var array
	 */
	protected $parsed_block;

	/**
	 * All the query args related to the filter by attributes block.
	 *
	 * @var array
	 */
	protected $attributes_filter_query_args = array();

	/**
	 * Initialize this block type.
	 *
	 * - Hook into WP lifecycle.
	 * - Register the block with WordPress.
	 * - Hook into pre_render_block to update the query.
	 */
	protected function initialize() {
		add_filter( 'query_vars', array( $this, 'set_query_vars' ) );
		parent::initialize();
		add_filter(
			'pre_render_block',
			array( $this, 'update_query' ),
			10,
			2
		);

	}

	/**
	 * Check if a given block
	 *
	 * @param array $parsed_block The block being rendered.
	 * @return boolean
	 */
	private function is_woocommerce_variation( $parsed_block ) {
		return isset( $parsed_block['attrs']['namespace'] )
		&& substr( $parsed_block['attrs']['namespace'], 0, 11 ) === 'woocommerce';
	}


	/**
	 * Update the query for the product query block.
	 *
	 * @param string|null $pre_render   The pre-rendered content. Default null.
	 * @param array       $parsed_block The block being rendered.
	 */
	public function update_query( $pre_render, $parsed_block ) {
		if ( 'core/query' !== $parsed_block['blockName'] ) {
			return;
		}

		$this->parsed_block = $parsed_block;

		if ( $this->is_woocommerce_variation( $parsed_block ) ) {
			// Set this so that our product filters can detect if it's a PHP template.
			$this->asset_data_registry->add( 'has_filterable_products', true, true );
			$this->asset_data_registry->add( 'is_rendering_php_template', true, true );
			$this->asset_data_registry->add( 'product_ids', $this->get_products_ids_by_attributes( $parsed_block ), true );
			add_filter(
				'query_loop_block_query_vars',
				array( $this, 'build_query' ),
				10,
				1
			);
		}
	}

	/**
	 * Return a custom query based on attributes, filters and global WP_Query.
	 *
	 * @param WP_Query $query The WordPress Query.
	 * @return array
	 */
	public function build_query( $query ) {
		$parsed_block = $this->parsed_block;
		if ( ! $this->is_woocommerce_variation( $parsed_block ) ) {
			return $query;
		}

		$common_query_values = array(
			'post_type'      => 'product',
			'post__in'       => array(),
			'post_status'    => 'publish',
			'posts_per_page' => $query['posts_per_page'],
			'orderby'        => $query['orderby'],
			'order'          => $query['order'],
			'offset'         => $query['offset'],
			// Ignoring the warning of not using meta queries.
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
			'meta_query'     => array(),
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			'tax_query'      => array(),
		);

		$queries_by_attributes = $this->get_queries_by_attributes( $parsed_block );
		$queries_by_filters    = $this->get_queries_by_applied_filters();
		$queries_by_inherit    = $this->get_queries_by_inherit();

		$base_query = array_merge(
			$common_query_values,
			$queries_by_inherit
		);

		return array_reduce(
			array_merge(
				$queries_by_attributes,
				$queries_by_filters
			),
			function( $acc, $query ) {
				return $this->merge_queries( $acc, $query );
			},
			$base_query
		);

	}

	/**
	 * Return the product ids based on the attributes and global query.
	 * This is used to allow the filter blocks to render data that matches with variations. More details here: https://github.com/woocommerce/woocommerce-blocks/issues/7245
	 *
	 * @param array $parsed_block The block being rendered.
	 * @return array
	 */
	private function get_products_ids_by_attributes( $parsed_block ) {
		$queries_by_attributes = $this->get_queries_by_attributes( $parsed_block );
		$queries_by_inherit    = $this->get_queries_by_inherit();

		$query = array_reduce(
			$queries_by_attributes,
			function( $acc, $query ) {
				return $this->merge_queries( $acc, $query );
			},
			array_merge(
				$queries_by_inherit,
				array(
					'post_type'      => 'product',
					'post__in'       => array(),
					'post_status'    => 'publish',
					'posts_per_page' => -1,
					// Ignoring the warning of not using meta queries.
					// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
					'meta_query'     => array(),
					// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
					'tax_query'      => array(),
				)
			)
		);

		$products = new \WP_Query( $query );
		$post_ids = wp_list_pluck( $products->posts, 'ID' );

		return $post_ids;
	}

	/**
	 * Merge in the first parameter the keys "post_in", "meta_query" and "tax_query" of the second parameter.
	 *
	 * @param array $query1 The first query.
	 * @param array $query2 The second query.
	 * @return array
	 */
	private function merge_queries( $query1, $query2 ) {
		$query1['post__in'] = isset( $query2['post__in'] ) ? $this->intersect_arrays_when_not_empty( $query1['post__in'], $query2['post__in'] ) : $query1['post__in'];
		// Ignoring the warning of not using meta queries.
		// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
		$query1['meta_query'] = isset( $query2['meta_query'] ) ? array_merge( $query1['meta_query'], array( $query2['meta_query'] ) ) : $query1['meta_query'];
		// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
		$query1['tax_query'] = isset( $query2['tax_query'] ) ? array_merge( $query1['tax_query'], array( $query2['tax_query'] ) ) : $query1['tax_query'];

		return $query1;

	}


	/**
	 * Return a query for on sale products.
	 *
	 * @return array
	 */
	private function get_on_sale_products_query() {
		return array(
			'post__in' => wc_get_product_ids_on_sale(),
		);
	}

	/**
	 * Return all the query vars that are used by filter blocks.
	 *
	 * @return array
	 */
	private function get_query_vars_from_filter_blocks() {
		$attributes_filter_query_args = array_reduce(
			array_values( $this->get_filter_by_attributes_query_vars() ),
			function( $acc, $array ) {
				return array_merge( array_values( $array ), $acc );
			},
			array()
		);

		return array(
			'price_filter_query_args'      => array( PriceFilter::MIN_PRICE_QUERY_VAR, PriceFilter::MAX_PRICE_QUERY_VAR ),
			'stock_filter_query_args'      => array( StockFilter::STOCK_STATUS_QUERY_VAR ),
			'attributes_filter_query_args' => $attributes_filter_query_args,
		);

	}

	/**
	 * Set the query vars that are used by filter blocks.
	 *
	 * @param array $public_query_vars Public query vars.
	 * @return array
	 */
	public function set_query_vars( $public_query_vars ) {
		$query_vars = $this->get_query_vars_from_filter_blocks();

		return array_reduce(
			array_values( $query_vars ),
			function( $acc, $query_vars_filter_block ) {
				return array_merge( $query_vars_filter_block, $acc );
			},
			$public_query_vars
		);
	}

	/**
	 * Get all the query args related to the filter by attributes block.
	 *
	 * @return array
	 * [color] => Array
	 *   (
	 *        [filter] => filter_color
	 *        [query_type] => query_type_color
	 *    )
	 *
	 * [size] => Array
	 *    (
	 *        [filter] => filter_size
	 *        [query_type] => query_type_size
	 *    )
	 * )
	 */
	private function get_filter_by_attributes_query_vars() {
		if ( ! empty( $this->attributes_filter_query_args ) ) {
			return $this->attributes_filter_query_args;
		}

		$this->attributes_filter_query_args = array_reduce(
			wc_get_attribute_taxonomies(),
			function( $acc, $attribute ) {
				$acc[ $attribute->attribute_name ] = array(
					'filter'     => AttributeFilter::FILTER_QUERY_VAR_PREFIX . $attribute->attribute_name,
					'query_type' => AttributeFilter::QUERY_TYPE_QUERY_VAR_PREFIX . $attribute->attribute_name,
				);
				return $acc;
			},
			array()
		);

		return $this->attributes_filter_query_args;
	}

	/**
	 * Return queries that are generated by query args.
	 *
	 * @return array
	 */
	private function get_queries_by_applied_filters() {
		return array(
			'price_filter'        => $this->get_filter_by_price_query(),
			'attributes_filter'   => $this->get_filter_by_attributes_query(),
			'stock_status_filter' => $this->get_filter_by_stock_status_query(),
		);
	}

	/**
	 * Return queries that are generated by attributes
	 *
	 * @param array $parsed_block The Product Query that being rendered.
	 * @return array
	 */
	private function get_queries_by_attributes( $parsed_block ) {
		$on_sale_enabled = isset( $parsed_block['attrs']['query']['__woocommerceOnSale'] ) && true === $parsed_block['attrs']['query']['__woocommerceOnSale'];
		return array(
			'on_sale' => ( $on_sale_enabled ? $this->get_on_sale_products_query() : array() ),
		);
	}

	/**
	 * Return a query that filters products by price.
	 *
	 * @return array
	 */
	private function get_filter_by_price_query() {
		$min_price = get_query_var( PriceFilter::MIN_PRICE_QUERY_VAR );
		$max_price = get_query_var( PriceFilter::MAX_PRICE_QUERY_VAR );

		$max_price_query = empty( $max_price ) ? array() : [
			'key'     => '_price',
			'value'   => $max_price,
			'compare' => '<=',
			'type'    => 'numeric',
		];

		$min_price_query = empty( $min_price ) ? array() : [
			'key'     => '_price',
			'value'   => $min_price,
			'compare' => '>=',
			'type'    => 'numeric',
		];

		if ( empty( $min_price_query ) && empty( $max_price_query ) ) {
			return array();
		}

		return array(
			// Ignoring the warning of not using meta queries.
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
			'meta_query' => array(
				'relation' => 'AND',
				$max_price_query,
				$min_price_query,
			),
		);
	}

	/**
	 * Return a query that filters products by attributes.
	 *
	 * @return array
	 */
	private function get_filter_by_attributes_query() {
		$attributes_filter_query_args = $this->get_filter_by_attributes_query_vars();

		$queries = array_reduce(
			$attributes_filter_query_args,
			function( $acc, $query_args ) {
				$attribute_name       = $query_args['filter'];
				$attribute_query_type = $query_args['query_type'];

				$attribute_value = get_query_var( $attribute_name );
				$attribute_query = get_query_var( $attribute_query_type );

				if ( empty( $attribute_value ) ) {
					return $acc;
				}

				// It is necessary explode the value because $attribute_value can be a string with multiple values (e.g. "red,blue").
				$attribute_value = explode( ',', $attribute_value );

				$acc[] = array(
					'taxonomy' => str_replace( AttributeFilter::FILTER_QUERY_VAR_PREFIX, 'pa_', $attribute_name ),
					'field'    => 'slug',
					'terms'    => $attribute_value,
					'operator' => 'and' === $attribute_query ? 'AND' : 'IN',
				);

				return $acc;
			},
			array()
		);

		if ( empty( $queries ) ) {
			return array();
		}

		return array(
			// Ignoring the warning of not using meta queries.
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			'tax_query' => array(
				'relation' => 'AND',
				$queries,
			),
		);
	}

	/**
	 * Return a query that filters products by stock status.
	 *
	 * @return array
	 */
	private function get_filter_by_stock_status_query() {

		$filter_stock_status_values = get_query_var( StockFilter::STOCK_STATUS_QUERY_VAR );

		if ( empty( $filter_stock_status_values ) ) {
			return array();
		}

		$filtered_stock_status_values = array_filter(
			explode( ',', $filter_stock_status_values ),
			function( $stock_status ) {
				return in_array( $stock_status, StockFilter::STOCK_STATUS_QUERY_VAR_VALUES, true );
			}
		);

		if ( empty( $filtered_stock_status_values ) ) {
			return array();
		}

		return array(
			// Ignoring the warning of not using meta queries.
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
			'meta_query' => array(
				array(
					'key'      => '_stock_status',
					'value'    => $filtered_stock_status_values,
					'operator' => 'IN',

				),
			),
		);
	}

	/**
	 * Intersect arrays when both are not empty, otherwise merge them.
	 *
	 * @param array $array1 Array.
	 * @param array $array2 Array.
	 * @return array
	 */
	private function intersect_arrays_when_not_empty( $array1, $array2 ) {
		if ( empty( $array1 ) || empty( $array2 ) ) {
			return array_merge( $array1, $array2 );
		}
		return array_intersect( $array1, $array2 );
	}

	/**
	 * Return a query that filters products by the global query.
	 *
	 * @return array
	 */
	private function get_queries_by_inherit() {
		global $wp_query;

		return array(
			'taxonomy' => isset( $wp_query->query_vars['taxonomy'] ) ? $wp_query->query_vars['taxonomy'] : '',
			'term'     => isset( $wp_query->query_vars['term'] ) ? $wp_query->query_vars['term'] : '',
			's'        => isset( $wp_query->query_vars['s'] ) ? $wp_query->query_vars['s'] : '',
		);
	}

}
