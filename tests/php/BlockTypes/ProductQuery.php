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
	 * Initiate the cart mock.
	 */
	protected function setUp(): void {
		$this->block_instance = new ProductQueryMock();
		$this->parsed_block   = array(
			'blockName' => 'core/query',
			'attrs'    => array(
				'namespace' => 'woocommerce/product-query',
			),
		);
	}

	public function test_merging_queries() {
		
	}
}
