<?php
/**
 * Rate Limits Tests
 */

namespace Automattic\WooCommerce\Blocks\Tests\StoreApi\temp;

use Automattic\WooCommerce\StoreApi\Utilities\RateLimits;
use Spy_REST_Server;
use WP_REST_Server;
use WP_Test_REST_TestCase;

/**
 * ControllerTests
 */
class RateLimitsTests extends WP_Test_REST_TestCase {
	/**
	 * Setup Rest API server.
	 */
	public function setUp() {
		/** @var WP_REST_Server $wp_rest_server */
		global $wp_rest_server;
		$wp_rest_server = new Spy_REST_Server();

		$GLOBALS['wp']->query_vars['rest_route'] = '/wc/store/cart';
		$_SERVER['REMOTE_ADDR']                  = '76.45.67.179';

		do_action( 'rest_api_init', $wp_rest_server );
	}

	/**
	 * Tests that Rate limiting headers are sent and set correctly when Rate Limiting
	 * main functionality is enabled.
	 *
	 * @return void
	 */
	public function test_rate_limits_response_headers() {
		add_filter( 'woocommerce_store_api_enable_rate_limit_check', '__return_true' );

		/** @var Spy_REST_Server $spy_rest_server */
		$spy_rest_server = rest_get_server();
		$spy_rest_server->serve_request( '/wc/store/cart' );

		$this->assertArrayHasKey( 'RateLimit-Limit', $spy_rest_server->sent_headers );
		$this->assertArrayHasKey( 'RateLimit-Remaining', $spy_rest_server->sent_headers );
		$this->assertArrayHasKey( 'RateLimit-Reset', $spy_rest_server->sent_headers );

		$this->assertEquals( RateLimits::LIMIT, $spy_rest_server->sent_headers['RateLimit-Limit'] );
		$this->assertTrue( $spy_rest_server->sent_headers['RateLimit-Remaining'] > 0 );
		$this->assertIsInt( $spy_rest_server->sent_headers['RateLimit-Reset'] );
		$this->assertGreaterThan( time(), $spy_rest_server->sent_headers['RateLimit-Reset'] );

		// Exhaust the limit.
		do {
			$remaining = $spy_rest_server->sent_headers['RateLimit-Remaining'];

			$spy_rest_server->serve_request( '/wc/store/cart' );

			$this->assertEquals( RateLimits::LIMIT, $spy_rest_server->sent_headers['RateLimit-Limit'] );
			$this->assertIsInt( $spy_rest_server->sent_headers['RateLimit-Reset'] );
			$this->assertGreaterThan( time(), $spy_rest_server->sent_headers['RateLimit-Reset'] );
			$this->assertEquals( $remaining - 1, $spy_rest_server->sent_headers['RateLimit-Remaining'] );
		} while ( $spy_rest_server->sent_headers['RateLimit-Remaining'] > 0 );

		// Attempt a request after rate limit is reached.
		$spy_rest_server->serve_request( '/wc/store/cart' );

		$body = json_decode( $spy_rest_server->sent_body );
		$this->assertEquals( JSON_ERROR_NONE, json_last_error() );
		$this->assertEquals( 400, $body->data->status );

		$this->assertEquals( RateLimits::LIMIT, $spy_rest_server->sent_headers['RateLimit-Limit'] );
		$this->assertIsInt( $spy_rest_server->sent_headers['RateLimit-Reset'] );
		$this->assertGreaterThan( time(), $spy_rest_server->sent_headers['RateLimit-Reset'] );
		$this->assertEquals( 0, $spy_rest_server->sent_headers['RateLimit-Remaining'] );
		$this->assertArrayHasKey( 'RateLimit-Retry-After', $spy_rest_server->sent_headers );
		$this->assertIsInt( $spy_rest_server->sent_headers['RateLimit-Retry-After'] );
		$this->assertLessThanOrEqual( RateLimits::SECONDS, $spy_rest_server->sent_headers['RateLimit-Retry-After'] );
	}
}
