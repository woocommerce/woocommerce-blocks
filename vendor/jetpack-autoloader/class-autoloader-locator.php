<?php
/**
 * This file was automatically generated by automattic/jetpack-autoloader.
 *
 * @package automattic/jetpack-autoloader
 */

namespace Automattic\Jetpack\Autoloader\jpe03a7aa4b560373d14c4cc92f4aba09f;

 // phpcs:ignore

use Automattic\Jetpack\Autoloader\AutoloadGenerator;

/**
 * This class locates autoloaders.
 */
class Autoloader_Locator {

	/**
	 * The object for comparing autoloader versions.
	 *
	 * @var Version_Selector
	 */
	private $version_selector;

	/**
	 * The constructor.
	 *
	 * @param Version_Selector $version_selector The version selector object.
	 */
	public function __construct( $version_selector ) {
		$this->version_selector = $version_selector;
	}

	/**
	 * Finds the path to the plugin with the latest autoloader.
	 *
	 * @param array  $plugin_paths An array of plugin paths.
	 * @param string $latest_version The latest version reference.
	 *
	 * @return string|null
	 */
	public function find_latest_autoloader( $plugin_paths, &$latest_version ) {
		$latest_plugin = null;

		foreach ( $plugin_paths as $plugin_path ) {
			$version = $this->get_autoloader_version( $plugin_path );
			if ( ! $this->version_selector->is_version_update_required( $latest_version, $version ) ) {
				continue;
			}

			$latest_version = $version;
			$latest_plugin  = $plugin_path;
		}

		return $latest_plugin;
	}

	/**
	 * Gets the path to the autoloader.
	 *
	 * @param string $plugin_path The path to the plugin.
	 *
	 * @return string
	 */
	public function get_autoloader_path( $plugin_path ) {
		return trailingslashit( $plugin_path ) . 'vendor/autoload_packages.php';
	}

	/**
	 * Gets the version for the autoloader.
	 *
	 * @param string $plugin_path The path to the plugin.
	 *
	 * @return string|null
	 */
	public function get_autoloader_version( $plugin_path ) {
		$classmap = trailingslashit( $plugin_path ) . 'vendor/composer/jetpack_autoload_classmap.php';
		if ( ! file_exists( $classmap ) ) {
			return null;
		}

		$classmap = require $classmap;
		if ( isset( $classmap[ AutoloadGenerator::class ] ) ) {
			return $classmap[ AutoloadGenerator::class ]['version'];
		}

		return null;
	}
}
