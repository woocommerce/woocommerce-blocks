<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\Blocks\Domain\Package;
use Automattic\WooCommerce\Blocks\Templates\ProductAttributeTemplate;
use Automattic\WooCommerce\Blocks\Utils\BlockTemplateUtils;

/**
 * BlockTypesController class.
 *
 * @internal
 */
class BlockTemplatesController {

	/**
	 * Holds the Package instance
	 *
	 * @var Package
	 */
	private $package;

	/**
	 * Holds the path for the directory where the block templates will be kept.
	 *
	 * @var string
	 */
	private $templates_directory;

	/**
	 * Holds the path for the directory where the block template parts will be kept.
	 *
	 * @var string
	 */
	private $template_parts_directory;

	/**
	 * Directory which contains all templates
	 *
	 * @var string
	 */
	const TEMPLATES_ROOT_DIR = 'templates';

	/**
	 * Constructor.
	 *
	 * @param Package $package An instance of Package.
	 */
	public function __construct( Package $package ) {
		$this->package = $package;

		// This feature is gated for WooCommerce versions 6.0.0 and above.
		if ( defined( 'WC_VERSION' ) && version_compare( WC_VERSION, '6.0.0', '>=' ) ) {
			$root_path                      = plugin_dir_path( __DIR__ ) . self::TEMPLATES_ROOT_DIR . DIRECTORY_SEPARATOR;
			$this->templates_directory      = $root_path . BlockTemplateUtils::DIRECTORY_NAMES['TEMPLATES'];
			$this->template_parts_directory = $root_path . BlockTemplateUtils::DIRECTORY_NAMES['TEMPLATE_PARTS'];
			$this->init();
		}
	}

	/**
	 * Initialization method.
	 */
	protected function init() {
		add_action( 'template_redirect', array( $this, 'render_block_template' ) );
		add_filter( 'pre_get_block_file_template', array( $this, 'get_block_file_template' ), 10, 3 );
		add_filter( 'get_block_templates', array( $this, 'add_block_templates' ), 10, 3 );
		add_filter( 'current_theme_supports-block-templates', array( $this, 'remove_block_template_support_for_shop_page' ) );

		if ( $this->package->is_experimental_build() ) {
			add_action( 'after_switch_theme', array( $this, 'check_should_use_blockified_product_grid_templates' ), 10, 2 );
		}
	}

	/**
	 * Checks the old and current themes and determines if the "wc_blocks_use_blockified_product_grid_block_as_template"
	 * option need to be updated accordingly.
	 *
	 * @param string    $old_name Old theme name.
	 * @param \WP_Theme $old_theme Instance of the old theme.
	 * @return void
	 */
	public function check_should_use_blockified_product_grid_templates( $old_name, $old_theme ) {
		if ( ! wc_current_theme_is_fse_theme() ) {
			update_option( Options::WC_BLOCK_USE_BLOCKIFIED_PRODUCT_GRID_BLOCK_AS_TEMPLATE, wc_bool_to_string( false ) );
			return;
		}

		if ( ! $old_theme->is_block_theme() && wc_current_theme_is_fse_theme() ) {
			update_option( Options::WC_BLOCK_USE_BLOCKIFIED_PRODUCT_GRID_BLOCK_AS_TEMPLATE, wc_bool_to_string( true ) );
			return;
		}
	}

