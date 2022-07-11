<?php
namespace Automattic\WooCommerce\StoreApi\Utilities;

use WC_Rate_Limiter;
use WC_Cache_Helper;

/**
 * RateLimits class.
 */
class RateLimits extends WC_Rate_Limiter {


	/**
	 * Amount of max requests allowed for the defined timeframe.
	 *
	 * @var int
	 */
	const LIMIT = 25;

	/**
	 * Time in seconds before rate limits are reset.
	 *
	 * @var int
	 */
	const SECONDS = 10;

	/**
	 * Gets a cache prefix.
	 *
	 * @param string $action_id Identifier of the action.
	 * @return string
	 */
	protected static function get_cache_key( $action_id ) {
		return WC_Cache_Helper::get_cache_prefix( 'store_api_rate_limit' . $action_id );
	}

	/**
	 * Get current rate limit row from DB and normalize types. This query is not cached.
	 *
	 * @param string $action_id Identifier of the action.
	 * @return object|null Object containing reset and remaining.
	 */
	protected static function get_rate_limit_row( $action_id ) {
		global $wpdb;

		$row = $wpdb->get_row(
			$wpdb->prepare(
				"
					SELECT rate_limit_expiry as reset, rate_limit_remaining as remaining
					FROM {$wpdb->prefix}wc_rate_limits
					WHERE rate_limit_key = %s
					AND rate_limit_expiry > %s
				",
				$action_id,
				time()
			),
			'OBJECT'
		);

		return $row ? (object) [
			'reset'     => (int) $row->reset,
			'remaining' => (int) $row->remaining,
		] : null;
	}

	/**
	 * Returns current rate limit values using cache where possible.
	 *
	 * @param string $action_id Identifier of the action.
	 * @return object|null
	 */
	public static function get_rate_limit( $action_id ) {
		$current_limit = self::get_cached( $action_id );

		if ( false === $current_limit ) {
			$current_limit = self::get_rate_limit_row( $action_id );
			self::set_cache( $action_id, $current_limit );
		}

		return $current_limit;
	}

	/**
	 * If exceeded, seconds until reset.
	 *
	 * @param string $action_id Identifier of the action.
	 * @return bool|int
	 */
	public static function is_exceeded_retry_after( $action_id ) {
		$current_limit = self::get_rate_limit( $action_id );

		// No record of action running, so action is allowed to run.
		if ( null === $current_limit ) {
			return false;
		}

		// Before the next run is allowed, retry forbidden.
		if ( time() <= $current_limit->reset && $current_limit->remaining <= 0 ) {
			return (int) $current_limit->reset - time();
		}

		// After the next run is allowed, retry allowed.
		return false;
	}

	/**
	 * Sets the rate limit delay in seconds for action with identifier $id.
	 *
	 * @param string $action_id Identifier of the action.
	 * @return object Current rate limits.
	 */
	public static function update_rate_limit( $action_id ) {
		global $wpdb;

		$rate_limit_expiry = time() + self::SECONDS;

		$wpdb->query(
			$wpdb->prepare(
				"INSERT INTO {$wpdb->prefix}wc_rate_limits
					(`rate_limit_key`, `rate_limit_expiry`, `rate_limit_remaining`)
				VALUES
					(%s, %d, %d)
				ON DUPLICATE KEY UPDATE
					`rate_limit_remaining` = IF(`rate_limit_expiry` < %d, VALUES(`rate_limit_remaining`), GREATEST(`rate_limit_remaining` - 1, 0)),
					`rate_limit_expiry` = IF(`rate_limit_expiry` < %d, VALUES(`rate_limit_expiry`), `rate_limit_expiry`);
				",
				$action_id,
				$rate_limit_expiry,
				self::LIMIT - 1,
				time(),
				time()
			)
		);

		$current_limit = self::get_rate_limit_row( $action_id );

		self::set_cache( $action_id, $current_limit );

		return $current_limit;
	}
}
