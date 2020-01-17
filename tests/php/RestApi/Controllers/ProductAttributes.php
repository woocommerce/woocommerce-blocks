<?php
/**
 * REST API Controller Tests.
 *
 * @package WooCommerce\Blocks\Tests
 */

namespace Automattic\WooCommerce\Blocks\Tests\RestApi\Controllers;

use \WP_REST_Request;
use \WC_REST_Unit_Test_Case;
use \WC_Helper_Product as ProductHelper;

/**
 * Product Controller "products attributes" REST API Test
 *
 * @since 3.6.0
 */
class ProductAttributes extends WC_REST_Unit_Test_Case {

	/**
	 * Endpoints.
	 *
	 * @var string
	 */
	protected $endpoint = '/wc/blocks';

	/**
	 * Setup test products data. Called before every test.
	 *
	 * @since 3.6.0
	 */
	public function setUp() {
		parent::setUp();

		$this->user = $this->factory->user->create(
			array(
				'role' => 'administrator',
			)
		);

		$this->contributor = $this->factory->user->create(
			array(
				'role' => 'contributor',
			)
		);

		// Create 2 product attributes with terms.
		$this->attr_color = ProductHelper::create_attribute( 'color', array( 'red', 'yellow', 'blue' ) );
		$this->attr_size  = ProductHelper::create_attribute( 'size', array( 'small', 'medium', 'large', 'xlarge' ) );
	}

	/**
	 * Test getting attributes.
	 *
	 * @since 3.6.0
	 */
	public function test_get_attributes() {
		wp_set_current_user( $this->user );
		$request = new WP_REST_Request( 'GET', $this->endpoint . '/products/attributes' );

		$response = $this->server->dispatch( $request );
		$data     = json_decode( wp_json_encode( $response->get_data() ), true ); // Converts objects to arrays.
		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( 2, count( $data ) );
		$attribute = $data[0];
		$this->assertArrayHasKey( 'id', $attribute );
		$this->assertArrayHasKey( 'name', $attribute );
		$this->assertArrayHasKey( 'slug', $attribute );
		$this->assertArrayHasKey( 'count', $attribute );
	}

	/**
	 * Test getting invalid attribute.
	 *
	 * @since 3.6.0
	 */
	public function test_get_invalid_attribute() {
		wp_set_current_user( $this->user );
		$request = new WP_REST_Request( 'GET', $this->endpoint . '/products/attributes/11111' );

		$response = $this->server->dispatch( $request );
		$this->assertEquals( 404, $response->get_status() );
	}

	/**
	 * Test un-authorized getting attribute.
	 *
	 * @since 3.6.0
	 */
	public function test_get_unauthed_attribute() {
		$request = new WP_REST_Request( 'GET', $this->endpoint . '/products/attributes/' . $this->attr_size['attribute_id'] );

		$response = $this->server->dispatch( $request );
		$this->assertEquals( 401, $response->get_status() );
	}

	/**
	 * Test getting attribute as contributor.
	 *
	 * @since 3.6.0
	 */
	public function test_get_attribute_contributor() {
		wp_set_current_user( $this->contributor );
		$request = new WP_REST_Request( 'GET', $this->endpoint . '/products/attributes/' . $this->attr_size['attribute_id'] );

		$response = $this->server->dispatch( $request );
		$data     = json_decode( wp_json_encode( $response->get_data() ), true ); // Converts objects to arrays.
		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( $this->attr_size['attribute_id'], $data['id'] );
		$this->assertEquals( $this->attr_size['attribute_name'], $data['name'] );
	}
}
