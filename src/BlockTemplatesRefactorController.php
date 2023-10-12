<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\Blocks\Domain\Package;
use Automattic\WooCommerce\Blocks\Utils\BlockTemplateUtils;


/**
 * BlockTypesController class.
 *
 * @internal
 */
class BlockTemplatesRefactorController {

	/**
	 * Directory which contains all templates
	 *
	 * @var string
	 */
	const TEMPLATES_ROOT_DIR = 'templates';

	/**
	 * Package instance.
	 *
	 * @var Package
	 */
	private $package;

	/**
	 * Constructor.
	 *
	 * @param Package $package An instance of Package.
	 */
	public function __construct( Package $package ) {
		$this->package = $package;

		$feature_gating                                 = $package->feature();
		$is_block_templates_controller_refactor_enabled = $feature_gating->is_block_templates_controller_refactor_enabled();

		// This feature is gated for WooCommerce versions 6.0.0 and above.
		if ( defined( 'WC_VERSION' ) && version_compare( WC_VERSION, '6.0.0', '>=' ) && $is_block_templates_controller_refactor_enabled ) {
			$this->init();
		}
	}

	/**
	 * Initialization method.
	 */
	protected function init() {
		add_filter( 'get_block_templates', array( $this, 'add_block_templates' ), 10, 3 );
		add_filter( 'woocommerce_has_block_template', '__return_true', 10, 0 );
	}

	/**
	 * Gets the templates saved in the database.
	 *
	 * @param array  $slugs An array of slugs to retrieve templates for.
	 * @param string $template_type wp_template or wp_template_part.
	 *
	 * @return int[]|\WP_Post[] An array of found templates.
	 */
	public function get_block_templates_from_db( $slugs = array(), $template_type = 'wp_template' ) {
		wc_deprecated_function( 'BlockTemplatesController::get_block_templates_from_db()', '7.8', '\Automattic\WooCommerce\Blocks\Utils\BlockTemplateUtils::get_block_templates_from_db()' );
		return BlockTemplateUtils::get_block_templates_from_db( $slugs, $template_type );
	}

	public function add_block_templates( $query_result, $query, $template_type ) {
		$slugs              = isset( $query['slug__in'] ) ? $query['slug__in'] : array();
		$templates_from_woo = $this->get_block_templates_from_woocommerce( $slugs, array(), $template_type );
		$templates_from_db  = $this->get_block_templates_from_db( $slugs, $template_type );
		$all_templates      = array_merge( $query_result, $templates_from_db, $templates_from_woo );
		if ( isset( $all_templates ) && count( $all_templates ) === 0 ) {
			return $all_templates;
		}
		return $this->render_template( end( $all_templates ), $all_templates );
	}

	/**
	 * Renders the template.
	 *
	 * @param WP_Template         $template_to_render The template to render.
	 * @param WP_Block_Template[] $all_templates An array of templates to render that matches the query.
	 *
	 * @return WP_Block_Template[] An array of found templates.
	 */
	public function render_template( $template_to_render, $all_templates ) {
		return $all_templates;
	}


	/**
	 * Gets the templates from the WooCommerce blocks directory, skipping those for which a template already exists
	 * in the theme directory.
	 *
	 * @param string[] $slugs An array of slugs to filter templates by. Templates whose slug does not match will not be returned.
	 * @param array    $already_found_templates Templates that have already been found, these are customised templates that are loaded from the database.
	 * @param string   $template_type wp_template or wp_template_part.
	 *
	 * @return array Templates from the WooCommerce blocks plugin directory.
	 */
	public function get_block_templates_from_woocommerce( $slugs, $already_found_templates, $template_type = 'wp_template' ) {
		$directory      = BlockTemplateUtils::get_templates_directory( $template_type );
		$template_files = BlockTemplateUtils::get_template_paths( $directory );
		$templates      = array();

		foreach ( $template_files as $template_file ) {
			$template_slug = BlockTemplateUtils::generate_template_slug_from_path( $template_file );
			// This template does not have a slug we're looking for. Skip it.
			if ( is_array( $slugs ) && count( $slugs ) > 0 && ! in_array( $template_slug, $slugs, true ) ) {
				continue;
			}

			$template_object = BlockTemplateUtils::create_new_block_template_object( $template_file, $template_type, $template_slug );
			$template_built  = BlockTemplateUtils::build_template_result_from_file( $template_object, $template_type );
			$templates[]     = $template_built;
		}

		return $templates;
	}

}
