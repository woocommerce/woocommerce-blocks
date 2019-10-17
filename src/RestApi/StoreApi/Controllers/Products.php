<?php
/**
 * Products controller.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Controllers;

defined( 'ABSPATH' ) || exit;

use \WP_Error as RestError;
use \WP_REST_Controller as RestContoller;
use \WC_REST_Exception as RestException;
use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas\ProductSchema;
use Automattic\WooCommerce\Blocks\RestApi\Utilities\Pagination;
use Automattic\WooCommerce\Blocks\RestApi\Utilities\ProductFiltering;

/**
 * Products API.
 */
class Products extends RestContoller {
	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'wc/store';

	/**
	 * Route base.
	 *
	 * @var string
	 */
	protected $rest_base = 'products';

	/**
	 * Schema class instance.
	 *
	 * @var ProductSchema
	 */
	protected $product_schema;

	/**
	 * Setup API class.
	 */
	public function __construct() {
		$this->product_schema = new ProductSchema();
	}

	/**
	 * Register the routes for products.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'  => 'GET',
					'callback' => array( $this, 'get_items' ),
					'args'     => $this->get_collection_params(),
				),
				'schema' => array( $this, 'get_public_item_schema' ),
			)
		);
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)',
			array(
				'args'   => array(
					'id' => array(
						'description' => __( 'Unique identifier for the resource.', 'woo-gutenberg-products-block' ),
						'type'        => 'integer',
					),
				),
				array(
					'methods'  => 'GET',
					'callback' => array( $this, 'get_item' ),
					'args'     => array(
						'context' => $this->get_context_param(
							array(
								'default' => 'view',
							)
						),
					),
				),
				'schema' => array( $this, 'get_public_item_schema' ),
			)
		);
	}

	/**
	 * Product item schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		return $this->product_schema->get_item_schema();
	}

	/**
	 * Prepare a single item for response.
	 *
	 * @param \WC_Product      $item Object used to create response.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response $response Response data.
	 */
	public function prepare_item_for_response( $item, $request ) {
		return rest_ensure_response( $this->product_schema->get_item_response( $item ) );
	}

