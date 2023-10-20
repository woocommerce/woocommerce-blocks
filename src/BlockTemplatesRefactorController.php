<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\Blocks\Domain\Package;
use Automattic\WooCommerce\Blocks\Utils\BlockTemplatesUtilsRefactor;
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
		// This is necessary for the REST API used by the Site Editor to update a specific template.
		add_filter( 'get_block_file_template', array( $this, 'get_block_template_by_id' ), 10, 3 );
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
		return BlockTemplateUtils::get_block_templates_from_db( $slugs, $template_type );
	}

	/**
	 * Adds block templates to the query result. This function is used to return the list of all the templates via the REST API for the Site Editor. We don't want to apply any changes when the REST API is used.
	 *
	 * @param WP_Block_Template[] $query_result An array of templates to render that matches the query.
	 * @param array               $query An array of query vars.
	 * @param string              $template_type wp_template or wp_template_part.
	 *
	 * @return WP_Block_Template[] An array of found templates.
	 */
	public function add_block_templates( $query_result, $query, $template_type ) {
		$slugs               = isset( $query['slug__in'] ) ? $query['slug__in'] : array();
		$templates_from_woo  = $this->get_block_templates_from_woocommerce( $slugs, array(), $template_type );
		$templates_from_db   = $this->get_block_templates_from_db( $slugs, $template_type );
		$all_templates       = array_merge( $query_result, $templates_from_woo, $templates_from_db );
		$organized_templates = $this->organize_templates( $all_templates );

		if ( ! isset( $all_templates ) || isset( $all_templates ) && count( $all_templates ) === 0 || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
			return $organized_templates;
		}
		$templates = $this->render_template( end( $organized_templates ), $organized_templates );

		return is_array( $templates ) ? $templates : array( $templates );
	}

	/**
	 * Organize templates by priority.
	 *
	 * @param WP_Block_Template[] $all_templates An array of templates to render that matches the query.
	 *
	 * @return WP_Block_Template[] An array of found templates.
	 */
	private function organize_templates( $all_templates ) {
		return array_reduce(
			$all_templates,
			function( $carry, $template ) {
				$current_template = $carry[ $template->slug ] ?? null;
				if ( ! $current_template ) {
					$carry[ $template->slug ] = $template;
					return $carry;
				}

				$carry[ $template->slug ] = $this->has_high_priority( $current_template, $template );
				return $carry;
			},
			array()
		);
	}

	/**
	 * Ensure that the template with the highest priority is returned.
	 * The priority is as follows:
	 * 1. Custom templates
	 * 2. Theme templates
	 * 3. Plugin templates
	 *
	 * @param WP_Block_Template $current_template Current to template.
	 * @param WP_Block_Template $template_to_compare An array of query vars.
	 *
	 * @return boolean
	 */
	private function has_high_priority( $current_template, $template_to_compare ) {
		$priority_source = array(
			'plugin' => 0,
			'theme'  => 1,
			'custom' => 2,
		);

		$current_template_source    = $current_template->source;
		$template_to_compare_source = $template_to_compare->source;

		if ( $current_template_source === $template_to_compare_source ) {
			return str_contains( $current_template->id, 'woocommerce' ) ? $template_to_compare : $current_template;
		}

		return ( $priority_source[ $current_template_source ] > $priority_source[ $template_to_compare_source ] ) ? $current_template : $template_to_compare;

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
		$directory      = BlockTemplatesUtilsRefactor::get_templates_directory( $template_type );
		$template_files = BlockTemplatesUtilsRefactor::get_template_paths( $directory );
		$templates      = array();

		foreach ( $template_files as $template_file ) {
			$template_slug = BlockTemplatesUtilsRefactor::generate_template_slug_from_path( $template_file );

			// This template does not have a slug we're looking for. Skip it.
			if ( is_array( $slugs ) && count( $slugs ) > 0 && ! in_array( $template_slug, $slugs, true ) ) {
				continue;
			}
			$template_slug   = BlockTemplatesUtilsRefactor::generate_template_slug_from_path( $template_file );
			$template_object = BlockTemplatesUtilsRefactor::create_new_block_template_object( $template_file, $template_type, $template_slug );
			$template_built  = BlockTemplatesUtilsRefactor::build_template_result_from_file( $template_object, $template_type );
			$templates[]     = $template_built;
		}

		return $templates;
	}

	/**
	 * Gets the templates by id.
	 * This is necessary for the REST API used by the Site Editor to update a specific template.
	 *
	 * @param null   $_null .
	 * @param string $id Template id.
	 * @param string $template_type wp_template or wp_template_part.
	 *
	 * @return WP_Block_Template|null
	 */
	public function get_block_template_by_id( $_null, $id, $template_type = 'wp_template' ) {
		$templates = $this->get_block_templates_from_woocommerce( array(), array(), $template_type );

		// array_values is necessary to reset the index.
		$template = array_values(
			array_filter(
				$templates,
				function( $template ) use ( $id ) {
					return $template->id === $id;
				}
			)
		);
		if ( isset( $template ) && isset( $template[0] ) ) {
			return $this->update_template_data_rest_api( $template[0] );
		}
		return $_null;
	}

	/**
	 * Update template data for the REST API. This is necessary for the Site Editor to update a specific template.
	 *
	 * @param WP_Block_Template $template template.
	 *
	 * @return WP_Block_Template|null
	 */
	public function update_template_data_rest_api( $template ) {
		return $template;
	}

}
