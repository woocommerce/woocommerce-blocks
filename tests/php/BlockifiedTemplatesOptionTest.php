<?php

namespace Automattic\WooCommerce\Blocks\Tests;

class BlockifiedTemplatesOptionTest extends \WP_UnitTestCase {
	const USE_BLOCKIFIED_TEMPLATES_OPTION = 'wc_blocks_use_blockified_templates';

	public function setUp() {
		parent::setUp();
		delete_option( self::USE_BLOCKIFIED_TEMPLATES_OPTION );
	}

	public function test_switching_to_a_classic_theme_should_set_the_option_to_false() {
		switch_theme( 'storefront' );
		check_theme_switched();

		$this->assertFalse( $this->get_use_blockified_templates_option() );
	}

	public function test_switching_from_a_block_to_a_block_theme_should_set_the_option_to_false() {
		switch_theme( 'twentytwentytwo' );

		switch_theme( 'twentytwentytwo' );
		check_theme_switched();

		$this->assertFalse( $this->get_use_blockified_templates_option() );
	}

	public function test_switching_from_a_classic_to_a_block_theme_should_set_the_option_to_true() {
		switch_theme( 'twentytwentytwo' );
		check_theme_switched();

		$this->assertTrue( $this->get_use_blockified_templates_option() );
	}

	public function test_installing_the_plugin_with_a_classic_theme_should_set_the_option_to_false() {
		switch_theme( 'storefront' );

		update_option( 'wc_blocks_db_schema_version', 0 );
		\Automattic\WooCommerce\Blocks\Package::container()->get( \Automattic\WooCommerce\Blocks\Installer::class )->install();

		$this->assertFalse( $this->get_use_blockified_templates_option() );
	}

	public function test_installing_the_plugin_with_a_block_theme_should_set_the_option_to_true() {
		switch_theme( 'twentytwentytwo' );

		update_option( 'wc_blocks_db_schema_version', 0 );
		\Automattic\WooCommerce\Blocks\Package::container()->get( \Automattic\WooCommerce\Blocks\Installer::class )->install();

		$this->assertTrue( $this->get_use_blockified_templates_option() );
	}

	public function test_updating_the_plugin_with_a_block_theme_should_set_the_option_to_false() {
		switch_theme( 'twentytwentytwo' );

		update_option( 'wc_blocks_db_schema_version', 260 );
		\Automattic\WooCommerce\Blocks\Package::container()->get( \Automattic\WooCommerce\Blocks\Installer::class )->install();

		$this->assertFalse( $this->get_use_blockified_templates_option() );
	}

	public function test_updating_the_plugin_with_a_classic_theme_should_set_the_option_to_false() {
		switch_theme( 'twentytwentytwo' );

		update_option( 'wc_blocks_db_schema_version', 260 );
		\Automattic\WooCommerce\Blocks\Package::container()->get( \Automattic\WooCommerce\Blocks\Installer::class )->install();

		$this->assertFalse( $this->get_use_blockified_templates_option() );
	}

	/**
	 * Returns the value of the `wc_blocks_use_blockified_templates` option.
	 *
	 * @return boolean
	 */
	private function get_use_blockified_templates_option() {
		return wc_string_to_bool( get_option( self::USE_BLOCKIFIED_TEMPLATES_OPTION ) );
	}
}
