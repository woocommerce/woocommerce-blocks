<?php
namespace Automattic\WooCommerce\Blocks\Utils;

/**
 * BlockTemplateUtils class used for serving block templates from Woo Blocks.
 * IMPORTANT: These methods have been duplicated from Gutenberg/lib/full-site-editing/block-templates.php as those functions are not for public usage.
 */
class BlockTemplateUtils {
	/**
	 * Returns an array containing the references of
	 * the passed blocks and their inner blocks.
	 *
	 * @param array $blocks array of blocks.
	 *
	 * @return array block references to the passed blocks and their inner blocks.
	 */
	public static function gutenberg_flatten_blocks( &$blocks ) {
		$all_blocks = array();
		$queue      = array();
		foreach ( $blocks as &$block ) {
			$queue[] = &$block;
		}
		$queue_count = count( $queue );

		while ( $queue_count > 0 ) {
			$block = &$queue[0];
			array_shift( $queue );
			$all_blocks[] = &$block;

			if ( ! empty( $block['innerBlocks'] ) ) {
				foreach ( $block['innerBlocks'] as &$inner_block ) {
					$queue[] = &$inner_block;
				}
			}

			$queue_count = count( $queue );
		}

		return $all_blocks;
	}

	/**
	 * Parses wp_template content and injects the current theme's
	 * stylesheet as a theme attribute into each wp_template_part
	 *
	 * @param string $template_content serialized wp_template content.
	 *
	 * @return string Updated wp_template content.
	 */
	public static function gutenberg_inject_theme_attribute_in_content( $template_content ) {
		$has_updated_content = false;
		$new_content         = '';
		$template_blocks     = parse_blocks( $template_content );

		$blocks = self::gutenberg_flatten_blocks( $template_blocks );
		foreach ( $blocks as &$block ) {
			if (
				'core/template-part' === $block['blockName'] &&
				! isset( $block['attrs']['theme'] )
			) {
				$block['attrs']['theme'] = wp_get_theme()->get_stylesheet();
				$has_updated_content     = true;
			}
		}

		if ( $has_updated_content ) {
			foreach ( $template_blocks as &$block ) {
				$new_content .= serialize_block( $block );
			}

			return $new_content;
		}

		return $template_content;
	}


	/**
	 * Attempts to add custom template information to the template item.
	 *
	 * @param array $template_item Template to add information to (requires 'slug' field).
	 * @return array Template
	 */
	public static function gutenberg_add_template_info( $template_item ) {
		if ( ! \WP_Theme_JSON_Resolver_Gutenberg::theme_has_support() ) {
			return $template_item;
		}

		$theme_data = \WP_Theme_JSON_Resolver_Gutenberg::get_theme_data()->get_custom_templates();
		if ( isset( $theme_data[ $template_item['slug'] ] ) ) {
			$template_item['title']     = $theme_data[ $template_item['slug'] ]['title'];
			$template_item['postTypes'] = $theme_data[ $template_item['slug'] ]['postTypes'];
		}

		return $template_item;
	}

	/**
	 * Retrieves the template file from the theme for a given slug.
	 *
	 * @internal
	 *
	 * @param string $template_type wp_template or wp_template_part.
	 * @param string $slug template slug.
	 *
	 * @return array|null Template.
	 */
	public static function gutenberg_get_template_file( $template_type, $slug ) {
		$template_base_paths = array(
			'wp_template'      => 'block-templates',
			'wp_template_part' => 'block-template-parts',
		);
		$themes              = array(
			get_stylesheet() => get_stylesheet_directory(),
			get_template()   => get_template_directory(),
		);
		foreach ( $themes as $theme_slug => $theme_dir ) {
			$file_path = $theme_dir . '/' . $template_base_paths[ $template_type ] . '/' . $slug . '.html';
			if ( file_exists( $file_path ) ) {
				$new_template_item = array(
					'slug'  => $slug,
					'path'  => $file_path,
					'theme' => $theme_slug,
					'type'  => $template_type,
				);

				if ( 'wp_template_part' === $template_type ) {
					return self::gutenberg_add_template_part_area_info( $new_template_item );
				}

				if ( 'wp_template' === $template_type ) {
					return self::gutenberg_add_template_info( $new_template_item );
				}

				return $new_template_item;
			}
		}

		return null;
	}

	/**
	 * Attempts to add the template part's area information to the input template.
	 *
	 * @param array $template_info Template to add information to (requires 'type' and 'slug' fields).
	 *
	 * @return array Template.
	 */
	public static function gutenberg_add_template_part_area_info( $template_info ) {
		if ( \WP_Theme_JSON_Resolver_Gutenberg::theme_has_support() ) {
			$theme_data = \WP_Theme_JSON_Resolver_Gutenberg::get_theme_data()->get_template_parts();
		}

		if ( isset( $theme_data[ $template_info['slug'] ]['area'] ) ) {
			$template_info['title'] = $theme_data[ $template_info['slug'] ]['title'];
			$template_info['area']  = gutenberg_filter_template_part_area( $theme_data[ $template_info['slug'] ]['area'] );
		} else {
			$template_info['area'] = WP_TEMPLATE_PART_AREA_UNCATEGORIZED;
		}

		return $template_info;
	}

