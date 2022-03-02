<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Utilities;

use Automattic\WooCommerce\Blocks\StoreApi\Exceptions\RouteException;

/**
 * NoticeHandler class.
 * Helper class to convert notices to exceptions.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class NoticeHandler {

	/**
	 * Collects queued error notices into a \WP_Error.
	 *
	 * For example, Payment methods may add error notices during validate_fields call to prevent checkout.
	 * Since we're not rendering notices at all, we need to catch them and group them in a single WP_Error instance.
	 *
	 * This method will discards notices once complete.
	 *
	 * @param string $error_code Error code for the thrown exceptions.
	 *
	 * @return \WP_Error The WP_Error object containing all error notices.
	 */
	public static function convert_notices_to_wp_errors( $error_code = 'unknown_server_error' ) {
		$errors = new WP_Error();

		if ( 0 === wc_notice_count( 'error' ) ) {
			return $errors;
		}

		$error_notices = wc_get_notices( 'error' );

		// Prevent notices from being output later on.
		wc_clear_notices();

		foreach ( $error_notices as $error_notice ) {
			$errors->add( $error_code, wp_strip_all_tags( $error_notice['notice'] ) );
		}

		return $errors;
	}

	/**
	 * Convert queued error notices into an exception.
	 *
	 * For example, Payment methods may add error notices during validate_fields call to prevent checkout.
	 * Since we're not rendering notices at all, we need to convert them to exceptions.
	 *
	 * This method will find the first error message and thrown an exception instead. Discards notices once complete.
	 *
	 * @throws RouteException If an error notice is detected, Exception is thrown.
	 *
	 * @param string $error_code Error code for the thrown exceptions.
	 */
	public static function convert_notices_to_exceptions( $error_code = 'unknown_server_error' ) {
		if ( 0 === wc_notice_count( 'error' ) ) {
			return;
		}

		$error_notices = wc_get_notices( 'error' );

		// Prevent notices from being output later on.
		wc_clear_notices();

		foreach ( $error_notices as $error_notice ) {
			throw new RouteException( $error_code, wp_strip_all_tags( $error_notice['notice'] ), 400 );
		}
	}
}
