<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Routes;

use Automattic\WooCommerce\Blocks\StoreApi\Utilities\Pagination;
use Automattic\WooCommerce\Blocks\StoreApi\Utilities\ProductQuery;

/**
 * Products class.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class Products extends AbstractRoute {
	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/products';
	}

	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			[
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_response' ],
				'permission_callback' => '__return_true',
				'args'                => $this->get_collection_params(),
			],
			'schema' => [ $this->schema, 'get_public_item_schema' ],
		];
	}

	/**
	 * Get a collection of posts and add the post title filter option to \WP_Query.
	 *
	 * @throws RouteException On error.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	protected function get_route_response( \WP_REST_Request $request ) {
		$response      = new \WP_REST_Response();
		$product_query = new ProductQuery();

		// Only get objects during GET requests.
		if ( \WP_REST_Server::READABLE === $request->get_method() ) {
			$query_results    = $product_query->get_objects( $request );
			$response_objects = [];

			foreach ( $query_results['objects'] as $object ) {
				$data               = rest_ensure_response( $this->schema->get_item_response( $object ) );
				$response_objects[] = $this->prepare_response_for_collection( $data );
			}

			$response->set_data( $response_objects );
		} else {
			$query_results = $product_query->get_results( $request );
		}

		$response = ( new Pagination() )->add_headers( $response, $request, $query_results['total'], $query_results['pages'] );
		$response->header( 'Last-Modified', $product_query->get_last_modified() );

		return $response;
	}

	/**
	 * Prepare links for the request.
	 *
	 * @param \WC_Product      $item Product object.
	 * @param \WP_REST_Request $request Request object.
	 * @return array
	 */
	protected function prepare_links( $item, $request ) {
		$links = array(
			'self'       => array(
				'href' => rest_url( $this->get_namespace() . $this->get_path() . '/' . $item->get_id() ),
			),
			'collection' => array(
				'href' => rest_url( $this->get_namespace() . $this->get_path() ),
			),
		);

		if ( $item->get_parent_id() ) {
			$links['up'] = array(
				'href' => rest_url( $this->get_namespace() . $this->get_path() . '/' . $item->get_parent_id() ),
			);
		}

		return $links;
	}

	/**
	 * Get the query params for collections of products.
	 *
	 * @return array
	 */
	public function get_collection_params() {
		$params                       = [];
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
			'description'       => __( 'Maximum number of items to be returned in result set. Defaults to no limit if left blank.', 'woo-gutenberg-products-block' ),
			'type'              => 'integer',
			'default'           => 10,
			'minimum'           => 0,
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

		$params['exclude'] = array(
			'description'       => __( 'Ensure result set excludes specific IDs.', 'woo-gutenberg-products-block' ),
			'type'              => 'array',
			'items'             => array(
				'type' => 'integer',
			),
			'default'           => [],
			'sanitize_callback' => 'wp_parse_id_list',
		);

		$params['include'] = array(
			'description'       => __( 'Limit result set to specific ids.', 'woo-gutenberg-products-block' ),
			'type'              => 'array',
			'items'             => array(
				'type' => 'integer',
			),
			'default'           => [],
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
				'menu_order',
				'comment_count',
			),
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['parent'] = array(
			'description'       => __( 'Limit result set to those of particular parent IDs.', 'woo-gutenberg-products-block' ),
			'type'              => 'array',
			'items'             => array(
				'type' => 'integer',
			),
			'default'           => [],
			'sanitize_callback' => 'wp_parse_id_list',
		);

		$params['parent_exclude'] = array(
			'description'       => __( 'Limit result set to all items except those of a particular parent ID.', 'woo-gutenberg-products-block' ),
			'type'              => 'array',
			'items'             => array(
				'type' => 'integer',
			),
			'sanitize_callback' => 'wp_parse_id_list',
			'default'           => [],
		);

		$params['type'] = array(
			'description'       => __( 'Limit result set to products assigned a specific type.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'enum'              => array_merge( array_keys( wc_get_product_types() ), [ 'variation' ] ),
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

		$params['category_operator'] = array(
			'description'       => __( 'Operator to compare product category terms.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'enum'              => [ 'in', 'not in', 'and' ],
			'default'           => 'in',
			'sanitize_callback' => 'sanitize_key',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['tag'] = array(
			'description'       => __( 'Limit result set to products assigned a specific tag ID.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'sanitize_callback' => 'wp_parse_id_list',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['tag_operator'] = array(
			'description'       => __( 'Operator to compare product tags.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'enum'              => [ 'in', 'not in', 'and' ],
			'default'           => 'in',
			'sanitize_callback' => 'sanitize_key',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['on_sale'] = array(
			'description'       => __( 'Limit result set to products on sale.', 'woo-gutenberg-products-block' ),
			'type'              => 'boolean',
			'sanitize_callback' => 'wc_string_to_bool',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['min_price'] = array(
			'description'       => __( 'Limit result set to products based on a minimum price, provided using the smallest unit of the currency.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['max_price'] = array(
			'description'       => __( 'Limit result set to products based on a maximum price, provided using the smallest unit of the currency.', 'woo-gutenberg-products-block' ),
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

		$params['attributes'] = array(
			'description' => __( 'Limit result set to products with selected global attributes.', 'woo-gutenberg-products-block' ),
			'type'        => 'array',
			'items'       => array(
				'type'       => 'object',
				'properties' => array(
					'attribute' => array(
						'description'       => __( 'Attribute taxonomy name.', 'woo-gutenberg-products-block' ),
						'type'              => 'string',
						'sanitize_callback' => 'wc_sanitize_taxonomy_name',
					),
					'term_id'   => array(
						'description'       => __( 'List of attribute term IDs.', 'woo-gutenberg-products-block' ),
						'type'              => 'array',
						'items'             => [
							'type' => 'integer',
						],
						'sanitize_callback' => 'wp_parse_id_list',
					),
					'slug'      => array(
						'description'       => __( 'List of attribute slug(s). If a term ID is provided, this will be ignored.', 'woo-gutenberg-products-block' ),
						'type'              => 'array',
						'items'             => [
							'type' => 'string',
						],
						'sanitize_callback' => 'wp_parse_slug_list',
					),
					'operator'  => array(
						'description' => __( 'Operator to compare product attribute terms.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'enum'        => [ 'in', 'not in', 'and' ],
					),
				),
			),
			'default'     => [],
		);

		$params['attribute_relation'] = array(
			'description'       => __( 'The logical relationship between attributes when filtering across multiple at once.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'enum'              => [ 'in', 'and' ],
			'default'           => 'and',
			'sanitize_callback' => 'sanitize_key',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['catalog_visibility'] = array(
			'description'       => __( 'Determines if hidden or visible catalog products are shown.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'enum'              => array( 'any', 'visible', 'catalog', 'search', 'hidden' ),
			'sanitize_callback' => 'sanitize_key',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$params['rating'] = array(
			'description'       => __( 'Limit result set to products with a certain average rating.', 'woo-gutenberg-products-block' ),
			'type'              => 'array',
			'items'             => array(
				'type' => 'integer',
				'enum' => range( 1, 5 ),
			),
			'default'           => [],
			'sanitize_callback' => 'wp_parse_id_list',
		);

		return $params;
	}
}
