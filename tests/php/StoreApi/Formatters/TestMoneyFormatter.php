<?php
/**
 * Controller Tests.
 */

namespace Automattic\WooCommerce\Blocks\Tests\StoreApi\Formatters;

use \WC_REST_Unit_Test_Case as TestCase;
use Automattic\WooCommerce\Blocks\StoreApi\Formatters\MoneyFormatter;

/**
 * TestMoneyFormatter tests.
 */
class TestMoneyFormatter extends TestCase {

	private $mock_formatter;

	/**
	 * Setup test products data. Called before every test.
	 */
	public function setUp() {
		parent::setUp();

		$this->mock_formatter = new MoneyFormatter();
	}

	/**
	 * Test formatting.
	 */
	public function test_format() {
		$this->assertEquals( "1000", $this->mock_formatter->format( 10 ) );
		$this->assertEquals( "1000", $this->mock_formatter->format( "10" ) );
	}

	/**
	 * Test formatting with custom DP.
	 */
	public function test_format_dp() {
		$this->mock_formatter->set_option( 'decimals', 4 );
		$this->assertEquals( "100000", $this->mock_formatter->format( 10 ) );
		$this->assertEquals( "100000", $this->mock_formatter->format( "10" ) );
	}

	/**
	 * Test formatting with custom DP.
	 */
	public function test_format_rounding_mode() {
		$this->mock_formatter->set_option( 'rounding_mode', PHP_ROUND_HALF_UP );
		$this->assertEquals( "156", $this->mock_formatter->format( 1.555 ) );

		$this->mock_formatter->set_option( 'rounding_mode', PHP_ROUND_HALF_DOWN );
		$this->assertEquals( "155", $this->mock_formatter->format( 1.555 ) );
	}
}
