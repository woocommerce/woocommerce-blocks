<?php
/**
 * Wrapper for WP Query with additonal helper methods.
 *
 * Allows query args to be set and parsed without doing running it, so that a cache can be used.
 *
 * @package Automattic/WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\Utils;

use \WP_Query;

defined( 'ABSPATH' ) || exit;

/**
 * BlocksWpQuery query.
 *
 * @deprecated $VID:$
 */
class BlocksWpQuery extends WP_Query {
	/**
	 * Constructor.
	 *
	 * Sets up the WordPress query, if parameter is not empty.
	 *
	 * Unlike the constructor in WP_Query, this does not RUN the query.
	 *
	 * @param string|array $query URL query string or array of vars.
	 */
	public function __construct( $query = '' ) {
		if ( ! empty( $query ) ) {
			$this->init();
			$this->query      = wp_parse_args( $query );
			$this->query_vars = $this->query;
			$this->parse_query_vars();
		}
	}

	/**
	 * Cache cached posts, if a cache exists.
	 *
	 * @param string $transient_version Transient version to allow for invalidation.
	 * @return WP_Post[]|int[] Array of post objects or post IDs.
	 */
	public function get_cached_posts( $transient_version = '' ) {
		$transient_name  = 'wc_blocks_query_' . $this->query_vars_hash;
		$transient_value = get_transient( $transient_name );

		if ( isset( $transient_value, $transient_value['version'], $transient_value['value'] ) && $transient_value['version'] === $transient_version ) {
			return $transient_value['value'];
		}

		$results = $this->get_posts();

		set_transient(
			$transient_name,
			array(
				'version' => $transient_version,
				'value'   => $results,
			),
			DAY_IN_SECONDS * 30
		);

		return $results;
	}
}
