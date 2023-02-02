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
		add_filter( 'page_template_hierarchy', array( $this, 'update_page_template_hierarchy' ), 10, 3 );
	}

	/**
	 * When the page is displaying the cart and a block theme is active, render the Cart Template.
	 *
	 * @param array $templates Templates that match the pages_template_hierarchy.
	 */
	public function update_page_template_hierarchy( $templates ) {
		if ( is_cart() && wc_current_theme_is_fse_theme() ) {
			array_unshift( $templates, self::SLUG );
		}

		return $templates;
	}

}
