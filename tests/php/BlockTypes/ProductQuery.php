<?php
namespace Automattic\WooCommerce\Blocks\Tests\BlockTypes;

use Automattic\WooCommerce\Blocks\Tests\Mocks\ProductQueryMock;

/**
 * Tests for the ProductQuery block type
 */
class ProductQuery extends \WP_UnitTestCase {
	/**
	 * This variable holds our cart object.
	 *
	 * @var ProductQueryMock
	 */
	private $block_instance;

	/**
	 * Return starting point for parsed block test data.
	 * Using a method instead of property to avoid sharing data between tests.
	 */
	private function get_base_parsed_block() {
		return array(
			'blockName' => 'core/query',
			'attrs'     => array(
				'namespace' => 'woocommerce/product-query',
				'query'     => array(
					'posts_per_page' => 6,
					'orderby'        => 'date',
					'order'          => 'desc',
					'offset'         => 0,
				),
			),
		);
	}

	/**
	 * Initiate the mock object.
	 */
	protected function setUp(): void {
		$this->block_instance = new ProductQueryMock();
	}

	/**
	 * Build the merged_query for testing
	 *
	 * @param array $parsed_block Parsed block data.
	 */
	private function initialize_merged_query( $parsed_block = array() ) {
		if ( empty( $parsed_block ) ) {
			$parsed_block = $this->get_base_parsed_block();
		}

		$this->block_instance->set_parsed_block( $parsed_block );

		return $this->block_instance->build_query( $parsed_block['attrs']['query'] );
	}

	/**
	 * Test merging on sale queries.
	 */
	public function test_merging_on_sale_queries() {
		// Mock the on sale product ids.
		$on_sale_product_ids = array( 1, 2, 3, 4 );
		set_transient( 'wc_products_onsale', $on_sale_product_ids, DAY_IN_SECONDS * 30 );

		$parsed_block = $this->get_base_parsed_block();
		$parsed_block['attrs']['query']['__woocommerceOnSale'] = true;

		$merged_query = $this->initialize_merged_query( $parsed_block );

		foreach ( $on_sale_product_ids as $id ) {
			$this->assertContains( $id, $merged_query['post__in'] );
		}
		$this->assertNotContains( 384123, $merged_query['post__in'] );
	}

	/**
	 * Test merging stock status queries.
	 */
	public function test_merging_stock_status_queries() {
		$parsed_block = $this->get_base_parsed_block();
		$parsed_block['attrs']['query']['__woocommerceStockStatus'] = array(
			'outofstock',
			'onbackorder',
		);

		$merged_query = $this->initialize_merged_query( $parsed_block );

		$this->assertContains( 'outofstock', $merged_query['meta_query'][0]['value'] );
		$this->assertContains( 'onbackorder', $merged_query['meta_query'][0]['value'] );
		$this->assertNotContains( 'instock', $merged_query['meta_query'][0]['value'] );

		$parsed_block = $this->get_base_parsed_block();
		$parsed_block['attrs']['query']['__woocommerceStockStatus'] = array(
			'instock',
			'onbackorder',
		);
		$this->block_instance->set_parsed_block( $parsed_block );

		$merged_query = $this->block_instance->build_query( $parsed_block['attrs']['query'] );

		$this->assertContains( 'instock', $merged_query['meta_query'][0]['value'] );
		$this->assertContains( 'onbackorder', $merged_query['meta_query'][0]['value'] );
		$this->assertNotContains( 'outofstock', $merged_query['meta_query'][0]['value'] );
	}