	/**
	 * This function checks if there's a block template file in `woo-gutenberg-products-block/templates/templates/`
	 * to return to pre_get_posts short-circuiting the query in Gutenberg.
	 *
	 * @param \WP_Block_Template|null $template Return a block template object to short-circuit the default query,
	 *                                               or null to allow WP to run its normal queries.
	 * @param string                  $id Template unique identifier (example: theme_slug//template_slug).
	 * @param string                  $template_type wp_template or wp_template_part.
	 *
	 * @return mixed|\WP_Block_Template|\WP_Error
	 */
	public function get_block_file_template( $template, $id, $template_type ) {
		$template_name_parts = explode( '//', $id );

		if ( count( $template_name_parts ) < 2 ) {
			return $template;
		}

		list( $template_id, $template_slug ) = $template_name_parts;

		// If the theme has an archive-product.html template, but not a taxonomy-product_cat/tag/attribute.html template let's use the themes archive-product.html template.
		if ( BlockTemplateUtils::template_is_eligible_for_product_archive_fallback( $template_slug ) ) {
			$template_path   = BlockTemplateUtils::get_theme_template_path( 'archive-product' );
			$template_object = BlockTemplateUtils::create_new_block_template_object( $template_path, $template_type, $template_slug, true );
			return BlockTemplateUtils::build_template_result_from_file( $template_object, $template_type );
		}

		// This is a real edge-case, we are supporting users who have saved templates under the deprecated slug. See its definition for more information.
		// You can likely ignore this code unless you're supporting/debugging early customised templates.
		if ( BlockTemplateUtils::DEPRECATED_PLUGIN_SLUG === strtolower( $template_id ) ) {
			// Because we are using get_block_templates we have to unhook this method to prevent a recursive loop where this filter is applied.
			remove_filter( 'pre_get_block_file_template', array( $this, 'get_block_file_template' ), 10, 3 );
			$template_with_deprecated_id = BlockTemplateUtils::get_block_template( $id, $template_type );
			// Let's hook this method back now that we have used the function.
			add_filter( 'pre_get_block_file_template', array( $this, 'get_block_file_template' ), 10, 3 );

			if ( null !== $template_with_deprecated_id ) {
				return $template_with_deprecated_id;
			}
		}

		// If we are not dealing with a WooCommerce template let's return early and let it continue through the process.
		if ( BlockTemplateUtils::PLUGIN_SLUG !== $template_id ) {
			return $template;
		}

		// If we don't have a template let Gutenberg do its thing.
		if ( ! $this->block_template_is_available( $template_slug, $template_type ) ) {
			return $template;
		}

		$directory          = $this->get_templates_directory( $template_type );
		$template_file_path = $directory . '/' . $template_slug . '.html';
		$template_object    = BlockTemplateUtils::create_new_block_template_object( $template_file_path, $template_type, $template_slug );
		$template_built     = BlockTemplateUtils::build_template_result_from_file( $template_object, $template_type );

		if ( null !== $template_built ) {
			return $template_built;
		}

		// Hand back over to Gutenberg if we can't find a template.
		return $template;
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
		if ( ! BlockTemplateUtils::supports_block_templates() ) {
			return $query_result;
		}

		$post_type      = isset( $query['post_type'] ) ? $query['post_type'] : '';
		$slugs          = isset( $query['slug__in'] ) ? $query['slug__in'] : array();
		$template_files = $this->get_block_templates( $slugs, $template_type );

		// @todo: Add apply_filters to _gutenberg_get_template_files() in Gutenberg to prevent duplication of logic.
		foreach ( $template_files as $template_file ) {

			// If we have a template which is eligible for a fallback, we need to explicitly tell Gutenberg that
			// it has a theme file (because it is using the fallback template file). And then `continue` to avoid
			// adding duplicates.
			if ( BlockTemplateUtils::set_has_theme_file_if_fallback_is_available( $query_result, $template_file ) ) {
				continue;
			}

			// If the current $post_type is set (e.g. on an Edit Post screen), and isn't included in the available post_types
			// on the template file, then lets skip it so that it doesn't get added. This is typically used to hide templates
			// in the template dropdown on the Edit Post page.
			if ( $post_type &&
				isset( $template_file->post_types ) &&
				! in_array( $post_type, $template_file->post_types, true )
			) {
				continue;
			}

			// It would be custom if the template was modified in the editor, so if it's not custom we can load it from
			// the filesystem.
			if ( 'custom' !== $template_file->source ) {
				$template = BlockTemplateUtils::build_template_result_from_file( $template_file, $template_type );
			} else {
				$template_file->title       = BlockTemplateUtils::get_block_template_title( $template_file->slug );
				$template_file->description = BlockTemplateUtils::get_block_template_description( $template_file->slug );
				$query_result[]             = $template_file;
				continue;
			}

			$is_not_custom   = false === array_search(
				wp_get_theme()->get_stylesheet() . '//' . $template_file->slug,
				array_column( $query_result, 'id' ),
				true
			);
			$fits_slug_query =
				! isset( $query['slug__in'] ) || in_array( $template_file->slug, $query['slug__in'], true );
			$fits_area_query =
				! isset( $query['area'] ) || $template_file->area === $query['area'];
			$should_include  = $is_not_custom && $fits_slug_query && $fits_area_query;
			if ( $should_include ) {
				$query_result[] = $template;
			}
		}

		// We need to remove theme (i.e. filesystem) templates that have the same slug as a customised one.
		// This only affects saved templates that were saved BEFORE a theme template with the same slug was added.
		$query_result = BlockTemplateUtils::remove_theme_templates_with_custom_alternative( $query_result );

		/**
		 * WC templates from theme aren't included in `$this->get_block_templates()` but are handled by Gutenberg.
		 * We need to do additional search through all templates file to update title and description for WC
		 * templates that aren't listed in theme.json.
		 */
		$query_result = array_map(
			function( $template ) {
				if ( 'theme' === $template->origin ) {
					return $template;
				}
				if ( $template->title === $template->slug ) {
					$template->title = BlockTemplateUtils::get_block_template_title( $template->slug );
				}
				if ( ! $template->description ) {
					$template->description = BlockTemplateUtils::get_block_template_description( $template->slug );
				}
				return $template;
			},
			$query_result
		);

		return $query_result;
	}

