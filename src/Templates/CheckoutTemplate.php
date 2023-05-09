<?php
namespace Automattic\WooCommerce\Blocks\Templates;

use Automattic\WooCommerce\Blocks\Utils\SettingsUtils;

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
	 * Templates require block themes support, so this will only init if a block theme is active.
	 */
	public function __construct() {
		if ( ! wc_current_theme_is_fse_theme() ) {
			return;
		}
		$this->init();
	}

	/**
	 * Initialization method.
	 */
	protected function init() {
		// Register the endpoint in the rewrite rules.
		add_action( 'init', array( $this, 'add_endpoint' ) );
		add_filter( 'woocommerce_is_checkout', array( $this, 'is_checkout' ) );
		add_filter( 'pre_get_document_title', array( $this, 'endpoint_page_title' ) );

		// Handle settings for endpoints.
		add_filter( 'woocommerce_settings_pages', array( $this, 'add_endpoint_field_to_settings_page' ) );
		add_action( 'after_switch_theme', 'flush_rewrite_rules' );
		add_action( 'update_option_woocommerce_checkout_pay_endpoint', 'flush_rewrite_rules' );

		add_filter( 'page_template_hierarchy', array( $this, 'update_page_template_hierarchy' ), 1 );
		add_filter( 'frontpage_template_hierarchy', array( $this, 'update_page_template_hierarchy' ), 1 );
		add_filter( 'woocommerce_blocks_template_content', array( $this, 'default_template_content' ), 10, 3 );
		add_action( 'current_screen', array( $this, 'template_editor_redirect' ) );
	}

	/**
	 * Get the default endpoint for the template. This defaults to checkout unless a page already exists.
	 *
	 * @return string
	 */
	protected function get_default_endpoint() {
		$default = __( 'checkout', 'woo-gutenberg-products-block' );

		if ( wc_get_page_id( 'checkout' ) ) {
			$page_data = get_post( wc_get_page_id( 'checkout' ) );
			return $page_data->post_name ?: $default;
		}

		return $default;
	}

	/**
	 * URL to edit the template.
	 *
	 * @return string
	 */
	protected function get_edit_template_url() {
		return admin_url( 'site-editor.php?postType=wp_template&postId=woocommerce%2Fwoocommerce%2F%2Fcheckout' );
	}

	/**
	 * Add a query var for the checkout. This will allow to to detect when the user is viewing the checkout.
	 */
	public function add_endpoint() {
		$endpoint   = get_option( 'woocommerce_checkout_page_endpoint', $this->get_default_endpoint() );
		$query_vars = WC()->query->get_query_vars();

		add_rewrite_endpoint( $endpoint . '/' . $query_vars['order-received'], \EP_ROOT, $query_vars['order-received'] );
		add_rewrite_endpoint( $endpoint . '/' . $query_vars['order-pay'], \EP_ROOT, $query_vars['order-pay'] );
		add_rewrite_endpoint( $endpoint, \EP_ROOT, 'checkout' );
	}

	/**
	 * Returns true when the endpoint is showing.
	 *
	 * @return boolean
	 */
	protected function is_endpoint() {
		global $wp;
		return isset( $wp->query_vars['checkout'] );
	}

	/**
	 * Filters the `is_checkout` function so we can return true when the endpoint is active.
	 *
	 * @param boolean $return True when on the checkout page.
	 * @return boolean
	 */
	public function is_checkout( $return ) {
		if ( $this->is_endpoint() ) {
			return true;
		}
		return $return;
	}

	/**
	 * Filter the page title when the endpoint is active.
	 *
	 * @param string $title Page title.
	 * @return string
	 */
	public function endpoint_page_title( $title ) {
		if ( $this->is_endpoint() ) {
			return __( 'Checkout', 'woo-gutenberg-products-block' );
		}
		return $title;
	}

	/**
	 * Update Woo Settings page to include the checkout endpoint instead of the checkout page dropdown.
	 *
	 * @param array $settings Settings pages.
	 * @return array
	 */
	public function add_endpoint_field_to_settings_page( $settings ) {
		$default_endpoint = $this->get_default_endpoint();

		foreach ( $settings as $key => $setting ) {
			if ( 'woocommerce_checkout_page_id' === $setting['id'] ) {
				$settings[ $key ] = [
					'title'    => __( 'Checkout page', 'woo-gutenberg-products-block' ),
					'desc'     => sprintf(
						// translators: %1$s: opening anchor tag, %2$s: closing anchor tag.
						__( 'The checkout page template can be %1$s edited here%2$s.', 'woo-gutenberg-products-block' ),
						'<a href="' . esc_url( $this->get_edit_template_url() ) . '" target="_blank">',
						'</a>'
					),
					'desc_tip' => __( 'This is the URL to the checkout page.', 'woo-gutenberg-products-block' ),
					'id'       => 'woocommerce_checkout_page_endpoint',
					'type'     => 'permalink',
					'default'  => $default_endpoint,
					'autoload' => false,
				];

				add_action( 'woocommerce_admin_field_permalink', array( SettingsUtils::class, 'permalink_input_field' ) );
			}
		}
		return $settings;
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
			wp_safe_redirect( $this->get_edit_template_url() );
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
