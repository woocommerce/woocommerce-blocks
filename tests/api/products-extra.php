<?php
/**
 * @package WooCommerce\Tests\API
 */

/**
 * Product Controller "extras" REST API Test
 *
 * @since 1.2.0
 */
class WC_Tests_API_Products_Controller extends WC_REST_Unit_Test_Case {

	/**
	 * Endpoints.
	 *
	 * @var string
	 */
	protected $endpoint = '/wc-pb/v3';

	/**
	 * Setup test products data. Called before every test.
	 *
	 * @since 1.2.0
	 */
	public function setUp() {
		parent::setUp();

		$this->user        = $this->factory->user->create(
			array(
				'role' => 'author',
			)
		);
		$this->contributor = $this->factory->user->create(
			array(
				'role' => 'contributor',
			)
		);
		$this->subscriber  = $this->factory->user->create(
			array(
				'role' => 'subscriber',
			)
		);
	}

	/**
	 * Test route registration.
	 *
	 * @since 1.2.0
	 */
	public function test_register_routes() {
		$routes = $this->server->get_routes();

		$this->assertArrayHasKey( '/wc-pb/v3/products', $routes );
		$this->assertArrayHasKey( '/wc-pb/v3/products/(?P<id>[\d]+)', $routes );
	}

	/**
	 * Test getting products.
	 *
	 * @since 1.2.0
	 */
	public function test_get_products() {
		wp_set_current_user( $this->user );
		WC_Helper_Product::create_external_product();
		sleep( 1 ); // So both products have different timestamps.
		$product  = WC_Helper_Product::create_simple_product();
		$response = $this->server->dispatch( new WP_REST_Request( 'GET', '/wc-pb/v3/products' ) );
		$products = $response->get_data();

		$this->assertEquals( 200, $response->get_status() );

		$this->assertEquals( 2, count( $products ) );
		$this->assertEquals( 'Dummy Product', $products[0]['name'] );
		$this->assertEquals( 'DUMMY SKU', $products[0]['sku'] );
		$this->assertEquals( 'Dummy External Product', $products[1]['name'] );
		$this->assertEquals( 'DUMMY EXTERNAL SKU', $products[1]['sku'] );
	}

	/**
	 * Test getting products as an contributor.
	 *
	 * @since 1.2.0
	 */
	public function test_get_products_as_contributor() {
		wp_set_current_user( $this->contributor );
		WC_Helper_Product::create_simple_product();
		$response = $this->server->dispatch( new WP_REST_Request( 'GET', '/wc-pb/v3/products' ) );
		$this->assertEquals( 200, $response->get_status() );
	}

	/**
	 * Test getting products as an subscriber.
	 *
	 * @since 1.2.0
	 */
	public function test_get_products_as_subscriber() {
		wp_set_current_user( $this->subscriber );
		WC_Helper_Product::create_simple_product();
		$response = $this->server->dispatch( new WP_REST_Request( 'GET', '/wc-pb/v3/products' ) );
		$this->assertEquals( 403, $response->get_status() );
	}

	/**
	 * Test getting products with custom ordering.
	 *
	 * @since 1.2.0
	 */
	public function test_get_products_order_by_price() {
		wp_set_current_user( $this->user );
		WC_Helper_Product::create_external_product();
		sleep( 1 ); // So both products have different timestamps.
		$product = WC_Helper_Product::create_simple_product( false ); // Prevent saving, since we save here.
		// Customize the price, otherwise both are 10.
		$product->set_props(
			array(
				'regular_price' => 15,
				'price'         => 15,
			)
		);
		$product->save();

		$request = new WP_REST_Request( 'GET', '/wc-pb/v3/products' );
		$request->set_param( 'orderby', 'price' );
		$request->set_param( 'order', 'asc' );
		$response = $this->server->dispatch( $request );
		$products = $response->get_data();

		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( 2, count( $products ) );

		// The external product should be first, then the simple product.
		$this->assertEquals( 'Dummy External Product', $products[0]['name'] );
		$this->assertEquals( 'Dummy Product', $products[1]['name'] );
		$this->assertEquals( '10', $products[0]['price'] );
		$this->assertEquals( '15', $products[1]['price'] );
	}

	/**
	 * Test getting only products that are visible in catalog and search.
	 *
	 * @since 1.3.1
	 */
	public function test_get_products_visible() {
		wp_set_current_user( $this->user );
		$product1 = WC_Helper_Product::create_simple_product( true );
		$product2 = WC_Helper_Product::create_simple_product( true );
		$product3 = WC_Helper_Product::create_simple_product( true );
		$product4 = WC_Helper_Product::create_simple_product( true );

		wp_set_post_terms( $product3->get_id(), 'exclude-from-catalog', 'product_visibility' );
		wp_set_post_terms( $product4->get_id(), 'exclude-from-search', 'product_visibility' );

		$request = new WP_REST_REQUEST( 'GET', '/wc-pb/v3/products' );
		$request->set_param( 'catalog_visibility', 'visible' );
		$request->set_param( 'orderby', 'id' );
		$request->set_param( 'order', 'asc' );
		$response = $this->server->dispatch( $request );
		$products = $response->get_data();

		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( 2, count( $products ) );

		$this->assertEquals( $product1->get_id(), $products[0]['id'] );
		$this->assertEquals( $product2->get_id(), $products[1]['id'] );
	}
}
