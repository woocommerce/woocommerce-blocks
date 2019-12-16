<?php
/**
 * Products collection data controller. Get aggregate data from a collection of products.
 *
 * Supports the same parameters as /products, but returns a different response.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Controllers;

defined( 'ABSPATH' ) || exit;

use \WP_REST_Controller as RestController;
use \WP_REST_Server as RestServer;
use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Utilities\ProductQueryFilters;

/**
 * ProductCollectionData API.
 *
 * @since 2.5.0
 */
class ProductCollectionData extends RestController {
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
	protected $rest_base = 'products/collection-data';

	/**
	 * Register the routes for products.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'  => RestServer::READABLE,
					'callback' => [ $this, 'get_items' ],
					'args'     => $this->get_collection_params(),
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
	}

	/**
	 * Return the schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		return [
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => 'product_collection_data',
			'type'       => 'object',
			'properties' => [
				'price_range'      => [
					'description' => __( 'Min and max prices found in collection of products, provided using the smallest unit of the currency.', 'woo-gutenberg-products-block' ),
					'type'        => 'object',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
					'properties'  => [
						'currency_minor_unit' => [
							'description' => __( 'Currency minor unit (number of digits after the decimal separator) for returned prices.', 'woo-gutenberg-products-block' ),
							'type'        => 'integer',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'min_price'           => [
							'description' => __( 'Min price found in collection of products.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'max_price'           => [
							'description' => __( 'Max price found in collection of products.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
					],
				],
				'attribute_counts' => [
					'description' => __( 'Returns number of products within attribute terms.', 'woo-gutenberg-products-block' ),
					'type'        => 'array',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
					'items'       => [
						'type'       => 'object',
						'properties' => [
							'term'  => [
								'description' => __( 'Term ID', 'woo-gutenberg-products-block' ),
								'type'        => 'integer',
								'context'     => [ 'view', 'edit' ],
								'readonly'    => true,
							],
							'count' => [
								'description' => __( 'Number of products.', 'woo-gutenberg-products-block' ),
								'type'        => 'integer',
								'context'     => [ 'view', 'edit' ],
								'readonly'    => true,
							],
						],
					],
				],
				'rating_counts'    => [
					'description' => __( 'Returns number of products with each average rating.', 'woo-gutenberg-products-block' ),
					'type'        => 'array',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
					'items'       => [
						'type'       => 'object',
						'properties' => [
							'rating' => [
								'description' => __( 'Average rating', 'woo-gutenberg-products-block' ),
								'type'        => 'integer',
								'context'     => [ 'view', 'edit' ],
								'readonly'    => true,
							],
							'count'  => [
								'description' => __( 'Number of products.', 'woo-gutenberg-products-block' ),
								'type'        => 'integer',
								'context'     => [ 'view', 'edit' ],
								'readonly'    => true,
							],
						],
					],
				],
			],
		];
	}

	/**
	 * Get a collection of posts and add the post title filter option to \WP_Query.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return RestError|\WP_REST_Response
	 */
	public function get_items( $request ) {
		$return  = [
			'price_range'      => null,
			'attribute_counts' => null,
			'rating_counts'    => null,
		];
		$filters = new ProductQueryFilters();

		if ( ! empty( $request['calculate_price_range'] ) ) {
			$filter_request = clone $request;
			$filter_request->set_param( 'min_price', null );
			$filter_request->set_param( 'max_price', null );

			$price_results         = $filters->get_filtered_price( $filter_request );
			$decimals              = wc_get_price_decimals();
			$return['price_range'] = [
				'currency_minor_unit' => $decimals,
				'min_price'           => (string) round( $price_results->min_price * ( 10 ** $decimals ), 0 ),
				'max_price'           => (string) round( $price_results->max_price * ( 10 ** $decimals ), 0 ),
			];
		}

		if ( ! empty( $request['calculate_attribute_counts'] ) ) {
			$taxonomy__or_queries  = [];
			$taxonomy__and_queries = [];

			foreach ( $request['calculate_attribute_counts'] as $attributes_to_count ) {
				if ( 'or' === $attributes_to_count['query_type'] ) {
					$taxonomy__or_queries[] = $attributes_to_count['taxonomy'];
				} else {
					$taxonomy__and_queries[] = $attributes_to_count['taxonomy'];
				}
			}

			$return['attribute_counts'] = [];

			// Or type queries need special handling because the attribute, if set, needs removing from the query first otherwise counts would not be correct.
			if ( $taxonomy__or_queries ) {
				foreach ( $taxonomy__or_queries as $taxonomy ) {
					$filter_request    = clone $request;
					$filter_attributes = $filter_request->get_param( 'attributes' );

					if ( ! empty( $filter_attributes ) ) {
						$filter_attributes = array_filter(
							$filter_attributes,
							function( $query ) {
								return $query['attribute'] !== $taxonomy;
							}
						);
					}

					$filter_request->set_param( 'attributes', $filter_attributes );
					$counts = $filters->get_attribute_counts( $filter_request, [ $taxonomy ] );

					foreach ( $counts as $key => $value ) {
						$return['attribute_counts'][] = [
							'term'  => $key,
							'count' => $value,
						];
					}
				}
			}

			if ( $taxonomy__and_queries ) {
				$counts = $filters->get_attribute_counts( $request, $taxonomy__and_queries );

				foreach ( $counts as $key => $value ) {
					$return['attribute_counts'][] = [
						'term'  => $key,
						'count' => $value,
					];
				}
			}
		}

		if ( ! empty( $request['calculate_rating_counts'] ) ) {
			$filter_request          = clone $request;
			$counts                  = $filters->get_rating_counts( $filter_request );
			$return['rating_counts'] = [];

			foreach ( $counts as $key => $value ) {
				$return['rating_counts'][] = [
					'rating' => $key,
					'count'  => $value,
				];
			}
		}

		return rest_ensure_response( $return );
	}

	/**
	 * Get the query params for collections of products.
	 *
	 * @return array
	 */
	public function get_collection_params() {
		$params = ( new Products() )->get_collection_params();

		$params['calculate_price_range'] = [
			'description' => __( 'If true, calculates the minimum and maximum product prices for the collection.', 'woo-gutenberg-products-block' ),
			'type'        => 'boolean',
			'default'     => false,
		];

		$params['calculate_attribute_counts'] = [
			'description' => __( 'If requested, calculates attribute term counts for products in the collection.', 'woo-gutenberg-products-block' ),
			'type'        => 'array',
			'items'       => [
				'type'       => 'object',
				'properties' => [
					'taxonomy'   => [
						'description' => __( 'Taxonomy name.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
						'readonly'    => true,
					],
					'query_type' => [
						'description' => __( 'Query type being performed which may affect counts. Valid values include "and" and "or".', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'enum'        => [ 'and', 'or' ],
						'context'     => [ 'view', 'edit' ],
						'readonly'    => true,
					],
				],
			],
			'default'     => [],
		];

		$params['calculate_rating_counts'] = [
			'description' => __( 'If true, calculates rating counts for products in the collection.', 'woo-gutenberg-products-block' ),
			'type'        => 'boolean',
			'default'     => false,
		];

		return $params;
	}
}
