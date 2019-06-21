<?php
/**
 * Returns information about the package and handles init.
 *
 * @package Automattic/WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks;

defined( 'ABSPATH' ) || exit;

/**
 * Main package class.
 */
class Package {

	/**
	 * Version.
	 *
	 * @var string
	 */
	const VERSION = '2.2.0-dev';

	/**
	 * Stores if init has ran yet.
	 *
	 * @var boolean
	 */
	protected static $did_init = false;

	/**
	 * Init the package - load the blocks library and define constants.
	 */
	public static function init() {
		if ( true === self::$did_init ) {
			return;
		}
		define( 'WGPB_VERSION', self::VERSION );
		define( 'WGPB_ABSPATH', self::get_path() . '/' );
		\Automattic\WooCommerce\Blocks\Library::instance()->init();
		self::$did_init = true;
	}

	/**
	 * Return the version of the package.
	 *
	 * @return string
	 */
	public static function get_version() {
		return self::VERSION;
	}

	/**
	 * Return the path to the package.
	 *
	 * @return string
	 */
	public static function get_path() {
		return dirname( __DIR__ );
	}
}
