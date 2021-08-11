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
class ProductAttributeTerms extends \WP_Test_REST_TestCase {

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
		$this->assertArrayHasKey( '/wc/store/products/attributes/(?P<attribute_id>[\d]+)/terms', $routes );
	}

	/**
	 * Test getting items.
	 */
	public function test_get_items() {
		$request = new \WP_REST_Request( 'GET', '/wc/store/products/attributes/' . $this->attributes[0]['attribute_id'] . '/terms' );
		$request->set_param( 'hide_empty', false );
		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();

		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( 3, count( $data ) );
		$this->assertArrayHasKey( 'id', $data[0] );
		$this->assertArrayHasKey( 'name', $data[0] );
		$this->assertArrayHasKey( 'slug', $data[0] );
		$this->assertArrayHasKey( 'description', $data[0] );
		$this->assertArrayHasKey( 'count', $data[0] );
	}

	/**
	 * Test conversion of product to rest response.
	 */
	public function test_prepare_item() {
		$schema     = new \Automattic\WooCommerce\Blocks\StoreApi\Schemas\TermSchema( $this->mock_extend );
		$controller = new \Automattic\WooCommerce\Blocks\StoreApi\Routes\ProductAttributeTerms( $schema );
		$response   = $controller->prepare_item_for_response( get_term_by( 'name', 'small', 'pa_size' ), new \WP_REST_Request() );
		$data       = $response->get_data();

		$this->assertArrayHasKey( 'id', $data );
		$this->assertEquals( 'small', $data['name'] );
		$this->assertEquals( 'small-slug', $data['slug'] );
		$this->assertEquals( 'Description of small', $data['description'] );
		$this->assertEquals( 0, $data['count'] );
	}

	/**
	 * Test collection params getter.
	 */
	public function test_get_collection_params() {
		$routes     = new \Automattic\WooCommerce\Blocks\StoreApi\RoutesController( new \Automattic\WooCommerce\Blocks\StoreApi\SchemaController( $this->mock_extend ) );
		$controller = $routes->get( 'product-attribute-terms' );
		$params     = $controller->get_collection_params();

		$this->assertArrayHasKey( 'order', $params );
		$this->assertArrayHasKey( 'orderby', $params );
		$this->assertArrayHasKey( 'hide_empty', $params );
	}

	/**
	 * Test schema matches responses.
	 */
	public function test_get_item_schema() {
		$routes     = new \Automattic\WooCommerce\Blocks\StoreApi\RoutesController( new \Automattic\WooCommerce\Blocks\StoreApi\SchemaController( $this->mock_extend ) );
		$controller = $routes->get( 'product-attribute-terms' );
		$schema     = $controller->get_item_schema();
		$response   = $controller->prepare_item_for_response( get_term_by( 'name', 'small', 'pa_size' ), new \WP_REST_Request() );
		$validate   = new ValidateSchema( $schema );

		$diff = $validate->get_diff_from_object( $response->get_data() );
		$this->assertEmpty( $diff, print_r( $diff, true ) );
	}
}
