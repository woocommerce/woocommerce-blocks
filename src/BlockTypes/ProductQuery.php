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
		// Set this so that our product filters can detect if it's a PHP template.
		$this->asset_data_registry->add( 'has_filterable_products', true, true );
		$this->asset_data_registry->add( 'is_rendering_php_template', true, true );
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
	 * @param string|null $pre_render   The pre-rendered content. Default null.
	 * @param array       $parsed_block The block being rendered.
	 */
	public function update_query( $pre_render, $parsed_block ) {
		if ( 'core/query' !== $parsed_block['blockName'] ) {
			return;
		}

		$this->parsed_block = $parsed_block;

		if ( isset( $parsed_block['attrs']['__woocommerceVariationProps'] ) ) {
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
		if ( ! isset( $parsed_block['attrs']['__woocommerceVariationProps'] ) ) {
			return $query;
		}

		$variation_props     = $parsed_block['attrs']['__woocommerceVariationProps'];
		$common_query_values = array(
			'post_type'      => 'product',
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

		$queries_attributes = $this->get_queries_by_attributes( $variation_props );
		$queries_filters    = $this->get_queries_by_applied_filters();

		return array_reduce(
			array_merge(
				$queries_attributes,
				$queries_filters
			),
			function( $acc, $query ) {
				if ( isset( $query['post__in'] ) ) {
					$acc['post__in'] = isset( $acc['post__in'] ) ? array_merge( $acc['post__in'], $query['post__in'] ) : $query['post__in'];
				}
				// Ignoring the warning of not using meta queries.
				// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
				$acc['meta_query'] = isset( $query['meta_query'] ) ? array_merge( $acc['meta_query'], array( $query['meta_query'] ) ) : $acc['meta_query'];
				// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
				$acc['tax_query'] = isset( $query['tax_query'] ) ? array_merge( $acc['tax_query'], array( $query['tax_query'] ) ) : $acc['tax_query'];
				return $acc;
			},
			$common_query_values
		);

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
	 * Set the query vars that are used by filter blocks.
	 *
	 * @param array $qvars Public query vars.
	 * @return array
	 */
	public function set_query_vars( $qvars ) {
		$attributes_filter_query_args = array_reduce(
			array_values( $this->get_filter_by_attributes_query_vars() ),
			function( $acc, $array ) {
				return array_merge( array_values( $array ), $acc );
			},
			array()
		);

		$price_filter_query_args = array( PriceFilter::MIN_PRICE_QUERY_VAR, PriceFilter::MAX_PRICE_QUERY_VAR );
		return array_merge( $qvars, $price_filter_query_args, $attributes_filter_query_args );
	}

	/**
	 * Get all the query args related to the filter by attributes block.
	 *
	 * @return array
	 */
	private function get_filter_by_attributes_query_vars() {

		if ( ! empty( $this->attributes_filter_query_args ) ) {
			return $this->attributes_filter_query_args;
		}

		$this->attributes_filter_query_args = array_reduce(
			wc_get_attribute_taxonomies(),
			function( $acc, $attribute ) {
				$acc[ $attribute->attribute_name ] = array(
					'filter'     => AttributeFilter::FILTER_QUERY_VAR . $attribute->attribute_name,
					'query_type' => AttributeFilter::QUERY_TYPE_QUERY_VAR . $attribute->attribute_name,
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
			'price_filter'      => $this->get_filter_by_price_query(),
			'attributes_filter' => $this->get_filter_by_attributes_query(),
		);
	}

	/**
	 * Return queries that are generated by block attributes.
	 *
	 * @param array $variation_props Dedicated attributes for the variation.
	 * @return array
	 */
	private function get_queries_by_attributes( $variation_props ) {
		$on_sale_enabled = isset( $variation_props['attributes']['query']['onSale'] ) && true === $variation_props['attributes']['query']['onSale'];
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

				$attribute_name_value       = get_query_var( $attribute_name );
				$attribute_query_type_value = get_query_var( $attribute_query_type );

				if ( empty( $attribute_name_value ) ) {
					return $acc;
				}

				$attribute_name_value = explode( ',', $attribute_name_value );

				$acc[] = array(
					'taxonomy' => str_replace( AttributeFilter::FILTER_QUERY_VAR, 'pa_', $attribute_name ),
					'field'    => 'slug',
					'terms'    => $attribute_name_value,
					'operator' => 'and' === $attribute_query_type_value ? 'AND' : 'IN',
				);

				return $acc;
			},
			array()
		);

		if ( empty( $filters ) ) {
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

}
