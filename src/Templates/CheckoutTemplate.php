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
		add_filter( 'page_template_hierarchy', array( $this, 'update_page_template_hierarchy' ), 10, 3 );
	}

	/**
	 * When the page is displaying the checkout and a block theme is active, render the Checkout Template.
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
