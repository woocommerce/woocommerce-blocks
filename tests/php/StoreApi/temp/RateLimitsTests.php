<?php
/**
 * Rate Limits Tests
 */
// phpcs:disable
namespace Automattic\WooCommerce\Blocks\Tests\StoreApi\temp;

/**
 * ControllerTests
 */
class RateLimitsTests extends \WP_Test_REST_TestCase {
	/**
	 * Setup Rest API server.
	 */
	public function setUp() {
		/** @var \WP_REST_Server $wp_rest_server */
		global $wp_rest_server;
		$wp_rest_server = new \Spy_REST_Server();
		do_action( 'rest_api_init', $wp_rest_server );
	}

	public function test_rate_limits_response_headers() {
		add_filter( 'woocommerce_store_api_enable_rate_limit_check', '__return_true' );

//		$response = rest_do_request( new \WP_REST_Request( 'GET', '/wc/store' ) );
		$response = rest_get_server()->dispatch( new \WP_REST_Request( 'GET', '/wc/store' ) );
		$headers =$response->get_headers();

		$this->assertArrayHasKey( 'RateLimit-Limits', $headers, print_r($headers, true) );
//		$this->assertArrayHasKey( 'RateLimit-Remaining', $headers );
//		$this->assertArrayHasKey( 'RateLimit-Reset', $headers );
	}
}
