<?php
namespace Automattic\WooCommerce\Blocks\Utils;

/**
 * Utility methods used for migrating pages to block templates.
 * {@internal This class and its methods should only be used within the BlockTemplateController.php and is not intended for public use.}
 */
class BlockTemplateMigrationUtils {

	/**
	 * Get template for a page following the page hierarchy.
	 *
	 * @param \WP_Post|null $page Page object.
	 * @return string
	 */
	public static function get_page_template( $page ) {
		$templates = array();

		if ( $page && $page->ID ) {
			$template = get_page_template_slug( $page->ID );

			if ( $template && 0 === validate_file( $template ) ) {
				$templates[] = $template;
			}

			$pagename = $page->post_name;

			if ( $pagename ) {
				$pagename_decoded = urldecode( $pagename );
				if ( $pagename_decoded !== $pagename ) {
					$templates[] = "page-{$pagename_decoded}";
				}
				$templates[] = "page-{$pagename}";
			}
		}

		$block_template = false;

		foreach ( $templates as $template ) {
			$block_template = BlockTemplateUtils::get_block_template( get_stylesheet() . '//' . $template, 'wp_template' );

			if ( $block_template && ! empty( $block_template->content ) ) {
				break;
			}
		}

		return $block_template ? $block_template->content : '';
	}

	/**
	 * Prepare default page template.
	 *
	 * @param \WP_Post $page Page object.
	 * @return string
	 */
	public static function get_default_template( $page ) {
		if ( ! $page || empty( $page->post_content ) ) {
			return '';
		}
		$default_template_content = '
			<!-- wp:group {"layout":{"inherit":true}} -->
			<div class="wp-block-group">
				<!-- wp:heading {"level":1} -->
				<h1 class="wp-block-heading">' . wp_kses_post( $page->post_title ) . '</h1>
				<!-- /wp:heading -->
				' . wp_kses_post( $page->post_content ) . '
			</div>
			<!-- /wp:group -->
		';
		return self::get_block_template_part( 'header' ) . $default_template_content . self::get_block_template_part( 'footer' );
	}

	/**
	 * Create a custom template with given content.
	 *
	 * @param \WP_Block_Template|null $template Template object.
	 * @param string                  $content Template content.
	 * @return boolean Success.
	 */
	public static function create_custom_template( $template, $content ) {
		$template_id = wp_insert_post(
			[
				'post_name'    => $template->slug,
				'post_type'    => 'wp_template',
				'post_status'  => 'publish',
				'tax_input'    => array(
					'wp_theme' => $template->theme,
				),
				'meta_input'   => array(
					'origin' => $template->source,
				),
				'post_content' => $content,
			],
			true
		);
		return $template_id && ! is_wp_error( $template_id );
	}

	/**
	 * Returns the requested template part.
	 *
	 * @param string $part The part to return.
	 * @return string
	 */
	protected static function get_block_template_part( $part ) {
		$template_part = BlockTemplateUtils::get_block_template( get_stylesheet() . '//' . $part, 'wp_template_part' );
		if ( ! $template_part || empty( $template_part->content ) ) {
			return '';
		}
		return $template_part->content;
	}
}
