<?php
namespace Automattic\WooCommerce\StoreApi\Utilities;

use Automattic\WooCommerce\StoreApi\Utilities\ProductQuery;

/**
 * Product Query filters class.
 */
class ProductQueryFilters {
	/**
	 * Get filtered min price for current products.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return object
	 */
	public function get_filtered_price( $request ) {
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
	 * Get stock status counts for the current products.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return array status=>count pairs.
	 */
	public function get_stock_status_counts( $request ) {
		global $wpdb;
		$product_query         = new ProductQuery();
		$stock_status_options  = array_map( 'esc_sql', array_keys( wc_get_product_stock_status_options() ) );
		$hide_outofstock_items = get_option( 'woocommerce_hide_out_of_stock_items' );
		if ( 'yes' === $hide_outofstock_items ) {
			unset( $stock_status_options['outofstock'] );
		}

		add_filter( 'posts_clauses', array( $product_query, 'add_query_clauses' ), 10, 2 );
		add_filter( 'posts_pre_query', '__return_empty_array' );

		$query_args = $product_query->prepare_objects_query( $request );
		unset( $query_args['stock_status'] );
		$query_args['no_found_rows']  = true;
		$query_args['posts_per_page'] = -1;
		$query                        = new \WP_Query();
		$result                       = $query->query( $query_args );
		$product_query_sql            = $query->request;

		remove_filter( 'posts_clauses', array( $product_query, 'add_query_clauses' ), 10 );
		remove_filter( 'posts_pre_query', '__return_empty_array' );

		$stock_status_counts = array();

		foreach ( $stock_status_options as $status ) {
			$stock_status_count_sql = $this->generate_stock_status_count_query( $status, $product_query_sql, $stock_status_options );

			$result = $wpdb->get_row( $stock_status_count_sql ); // phpcs:ignore
			$stock_status_counts[ $status ] = $result->status_count;
		}

		return $stock_status_counts;
	}

	/**
	 * Generate calculate query by stock status.
	 *
	 * @param string $status status to calculate.
	 * @param string $product_query_sql product query for current filter state.
	 * @param array  $stock_status_options available stock status options.
	 *
	 * @return false|string
	 */
	private function generate_stock_status_count_query( $status, $product_query_sql, $stock_status_options ) {
		if ( ! in_array( $status, $stock_status_options, true ) ) {
			return false;
		}
		global $wpdb;
		$status = esc_sql( $status );
		return "
			SELECT COUNT( DISTINCT posts.ID ) as status_count
			FROM {$wpdb->posts} as posts
			INNER JOIN {$wpdb->postmeta} as postmeta ON posts.ID = postmeta.post_id
            AND postmeta.meta_key = '_stock_status'
            AND postmeta.meta_value = '{$status}'
			WHERE posts.ID IN ( {$product_query_sql} )
		";
	}

	/**
	 * Get terms list for a given taxonomy.
	 *
	 * @param  string  $taxonomy  Taxonomy name.
	 *
	 * @return array
	 */
	public function get_terms_list( string $taxonomy ) {
		global $wpdb;

		$terms_list = "SELECT DISTINCT term_id as term_count_id, 0 as term_count
         FROM {$wpdb->prefix}wc_product_attributes_lookup
         WHERE taxonomy = '{$taxonomy}'";

		return $wpdb->get_results( $wpdb->prepare( $terms_list ) );
	}

	/**
	 * Get attribute and meta counts.
	 *
	 * @param WP_REST_Request $request Request data.
	 * @param array           $attributes Attributes to count.
	 * @return array
	 */
	public function get_attribute_and_meta_counts( $request, $attributes = [] ) {
		global $wpdb;

		$attributes = array_map( 'esc_sql', $attributes );
		$taxonomy   = $attributes[0];

		$query_type = 'or';
		foreach ( $request['calculate_attribute_counts'] as $attributes_to_count ) {
			if ( ! empty( $attributes_to_count['query_type'] ) ) {
				$query_type = $attributes_to_count['query_type'];
			}
		}

		if ( ! isset( $_REQUEST['attributes'] ) ) {
			$counts = $this->get_terms_list( $taxonomy );

			return array_map( 'absint', wp_list_pluck( $counts, 'term_count', 'term_count_id' ) );
		}

		$term_ids = [];
		foreach ( $_REQUEST['attributes'] as $attribute ) {
			if ( empty( $attribute['term_id'] ) && empty( $attribute['slug'] ) ) {
				continue;
			}

			if ( in_array( $attribute['attribute'], wc_get_attribute_taxonomy_names(), true ) ) {
				if ( ! empty( $attribute['term_id'] ) ) {
					$term_ids[] = $attribute['term_id'];
				} elseif ( ! empty( $attribute['slug'] ) ) {
					foreach ( $attribute['slug'] as $slug ) {
						$term = get_term_by( 'slug', $slug, $attribute['attribute'] );
						if ( is_object( $term ) ) {
							$term_ids[] = $term->term_id;
						}
					}
				}
			}
		}

		if ( empty( $term_ids ) ) {
			$counts = $this->get_terms_list( $taxonomy );

			return array_map( 'absint', wp_list_pluck( $counts, 'term_count', 'term_count_id' ) );
		}

		$term_ids_count = count( $term_ids );
		$term_ids       = implode( ',', array_map( 'intval', $term_ids ) );

		if ( 'and' === $query_type ) {
			$condition_query = "SELECT product_or_parent_id
        FROM wp_wc_product_attributes_lookup
        WHERE taxonomy = '{$taxonomy}'
          AND term_id IN ({$term_ids})
        GROUP BY product_or_parent_id
        HAVING count(DISTINCT term_id) >= {$term_ids_count}";
		} else {
			$condition_query = "SELECT product_or_parent_id
        FROM wp_wc_product_attributes_lookup
        WHERE taxonomy = '{$taxonomy}'
          AND term_id IN ({$term_ids})";
		}

		$products = $wpdb->get_col( $condition_query );
		$products = implode( ',', array_map( 'intval', $products ) );

		$query = "SELECT attributes.term_id as term_count_id, coalesce(term_count, 0) as term_count
FROM (
         SELECT DISTINCT term_id
         FROM wp_wc_product_attributes_lookup
         WHERE taxonomy = '{$taxonomy}') as attributes
         LEFT JOIN (
    SELECT COUNT(product_attribute_lookup.product_id) as term_count, product_attribute_lookup.term_id
    FROM wp_wc_product_attributes_lookup product_attribute_lookup
             INNER JOIN wp_posts posts
                        ON posts.ID = product_attribute_lookup.product_id
    WHERE posts.post_type IN ('product', 'product_variation')
      AND posts.post_status = 'publish'
      AND product_attribute_lookup.product_or_parent_id IN ({$products})
      AND product_attribute_lookup.product_id IN (
        SELECT product_meta_lookup.product_id
        FROM wp_wc_product_meta_lookup product_meta_lookup
        WHERE product_meta_lookup.max_price <= 200.000000)
    GROUP BY product_attribute_lookup.term_id
) summarize ON attributes.term_id = summarize.term_id";

		$counts = $wpdb->get_results( $query );

		return array_map( 'absint', wp_list_pluck( $counts, 'term_count', 'term_count_id' ) );
	}

	/**
	 * Get rating counts for the current products.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return array rating=>count pairs.
	 */
	public function get_rating_counts( $request ) {
		global $wpdb;

		// Regenerate the products query without rating request params.
		unset( $request['rating'] );

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

		$rating_count_sql = "
			SELECT COUNT( DISTINCT product_id ) as product_count, ROUND( average_rating, 0 ) as rounded_average_rating
			FROM {$wpdb->wc_product_meta_lookup}
			WHERE product_id IN ( {$product_query_sql} )
			AND average_rating > 0
			GROUP BY rounded_average_rating
			ORDER BY rounded_average_rating ASC
		";

		$results = $wpdb->get_results( $rating_count_sql ); // phpcs:ignore

		return array_map( 'absint', wp_list_pluck( $results, 'product_count', 'rounded_average_rating' ) );
	}
}
