<?php
namespace Automattic\WooCommerce\Blocks\Templates;

/**
 * OrderReceivedTemplate class.
 *
 * @internal
 */
class OrderReceivedTemplate {

	const SLUG = 'order-received';

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
	 * When it's the Order Received page and a block theme is active, render the Order Received Template.
	 *
	 * @param array $templates Templates that match the pages_template_hierarchy.
	 */
	public function update_page_template_hierarchy( $templates ) {

		if ( is_wc_endpoint_url( 'order-received' ) && wc_current_theme_is_fse_theme() ) {
			array_unshift( $templates, self::SLUG );
		}

		return $templates;
	}

}
