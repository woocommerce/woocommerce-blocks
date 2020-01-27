<?php
/**
 * Utility Tests.
 *
 * @package WooCommerce\Blocks\Tests
 */

namespace Automattic\WooCommerce\Blocks\Tests\RestApi\Utilities;

use PHPUnit\Framework\TestCase;
use \WC_Helper_Product as ProductHelper;
use Automattic\WooCommerce\Blocks\RestApi\Utilities\ProductSummary;

/**
 * ProductSummary Utility Tests.
 */
class ProductSummaryTests extends TestCase {
	/**
	 * Test that stock is reserved for draft orders.
	 */
	public function test_get_summary() {
		$product = new \WC_Product();
		$product->set_description( '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis <strong>nostrud</strong> exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>' );

		$class = new ProductSummary( $product );
		// 25 word limit should return 1st para.
		$this->assertEquals( "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n", $class->get_summary() );
		// Large limit, should return full description.
		$this->assertEquals( "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam, quis <strong>nostrud</strong> exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n", $class->get_summary( 1000 ) );
		// Should return 3 words.
		$this->assertEquals( "<p>Lorem ipsum dolor&hellip;</p>\n", $class->get_summary( 3 ) );
		// Should return 1 word.
		$this->assertEquals( "<p>Lorem&hellip;</p>\n", $class->get_summary( 1 ) );
	}
}



