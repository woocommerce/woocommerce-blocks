<?php
namespace Automattic\WooCommerce\Blocks\Templates;

/**
 * SingleProductTemplate class.
 *
 * @internal
 */
class SingleProductTemplate {

	const SLUG = 'taxonomy-product_type';

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
		add_filter( 'single_template_hierarchy', array( $this, 'update_single_template_hierarchy' ), 10, 3 );
	}

	/**
	 * Render the single product template.
	 *
	 * @param array $templates Templates that match the search hierarchy.
	 */
	public function update_single_template_hierarchy( $templates ) {

		if ( ! is_product() || ! wc_current_theme_is_fse_theme() ) {
			return $templates;
		}

		global $post;

		$post_id      = $post->ID;
		$product      = wc_get_product( $post_id );
		$product_type = $product->get_type();

		if ( ! isset( $product_type ) ) {
			return array( self::SLUG );
		}

		return array( 'taxonomy-product_type-' . $product_type, self::SLUG );
	}
}
