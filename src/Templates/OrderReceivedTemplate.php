<?php
namespace Automattic\WooCommerce\Blocks\Templates;

/**
 * OrderReceivedTemplate class.
 *
 * @internal
 */
class OrderReceivedTemplate extends AbstractPageTemplate {
	/**
	 * Template slug.
	 *
	 * @return string
	 */
	public static function get_slug() {
		return 'order-received';
	}

	/**
	 * Returns the page object assigned to this template/page used for legacy purposes. Pages are no longer required.
	 *
	 * @return \WP_Post|null Post object or null.
	 */
	public static function get_legacy_page() {
		return null;
	}

	/**
	 * True when viewing the cart page or cart endpoint.
	 *
	 * @return boolean
	 */
	protected function is_active_template() {
		return is_wc_endpoint_url( 'order-received' );
	}

	/**
	 * Should return the title of the page.
	 *
	 * @return string
	 */
	protected function get_template_title() {
		return __( 'Order Received', 'woo-gutenberg-products-block' );
	}
}
