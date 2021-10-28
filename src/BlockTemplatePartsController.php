<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\Blocks\Utils\BlockTemplateUtils;

/**
 * BlockTypesController class.
 *
 * @internal
 */
class BlockTemplatePartsController {

	/**
	 * Holds the path for the directory where the block template parts will be kept.
	 *
	 * @var string
	 */
	private $template_parts_directory;

	/**
	 * Directory name of the block template parts directory.
	 *
	 * @var string
	 */
	const TEMPLATE_PARTS_DIR_NAME = 'block-template-parts';

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->template_parts_directory = plugin_dir_path( __DIR__ ) . 'templates/' . self::TEMPLATE_PARTS_DIR_NAME;
		$this->init();
	}

	/**
	 * Initialization method.
	 */
	protected function init() {
		add_filter( 'get_block_template', array( $this, 'add_block_template_parts' ), 10, 3 );
		add_filter( 'get_block_templates', array( $this, 'add_block_template_parts_2' ), 10, 3 );
		// add_filter( 'default_wp_template_part_areas', array( $this, 'add_template_part_area' ), 10, 1 );
	}

	/**
	 * Add the block template objects to be used.
	 *
	 * @param array $query_result Array of template objects.
	 * @return array
	 */
	public function add_block_template_parts_2( $query_result, $query, $template_type ) {
		if ( ! gutenberg_supports_block_templates() || 'wp_template_part' !== $template_type ) {
			return $query_result;
		}

		$templates_to_omit = array();

		foreach ( $query_result as $result ) {
			array_push( $templates_to_omit, $result->slug );
		}

		$template_files = $this->get_block_template_parts( $templates_to_omit );

		foreach ( $template_files as $template_file ) {
			$query_result[] = BlockTemplateUtils::gutenberg_build_template_result_from_file( $template_file, 'wp_template_part' );
		}

		return $query_result;
	}

	/**
	 * Get and build the block template objects from the block template files.
	 *
	 * @return array
	 */
	public function get_block_template_parts( $templates_to_omit ) {
		$template_files = BlockTemplateUtils::gutenberg_get_template_paths( $this->template_parts_directory );
		$templates      = array();

		foreach ( $template_files as $template_file ) {
			$template_slug = substr(
				$template_file,
				strpos( $template_file, self::TEMPLATE_PARTS_DIR_NAME . DIRECTORY_SEPARATOR ) + 1 + strlen( self::TEMPLATE_PARTS_DIR_NAME ),
				-5
			);

			// If the theme already has a template then there is no need to load ours in.
			if ( in_array( $template_slug, $templates_to_omit, true ) || $this->theme_has_template_part( $template_slug ) ) {
				continue;
			}

			$new_template_item = array(
				'title' => ucwords( str_replace( '-', ' ', $template_slug ) ),
				'slug'  => $template_slug,
				'path'  => $template_file,
				'theme' => get_template_directory(),
				'type'  => 'wp_template_part',
				'area'  => 'uncategorized',
			);
			$templates[]       = $new_template_item;
		}

		return $templates;
	}

	// public function add_template_part_area( $area_definitions ) {
	// return array_merge(
	// $area_definitions,
	// array(
	// array(
	// 'area'        => 'mini-cart',
	// 'label'       => __( 'Mini Cart', 'woo-gutenberg-products-block' ),
	// 'description' => __(
	// 'Lorem Ipsum',
	// 'woo-gutenberg-products-block'
	// ),
	// 'icon'        => 'footer',
	// 'area_tag'    => 'div',
	// ),
	// )
	// );
	// }

	/**
	 * Add the block template part objects to be used.
	 *
	 * @param array $query_result Array of template part objects.
	 * @return array
	 */
	public function add_block_template_parts( $block_template, $id, $template_type ) {
		if ( ! empty( $block_template ) || $template_type !== 'wp_template_part' ) {
			return $block_template;
		}

		$id_parts = explode( '//', $id, 2 );
		if ( count( $id_parts ) < 2 ) {
			return null;
		}
		$template_slug = $id_parts[1];

		$new_template = array(
			'title' => ucwords( str_replace( '-', ' ', $template_slug ) ),
			'slug'  => $template_slug,
			'path'  => $this->template_parts_directory . DIRECTORY_SEPARATOR . $template_slug . '.html',
			'theme' => get_template_directory(),
			'type'  => 'wp_template_part',
			'area'  => 'mini-cart',
		);
		$template     = BlockTemplateUtils::gutenberg_build_template_result_from_file( $new_template, 'wp_template_part' );

		return $template;
	}

	/**
	 * Check if the theme has a template part. So we know if to load our own in or not.
	 *
	 * @param string $template_name name of the template part file without .html extension e.g. 'single-product'.
	 * @return boolean
	 */
	public function theme_has_template_part( $template_name ) {
		return is_readable( get_template_directory() . '/block-template-parts/' . $template_name . '.html' ) ||
			is_readable( get_stylesheet_directory() . '/block-template-parts/' . $template_name . '.html' );
	}
}
