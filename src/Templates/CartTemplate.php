<?php
namespace Automattic\WooCommerce\Blocks\Templates;

/**
 * CartTemplate class.
 *
 * @internal
 */
class CartTemplate extends AbstractPageTemplate {
	/**
	 * Template slug.
	 *
	 * @return string
	 */
	public static function get_slug() {
		return 'cart';
	}

	/**
	 * Returns the page object assigned to this template/page.
	 *
	 * @return \WP_Post|null Post object or null.
	 */
	public static function get_placeholder_page() {
		$page_id = wc_get_page_id( 'cart' );
		return $page_id ? get_post( $page_id ) : null;
	}

	/**
	 * True when viewing the cart page or cart endpoint.
	 *
	 * @return boolean
	 */
	protected function is_active_template() {
		return is_cart();
	}

	/**
	 * Should return the title of the page.
	 *
	 * @return string
	 */
	public static function get_template_title() {
		return __( 'Cart', 'woo-gutenberg-products-block' );
	}

	/**
	 * Migrates an existing page using blocks to the block templates.
	 *
	 * @param string $template_content The content of the template.
	 * @return string
	 */
	public function get_default_template_content( $template_content ) {
		$page = $this->get_placeholder_page();

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
