<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use WP_Query;

// phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_tax_query
// phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_meta_query
// phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_meta_key

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
	 * Orderby options not natively supported by WordPress REST API
	 *
	 * @var array
	 */
	protected $custom_order_opts = array( 'popularity', 'rating' );

	/**
	 * All the query args related to the filter by attributes block.
	 *
	 * @var array
	 */
	protected $attributes_filter_query_args = array();

	/** This is a feature flag to enable the custom inherit Global Query implementation.
	 * This is not intended to be a permanent feature flag, but rather a temporary.
	 * It is also necessary to enable this feature flag on the PHP side: `assets/js/blocks/product-query/variations/product-query.tsx:26`.
	 * https://github.com/woocommerce/woocommerce-blocks/pull/7382
	 *
	 * @var boolean
	 */
	protected $is_custom_inherit_global_query_implementation_enabled = false;

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
		add_filter( 'rest_product_query', array( $this, 'update_rest_query' ), 10, 2 );
		add_filter( 'rest_product_collection_params', array( $this, 'extend_rest_query_allowed_params' ), 10, 1 );
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
	 * Update the query for the product query block in Editor.
	 *
	 * @param array           $args    Query args.
	 * @param WP_REST_Request $request Request.
	 */
	public function update_rest_query( $args, $request ) {
		$on_sale_query = $request->get_param( '__woocommerceOnSale' ) !== 'true' ? array() : $this->get_on_sale_products_query();
		$orderby_query = $this->get_custom_orderby_query( $request->get_param( 'orderby' ) );

		return array_merge( $args, $on_sale_query, $orderby_query );
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
			'meta_query'     => array(),
			'tax_query'      => array(),
		);

		return $this->merge_queries(
			$common_query_values,
			$this->get_global_query( $parsed_block ),
			$this->get_custom_orderby_query( $query['orderby'] ),
			$this->get_queries_by_attributes( $parsed_block ),
			$this->get_queries_by_applied_filters()
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
		$query = $this->merge_queries(
			array(
				'post_type'      => 'product',
				'post__in'       => array(),
				'post_status'    => 'publish',
				'posts_per_page' => -1,
				'meta_query'     => array(),
				'tax_query'      => array(),
			),
			$this->get_queries_by_attributes( $parsed_block ),
			$this->get_global_query( $parsed_block )
		);

		$products = new \WP_Query( $query );
		$post_ids = wp_list_pluck( $products->posts, 'ID' );

		return $post_ids;
	}

	/**
	 * Merge in the first parameter the keys "post_in", "meta_query" and "tax_query" of the second parameter.
	 *
	 * @param array[] ...$queries Query arrays to be merged.
	 * @return array
	 */
	private function merge_queries( ...$queries ) {
		$valid_query_vars = array_keys( ( new WP_Query() )->fill_query_vars( array() ) );
		$valid_query_vars = array_merge(
			$valid_query_vars,
			// fill_query_vars doesn't include these vars so we need to add them manually.
			array(
				'date_query',
				'exact',
				'ignore_sticky_posts',
				'lazy_load_term_meta',
				'meta_compare_key',
				'meta_compare',
				'meta_query',
				'meta_type_key',
				'meta_type',
				'nopaging',
				'offset',
				'order',
				'orderby',
				'page',
				'post_type',
				'posts_per_page',
				'suppress_filters',
				'tax_query',
			)
		);

		$merged_query = array_reduce(
			$queries,
			function( $acc, $query ) use ( $valid_query_vars ) {
				if ( ! is_array( $query ) ) {
					return $acc;
				}
				if ( empty( array_intersect( $valid_query_vars, array_keys( $query ) ) ) ) {
					return $this->merge_queries( $acc, ...array_values( $query ) );
				}
				return array_merge_recursive( $acc, $query );
			},
			array()
		);

		/**
		 * If there are duplicated items in post__in, it means that we need to
		 * use the intersection of the results, which in this case, are the
		 * duplicated items.
		 */
		if (
			! empty( $merged_query['post__in'] ) &&
			count( $merged_query['post__in'] ) > count( array_unique( $merged_query['post__in'] ) )
		) {
			$merged_query['post__in'] = array_unique(
				array_diff(
					$merged_query['post__in'],
					array_unique( $merged_query['post__in'] )
				)
			);
		}

		return $merged_query;
	}

	/**
	 * Extends allowed `collection_params` for the REST API
	 *
	 * By itself, the REST API doesn't accept custom `orderby` values,
	 * even if they are supported by a custom post type.
	 *
	 * @param array $params  A list of allowed `orderby` values.
	 *
	 * @return array
	 */
	public function extend_rest_query_allowed_params( $params ) {
		$original_enum = isset( $params['orderby']['enum'] ) ? $params['orderby']['enum'] : array();

		$params['orderby']['enum'] = array_merge( $original_enum, $this->custom_order_opts );
		return $params;
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
	 * Return query params to support custom sort values
	 *
	 * @param string $orderby  Sort order option.
	 *
	 * @return array
	 */
	private function get_custom_orderby_query( $orderby ) {
		if ( ! in_array( $orderby, $this->custom_order_opts, true ) ) {
			return array( 'orderby' => $orderby );
		}

		$meta_keys = array(
			'popularity' => 'total_sales',
			'rating'     => '_wc_average_rating',
		);

		return array(
			'meta_key' => $meta_keys[ $orderby ],
			'orderby'  => 'meta_value_num',
		);
	}

	/**
	 * Return a query for products depending on their stock status.
	 *
	 * @param array $stock_statii An array of acceptable stock statii.
	 * @return array
	 */
	private function get_stock_status_query( $stock_statii ) {
		return array(
			'meta_query' => array(
				array(
					'key'     => '_stock_status',
					'value'   => (array) $stock_statii,
					'compare' => 'IN',
				),
			),
		);
	}

	/**
	 * Set the query vars that are used by filter blocks.
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
		$query           = $parsed_block['attrs']['query'];
		$on_sale_enabled = isset( $query['__woocommerceOnSale'] ) && true === $query['__woocommerceOnSale'];

		return array(
			'on_sale'      => ( $on_sale_enabled ? $this->get_on_sale_products_query() : array() ),
			'stock_status' => isset( $query['__woocommerceStockStatus'] ) ? $this->get_stock_status_query( $query['__woocommerceStockStatus'] ) : array(),
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
			'compare' => '<',
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
				return in_array( $stock_status, StockFilter::get_stock_status_query_var_values(), true );
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
	 * Get product-related query variables from the global query.
	 *
	 * @param array $parsed_block The Product Query that being rendered.
	 *
	 * @return array
	 */
	private function get_global_query( $parsed_block ) {
		if ( ! $this->is_custom_inherit_global_query_implementation_enabled ) {
			return array();
		}

		global $wp_query;

		$inherit_enabled = isset( $parsed_block['attrs']['query']['__woocommerceInherit'] ) && true === $parsed_block['attrs']['query']['__woocommerceInherit'];

		if ( ! $inherit_enabled ) {
			return array();
		}

		$query = array();

		if ( isset( $wp_query->query_vars['taxonomy'] ) && isset( $wp_query->query_vars['term'] ) ) {
			$query['tax_query'] = array(
				array(
					'taxonomy' => $wp_query->query_vars['taxonomy'],
					'field'    => 'slug',
					'terms'    => $wp_query->query_vars['term'],
				),
			);
		}

		if ( isset( $wp_query->query_vars['s'] ) ) {
			$query['s'] = $wp_query->query_vars['s'];
		}

		return $query;
	}

}
