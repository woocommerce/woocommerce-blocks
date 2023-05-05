<?php
namespace Automattic\WooCommerce\Blocks\Templates;

/**
 * CheckoutTemplate class.
 *
 * @internal
 */
class CheckoutTemplate {

	const SLUG = 'checkout';

	/**
	 * Constructor.
	 *
	 * Templates require FSE theme support, so this will only init if a FSE theme is active.
	 */
	public function __construct() {
		// Templates require FSE theme support.
		if ( ! wc_current_theme_is_fse_theme() ) {
			return;
		}
		$this->init();
	}

	/**
	 * Initialization method.
	 */
	protected function init() {
		add_filter( 'page_template_hierarchy', array( $this, 'update_page_template_hierarchy' ), 1 );
		add_action( 'current_screen', array( $this, 'template_editor_redirect' ) );
		add_filter( 'woocommerce_blocks_template_content', array( $this, 'default_template_content' ), 10, 3 );
	}

	/**
	 * When the page is displaying the checkout and a block theme is active, render the Checkout Template.
	 *
	 * This places the template name e.g. `checkout`, at the beginning of the template hierarchy array. The hook priority
	 * is 1 to ensure it runs first; other consumers e.g. extensions, could therefore inject their own template instead
	 * of this one when using the default priority of 10.
	 *
	 * @param array $templates Templates that match the pages_template_hierarchy.
	 */
	public function update_page_template_hierarchy( $templates ) {
		if ( is_checkout() ) {
			array_unshift( $templates, self::SLUG );
		}
		return $templates;
	}

	/**
	 * Redirect a page to the template editor if it's the checkout page and a block theme is active.
	 *
	 * @param \WP_Screen $current_screen Current screen information.
	 */
	public function template_editor_redirect( \WP_Screen $current_screen ) {
		$page_id      = wc_get_page_id( 'checkout' );
		$edit_page_id = 'page' === $current_screen->id && ! empty( $_GET['post'] ) ? absint( $_GET['post'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

		if ( $edit_page_id === $page_id ) {
			wp_safe_redirect( admin_url( 'site-editor.php?postType=wp_template&postId=woocommerce%2Fwoocommerce%2F%2Fcheckout' ) );
			exit;
		}
	}

	/**
	 * Migrates an existing page using blocks to the block templates.
	 *
	 * @param string $template_content The content of the template.
	 * @param object $template_file The template file object.
	 * @param string $template_type The type of template.
	 * @return string
	 */
	public function default_template_content( $template_content, $template_file, $template_type ) {
		if ( self::SLUG !== $template_file->slug ) {
			return $template_content;
		}

		$page_id = wc_get_page_id( 'checkout' );
		$page    = $page_id ? get_post( $page_id ) : false;

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
