<?php
/**
 * Controller Tests.
 */

namespace Automattic\WooCommerce\Blocks\Tests\StoreApi\Controllers;

use Automattic\WooCommerce\Blocks\Tests\Helpers\FixtureData;
use Automattic\WooCommerce\Blocks\Tests\Helpers\ValidateSchema;
use Automattic\WooCommerce\Blocks\Domain\Services\ExtendRestApi;
use Automattic\WooCommerce\Blocks\Package;
use Automattic\WooCommerce\Blocks\Domain\Package as DomainPackage;
use Automattic\WooCommerce\Blocks\StoreApi\Formatters;
use Automattic\WooCommerce\Blocks\StoreApi\Formatters\MoneyFormatter;
use Automattic\WooCommerce\Blocks\StoreApi\Formatters\HtmlFormatter;
use Automattic\WooCommerce\Blocks\StoreApi\Formatters\CurrencyFormatter;
use Automattic\WooCommerce\Blocks\Registry\Container;
use Automattic\WooCommerce\Blocks\Domain\Services\FeatureGating;

/**
 * Product Attributes Controller Tests.
 */
class ProductAttributes extends \WP_Test_REST_TestCase {

	private $mock_extend;

	/**
	 * Setup test products data. Called before every test.
	 */
	public function setUp() {
		parent::setUp();

		/** @var \WP_REST_Server $wp_rest_server */
		global $wp_rest_server;
		$wp_rest_server = new \Spy_REST_Server;
		do_action( 'rest_api_init', $wp_rest_server );

		wp_set_current_user( 0 );
		$formatters = new Formatters();
		$formatters->register( 'money', MoneyFormatter::class );
		$formatters->register( 'html', HtmlFormatter::class );
		$formatters->register( 'currency', CurrencyFormatter::class );
		$this->mock_extend = new ExtendRestApi( new DomainPackage( '', '', new FeatureGating( 2 ) ), $formatters );

		$fixtures = new FixtureData();

		$this->attributes = [
			$fixtures->get_product_attribute( 'color', [ 'red', 'green', 'blue' ] ),
			$fixtures->get_product_attribute( 'size', [ 'small', 'medium', 'large' ] )
		];
	}

	/**
	 * Tear down the above.
	 */
	public function tearDown() {
		parent::tearDown();
		/** @var \WP_REST_Server $wp_rest_server */
		global $wp_rest_server;
		$wp_rest_server = null;
	}

	/**
	 * Test route registration.
	 */
	public function test_register_routes() {
		$routes = rest_get_server()->get_routes();
		$this->assertArrayHasKey( '/wc/store/products/attributes', $routes );
		$this->assertArrayHasKey( '/wc/store/products/attributes/(?P<id>[\d]+)', $routes );
	}

	/**
	 * Test getting item.
	 */
	public function test_get_item() {
		$attribute = wc_get_attribute( $this->attributes[0]['attribute_id'] );
		$response  = rest_get_server()->dispatch( new \WP_REST_Request( 'GET', '/wc/store/products/attributes/' . $attribute->id ) );
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
		$response = rest_get_server()->dispatch( new \WP_REST_Request( 'GET', '/wc/store/products/attributes' ) );
		$data     = $response->get_data();

		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( 2, count( $data ) );
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
		$routes     = new \Automattic\WooCommerce\Blocks\StoreApi\RoutesController( new \Automattic\WooCommerce\Blocks\StoreApi\SchemaController( $this->mock_extend ) );
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
		$routes     = new \Automattic\WooCommerce\Blocks\StoreApi\RoutesController( new \Automattic\WooCommerce\Blocks\StoreApi\SchemaController( $this->mock_extend ) );
		$controller = $routes->get( 'product-attributes' );
		$schema     = $controller->get_item_schema();
		$attribute  = wc_get_attribute( $this->attributes[0]['attribute_id'] );
		$response   = $controller->prepare_item_for_response( $attribute, new \WP_REST_Request() );
		$schema     = $controller->get_item_schema();
		$validate   = new ValidateSchema( $schema );

		$diff = $validate->get_diff_from_object( $response->get_data() );
		$this->assertEmpty( $diff, print_r( $diff, true ) );
	}
}
