<?php

namespace Automattic\WooCommerce\Blocks\Tests;

use Automattic\WooCommerce\Blocks\Migration;
use Automattic\WooCommerce\Blocks\Options;

class BlockifiedProductGridTemplatesOptionTest extends \WP_UnitTestCase {
	public function setUp() {
		parent::setUp();
		delete_option( Options::WC_BLOCK_USE_BLOCKIFIED_PRODUCT_GRID_BLOCK_AS_TEMPLATE );
		delete_option( Options::WC_BLOCK_VERSION );
	}

	public function test_switching_to_a_classic_theme_should_set_the_option_to_false() {
		switch_theme( 'storefront' );
		check_theme_switched();

		$this->assertFalse( $this->get_use_blockified_product_grid_templates_option() );
	}

	public function test_switching_from_a_block_to_a_block_theme_should_set_the_option_to_false() {
		switch_theme( 'twentytwentytwo' );

		switch_theme( 'twentytwentytwo' );
		check_theme_switched();

		$this->assertFalse( $this->get_use_blockified_product_grid_templates_option() );
	}

	public function test_switching_from_a_classic_to_a_block_theme_should_set_the_option_to_true() {
		switch_theme( 'twentytwentytwo' );
		check_theme_switched();

		$this->assertTrue( $this->get_use_blockified_product_grid_templates_option() );
	}

	public function test_running_the_migration_with_a_block_theme_should_set_the_option_to_false() {
		switch_theme( 'twentytwentytwo' );

		update_option( Options::WC_BLOCK_VERSION, 1 );
		Migration::run_migrations();

		$this->assertFalse( $this->get_use_blockified_product_grid_templates_option() );
	}

	public function test_running_the_migration_with_a_classic_theme_should_set_the_option_to_true() {
		switch_theme( 'storefront' );

		update_option( Options::WC_BLOCK_VERSION, 1 );
		Migration::run_migrations();

		$this->assertTrue( $this->get_use_blockified_product_grid_templates_option() );
	}

	/**
	 * Returns the value of the option.
	 *
	 * @return boolean
	 */
	private function get_use_blockified_product_grid_templates_option() {
		return wc_string_to_bool( get_option( Options::WC_BLOCK_USE_BLOCKIFIED_PRODUCT_GRID_BLOCK_AS_TEMPLATE ) );
	}
}
