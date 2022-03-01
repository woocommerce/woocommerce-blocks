<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\Blocks\StoreApi\RoutesController;
use Automattic\WooCommerce\Blocks\StoreApi\Utilities\RateLimits;

/**
 * RestApi class.
 * Registers controllers in the blocks REST API namespace.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class RestApi {
	/**
	 * Stores Rest Routes instance
	 *
	 * @var RoutesController
	 */
	private $routes;

	/**
	 * Constructor
	 *
	 * @param RoutesController $routes Rest Routes instance.
	 */
	public function __construct( RoutesController $routes ) {
		$this->routes = $routes;
		$this->init();
	}

	/**
	 * Initialize class features.
	 */
	protected function init() {
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ), 10 );
		add_filter( 'rest_authentication_errors', array( $this, 'store_api_authentication' ) );
		add_action( 'set_logged_in_cookie', array( $this, 'store_api_logged_in_cookie' ) );
	}

	/**
	 * Register REST API routes.
	 */
	public function register_rest_routes() {
		$api_versions = [
			'wc/store'    => 'v1',
			'wc/store/v1' => 'v1',
		];
		foreach ( $api_versions as $api_namespace => $api_version ) {
			$this->routes->register_routes( $api_version, $api_namespace );
		}
	}

	/**
	 * Get routes for a namespace.
	 *
	 * @param string $namespace Namespace to retrieve.
	 * @return array
	 */
	public function get_routes_from_namespace( $namespace ) {
		$rest_server     = rest_get_server();
		$namespace_index = $rest_server->get_namespace_index(
			[
				'namespace' => $namespace,
				'context'   => 'view',
			]
		);

		if ( is_wp_error( $namespace_index ) ) {
			return [];
		}

		$response_data = $namespace_index->get_data();

		return $response_data['routes'] ?? [];
	}

	/**
	 * Get current user IP Address.
	 *
	 * Note for HTTP_X_FORWARDED_FOR, Proxy servers can send through this header like this: X-Forwarded-For: client1, proxy1, proxy2.
	 * Make sure we always only send through the first IP in the list which should always be the client IP.
	 *
	 * @return string
	 */
	public static function get_ip_address() {
		$ip_address = trim( current( explode( ',', sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_REAL_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '' ) ) ) ) );

		return (string) rest_is_ip_address( $ip_address );
	}

	/**
	 * The Store API does not require authentication but does have rate limits in place.
	 *
	 * @param \WP_Error|mixed $result Error from another authentication handler, null if we should handle it, or another value if not.
	 * @return \WP_Error|null|bool
	 */
	public function store_api_authentication( $result ) {
		if ( ! $this->is_request_to_store_api() ) {
			return $result;
		}

		/**
		 * Filters the Store API rate limit check.
		 *
		 * This can be used to disable the rate limit check when testing API endpoints via a REST API client.
		 *
		 * @param boolean $disable_rate_limit_check If true, checks will be disabled.
		 * @return boolean
		 */
		if ( ! apply_filters( 'woocommerce_store_api_disable_rate_limit_check', false ) ) {
			$action_id          = 'store_api_request_' . ( is_user_logged_in() ? get_current_user_id() : md5( $this->get_ip_address() ) );
			$rate_limit_limit   = 25;
			$rate_limit_seconds = 10;
			$retry              = RateLimits::is_exceeded_retry_after( $action_id );
			$server             = rest_get_server();
			$server->send_header( 'X-RateLimit-Limit', $rate_limit_limit );

			if ( false !== $retry ) {
				$server->send_header( 'Retry-After', $retry );
				$server->send_header( 'X-RateLimit-Remaining', 0 );
				$server->send_header( 'X-RateLimit-Reset', time() + $retry );

				return new \WP_Error(
					'rate_limit_exceeded',
					sprintf(
						'Too many requests. Please wait %d seconds before trying again.',
						$retry
					),
					[
						'status' => 429,
					]
				);
			}

			// 25 requests per 10 seconds.
			$rate_limit = RateLimits::update_rate_limit( $action_id, $rate_limit_seconds, $rate_limit_limit );
			$server->send_header( 'X-RateLimit-Remaining', $rate_limit->remaining );
			$server->send_header( 'X-RateLimit-Reset', $rate_limit->reset );
		}

		// Pass through errors from other authentication methods used before this one.
		return ! empty( $result ) ? $result : true;
	}

	/**
	 * When the login cookies are set, they are not available until the next page reload. For the Store API, specifically
	 * for returning updated nonces, we need this to be available immediately.
	 *
	 * @param string $logged_in_cookie The value for the logged in cookie.
	 */
	public function store_api_logged_in_cookie( $logged_in_cookie ) {
		if ( ! defined( 'LOGGED_IN_COOKIE' ) || ! $this->is_request_to_store_api() ) {
			return;
		}
		$_COOKIE[ LOGGED_IN_COOKIE ] = $logged_in_cookie;
	}

	/**
	 * Check if is request to the Store API.
	 *
	 * @return bool
	 */
	protected function is_request_to_store_api() {
		if ( empty( $_SERVER['REQUEST_URI'] ) ) {
			return false;
		}

		$rest_prefix = trailingslashit( rest_get_url_prefix() );
		$request_uri = esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) );

		return false !== strpos( $request_uri, $rest_prefix . 'wc/store' );
	}
}
