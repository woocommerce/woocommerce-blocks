<?php
namespace Automattic\WooCommerce\Blocks\Templates;

/**
 * CartTemplate class.
 *
 * @internal
 */
class CartTemplate {

	const SLUG = 'cart';

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
		add_filter( 'page_template_hierarchy', array( $this, 'update_page_template_hierarchy' ), 1 );
		add_filter( 'woocommerce_blocks_template_content', array( $this, 'maybe_migrate_page_content_to_template' ), 10, 3 );
	}

	/**
	 * When the page is displaying the cart and a block theme is active, render the Cart Template.
	 *
	 * This places the template name e.g. `cart`, at the beginning of the template hierarchy array. The hook priority
	 * is 1 to ensure it runs first; other consumers e.g. extensions, could therefore inject their own template instead
	 * of this one when using the default priority of 10.
	 *
	 * @param array $templates Templates that match the pages_template_hierarchy.
	 */
	public function update_page_template_hierarchy( $templates ) {
		if ( is_cart() && wc_current_theme_is_fse_theme() ) {
			array_unshift( $templates, self::SLUG );
		}
		return $templates;
	}

	/**
	 * Migrates an existing page using blocks to the block templates.
	 *
	 * @param string $template_content The content of the template.
	 * @param object $template_file The template file object.
	 * @param string $template_type The type of template.
	 * @return string
	 */
	public function maybe_migrate_page_content_to_template( $template_content, $template_file, $template_type ) {
		if ( self::SLUG !== $template_file->slug ) {
			return $template_content;
		}

		$page_id = wc_get_page_id( 'cart' );
		$page    = $page_id ? get_post( $page_id ) : false;

		if ( $page && ! empty( $page->post_content ) ) {
			$template_content = '
				<!-- wp:template-part {"slug":"header","tagName":"header"} /-->
				<!-- wp:group {"layout":{"inherit":true}} -->
				<div class="wp-block-group">
					<!-- wp:heading {"level":1} -->
					<h1 class="wp-block-heading">' . wp_kses_post( $page->post_title ) . '</h1>
					<!-- /wp:heading -->
					' . wp_kses_post( $page->post_content ) . '
				</div>
				<!-- /wp:group -->
				<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
			';
		}

		return $template_content;
	}
}
