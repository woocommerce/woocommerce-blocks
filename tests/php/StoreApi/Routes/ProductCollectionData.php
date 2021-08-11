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
 * Controller Tests.
 */
class ProductCollectionData extends \WP_Test_REST_TestCase {
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

		$this->products = [
			$fixtures->get_simple_product( [
				'name' => 'Test Product 1',
				'regular_price' => 10,
			] ),
			$fixtures->get_simple_product( [
				'name' => 'Test Product 2',
				'regular_price' => 100,
			] ),
		];

		$fixtures->add_product_review( $this->products[0]->get_id(), 5 );
		$fixtures->add_product_review( $this->products[1]->get_id(), 4 );
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
		$this->assertArrayHasKey( '/wc/store/products/collection-data', $routes );
	}

	/**
	 * Test getting items.
	 */
	public function test_get_items() {
		$response = rest_get_server()->dispatch( new \WP_REST_Request( 'GET', '/wc/store/products/collection-data' ) );
		$data     = $response->get_data();

		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( null, $data['price_range'] );
		$this->assertEquals( null, $data['attribute_counts'] );
		$this->assertEquals( null, $data['rating_counts'] );
	}

	/**
	 * Test calculation method.
	 */
	public function test_calculate_price_range() {
		$request = new \WP_REST_Request( 'GET', '/wc/store/products/collection-data' );
		$request->set_param( 'calculate_price_range', true );
		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();

		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( 2, $data['price_range']->currency_minor_unit );
		$this->assertEquals( '1000', $data['price_range']->min_price );
		$this->assertEquals( '10000', $data['price_range']->max_price );
		$this->assertEquals( null, $data['attribute_counts'] );
		$this->assertEquals( null, $data['rating_counts'] );
	}

	/**
	 * Test calculation method.
	 */
	public function test_calculate_attribute_counts() {
		$fixtures = new FixtureData();
		$product  = $fixtures->get_variable_product(
			[],
			[
				$fixtures->get_product_attribute( 'size', [ 'small', 'medium', 'large' ] )
			]
		);

		$request = new \WP_REST_Request( 'GET', '/wc/store/products/collection-data' );
		$request->set_param(
			'calculate_attribute_counts',
			[
				[
					'taxonomy'   => 'pa_size',
					'query_type' => 'and',
				],
			]
		);
		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();

		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( null, $data['price_range'] );
		$this->assertEquals( null, $data['rating_counts'] );

		$this->assertObjectHasAttribute( 'term', $data['attribute_counts'][0] );
		$this->assertObjectHasAttribute( 'count', $data['attribute_counts'][0] );
	}

	/**
	 * Test calculation method.
	 */
	public function test_calculate_rating_counts() {
		$request = new \WP_REST_Request( 'GET', '/wc/store/products/collection-data' );
		$request->set_param( 'calculate_rating_counts', true );
		$response = rest_get_server()->dispatch( $request );
		$data     = $response->get_data();

		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( null, $data['price_range'] );
		$this->assertEquals( null, $data['attribute_counts'] );
		$this->assertEquals(
			[
				(object) [
					'rating' => 4,
					'count'  => 1,
				],
				(object) [
					'rating' => 5,
					'count'  => 1,
				],
			],
			$data['rating_counts']
		);
	}

	/**
	 * Test collection params getter.
	 */
	public function test_get_collection_params() {
		$routes     = new \Automattic\WooCommerce\Blocks\StoreApi\RoutesController( new \Automattic\WooCommerce\Blocks\StoreApi\SchemaController( $this->mock_extend ) );
		$controller = $routes->get( 'product-collection-data' );
		$params     = $controller->get_collection_params();

		$this->assertArrayHasKey( 'calculate_price_range', $params );
		$this->assertArrayHasKey( 'calculate_attribute_counts', $params );
		$this->assertArrayHasKey( 'calculate_rating_counts', $params );
	}

	/**
	 * Test schema matches responses.
	 */
	public function test_get_item_schema() {
		$fixtures = new FixtureData();
		$product  = $fixtures->get_variable_product(
			[],
			[
				$fixtures->get_product_attribute( 'size', [ 'small', 'medium', 'large' ] )
			]
		);

		$routes     = new \Automattic\WooCommerce\Blocks\StoreApi\RoutesController( new \Automattic\WooCommerce\Blocks\StoreApi\SchemaController( $this->mock_extend ) );
		$controller = $routes->get( 'product-collection-data' );
		$schema     = $controller->get_item_schema();

		$request    = new \WP_REST_Request( 'GET', '/wc/store/products/collection-data' );
		$request->set_param( 'calculate_price_range', true );
		$request->set_param(
			'calculate_attribute_counts',
			[
				[
					'taxonomy'   => 'pa_size',
					'query_type' => 'and',
				],
			]
		);
		$request->set_param( 'calculate_rating_counts', true );
		$response = rest_get_server()->dispatch( $request );
		$validate = new ValidateSchema( $schema );

		$diff = $validate->get_diff_from_object( $response->get_data() );
		$this->assertEmpty( $diff, print_r( $diff, true ) );
	}
}
