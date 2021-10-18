<?php
namespace Automattic\WooCommerce\Blocks;

final class BlockTemplateController {
	const TEMPLATE_BASE_PATH = 'block-templates';

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->init();
	}

	/**
	 * Initialization method.
	 */
	protected function init() {
		add_action( 'init', array($this, 'add_block_templates') );
	}

	/**
	 * Automatically create template for product post types which uses the legacy-single-product block.
	 */
	public function add_block_templates() {
		add_filter('get_block_templates', function(  $query_result, $query ) {
			if ( ! $query ) {
				$template_files = $this->get_block_template_files();
				foreach($template_files as $template_file) {
					$query_result[] = _gutenberg_build_template_result_from_file( $template_file, 'wp_template' );
				}
			}
			return $query_result;
		}, 10, 3);
	}

	/**
	 * Look up block-template/files
	 *
	 * @return array;
	 */
	public function get_block_template_files() {
		$theme_dir = plugin_dir_path( __FILE__ ) . '../templates/' . self::TEMPLATE_BASE_PATH;
		$template_files = _gutenberg_get_template_paths( $theme_dir );
		$templates = array();

		foreach($template_files as $template_file) {
			$template_slug = substr(
				$template_file,
				// Starting position of slug.
				strpos( $template_file, self::TEMPLATE_BASE_PATH . DIRECTORY_SEPARATOR ) + 1 + strlen( self::TEMPLATE_BASE_PATH ),
				// Subtract ending '.html'.
				-5
			);
			$new_template_item = array(
				'title' => ucwords(str_replace('-', ' ', $template_slug)),
				'slug'  => $template_slug,
				'path'  => $template_file,
				'theme' => get_template_directory(),
				'type'  => 'wp_template',
			);

			$templates[] = $new_template_item;
		}

		return $templates;
	}
}