	/**
	 * Build a unified template object based a post Object.
	 *
	 * @param \WP_Post $post Template post.
	 *
	 * @return \WP_Block_Template|\WP_Error Template.
	 */
	public static function gutenberg_build_template_result_from_post( $post ) {
		$default_template_types = gutenberg_get_default_template_types();
		$terms                  = get_the_terms( $post, 'wp_theme' );

		if ( is_wp_error( $terms ) ) {
			return $terms;
		}

		if ( ! $terms ) {
			return new \WP_Error( 'template_missing_theme', __( 'No theme is defined for this template.', 'woo-gutenberg-products-block' ) );
		}

		$theme          = $terms[0]->name;
		$has_theme_file = true;

		$template                 = new \WP_Block_Template();
		$template->wp_id          = $post->ID;
		$template->id             = $theme . '//' . $post->post_name;
		$template->theme          = $theme;
		$template->content        = $post->post_content;
		$template->slug           = $post->post_name;
		$template->source         = 'custom';
		$template->type           = $post->post_type;
		$template->description    = $post->post_excerpt;
		$template->title          = $post->post_title;
		$template->status         = $post->post_status;
		$template->has_theme_file = $has_theme_file;
		$template->is_custom      = true;

		if ( 'wp_template' === $post->post_type && isset( $default_template_types[ $template->slug ] ) ) {
			$template->is_custom = false;
		}

		if ( 'wp_template_part' === $post->post_type ) {
			$type_terms = get_the_terms( $post, 'wp_template_part_area' );
			if ( ! is_wp_error( $type_terms ) && false !== $type_terms ) {
				$template->area = $type_terms[0]->name;
			}
		}

		return $template;
	}

	/**
	 * Build a unified template object based on a theme file.
	 *
	 * @param array $template_file Theme file.
	 * @param array $template_type wp_template or wp_template_part.
	 *
	 * @return \WP_Block_Template Template.
	 */
	public static function gutenberg_build_template_result_from_file( $template_file, $template_type ) {
		$template_file          = (object) $template_file;
		$default_template_types = function_exists( 'gutenberg_get_default_template_types' ) ? gutenberg_get_default_template_types() : array();
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$template_content = file_get_contents( $template_file->path );
		$theme            = wp_get_theme()->get_stylesheet();

		$template                 = new \WP_Block_Template();
		$template->id             = 'woocommerce//' . $template_file->slug;
		$template->theme          = 'woocommerce';
		$template->content        = self::gutenberg_inject_theme_attribute_in_content( $template_content );
		$template->source         = 'woocommerce';
		$template->slug           = $template_file->slug;
		$template->type           = $template_type;
		$template->title          = ! empty( $template_file->title ) ? $template_file->title : $template_file->slug;
		$template->status         = 'publish';
		$template->has_theme_file = true;
		$template->is_custom      = false; // Templates loaded from the filesystem aren't custom, ones that have been edited and loaded from the DB are.
		$template->title          = self::convert_slug_to_title( $template_file->slug );
		return $template;
	}

	/**
	 * Finds all nested template part file paths in a theme's directory.
	 *
	 * @param string $base_directory The theme's file path.
	 * @return array $path_list A list of paths to all template part files.
	 */
	public static function gutenberg_get_template_paths( $base_directory ) {
		$path_list = array();
		if ( file_exists( $base_directory ) ) {
			$nested_files      = new \RecursiveIteratorIterator( new \RecursiveDirectoryIterator( $base_directory ) );
			$nested_html_files = new \RegexIterator( $nested_files, '/^.+\.html$/i', \RecursiveRegexIterator::GET_MATCH );
			foreach ( $nested_html_files as $path => $file ) {
				$path_list[] = $path;
			}
		}
		return $path_list;
	}

	/**
	 * Converts template slugs into readable titles.
	 *
	 * @param string $template_slug The templates slug (e.g. single-product).
	 * @return string Human friendly title converted from the slug.
	 */
	public static function convert_slug_to_title( $template_slug ) {
		switch ( $template_slug ) {
			case 'single-product':
				return __( 'Single Product Page', 'woo-gutenberg-products-block' );
			case 'archive-product':
				return __( 'Product Archive Page', 'woo-gutenberg-products-block' );
			case 'taxonomy-product_cat':
				return __( 'Product Taxonomy Page', 'woo-gutenberg-products-block' );
			default:
				// Replace all hyphens and underscores with spaces.
				return ucwords( preg_replace( '/[\-_]/', ' ', $template_slug ) );
		}
	}
}
