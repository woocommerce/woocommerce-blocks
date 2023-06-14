<?php
namespace Automattic\WooCommerce\Blocks;

/**
 * Takes care of the migrations.
 *
 * @since 2.5.0
 */
class Migration {
	/**
	 * DB updates and callbacks that need to be run per version.
	 *
	 * Please note that these functions are invoked when WooCommerce Blocks is updated from a previous version,
	 * but NOT when WooCommerce Blocks is newly installed.
	 *
	 * @var array
	 */
	private $db_upgrades = array(
		'10.3.0' => array(
			'wc_blocks_update_1030_blockified_product_grid_block',
		),
	);

	/**
	 * Runs all the necessary migrations.
	 *
	 * @var array
	 */
	public function run_migrations() {
		$current_db_version = get_option( Options::WC_BLOCK_VERSION, '' );

		// This check is necessary because the version was not being set in the database until 10.3.0.
		// We can remove this check in the next months.
		if ( ! empty( get_option( 'wc_blocks_db_schema_version', '' ) ) ) {
			$this->wc_blocks_update_1030_blockified_product_grid_block();
		}

		if ( empty( $current_db_version ) ) {
			// This is a fresh install, so we don't need to run any migrations.
			return;
		}

		foreach ( $this->db_upgrades as $version => $update_callbacks ) {
			if ( version_compare( $current_db_version, $version, '<' ) ) {
				foreach ( $update_callbacks as $update_callback ) {
					$this->{$update_callback}();
				}
			}
		}
	}

	/**
	 * Set a flag to indicate if the blockified Product Grid Block should be rendered by default.
	 */
	public static function wc_blocks_update_1030_blockified_product_grid_block() {
		update_option( Options::WC_BLOCK_USE_BLOCKIFIED_PRODUCT_GRID_BLOCK_AS_TEMPLATE, wc_bool_to_string( false ) );
	}
}
