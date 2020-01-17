<?php
/**
 * Controller Tests.
 *
 * @package WooCommerce\Blocks\Tests
 */

namespace Automattic\WooCommerce\Blocks\Tests\RestApi\StoreApi\Controllers;

use \WP_REST_Request;
use \WC_REST_Unit_Test_Case as TestCase;
use \WC_Helper_Product as ProductHelper;
use Automattic\WooCommerce\Blocks\Tests\Helpers\ValidateSchema;

/**
 * Customer Controller Tests.
 */
class Customer extends TestCase {
	/**
	 * Test route registration.
	 */
	public function test_register_routes() {
		$routes = $this->server->get_routes();
		$this->assertArrayHasKey( '/wc/store/customer', $routes );
	}

	/**
	 * Test getting customer data.
	 */
	public function test_get_item() {
		$response = $this->server->dispatch( new WP_REST_Request( 'GET', '/wc/store/customer' ) );
		$data     = $response->get_data();

		$this->assertEquals( 200, $response->get_status() );
		$this->assertArrayHasKey( 'id', $data );
		$this->assertArrayHasKey( 'billing_address', $data );
		$this->assertArrayHasKey( 'shipping_address', $data );
	}

	/**
	 * Test updating customer data.
	 */
	public function test_update_item() {
		$request = new WP_REST_Request( 'POST', '/wc/store/customer' );
		$request->set_body_params(
			[
				'billing_address' => [
					'address_1' => '123 South Street',
					'address_2' => 'Apt 1',
					'city'      => 'Philadelphia',
					'state'     => 'PA',
					'postcode'  => '19123',
					'country'   => 'US',
				],
			]
		);
		$response = $this->server->dispatch( $request );
		$data     = $response->get_data();

		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( '123 South Street', $data['billing_address']['address_1'] );
		$this->assertEquals( 'Apt 1', $data['billing_address']['address_2'] );
		$this->assertEquals( 'Philadelphia', $data['billing_address']['city'] );
		$this->assertEquals( 'PA', $data['billing_address']['state'] );
		$this->assertEquals( '19123', $data['billing_address']['postcode'] );
		$this->assertEquals( 'US', $data['billing_address']['country'] );

		// Invalid email.
		$request = new WP_REST_Request( 'POST', '/wc/store/customer' );
		$request->set_body_params(
			[
				'billing_address' => [
					'email' => 'not-an-email',
				],
			]
		);
		$response = $this->server->dispatch( $request );
		$data     = $response->get_data();

		$this->assertEquals( 400, $response->get_status() );
	}

	/**
	 * Test schema retrieval.
	 */
	public function test_get_item_schema() {
		$controller = new \Automattic\WooCommerce\Blocks\RestApi\StoreApi\Controllers\Customer();
		$schema     = $controller->get_item_schema();

		$this->assertArrayHasKey( 'id', $schema['properties'] );
		$this->assertArrayHasKey( 'billing_address', $schema['properties'] );
		$this->assertArrayHasKey( 'shipping_address', $schema['properties'] );
	}

	/**
	 * Test conversion of customer data to rest response.
	 */
	public function test_prepare_item_for_response() {
		$controller = new \Automattic\WooCommerce\Blocks\RestApi\StoreApi\Controllers\Customer();
		$customer   = new \WC_Customer();

		$customer->set_billing_first_name( 'Name' );
		$customer->set_billing_last_name( 'Surname' );
		$customer->set_billing_email( 'test@test.com' );
		$customer->set_billing_phone( '+44 01010101011' );
		$customer->set_billing_address_1( '123 South Street' );
		$customer->set_billing_address_2( 'Apt 1' );
		$customer->set_billing_city( 'Philadelphia' );
		$customer->set_billing_state( 'PA' );
		$customer->set_billing_postcode( '19123' );
		$customer->set_billing_country( 'US' );

		$customer->set_shipping_first_name( 'Name' );
		$customer->set_shipping_last_name( 'Surname' );
		$customer->set_shipping_address_1( '123 South Street' );
		$customer->set_shipping_address_2( 'Apt 1' );
		$customer->set_shipping_city( 'Philadelphia' );
		$customer->set_shipping_state( 'PA' );
		$customer->set_shipping_postcode( '19123' );
		$customer->set_shipping_country( 'US' );

		$response = $controller->prepare_item_for_response( $customer, [] );
		$data     = $response->get_data();

		$this->assertEquals( 'Name', $data['billing_address']['first_name'] );
		$this->assertEquals( 'Surname', $data['billing_address']['last_name'] );
		$this->assertEquals( '123 South Street', $data['billing_address']['address_1'] );
		$this->assertEquals( 'Apt 1', $data['billing_address']['address_2'] );
		$this->assertEquals( 'Philadelphia', $data['billing_address']['city'] );
		$this->assertEquals( 'PA', $data['billing_address']['state'] );
		$this->assertEquals( '19123', $data['billing_address']['postcode'] );
		$this->assertEquals( 'US', $data['billing_address']['country'] );

		$this->assertEquals( 'Name', $data['shipping_address']['first_name'] );
		$this->assertEquals( 'Surname', $data['shipping_address']['last_name'] );
		$this->assertEquals( '123 South Street', $data['shipping_address']['address_1'] );
		$this->assertEquals( 'Apt 1', $data['shipping_address']['address_2'] );
		$this->assertEquals( 'Philadelphia', $data['shipping_address']['city'] );
		$this->assertEquals( 'PA', $data['shipping_address']['state'] );
		$this->assertEquals( '19123', $data['shipping_address']['postcode'] );
		$this->assertEquals( 'US', $data['shipping_address']['country'] );
	}

	/**
	 * Test schema matches responses.
	 */
	public function test_schema_matches_response() {
		$controller = new \Automattic\WooCommerce\Blocks\RestApi\StoreApi\Controllers\Customer();
		$customer   = new \WC_Customer();

		$customer->set_billing_first_name( 'Name' );
		$customer->set_billing_last_name( 'Surname' );
		$customer->set_billing_email( 'test@test.com' );
		$customer->set_billing_phone( '+44 01010101011' );
		$customer->set_billing_address_1( '123 South Street' );
		$customer->set_billing_address_2( 'Apt 1' );
		$customer->set_billing_city( 'Philadelphia' );
		$customer->set_billing_state( 'PA' );
		$customer->set_billing_postcode( '19123' );
		$customer->set_billing_country( 'US' );

		$customer->set_shipping_first_name( 'Name' );
		$customer->set_shipping_last_name( 'Surname' );
		$customer->set_shipping_address_1( '123 South Street' );
		$customer->set_shipping_address_2( 'Apt 1' );
		$customer->set_shipping_city( 'Philadelphia' );
		$customer->set_shipping_state( 'PA' );
		$customer->set_shipping_postcode( '19123' );
		$customer->set_shipping_country( 'US' );

		$response = $controller->prepare_item_for_response( $customer, [] );
		$schema     = $controller->get_item_schema();
		$validate   = new ValidateSchema( $schema );

		$diff     = $validate->get_diff_from_object( $response->get_data() );
		$this->assertEmpty( $diff, print_r( $diff, true ) );
	}
}
