<?php
/**
 * Controller Tests.
 */

namespace Automattic\WooCommerce\Blocks\Tests\StoreApi\Routes;

use Automattic\WooCommerce\StoreApi\Schemas\ExtendSchema;
use Automattic\WooCommerce\StoreApi\Formatters;
use Automattic\WooCommerce\StoreApi\Formatters\MoneyFormatter;
use Automattic\WooCommerce\StoreApi\Formatters\HtmlFormatter;
use Automattic\WooCommerce\StoreApi\Formatters\CurrencyFormatter;
use Automattic\WooCommerce\StoreApi\Schemas\V1\CheckoutSchema;
use Automattic\WooCommerce\Blocks\Tests\Helpers\FixtureData;
use Automattic\WooCommerce\StoreApi\Routes\V1\Checkout as CheckoutRoute;
use Automattic\WooCommerce\StoreApi\SchemaController;

use Mockery\Adapter\Phpunit\MockeryTestCase;

/**
 * Checkout Controller Tests.
 */
class Checkout extends MockeryTestCase {
	/**
	 * Setup test products data. Called before every test.
	 */
	protected function setUp(): void {
		parent::setUp();

		global $wp_rest_server;
		$wp_rest_server = new \Spy_REST_Server();
		do_action( 'rest_api_init', $wp_rest_server );

		wp_set_current_user( 0 );
		$customer = get_user_by( 'email', 'testaccount@test.com' );
		wp_delete_user( $customer->id );

		$formatters = new Formatters();
		$formatters->register( 'money', MoneyFormatter::class );
		$formatters->register( 'html', HtmlFormatter::class );
		$formatters->register( 'currency', CurrencyFormatter::class );

		$this->mock_extend = new ExtendSchema( $formatters );
		$this->mock_extend->register_endpoint_data(
			array(
				'endpoint'        => CheckoutSchema::IDENTIFIER,
				'namespace'       => 'extension_namespace',
				'schema_callback' => function() {
					return array(
						'extension_key' => array(
							'description' => 'Test key',
							'type'        => 'boolean',
						),
					);
				},
			)
		);
		$schema_controller = new SchemaController( $this->mock_extend );
		$route             = new CheckoutRoute( $schema_controller, $schema_controller->get( 'checkout' ) );
		register_rest_route( $route->get_namespace(), $route->get_path(), $route->get_args(), true );

		$fixtures = new FixtureData();
		$fixtures->shipping_add_flat_rate();
		$fixtures->payments_enable_bacs();
		$this->products = array(
			$fixtures->get_simple_product(
				array(
					'name'          => 'Test Product 1',
					'stock_status'  => 'instock',
					'regular_price' => 10,
					'weight'        => 10,
				)
			),
			$fixtures->get_simple_product(
				array(
					'name'          => 'Test Product 2',
					'stock_status'  => 'instock',
					'regular_price' => 10,
					'weight'        => 10,
				)
			),
		);
		wc_empty_cart();
		$this->keys   = array();
		$this->keys[] = wc()->cart->add_to_cart( $this->products[0]->get_id(), 2 );
		$this->keys[] = wc()->cart->add_to_cart( $this->products[1]->get_id(), 1 );
	}

	/**
	 * Tear down Rest API server.
	 */
	protected function tearDown(): void {
		parent::tearDown();
		global $wp_rest_server;
		$wp_rest_server = null;
	}

	/**
	 * Ensure that registered extension data is correctly shown on options requests.
	 */
	public function test_options_extension_data() {
		$request  = new \WP_REST_Request( 'OPTIONS', '/wc/store/v1/checkout' );
		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();
		$this->assertEquals(
			array(
				'description' => 'Test key',
				'type'        => 'boolean',
			),
			$data['schema']['properties']['extensions']['properties']['extension_namespace']['properties']['extension_key'],
			print_r( $data['schema']['properties']['extensions']['properties']['extension_namespace'], true )
		);
	}

