<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\Blocks\Utils\BlockTemplateUtils;

/**
 * BlockTypesController class.
 *
 * @internal
 */
class BlockTemplatesController {

	/**
	 * Holds the path for the directory where the block templates will be kept.
	 *
	 * @var string
	 */
	private $templates_directory;

	/**
	 * Directory name of the block template directory.
	 *
	 * @var string
	 */
	const TEMPLATES_DIR_NAME = 'block-templates';

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->templates_directory = plugin_dir_path( __DIR__ ) . 'templates/' . self::TEMPLATES_DIR_NAME;
		$this->init();
	}

	/**
	 * Initialization method.
	 */
	protected function init() {
		add_filter( 'get_block_templates', array( $this, 'add_block_templates' ), 10, 3 );
		add_action( 'template_redirect', array( $this, 'render_block_template' ) );
		add_filter( 'pre_get_block_template', array( $this, 'maybe_return_blocks_template' ), 10, 3 );
	}

	/**
	 * This function checks if there's a blocks template (ultimately it resolves either a saved blocks template from the
	 * database or a template file in `woo-gutenberg-products/block/templates/block-templates/`)
	 * to return to pre_get_posts short-circuiting the query in Gutenberg.
	 *
	 * @param \WP_Block_Template|null $template Return a block template object to short-circuit the default query,
	 *                                               or null to allow WP to run its normal queries.
	 * @param string                  $id Template unique identifier (example: theme_slug//template_slug).
	 * @param array                   $template_type wp_template or wp_template_part.
	 *
	 * @return mixed|\WP_Block_Template|\WP_Error
	 */
	public function maybe_return_blocks_template( $template, $id, $template_type ) {
		$template_name_parts = explode( '//', $id );
		if ( count( $template_name_parts ) < 2 ) {
			return $template;
		}
		list( , $slug ) = $template_name_parts;

		// Remove the filter at this point because if we don't then this function will infinite loop.
		remove_filter( 'pre_get_block_template', array( $this, 'maybe_return_blocks_template' ), 10, 3 );

		// Check if the theme has a saved version of this template before falling back to the woo one. Please note how
		// the slug has not been modified at this point, we're still using the default one passed to this hook.
		$maybe_template = gutenberg_get_block_template( $id, $template_type );
		if ( null !== $maybe_template ) {
			return $maybe_template;
		}

		// Theme-based template didn't exist, try switching the theme to woocommerce and try again. This function has
		// been unhooked so won't run again.
		add_filter( 'get_block_template', array( $this, 'get_single_block_template' ), 10, 3 );
		$maybe_template = gutenberg_get_block_template( 'woocommerce//' . $slug, $template_type );

		// Re-hook this function, it was only unhooked to stop recursion.
		add_filter( 'pre_get_block_template', array( $this, 'maybe_return_blocks_template' ), 10, 3 );
		remove_filter( 'get_block_template', array( $this, 'get_single_block_template' ), 10, 3 );
		if ( null !== $maybe_template ) {
			return $maybe_template;
		}

		// At this point we haven't had any luck finding a template. Give up and let Gutenberg take control again.
		return $template;
	}

	/**
	 * Runs on the get_block_template hook. If a template is already found and passed to this function, then return it
	 * and don't run.
	 * If a template is *not* passed, try to look for one that matches the ID in the database, if that's not found defer
	 * to Blocks templates files. Priority goes: DB-Theme, DB-Blocks, Filesystem-Theme, Filesystem-Blocks.
	 *
	 * @param \WP_Block_Template $template The found block template.
	 * @param string             $id Template unique identifier (example: theme_slug//template_slug).
	 * @param array              $template_type wp_template or wp_template_part.
	 *
	 * @return mixed|null
	 */
	public function get_single_block_template( $template, $id, $template_type ) {

		// The template was already found before the filter runs, just return it immediately.
		if ( null !== $template ) {
			return $template;
		}

		$template_name_parts = explode( '//', $id );
		if ( count( $template_name_parts ) < 2 ) {
			return $template;
		}
		list( , $slug ) = $template_name_parts;

		// If this blocks template doesn't exist then we should just skip the function and let Gutenberg handle it.
		if ( ! $this->default_block_template_is_available( $slug ) ) {
			return $template;
		}

		$available_templates = $this->get_block_templates();

		// array_values is used to rebase the array back to being 0-indexed.
		$matched_templates = array_values(
			array_filter(
				$available_templates,
				function( $available_template ) use ( $slug ) {
					$available_template = (object) $available_template;
					return $available_template->slug === $slug;
				}
			)
		);
		return count( $matched_templates > 0 ) ? (object) $matched_templates[0] : $template;
	}

	/**
	 * Add the block template objects to be used.
	 *
	 * @param array $query_result Array of template objects.
	 * @param array $query Optional. Arguments to retrieve templates.
	 * @param array $template_type wp_template or wp_template_part.
	 * @return array
	 */
	public function add_block_templates( $query_result, $query, $template_type ) {
		if ( ! gutenberg_supports_block_templates() || 'wp_template' !== $template_type ) {
			return $query_result;
		}

		$post_type      = isset( $query['post_type'] ) ? $query['post_type'] : '';
		$template_files = $this->get_block_templates();

		// @todo: Add apply_filters to _gutenberg_get_template_files() in Gutenberg to prevent duplication of logic.
		foreach ( $template_files as $template_file ) {

			// It would be custom if the template was modified in the editor, so if it's not custom we can load it from
			// the filesystem.
			if ( $post_type && 'custom' !== $template_file->source ) {
				$query_result[] = BlockTemplateUtils::gutenberg_build_template_result_from_file( $template_file, 'wp_template' );
				continue;
			}

			$template = BlockTemplateUtils::gutenberg_build_template_result_from_file( $template_file, 'wp_template' );

			if ( $post_type &&
				isset( $template->post_types ) &&
				! in_array( $post_type, $template->post_types, true )
			) {
				continue;
			}

			$is_not_custom   = false === array_search(
				wp_get_theme()->get_stylesheet() . '//' . $template_file['slug'],
				array_column( $query_result, 'id' ),
				true
			);
			$fits_slug_query =
				! isset( $query['slug__in'] ) || in_array( $template_file['slug'], $query['slug__in'], true );
			$fits_area_query =
				! isset( $query['area'] ) || $template_file['area'] === $query['area'];
			$should_include  = $is_not_custom && $fits_slug_query && $fits_area_query;
			if ( $should_include ) {
				$query_result[] = $template;
			}
		}

		return $query_result;
	}

	/**
	 * Get and build the block template objects from the block template files.
	 *
	 * @return array
	 */
	public function get_block_templates() {
		$template_files = BlockTemplateUtils::gutenberg_get_template_paths( $this->templates_directory );
		$templates      = array();

		// Check if the template has been saved in the database first.
		$check_query_args    = array(
			'post_type'      => 'wp_template',
			'posts_per_page' => -1,
			'no_found_rows'  => true,
			'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
				array(
					'taxonomy' => 'wp_theme',
					'field'    => 'name',
					'terms'    => 'woocommerce',
				),
			),
		);
		$check_query         = new \WP_Query( $check_query_args );
		$saved_woo_templates = $check_query->posts;

		// From a WordPress post, build the template object and add it to our list.
		foreach ( $saved_woo_templates as $saved_woo_template ) {
			$templates[] = BlockTemplateUtils::gutenberg_build_template_result_from_post( $saved_woo_template );
		}

		foreach ( $template_files as $template_file ) {
			$template_slug = substr(
				$template_file,
				strpos( $template_file, self::TEMPLATES_DIR_NAME . DIRECTORY_SEPARATOR ) + 1 + strlen( self::TEMPLATES_DIR_NAME ),
				-5
			);

			// If the theme already has a template, or the template is already in the list (i.e. it came from the
			// database) then we should not overwrite it with the one from the filesystem.
			if (
				$this->theme_has_template( $template_slug ) ||
				count(
					array_filter(
						$templates,
						function ( $template ) use ( $template_slug ) {
							$template_obj = (object) $template; //phpcs:ignore WordPress.CodeAnalysis.AssignmentInCondition.Found
							return $template_obj->slug === $template_slug;
						}
					)
				) > 0 ) {
				continue;
			}

			// At this point the template only exists in the Blocks filesystem and has not been saved in the DB,
			// or superseded by the theme.
			$new_template_item = array(
				'slug'        => $template_slug,
				'path'        => $template_file,
				'type'        => 'wp_template',
				'theme'       => 'woocommerce',
				'description' => '',
			);
			$templates[]       = $new_template_item;
		}
		return $templates;
	}

	/**
	 * Check if the theme has a template. So we know if to load our own in or not.
	 *
	 * @param string $template_name name of the template file without .html extension e.g. 'single-product'.
	 * @return boolean
	 */
	public function theme_has_template( $template_name ) {
		return is_readable( get_template_directory() . '/block-templates/' . $template_name . '.html' ) ||
			is_readable( get_stylesheet_directory() . '/block-templates/' . $template_name . '.html' );
	}

	/**
	 * Checks whether a block template with that name exists in Woo Blocks
	 *
	 * @param string $template_name Template to check.
	 * @return boolean
	 */
	public function default_block_template_is_available( $template_name ) {
		if ( ! $template_name ) {
			return false;
		}

		return is_readable(
			$this->templates_directory . '/' . $template_name . '.html'
		);
	}

	/**
	 * Renders the default block template from Woo Blocks if no theme templates exist.
	 */
	public function render_block_template() {
		if ( is_embed() || ! function_exists( 'gutenberg_supports_block_templates' ) || ! gutenberg_supports_block_templates() ) {
			return;
		}

		if (
			is_singular( 'product' ) &&
			! $this->theme_has_template( 'single-product' ) &&
			$this->default_block_template_is_available( 'single-product' )
		) {
			add_filter( 'woocommerce_has_block_template', '__return_true', 10, 0 );
		} elseif (
			is_tax() &&
			! $this->theme_has_template( 'taxonomy-product_cat' ) &&
			$this->default_block_template_is_available( 'taxonomy-product_cat' )
		) {
			add_filter( 'woocommerce_has_block_template', '__return_true', 10, 0 );
		} elseif (
			( is_post_type_archive( 'product' ) || is_page( wc_get_page_id( 'shop' ) ) ) &&
			! $this->theme_has_template( 'archive-product' ) &&
			$this->default_block_template_is_available( 'archive-product' )
		) {
			add_filter( 'woocommerce_has_block_template', '__return_true', 10, 0 );
		}
	}
}