	/**
	 * Get a single item.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return RestError|\WP_REST_Response
	 */
	public function get_item( $request ) {
		$object = wc_get_product( (int) $request['id'] );

		if ( ! $object || 0 === $object->get_id() ) {
			return new RestError( 'woocommerce_rest_product_invalid_id', __( 'Invalid product ID.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		$data     = $this->prepare_item_for_response( $object, $request );
		$response = rest_ensure_response( $data );

		return $response;
	}

	/**
	 * Get objects.
	 *
	 * @since  3.0.0
	 * @param  array $query_args Query args.
	 * @return array
	 */
	protected function get_objects( $query_args ) {
		$query  = new \WP_Query();
		$result = $query->query( $query_args );

		$total_posts = $query->found_posts;
		if ( $total_posts < 1 ) {
			// Out-of-bounds, run the query again without LIMIT for total count.
			unset( $query_args['paged'] );
			$count_query = new \WP_Query();
			$count_query->query( $query_args );
			$total_posts = $count_query->found_posts;
		}

		return array(
			'objects' => array_map( 'wc_get_product', $result ),
			'total'   => (int) $total_posts,
			'pages'   => (int) ceil( $total_posts / (int) $query->query_vars['posts_per_page'] ),
		);
	}

	/**
	 * Get a collection of posts and add the post title filter option to \WP_Query.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return RestError|\WP_REST_Response
	 */
	public function get_items( $request ) {
		add_filter( 'posts_clauses', array( $this, 'get_items_query_clauses' ), 10, 2 );

		$query_args    = $this->prepare_objects_query( $request );
		$query_results = $this->get_objects( $query_args );

		$objects = array();
		foreach ( $query_results['objects'] as $object ) {
			if ( ! wc_rest_check_post_permissions( 'product', 'read', $object->get_id() ) ) {
				continue;
			}

			$data      = $this->prepare_item_for_response( $object, $request );
			$objects[] = $this->prepare_response_for_collection( $data );
		}

		$total     = $query_results['total'];
		$max_pages = $query_results['pages'];

		$response = rest_ensure_response( $objects );
		$response = ( new Pagination() )->add_headers( $response, $request, $total, $max_pages );
		$response = ( new ProductFiltering() )->add_headers( $response, $request, $query_args );

		remove_filter( 'posts_clauses', array( $this, 'get_items_query_clauses' ), 10 );
		return $response;
	}

	/**
	 * Add in conditional search filters for products.
	 *
	 * @param array     $args Query args.
	 * @param \WC_Query $wp_query WC_Query object.
	 * @return array
	 */
	public function get_items_query_clauses( $args, $wp_query ) {
		global $wpdb;

		if ( $wp_query->get( 'search' ) ) {
			$search         = "'%" . $wpdb->esc_like( $wp_query->get( 'search' ) ) . "%'";
			$args['join']   = $this->append_product_sorting_table_join( $args['join'] );
			$args['where'] .= " AND ({$wpdb->posts}.post_title LIKE {$search}";
			$args['where'] .= wc_product_sku_enabled() ? ' OR wc_product_meta_lookup.sku LIKE ' . $search . ')' : ')';
		}

		if ( $wp_query->get( 'sku' ) ) {
			$skus = explode( ',', $wp_query->get( 'sku' ) );
			// Include the current string as a SKU too.
			if ( 1 < count( $skus ) ) {
				$skus[] = $wp_query->get( 'sku' );
			}
			$args['join']   = $this->append_product_sorting_table_join( $args['join'] );
			$args['where'] .= ' AND wc_product_meta_lookup.sku IN ("' . implode( '","', array_map( 'esc_sql', $skus ) ) . '")';
		}

		if ( $wp_query->get( 'min_price' ) ) {
			$args['join']   = $this->append_product_sorting_table_join( $args['join'] );
			$args['where'] .= $wpdb->prepare( ' AND wc_product_meta_lookup.min_price >= %f ', floatval( $wp_query->get( 'min_price' ) ) );
		}

		if ( $wp_query->get( 'max_price' ) ) {
			$args['join']   = $this->append_product_sorting_table_join( $args['join'] );
			$args['where'] .= $wpdb->prepare( ' AND wc_product_meta_lookup.max_price <= %f ', floatval( $wp_query->get( 'max_price' ) ) );
		}

		if ( $wp_query->get( 'stock_status' ) ) {
			$args['join']   = $this->append_product_sorting_table_join( $args['join'] );
			$args['where'] .= $wpdb->prepare( ' AND wc_product_meta_lookup.stock_status = %s ', $wp_query->get( 'stock_status' ) );
		}

		if ( $wp_query->get( 'low_in_stock' ) ) {
			$low_stock      = absint( max( get_option( 'woocommerce_notify_low_stock_amount' ), 1 ) );
			$args['join']   = $this->append_product_sorting_table_join( $args['join'] );
			$args['where'] .= $wpdb->prepare( ' AND wc_product_meta_lookup.stock_quantity <= %d', $low_stock );
		}

		return $args;
	}

	/**
	 * Join wc_product_meta_lookup to posts if not already joined.
	 *
	 * @param string $sql SQL join.
	 * @return string
	 */
	protected function append_product_sorting_table_join( $sql ) {
		global $wpdb;

		if ( ! strstr( $sql, 'wc_product_meta_lookup' ) ) {
			$sql .= " LEFT JOIN {$wpdb->wc_product_meta_lookup} wc_product_meta_lookup ON $wpdb->posts.ID = wc_product_meta_lookup.product_id ";
		}
		return $sql;
	}

	/**
	 * Make extra product orderby features supported by WooCommerce available to the WC API.
	 * This includes 'price', 'popularity', and 'rating'.
	 *
	 * @param \WP_REST_Request $request Request data.
	 * @return array
	 */
	protected function prepare_objects_query( $request ) {
		$args                        = array();
		$args['offset']              = $request['offset'];
		$args['order']               = $request['order'];
		$args['orderby']             = $request['orderby'];
		$args['paged']               = $request['page'];
		$args['post__in']            = $request['include'];
		$args['post__not_in']        = $request['exclude'];
		$args['posts_per_page']      = $request['per_page'];
		$args['name']                = $request['slug'];
		$args['post_parent__in']     = $request['parent'];
		$args['post_parent__not_in'] = $request['parent_exclude'];
		$args['s']                   = $request['search'];
		$args['fields']              = 'ids';

		if ( 'date' === $args['orderby'] ) {
			$args['orderby'] = 'date ID';
		}

		$args['date_query'] = array();

		// Set before into date query. Date query must be specified as an array of an array.
		if ( isset( $request['before'] ) ) {
			$args['date_query'][0]['before'] = $request['before'];
		}

		// Set after into date query. Date query must be specified as an array of an array.
		if ( isset( $request['after'] ) ) {
			$args['date_query'][0]['after'] = $request['after'];
		}

		// Set date query colummn. Defaults to post_date.
		if ( isset( $request['date_column'] ) && ! empty( $args['date_query'][0] ) ) {
			$args['date_query'][0]['column'] = 'post_' . $request['date_column'];
		}

		// Force the post_type argument, since it's not a user input variable.
		$args['post_type'] = $this->post_type;

		// Set post_status.
		$args['post_status'] = $request['status'];

		// Set custom args to handle later during clauses.
		$custom_keys = array(
			'sku',
			'min_price',
			'max_price',
			'stock_status',
			'low_in_stock',
		);
		foreach ( $custom_keys as $key ) {
			if ( ! empty( $request[ $key ] ) ) {
				$args[ $key ] = $request[ $key ];
			}
		}

		// Taxonomy query to filter products by type, category,
		// tag, shipping class, and attribute.
		$tax_query = array();

		// Map between taxonomy name and arg's key.
		$taxonomies = array(
			'product_cat'            => 'category',
			'product_tag'            => 'tag',
			'product_shipping_class' => 'shipping_class',
		);

		// Set tax_query for each passed arg.
		foreach ( $taxonomies as $taxonomy => $key ) {
			if ( ! empty( $request[ $key ] ) ) {
				$tax_query[] = array(
					'taxonomy' => $taxonomy,
					'field'    => 'term_id',
					'terms'    => $request[ $key ],
				);
			}
		}

		// Filter product type by slug.
		if ( ! empty( $request['type'] ) ) {
			$tax_query[] = array(
				'taxonomy' => 'product_type',
				'field'    => 'slug',
				'terms'    => $request['type'],
			);
		}

		// Filter by attribute and term.
		if ( ! empty( $request['attribute'] ) && ! empty( $request['attribute_term'] ) ) {
			if ( in_array( $request['attribute'], wc_get_attribute_taxonomy_names(), true ) ) {
				$tax_query[] = array(
					'taxonomy' => $request['attribute'],
					'field'    => 'term_id',
					'terms'    => $request['attribute_term'],
				);
			}
		}

		// Build tax_query if taxonomies are set.
		if ( ! empty( $tax_query ) ) {
			if ( ! empty( $args['tax_query'] ) ) {
				$args['tax_query'] = array_merge( $tax_query, $args['tax_query'] ); // phpcs:ignore
			} else {
				$args['tax_query'] = $tax_query; // phpcs:ignore
			}
		}

		// Filter featured.
		if ( is_bool( $request['featured'] ) ) {
			$args['tax_query'][] = array(
				'taxonomy' => 'product_visibility',
				'field'    => 'name',
				'terms'    => 'featured',
				'operator' => true === $request['featured'] ? 'IN' : 'NOT IN',
			);
		}

		// Filter by tax class.
		if ( ! empty( $request['tax_class'] ) ) {
			$args['meta_query'] = $this->add_meta_query( // phpcs:ignore
				$args,
				array(
					'key'   => '_tax_class',
					'value' => 'standard' !== $request['tax_class'] ? $request['tax_class'] : '',
				)
			);
		}

		// Filter by on sale products.
		if ( is_bool( $request['on_sale'] ) ) {
			$on_sale_key = $request['on_sale'] ? 'post__in' : 'post__not_in';
			$on_sale_ids = wc_get_product_ids_on_sale();

			// Use 0 when there's no on sale products to avoid return all products.
			$on_sale_ids = empty( $on_sale_ids ) ? array( 0 ) : $on_sale_ids;

			$args[ $on_sale_key ] += $on_sale_ids;
		}

		// Force the post_type argument, since it's not a user input variable.
		if ( ! empty( $request['sku'] ) ) {
			$args['post_type'] = array( 'product', 'product_variation' );
		} else {
			$args['post_type'] = 'product';
		}

		$orderby = $request->get_param( 'orderby' );
		$order   = $request->get_param( 'order' );

		$ordering_args   = WC()->query->get_catalog_ordering_args( $orderby, $order );
		$args['orderby'] = $ordering_args['orderby'];
		$args['order']   = $ordering_args['order'];
		if ( $ordering_args['meta_key'] ) {
			$args['meta_key'] = $ordering_args['meta_key']; // phpcs:ignore
		}

		return $this->prepare_items_query( $args, $request );
	}

	/**
	 * Add meta query.
	 *
	 * @param array $args       Query args.
	 * @param array $meta_query Meta query.
	 * @return array
	 */
	protected function add_meta_query( $args, $meta_query ) {
		if ( empty( $args['meta_query'] ) ) {
			$args['meta_query'] = []; // phpcs:ignore
		}

		$args['meta_query'][] = $meta_query;

		return $args['meta_query'];
	}

	/**
	 * Determine the allowed query_vars for a get_items() response and
	 * prepare for \WP_Query.
	 *
	 * @param array            $prepared_args Prepared arguments.
	 * @param \WP_REST_Request $request Request object.
	 * @return array           $query_args
	 */
	protected function prepare_items_query( $prepared_args = array(), $request = null ) {
		$valid_vars = array_flip( $this->get_allowed_query_vars() );
		$query_args = array_intersect_key( $prepared_args, $valid_vars );

		$query_args['ignore_sticky_posts'] = true;

		if ( 'include' === $query_args['orderby'] ) {
			$query_args['orderby'] = 'post__in';
		} elseif ( 'id' === $query_args['orderby'] ) {
			$query_args['orderby'] = 'ID'; // ID must be capitalized.
		} elseif ( 'slug' === $query_args['orderby'] ) {
			$query_args['orderby'] = 'name';
		}

		return $query_args;
	}

	/**
	 * Get all the WP Query vars that are allowed for the API request.
	 *
	 * @return array
	 */
	protected function get_allowed_query_vars() {
		global $wp;

		/**
		 * Filter the publicly allowed query vars.
		 *
		 * Allows adjusting of the default query vars that are made public.
		 *
		 * @param array  Array of allowed \WP_Query query vars.
		 */
		$valid_vars = apply_filters( 'query_vars', $wp->public_query_vars );

		// Define our own in addition to WP's normal vars.
		$rest_valid = array(
			'date_query',
			'ignore_sticky_posts',
			'offset',
			'post__in',
			'post__not_in',
			'post_parent',
			'post_parent__in',
			'post_parent__not_in',
			'posts_per_page',
			'meta_query',
			'tax_query',
			'meta_key',
			'meta_value',
			'meta_compare',
			'meta_value_num',
		);

		return array_merge( $valid_vars, $rest_valid );
	}

	/**
	 * Prepare links for the request.
	 *
	 * @param mixed            $item Object to prepare.
	 * @param \WP_REST_Request $request Request object.
	 * @return array
	 */
	protected function prepare_links( $item, $request ) {
		$links = array(
			'self'       => array(
				'href' => rest_url( sprintf( '/%s/%s/%d', $this->namespace, $this->rest_base, $item->get_id() ) ),  // @codingStandardsIgnoreLine.
			),
			'collection' => array(
				'href' => rest_url( sprintf( '/%s/%s', $this->namespace, $this->rest_base ) ),  // @codingStandardsIgnoreLine.
			),
		);

		if ( $item->get_parent_id() ) {
			$links['up'] = array(
				'href' => rest_url( sprintf( '/%s/products/%d', $this->namespace, $item->get_parent_id() ) ),  // @codingStandardsIgnoreLine.
			);
		}

		return $links;
	}

	/**
	 * Get the query params for collections of attachments.
	 *
	 * @return array
	 */
	public function get_collection_params() {
		$params                       = array();
		$params['context']            = $this->get_context_param();
		$params['context']['default'] = 'view';

		$params['page'] = array(
			'description'       => __( 'Current page of the collection.', 'woo-gutenberg-products-block' ),
			'type'              => 'integer',
			'default'           => 1,
			'sanitize_callback' => 'absint',
			'validate_callback' => 'rest_validate_request_arg',
			'minimum'           => 1,
		);

		$params['per_page'] = array(
			'description'       => __( 'Maximum number of items to be returned in result set.', 'woo-gutenberg-products-block' ),
			'type'              => 'integer',
			'default'           => 10,
			'minimum'           => 1,
			'maximum'           => 100,
			'sanitize_callback' => 'absint',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['search'] = array(
			'description'       => __( 'Limit results to those matching a string.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['after'] = array(
			'description'       => __( 'Limit response to resources created after a given ISO8601 compliant date.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'format'            => 'date-time',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['before'] = array(
			'description'       => __( 'Limit response to resources created before a given ISO8601 compliant date.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'format'            => 'date-time',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['date_column'] = array(
			'description'       => __( 'When limiting response using after/before, which date column to compare against.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'default'           => 'date',
			'enum'              => array(
				'date',
				'date_gmt',
				'modified',
				'modified_gmt',
			),
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['modified_before'] = array(
			'description'       => __( 'Limit response to resources modified before a given ISO8601 compliant date.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'format'            => 'date-time',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['exclude'] = array(
			'description'       => __( 'Ensure result set excludes specific IDs.', 'woo-gutenberg-products-block' ),
			'type'              => 'array',
			'items'             => array(
				'type' => 'integer',
			),
			'default'           => array(),
			'sanitize_callback' => 'wp_parse_id_list',
		);

		$params['include'] = array(
			'description'       => __( 'Limit result set to specific ids.', 'woo-gutenberg-products-block' ),
			'type'              => 'array',
			'items'             => array(
				'type' => 'integer',
			),
			'default'           => array(),
			'sanitize_callback' => 'wp_parse_id_list',
		);

		$params['offset'] = array(
			'description'       => __( 'Offset the result set by a specific number of items.', 'woo-gutenberg-products-block' ),
			'type'              => 'integer',
			'sanitize_callback' => 'absint',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['order'] = array(
			'description'       => __( 'Order sort attribute ascending or descending.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'default'           => 'desc',
			'enum'              => array( 'asc', 'desc' ),
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['orderby'] = array(
			'description'       => __( 'Sort collection by object attribute.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'default'           => 'date',
			'enum'              => array(
				'date',
				'modified',
				'id',
				'include',
				'title',
				'slug',
				'price',
				'popularity',
				'rating',
			),
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['parent'] = array(
			'description'       => __( 'Limit result set to those of particular parent IDs.', 'woo-gutenberg-products-block' ),
			'type'              => 'array',
			'items'             => array(
				'type' => 'integer',
			),
			'sanitize_callback' => 'wp_parse_id_list',
			'default'           => array(),
		);

		$params['parent_exclude'] = array(
			'description'       => __( 'Limit result set to all items except those of a particular parent ID.', 'woo-gutenberg-products-block' ),
			'type'              => 'array',
			'items'             => array(
				'type' => 'integer',
			),
			'sanitize_callback' => 'wp_parse_id_list',
			'default'           => array(),
		);

		$params['slug'] = array(
			'description'       => __( 'Limit result set to products with a specific slug.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['status'] = array(
			'default'           => 'any',
			'description'       => __( 'Limit result set to products assigned a specific status.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'enum'              => array_merge( array( 'any', 'future' ), array_keys( get_post_statuses() ) ),
			'sanitize_callback' => 'sanitize_key',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['type'] = array(
			'description'       => __( 'Limit result set to products assigned a specific type.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'enum'              => array_keys( wc_get_product_types() ),
			'sanitize_callback' => 'sanitize_key',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['sku'] = array(
			'description'       => __( 'Limit result set to products with specific SKU(s). Use commas to separate.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['featured'] = array(
			'description'       => __( 'Limit result set to featured products.', 'woo-gutenberg-products-block' ),
			'type'              => 'boolean',
			'sanitize_callback' => 'wc_string_to_bool',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['category'] = array(
			'description'       => __( 'Limit result set to products assigned a specific category ID.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'sanitize_callback' => 'wp_parse_id_list',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['tag'] = array(
			'description'       => __( 'Limit result set to products assigned a specific tag ID.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'sanitize_callback' => 'wp_parse_id_list',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['shipping_class'] = array(
			'description'       => __( 'Limit result set to products assigned a specific shipping class ID.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'sanitize_callback' => 'wp_parse_id_list',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['attribute'] = array(
			'description'       => __( 'Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['attribute_term'] = array(
			'description'       => __( 'Limit result set to products with a specific attribute term ID (required an assigned attribute).', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'sanitize_callback' => 'wp_parse_id_list',
			'validate_callback' => 'rest_validate_request_arg',
		);

		if ( wc_tax_enabled() ) {
			$params['tax_class'] = array(
				'description'       => __( 'Limit result set to products with a specific tax class.', 'woo-gutenberg-products-block' ),
				'type'              => 'string',
				'enum'              => array_merge( array( 'standard' ), \WC_Tax::get_tax_class_slugs() ),
				'sanitize_callback' => 'sanitize_text_field',
				'validate_callback' => 'rest_validate_request_arg',
			);
		}

		$params['on_sale'] = array(
			'description'       => __( 'Limit result set to products on sale.', 'woo-gutenberg-products-block' ),
			'type'              => 'boolean',
			'sanitize_callback' => 'wc_string_to_bool',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['min_price'] = array(
			'description'       => __( 'Limit result set to products based on a minimum price.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['max_price'] = array(
			'description'       => __( 'Limit result set to products based on a maximum price.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['stock_status'] = array(
			'description'       => __( 'Limit result set to products with specified stock status.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'enum'              => array_keys( wc_get_product_stock_status_options() ),
			'sanitize_callback' => 'sanitize_text_field',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['low_in_stock'] = array(
			'description'       => __( 'Limit result set to products that are low or out of stock.', 'woo-gutenberg-products-block' ),
			'type'              => 'boolean',
			'default'           => false,
			'sanitize_callback' => 'wc_string_to_bool',
		);

		$params['search'] = array(
			'description'       => __( 'Search by similar product name or sku.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['return_price_range'] = array(
			'description' => __( 'If true, sets headers containing the minimum and maximum product prices for the collection.', 'woo-gutenberg-products-block' ),
			'type'        => 'boolean',
			'default'     => false,
		);

		return $params;
	}
}