	/**
	 * Ensure that registered extension data is correctly posted and visible on the server after sanitization.
	 */
	public function test_post_extension_data() {
		$request = new \WP_REST_Request( 'POST', '/wc/store/v1/checkout' );
		$request->set_header( 'X-WC-Store-API-Nonce', wp_create_nonce( 'wc_store_api' ) );
		$request->set_body_params(
			array(
				'billing_address'  => (object) array(
					'first_name' => 'test',
					'last_name'  => 'test',
					'company'    => '',
					'address_1'  => 'test',
					'address_2'  => '',
					'city'       => 'test',
					'state'      => '',
					'postcode'   => 'cb241ab',
					'country'    => 'GB',
					'phone'      => '',
					'email'      => 'testaccount@test.com',
				),
				'shipping_address' => (object) array(
					'first_name' => 'test',
					'last_name'  => 'test',
					'company'    => '',
					'address_1'  => 'test',
					'address_2'  => '',
					'city'       => 'test',
					'state'      => '',
					'postcode'   => 'cb241ab',
					'country'    => 'GB',
					'phone'      => '',
				),
				'payment_method'   => 'bacs',
				'extensions'       => array(
					'extension_namespace' => array(
						'extension_key' => true,
					),
				),
			)
		);
		$action_callback = \Mockery::mock( 'ActionCallback' );
		$action_callback->shouldReceive( 'do_callback' )->withArgs(
			array(
				\Mockery::any(),
				\Mockery::on(
					function ( $argument ) {
						return true === $argument['extensions']['extension_namespace']['extension_key'];
					}
				),
			)
		)->once();
		add_action( 'woocommerce_store_api_checkout_update_order_from_request', array( $action_callback, 'do_callback' ), 10, 2 );
		$response = rest_get_server()->dispatch( $request );
		$this->assertEquals( 200, $response->get_status() );
		remove_action( 'woocommerce_store_api_checkout_update_order_from_request', array( $action_callback, 'do_callback' ), 10, 2 );
	}

	/**
	 * Ensure that registered extension data is correctly posted and visible on the server after sanitization.
	 */
	public function test_post_invalid_extension_data() {
		$request = new \WP_REST_Request( 'POST', '/wc/store/v1/checkout' );
		$request->set_header( 'X-WC-Store-API-Nonce', wp_create_nonce( 'wc_store_api' ) );
		$request->set_body_params(
			array(
				'billing_address'  => (object) array(
					'first_name' => 'test',
					'last_name'  => 'test',
					'company'    => '',
					'address_1'  => 'test',
					'address_2'  => '',
					'city'       => 'test',
					'state'      => '',
					'postcode'   => 'cb241ab',
					'country'    => 'GB',
					'phone'      => '',
					'email'      => 'testaccount@test.com',
				),
				'shipping_address' => (object) array(
					'first_name' => 'test',
					'last_name'  => 'test',
					'company'    => '',
					'address_1'  => 'test',
					'address_2'  => '',
					'city'       => 'test',
					'state'      => '',
					'postcode'   => 'cb241ab',
					'country'    => 'GB',
					'phone'      => '',
				),
				'payment_method'   => 'bacs',
				'extensions'       => array(
					'extension_namespace' => array(
						'extension_key' => 'invalid-string',
					),
				),
			)
		);
		$response = rest_get_server()->dispatch( $request );
		$this->assertEquals( 400, $response->get_status() );
		$this->assertEquals( 'rest_invalid_param', $response->get_data()['code'] );
	}

	/**
	 * Check that accounts are created on request.
	 */
	public function test_checkout_create_account() {
		update_option( 'woocommerce_enable_guest_checkout', 'yes' );
		update_option( 'woocommerce_enable_signup_and_login_from_checkout', 'yes' );

		$request = new \WP_REST_Request( 'POST', '/wc/store/v1/checkout' );
		$request->set_header( 'X-WC-Store-API-Nonce', wp_create_nonce( 'wc_store_api' ) );
		$request->set_body_params(
			array(
				'billing_address'  => (object) array(
					'first_name' => 'test',
					'last_name'  => 'test',
					'company'    => '',
					'address_1'  => 'test',
					'address_2'  => '',
					'city'       => 'test',
					'state'      => '',
					'postcode'   => 'cb241ab',
					'country'    => 'GB',
					'phone'      => '',
					'email'      => 'testaccount@test.com',
				),
				'shipping_address' => (object) array(
					'first_name' => 'test',
					'last_name'  => 'test',
					'company'    => '',
					'address_1'  => 'test',
					'address_2'  => '',
					'city'       => 'test',
					'state'      => '',
					'postcode'   => 'cb241ab',
					'country'    => 'GB',
					'phone'      => '',
				),
				'create_account'   => true,
				'payment_method'   => 'bacs',
				'extensions'       => array(
					'extension_namespace' => array(
						'extension_key' => true,
					),
				),
			)
		);

		$response = rest_get_server()->dispatch( $request );
		$status   = $response->get_status();
		$data     = $response->get_data();

		$this->assertEquals( $status, 200 );
		$this->assertTrue( $data['customer_id'] > 0 );

		$customer = get_user_by( 'id', $data['customer_id'] );
		$this->assertEquals( $customer->user_email, 'testaccount@test.com' );
	}