	/**
	 * Test merging attribute queries.
	 */
	public function test_merging_attribute_queries() {
		$parsed_block = $this->get_base_parsed_block();
		$parsed_block['attrs']['query']['__woocommerceAttributes'] = array(
			array(
				'taxonomy' => 'pa_test',
				'termId'   => 1,
			),
			array(
				'taxonomy' => 'pa_test',
				'termId'   => 2,
			),
			array(
				'taxonomy' => 'pa_another_test',
				'termId'   => 3,
			),
		);

		$merged_query = $this->initialize_merged_query( $parsed_block );

		$this->assertContainsEquals(
			array(
				'field'    => 'term_id',
				'terms'    => array( 3 ),
				'operator' => 'IN',
				'taxonomy' => 'pa_another_test',
			),
			$merged_query['tax_query']
		);

		$this->assertContainsEquals(
			array(
				'taxonomy' => 'pa_test',
				'field'    => 'term_id',
				'terms'    => array( 1, 2 ),
				'operator' => 'IN',
			),
			$merged_query['tax_query']
		);
	}

	/**
	 * Test merging order by rating queries.
	 */
	public function test_merging_order_by_rating_queries() {
		$parsed_block                              = $this->get_base_parsed_block();
		$parsed_block['attrs']['query']['orderby'] = 'rating';

		$merged_query = $this->initialize_merged_query( $parsed_block );

		$this->assertEquals( 'meta_value_num', $merged_query['orderby'] );
		$this->assertEquals( '_wc_average_rating', $merged_query['meta_key'] );
	}

	/**
	 * Test merging order by popularity queries.
	 */
	public function test_merging_order_by_popularity_queries() {
		$parsed_block                              = $this->get_base_parsed_block();
		$parsed_block['attrs']['query']['orderby'] = 'popularity';

		$merged_query = $this->initialize_merged_query( $parsed_block );

		$this->assertEquals( 'meta_value_num', $merged_query['orderby'] );
		$this->assertEquals( 'total_sales', $merged_query['meta_key'] );
	}

	/**
	 * Test merging filter by max price queries.
	 */
	public function test_merging_filter_by_max_price_queries() {
		set_query_var( 'max_price', 100 );

		$merged_query = $this->initialize_merged_query();

		$price_meta_query = $merged_query['meta_query'][0];
		$this->assertEquals( 'AND', $price_meta_query['relation'] );
		$this->assertContains(
			array(
				'key'     => '_price',
				'value'   => 100,
				'compare' => '<',
				'type'    => 'numeric',
			),
			$price_meta_query
		);
	}

	/**
	 * Test merging filter by min price queries.
	 */
	public function test_merging_filter_by_min_price_queries() {
		set_query_var( 'min_price', 20 );

		$merged_query = $this->initialize_merged_query();

		$price_meta_query = $merged_query['meta_query'][0];
		$this->assertEquals( 'AND', $price_meta_query['relation'] );
		$this->assertContains(
			array(
				'key'     => '_price',
				'value'   => 20,
				'compare' => '>=',
				'type'    => 'numeric',
			),
			$price_meta_query
		);
	}

	/**
	 * Test merging filter by min and max price queries.
	 */
	public function test_merging_filter_by_min_and_max_price_queries() {
		set_query_var( 'max_price', 100 );
		set_query_var( 'min_price', 20 );

		$merged_query = $this->initialize_merged_query();

		$price_meta_query = $merged_query['meta_query'][0];
		$this->assertEquals( 'AND', $price_meta_query['relation'] );
		$this->assertContains(
			array(
				'key'     => '_price',
				'value'   => 100,
				'compare' => '<',
				'type'    => 'numeric',
			),
			$price_meta_query
		);
		$this->assertContains(
			array(
				'key'     => '_price',
				'value'   => 20,
				'compare' => '>=',
				'type'    => 'numeric',
			),
			$price_meta_query
		);
	}

	/**
	 * Test merging filter by stock status queries.
	 */
	public function test_merging_filter_by_stock_status_queries() {
		set_query_var( 'filter_stock_status', 'instock' );

		$merged_query = $this->initialize_merged_query();

		$this->assertContains(
			array(
				'key'      => '_stock_status',
				'value'    => array( 'instock' ),
				'operator' => 'IN',
			),
			$merged_query['meta_query']
		);
	}
}
