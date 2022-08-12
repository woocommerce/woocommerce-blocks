<?php
namespace Automattic\WooCommerce\Blocks\Tests\BlockTypes;

use Automattic\WooCommerce\Blocks\Tests\Mocks\CartMock;

/**
 * Tests for the Cart block type
 *
 * @since $VID:$
 */
class Cart extends \WP_UnitTestCase {
	private $cart_block_instance;

	public function setUp() {
		$this->$cart_block_instance = new CartMock();
	}

	public function test_deep_sort_with_accents() {
		$test_array_1 = array(
			'0',
			'1',
			array( '2', '3' ),
		);
		$test_array_2 = array(
			array( '0', '1' ),
			'2',
			'3',
		);
		$this->assertEquals( $test_array_1, $this->cart_block_instance->deep_sort_test( $test_array_1 ), '' );
		$this->assertEquals( $test_array_2, $this->cart_block_instance->deep_sort_test( $test_array_2 ), '' );
	}
}
