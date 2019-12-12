<?php
/**
 * Utilities Tests.
 *
 * @package WooCommerce\Blocks\Tests
 */

namespace Automattic\WooCommerce\Blocks\Tests\RestApi\StoreApi\Utilities;

use \WP_REST_Request;
use \WC_REST_Unit_Test_Case as TestCase;
use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Utilities\MoneyValue;

/**
 * Money value tests.
 */
class MoneyValueTests extends TestCase {

	/**
	 * Test get amount.
	 */
	public function test_get_amount() {
		$tests = [
			[
				'amount'   => 1000,
				'expected' => 1000,
			],
			[
				'amount'   => '100',
				'expected' => 100,
			]
		];

		foreach ( $tests as $index => $test ) {
			$amount = new MoneyValue( $test['amount'] );

			$this->assertTrue( is_integer( $amount->get_amount() ), 'Test: ' . $index );
			$this->assertEquals( $test['expected'], $amount->get_amount(), 'Test: ' . $index );
		}
	}

	/**
	 * Test getting amounts from decimals.
	 */
	public function test_from_decimal() {
		$tests = [
			[
				'amount'        => "10.00",
				'decimals'      => '2',
				'rounding_mode' => 'PHP_ROUND_HALF_UP',
				'expected'      => 1000,
			],
			[
				'amount'        => "10.1234",
				'decimals'      => '4',
				'rounding_mode' => 'PHP_ROUND_HALF_UP',
				'expected'      => 101234,
			],
			[
				'amount'        => "10.00",
				'decimals'      => '0',
				'rounding_mode' => 'PHP_ROUND_HALF_UP',
				'expected'      => 10,
			],
			[
				'amount'        => "10.995",
				'decimals'      => '2',
				'rounding_mode' => 'PHP_ROUND_HALF_UP',
				'expected'      => 1100,
			],
			[
				'amount'        => "10.995",
				'decimals'      => '2',
				'rounding_mode' => 'PHP_ROUND_HALF_DOWN',
				'expected'      => 1099,
			],
		];

		foreach ( $tests as $index => $test ) {
			$amount = new MoneyValue();
			$result = $amount->from_decimal( $test['amount'], $test['decimals'], $test['rounding_mode'] );
			$this->assertEquals( $test['expected'], $result, 'Test: ' . $index );
		}
	}

	/**
	 * Test large integers.
	 */
	public function test_get_amount_long_int() {
		$long_int = ( (string) PHP_INT_MAX ) . 0;
		$amount   = new MoneyValue( $long_int );

		$this->assertTrue( is_string( $amount->get_amount() ) );
	}

	/**
	 * Test class is converted to string when treated like one.
	 */
	public function test_to_string() {
		$amount = new MoneyValue( 1000 );
		$this->assertEquals( '1000', (string) $amount );
	}
}