	/**
	 * Gets the templates saved in the database.
	 *
	 * @param array $slugs An array of slugs to retrieve templates for.
	 * @param array $template_type wp_template or wp_template_part.
	 *
	 * @return int[]|\WP_Post[] An array of found templates.
	 */
	public function get_block_templates_from_db( $slugs = array(), $template_type = 'wp_template' ) {
		$check_query_args = array(
			'post_type'      => $template_type,
			'posts_per_page' => -1,
			'no_found_rows'  => true,
			'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
				array(
					'taxonomy' => 'wp_theme',
					'field'    => 'name',
					'terms'    => array( BlockTemplateUtils::DEPRECATED_PLUGIN_SLUG, BlockTemplateUtils::PLUGIN_SLUG, get_stylesheet() ),
				),
			),
		);

		if ( is_array( $slugs ) && count( $slugs ) > 0 ) {
			$check_query_args['post_name__in'] = $slugs;
		}

		$check_query         = new \WP_Query( $check_query_args );
		$saved_woo_templates = $check_query->posts;

		return array_map(
			function( $saved_woo_template ) {
				return BlockTemplateUtils::build_template_result_from_post( $saved_woo_template );
			},
			$saved_woo_templates
		);
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
		$directory      = $this->get_templates_directory( $template_type );
		$template_files = BlockTemplateUtils::get_template_paths( $directory );
		$templates      = array();

		foreach ( $template_files as $template_file ) {
			// Skip the template if it's blockified, and we should only use classic ones.
			// Until the blockified Product Grid Block is implemented, we need to always skip the blockified templates.
			// phpcs:ignore Squiz.PHP.CommentedOutCode
			if ( // $this->package->is_experimental_build() &&
				// ! BlockTemplateUtils::should_use_blockified_product_grid_templates() &&
				strpos( $template_file, 'blockified' ) !== false ) {
				continue;
			}

			$template_slug = BlockTemplateUtils::generate_template_slug_from_path( $template_file );

			// This template does not have a slug we're looking for. Skip it.
			if ( is_array( $slugs ) && count( $slugs ) > 0 && ! in_array( $template_slug, $slugs, true ) ) {
				continue;
			}

			// If the theme already has a template, or the template is already in the list (i.e. it came from the
			// database) then we should not overwrite it with the one from the filesystem.
			if (
				BlockTemplateUtils::theme_has_template( $template_slug ) ||
				count(
					array_filter(
						$already_found_templates,
						function ( $template ) use ( $template_slug ) {
							$template_obj = (object) $template; //phpcs:ignore WordPress.CodeAnalysis.AssignmentInCondition.Found
							return $template_obj->slug === $template_slug;
						}
					)
				) > 0 ) {
				continue;
			}

			// If the theme has an archive-product.html template, but not a taxonomy-product_cat/tag/attribute.html template let's use the themes archive-product.html template.
			if ( BlockTemplateUtils::template_is_eligible_for_product_archive_fallback( $template_slug ) ) {
				$template_file = BlockTemplateUtils::get_theme_template_path( 'archive-product' );
				$templates[]   = BlockTemplateUtils::create_new_block_template_object( $template_file, $template_type, $template_slug, true );
				continue;
			}

			// At this point the template only exists in the Blocks filesystem and has not been saved in the DB,
			// or superseded by the theme.
			$templates[] = BlockTemplateUtils::create_new_block_template_object( $template_file, $template_type, $template_slug );
		}

