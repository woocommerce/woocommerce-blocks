<?php
namespace Automattic\WooCommerce\Blocks;

final class BlockTemplateController {
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
		if ( ! current_theme_supports('block-templates') ) {
			return;
		}

		add_action( 'init', array($this, 'create_template') );
	}

	/**
	 * Automatically create template for product post types which uses the legacy-single-product block.
	 */
	public function create_single_product_template() {
		$post_type_object = get_post_type_object('product');
		$post_type_object->template = array(
			array('woocommerce/legacy-single-product'),
		);
	}
}
