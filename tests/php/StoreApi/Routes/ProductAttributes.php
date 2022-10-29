<?php
/**
 * Controller Tests.
 */

namespace Automattic\WooCommerce\Blocks\Tests\StoreApi\Routes;

use Automattic\WooCommerce\Blocks\Tests\StoreApi\Routes\ControllerTestCase;
use Automattic\WooCommerce\Blocks\Tests\Helpers\FixtureData;
use Automattic\WooCommerce\Blocks\Tests\Helpers\ValidateSchema;

/**
 * Product Attributes Controller Tests.
 */
class ProductAttributes extends ControllerTestCase {

	/**
	 * Setup test products' data. Called before every test.
	 */
	protected function setUp(): void {
		parent::setUp();

		$fixtures = new FixtureData();

		$this->attributes = array(
			$fixtures->get_product_attribute( 'color', array( 'red', 'green', 'blue' ) ),
			$fixtures->get_product_attribute( 'size', array( 'small', 'medium', 'large' ) ),
		);
	}

	/**
	 * Test getting item.
	 */
	public function test_get_item() {
		$attribute = wc_get_attribute( $this->attributes[0]['attribute_id'] );
		$response  = rest_get_server()->dispatch( new \WP_REST_Request( 'GET', '/wc/store/v1/products/attributes/' . $attribute->id ) );
		$data      = $response->get_data();

		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( $attribute->id, $data['id'] );
		$this->assertEquals( $attribute->name, $data['name'] );
		$this->assertEquals( $attribute->slug, $data['taxonomy'] );
		$this->assertEquals( $attribute->type, $data['type'] );
		$this->assertEquals( $attribute->order_by, $data['order'] );
		$this->assertEquals( $attribute->has_archives, $data['has_archives'] );
	}

	/**
	 * Test getting items.
	 */
	public function test_get_items() {
		$response = rest_get_server()->dispatch( new \WP_REST_Request( 'GET', '/wc/store/v1/products/attributes' ) );
		$data     = $response->get_data();

		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( 2, count( $data ) ); // TODO: investigate why $data returns 2 items on the pipeline and 4 locally
		$this->assertArrayHasKey( 'id', $data[0] );
		$this->assertArrayHasKey( 'name', $data[0] );
		$this->assertArrayHasKey( 'taxonomy', $data[0] );
		$this->assertArrayHasKey( 'type', $data[0] );
		$this->assertArrayHasKey( 'order', $data[0] );
		$this->assertArrayHasKey( 'has_archives', $data[0] );
	}

	/**
	 * Test conversion of product to rest response.
	 */
	public function test_prepare_item() {
		$routes     = new \Automattic\WooCommerce\StoreApi\RoutesController( new \Automattic\WooCommerce\StoreApi\SchemaController( $this->mock_extend ) );
		$controller = $routes->get( 'product-attributes' );
		$attribute  = wc_get_attribute( $this->attributes[0]['attribute_id'] );
		$response   = $controller->prepare_item_for_response( $attribute, new \WP_REST_Request() );
		$data       = $response->get_data();

		$this->assertArrayHasKey( 'id', $data );
		$this->assertArrayHasKey( 'name', $data );
		$this->assertArrayHasKey( 'taxonomy', $data );
		$this->assertArrayHasKey( 'type', $data );
		$this->assertArrayHasKey( 'order', $data );
		$this->assertArrayHasKey( 'has_archives', $data );
	}

	/**
	 * Test schema matches responses.
	 */
	public function test_get_item_schema() {
		$routes     = new \Automattic\WooCommerce\StoreApi\RoutesController( new \Automattic\WooCommerce\StoreApi\SchemaController( $this->mock_extend ) );
		$controller = $routes->get( 'product-attributes' );
		$attribute  = wc_get_attribute( $this->attributes[0]['attribute_id'] );
		$response   = $controller->prepare_item_for_response( $attribute, new \WP_REST_Request() );
		$schema     = $controller->get_item_schema();
		$validate   = new ValidateSchema( $schema );

		$diff = $validate->get_diff_from_object( $response->get_data() );
		$this->assertEmpty( $diff, print_r( $diff, true ) );
	}
}
