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
	}

	/**
	 * When it's the Order Received page and a block theme is active, render the Order Received Template.
	 *
	 * This places the template name e.g. `order-received`, at the beginning of the template hierarchy array. The hook priority
	 * is 1 to ensure it runs first; other consumers e.g. extensions, could therefore inject their own template instead
	 * of this one when using the default priority of 10.
	 *
	 * @param array $templates Templates that match the pages_template_hierarchy.
	 */
	public function update_page_template_hierarchy( $templates ) {
		if ( is_wc_endpoint_url( 'order-received' ) ) {
			array_unshift( $templates, self::SLUG );
		}
		return $templates;
	}
}
