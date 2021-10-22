<?php
namespace Automattic\WooCommerce\Blocks\Utils;

/**
 * ThemeUtils class used for custom utility functions for themes.
 */
class ThemeUtils {
	/**
	 * Checks if the current theme is FSE block templates theme.
	 *
	 * @return boolean Whether the current theme supports block templates
	 */
	public static function is_fse_theme() {
		return is_readable( get_theme_file_path( '/block-templates/index.html' ) );
	}

	/**
	 * Checks if the current theme is FSE block templates theme.
	 *
	 * @return boolean Whether the current theme supports block templates
	 */
	public static function supports_block_templates() {
		return current_theme_supports( 'block-templates' ) || self::is_fse_theme();
	}
}
