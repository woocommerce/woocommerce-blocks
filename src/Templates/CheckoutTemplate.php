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
	 */
	public function __construct() {
		$this->init();
	}

	/**
	 * Initialization method.
	 */
	protected function init() {
		add_filter( 'page_template_hierarchy', array( $this, 'update_page_template_hierarchy' ), 1 );
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
		if ( is_checkout() && wc_current_theme_is_fse_theme() ) {
			array_unshift( $templates, self::SLUG );
		}

		return $templates;
	}

}