	/**
	 * Test account creation options.
	 */
	public function test_checkout_do_not_create_account() {
		update_option( 'woocommerce_enable_guest_checkout', 'yes' );
		update_option( 'woocommerce_enable_signup_and_login_from_checkout', 'yes' );

		$request = new \WP_REST_Request( 'POST', '/wc/store/v1/checkout' );
		$request->set_header( 'X-WC-Store-API-Nonce', wp_create_nonce( 'wc_store_api' ) );
		$request->set_body_params(
			array(
				'billing_address'  => (object) array(
					'first_name' => 'test',
					'last_name'  => 'test',
					'company'    => '',
					'address_1'  => 'test',
					'address_2'  => '',
					'city'       => 'test',
					'state'      => '',
					'postcode'   => 'cb241ab',
					'country'    => 'GB',
					'phone'      => '',
					'email'      => 'testaccount@test.com',
				),
				'shipping_address' => (object) array(
					'first_name' => 'test',
					'last_name'  => 'test',
					'company'    => '',
					'address_1'  => 'test',
					'address_2'  => '',
					'city'       => 'test',
					'state'      => '',
					'postcode'   => 'cb241ab',
					'country'    => 'GB',
					'phone'      => '',
				),
				'create_account'   => false,
				'payment_method'   => 'bacs',
				'extensions'       => array(
					'extension_namespace' => array(
						'extension_key' => true,
					),
				),
			)
		);

		$response = rest_get_server()->dispatch( $request );
		$status   = $response->get_status();
		$data     = $response->get_data();

		$this->assertEquals( $status, 200 );
		$this->assertEquals( $data['customer_id'], 0 );
	}

	/**
	 * Test account creation options.
	 */
	public function test_checkout_force_create_account() {
		update_option( 'woocommerce_enable_guest_checkout', 'no' );
		update_option( 'woocommerce_enable_signup_and_login_from_checkout', 'yes' );

		$request = new \WP_REST_Request( 'POST', '/wc/store/v1/checkout' );
		$request->set_header( 'X-WC-Store-API-Nonce', wp_create_nonce( 'wc_store_api' ) );
		$request->set_body_params(
			array(
				'billing_address'  => (object) array(
					'first_name' => 'test',
					'last_name'  => 'test',
					'company'    => '',
					'address_1'  => 'test',
					'address_2'  => '',
					'city'       => 'test',
					'state'      => '',
					'postcode'   => 'cb241ab',
					'country'    => 'GB',
					'phone'      => '',
					'email'      => 'testaccount@test.com',
				),
				'shipping_address' => (object) array(
					'first_name' => 'test',
					'last_name'  => 'test',
					'company'    => '',
					'address_1'  => 'test',
					'address_2'  => '',
					'city'       => 'test',
					'state'      => '',
					'postcode'   => 'cb241ab',
					'country'    => 'GB',
					'phone'      => '',
				),
				'payment_method'   => 'bacs',
				'extensions'       => array(
					'extension_namespace' => array(
						'extension_key' => true,
					),
				),
			)
		);

		$response = rest_get_server()->dispatch( $request );
		$status   = $response->get_status();
		$data     = $response->get_data();

		$this->assertEquals( 200, $status, print_r( $data, true ) );
		$this->assertTrue( $data['customer_id'] > 0 );

		$customer = get_user_by( 'id', $data['customer_id'] );
		$this->assertEquals( $customer->user_email, 'testaccount@test.com' );
	}
}