		return $templates;
	}

	/**
	 * Get and build the block template objects from the block template files.
	 *
	 * @param array $slugs An array of slugs to retrieve templates for.
	 * @param array $template_type wp_template or wp_template_part.
	 *
	 * @return array WP_Block_Template[] An array of block template objects.
	 */
	public function get_block_templates( $slugs = array(), $template_type = 'wp_template' ) {
		$templates_from_db  = $this->get_block_templates_from_db( $slugs, $template_type );
		$templates_from_woo = $this->get_block_templates_from_woocommerce( $slugs, $templates_from_db, $template_type );
		$templates          = array_merge( $templates_from_db, $templates_from_woo );
		return BlockTemplateUtils::filter_block_templates_by_feature_flag( $templates );

	}

	/**
	 * Gets the directory where templates of a specific template type can be found.
	 *
	 * @param array $template_type wp_template or wp_template_part.
	 *
	 * @return string
	 */
	protected function get_templates_directory( $template_type = 'wp_template' ) {
		if ( 'wp_template_part' === $template_type ) {
			return $this->template_parts_directory;
		}

		// When the blockified Product Grid Block will be implemented, we need to use the blockified templates.
		// if ( $this->package->is_experimental_build() && BlockTemplateUtils::should_use_blockified_product_grid_templates() ) {
		// return $this->templates_directory . '/blockified';
		// }.

		return $this->templates_directory;
	}

	/**
	 * Checks whether a block template with that name exists in Woo Blocks
	 *
	 * @param string $template_name Template to check.
	 * @param array  $template_type wp_template or wp_template_part.
	 *
	 * @return boolean
	 */
	public function block_template_is_available( $template_name, $template_type = 'wp_template' ) {
		if ( ! $template_name ) {
			return false;
		}
		$directory = $this->get_templates_directory( $template_type ) . '/' . $template_name . '.html';

		return is_readable(
			$directory
		) || $this->get_block_templates( array( $template_name ), $template_type );
	}

	/**
	 * Renders the default block template from Woo Blocks if no theme templates exist.
	 */
	public function render_block_template() {
		if ( is_embed() || ! BlockTemplateUtils::supports_block_templates() ) {
			return;
		}

		if (
			is_singular( 'product' ) &&
			! BlockTemplateUtils::theme_has_template( 'single-product' ) &&
			$this->block_template_is_available( 'single-product' )
		) {
			add_filter( 'woocommerce_has_block_template', '__return_true', 10, 0 );
		} elseif (
			( is_product_taxonomy() && is_tax( 'product_cat' ) ) &&
			! BlockTemplateUtils::theme_has_template( 'taxonomy-product_cat' ) &&
			$this->block_template_is_available( 'taxonomy-product_cat' )
		) {
			add_filter( 'woocommerce_has_block_template', '__return_true', 10, 0 );
		} elseif (
			( is_product_taxonomy() && is_tax( 'product_tag' ) ) &&
			! BlockTemplateUtils::theme_has_template( 'taxonomy-product_tag' ) &&
			$this->block_template_is_available( 'taxonomy-product_tag' )
		) {
			add_filter( 'woocommerce_has_block_template', '__return_true', 10, 0 );
		} elseif (
			( is_post_type_archive( 'product' ) || is_page( wc_get_page_id( 'shop' ) ) ) &&
			! BlockTemplateUtils::theme_has_template( 'archive-product' ) &&
			$this->block_template_is_available( 'archive-product' )
		) {
			add_filter( 'woocommerce_has_block_template', '__return_true', 10, 0 );
		} else {
			$queried_object = get_queried_object();
			if ( is_null( $queried_object ) ) {
				return;
			}

			if ( isset( $queried_object->taxonomy ) && taxonomy_is_product_attribute( $queried_object->taxonomy ) &&
				! BlockTemplateUtils::theme_has_template( ProductAttributeTemplate::SLUG ) &&
				$this->block_template_is_available( ProductAttributeTemplate::SLUG )
			) {
				add_filter( 'woocommerce_has_block_template', '__return_true', 10, 0 );
			}
		}
	}

	/**
	 * Remove the template panel from the Sidebar of the Shop page because
	 * the Site Editor handles it.
	 *
	 * @see https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/6278
	 *
	 * @param bool $is_support Whether the active theme supports block templates.
	 *
	 * @return bool
	 */
	public function remove_block_template_support_for_shop_page( $is_support ) {
		global $pagenow, $post;

		if (
			is_admin() &&
			'post.php' === $pagenow &&
			function_exists( 'wc_get_page_id' ) &&
			is_a( $post, 'WP_Post' ) &&
			wc_get_page_id( 'shop' ) === $post->ID
		) {
			return false;
		}

		return $is_support;
	}
}
