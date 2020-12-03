<?php
/**
 * Controller Tests.
 */

namespace Automattic\WooCommerce\Blocks\Tests\StoreApi\Formatters;

use \WC_REST_Unit_Test_Case as TestCase;
use Automattic\WooCommerce\Blocks\StoreApi\Formatters;
use Automattic\WooCommerce\Blocks\StoreApi\Formatters\MoneyFormatter;
use Automattic\WooCommerce\Blocks\StoreApi\Formatters\HtmlFormatter;
use Automattic\WooCommerce\Blocks\StoreApi\Formatters\DefaultFormatter;

/**
 * TestFormatters tests.
 */
class TestFormatters extends TestCase {

	private $mock_formatters;

	/**
	 * Setup test products data. Called before every test.
	 */
	public function setUp() {
		parent::setUp();

		$this->mock_formatters = new Formatters();
		$this->mock_formatters->register( 'money', MoneyFormatter::class );
		$this->mock_formatters->register( 'html', HtmlFormatter::class );
	}

	/**
	 * Test get formatter.
	 */
	public function test_get_formatter() {
		$this->assertInstanceOf( MoneyFormatter::class, $this->mock_formatters->money );
		$this->assertInstanceOf( HtmlFormatter::class, $this->mock_formatters->html );
	}

	/**
	 * Test getting non existent formatter.
	 */
	public function test_get_default_formatter() {
		$this->assertInstanceOf( DefaultFormatter::class, $this->mock_formatters->wrong );
	}

	/**
	 * Test setting options.
	 */
	public function test_options() {
		$formatter = $this->mock_formatters->money;
		$formatter->set_option( 'option_name', 'option_value' );

		$this->assertEquals( 'option_value', $formatter->get_option( 'option_name' ) );
		$this->assertEquals( 'default_value', $formatter->get_option( 'non_existing_option', 'default_value' ) );
	}
}
