<?php
/**
 * Product Filtering helper.
 *
 * @package Automattic/WooCommerce/RestApi
 */

namespace Automattic\WooCommerce\Blocks\RestApi\Utilities;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\RestApi\Utilities\ProductQuery;

/**
 * Product Filtering class.
 */
class ProductFiltering {

	/**
	 * Add product filtering headers to a response object.
	 *
	 * @param \WP_REST_Response $response Reference to the response object.
	 * @param \WP_REST_Request  $request The request object.
	 * @return \WP_REST_Response
	 */
	public function add_headers( $response, $request ) {
		if ( ! empty( $request['return_price_range'] ) ) {
			$price_results = $this->get_filtered_price( $request );
			$response->header( 'Product-Min-Price', $price_results->min_price );
			$response->header( 'Product-Max-Price', $price_results->max_price );
		}

		if ( ! empty( $request['return_attribute_counts'] ) ) {
			$attribute_counts = $this->get_attribute_counts( $request );
			$response->header( 'Product-Attribute-Counts', wp_json_encode( $attribute_counts ) );
		}

		return $response;
	}

	/**
	 * Get filtered min price for current products.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return array
	 */
	protected function get_filtered_price( $request ) {
		global $wpdb;

		// Regenerate the products query without min/max price request params.
		unset( $request['min_price'], $request['max_price'] );

		// Grab the request from the WP Query object, and remove SQL_CALC_FOUND_ROWS and Limits so we get a list of all products.
		$product_query = new ProductQuery();

		add_filter( 'posts_clauses', array( $product_query, 'add_query_clauses' ), 10, 2 );
		add_filter( 'posts_pre_query', '__return_empty_array' );

		$query_args                   = $product_query->prepare_objects_query( $request );
		$query_args['no_found_rows']  = true;
		$query_args['posts_per_page'] = -1;
		$query                        = new \WP_Query();
		$result                       = $query->query( $query_args );
		$product_query_sql            = $query->request;

		remove_filter( 'posts_clauses', array( $product_query, 'add_query_clauses' ), 10 );
		remove_filter( 'posts_pre_query', '__return_empty_array' );

		$price_filter_sql = "
			SELECT min( min_price ) as min_price, MAX( max_price ) as max_price
			FROM {$wpdb->wc_product_meta_lookup}
			WHERE product_id IN ( {$product_query_sql} )
		";

		return $wpdb->get_row( $price_filter_sql ); // phpcs:ignore
	}

	/**
	 * Get filtered min price for current products.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return array
	 */
	protected function get_attribute_counts( $request ) {
		global $wpdb;

		// Grab the request from the WP Query object, and remove SQL_CALC_FOUND_ROWS and Limits so we get a list of all products.
		$product_query = new ProductQuery();

		add_filter( 'posts_clauses', array( $product_query, 'add_query_clauses' ), 10, 2 );
		add_filter( 'posts_pre_query', '__return_empty_array' );

		$query_args                   = $product_query->prepare_objects_query( $request );
		$query_args['no_found_rows']  = true;
		$query_args['posts_per_page'] = -1;
		$query                        = new \WP_Query();
		$result                       = $query->query( $query_args );
		$product_query_sql            = $query->request;

		remove_filter( 'posts_clauses', array( $product_query, 'add_query_clauses' ), 10 );
		remove_filter( 'posts_pre_query', '__return_empty_array' );

		$attributes_to_count     = array_map( 'wc_sanitize_taxonomy_name', explode( ',', $request['return_attribute_counts'] ) );
		$attributes_to_count_sql = 'AND term_taxonomy.taxonomy IN ("' . implode( '","', $attributes_to_count ) . '")';
		$attribute_count_sql     = "
			SELECT COUNT( DISTINCT posts.ID ) as term_count, terms.term_id as term_count_id
			FROM {$wpdb->posts} AS posts
			INNER JOIN {$wpdb->term_relationships} AS term_relationships ON posts.ID = term_relationships.object_id
			INNER JOIN {$wpdb->term_taxonomy} AS term_taxonomy USING( term_taxonomy_id )
			INNER JOIN {$wpdb->terms} AS terms USING( term_id )
			WHERE posts.ID IN ( {$product_query_sql} )
			{$attributes_to_count_sql}
			GROUP BY terms.term_id
		";

		$results = $wpdb->get_results( $attribute_count_sql ); // phpcs:ignore
		$return  = [];

		foreach ( $results as $result ) {
			$return[ 'term-' . $result->term_count_id ] = absint( $result->term_count );
		}

		return $return;
	}
}
