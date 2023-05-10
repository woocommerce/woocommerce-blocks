<?php
namespace Automattic\WooCommerce\Blocks\Templates;

/**
 * CheckoutTemplate class.
 *
 * @internal
 */
class CheckoutTemplate extends AbstractPageTemplate {
	/**
	 * Template slug.
	 *
	 * @return string
	 */
	public static function get_slug() {
		return 'checkout';
	}

	/**
	 * Returns the page object assigned to this template/page used for legacy purposes. Pages are no longer required.
	 *
	 * @return \WP_Post|null Post object or null.
	 */
	public static function get_legacy_page() {
		$page_id = wc_get_page_id( 'checkout' );
		return $page_id ? get_post( $page_id ) : null;
	}

	/**
	 * True when viewing the cart page or cart endpoint.
	 *
	 * @return boolean
	 */
	public function is_active_template() {
		return is_checkout();
	}

	/**
	 * Should return the title of the page.
	 *
	 * @return string
	 */
	protected function get_template_title() {
		return __( 'Checkout', 'woo-gutenberg-products-block' );
	}

	/**
	 * Migrates an existing page using blocks to the block templates.
	 *
	 * @param string $template_content The content of the template.
	 * @return string
	 */
	public function get_default_template_content( $template_content ) {
		$page = $this->get_legacy_page();

		if ( $page && ! empty( $page->post_content ) ) {
			$template_content = '
				<!-- wp:group {"layout":{"inherit":true}} -->
				<div class="wp-block-group">
					<!-- wp:heading {"level":1} -->
					<h1 class="wp-block-heading">' . wp_kses_post( $page->post_title ) . '</h1>
					<!-- /wp:heading -->
					' . wp_kses_post( $page->post_content ) . '
				</div>
				<!-- /wp:group -->
			';
		}

		return $template_content;
	}
}
