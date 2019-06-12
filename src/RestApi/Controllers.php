<?php
/**
 * Returns controllers in this REST API namespace.
 *
 * @package WooCommerce/Blocks/RestApi
 */

namespace WooCommerce\Blocks\RestApi;

defined( 'ABSPATH' ) || exit;

/**
 * Controllers class.
 */
class Controllers {
	/**
	 * Return a list of controller classes for this REST API namespace.
	 *
	 * @return array
	 */
	public static function get_controllers() {
		return [
			'product-attributes'      => __NAMESPACE__ . '\Controllers\ProductAttributes',
			'product-attribute-terms' => __NAMESPACE__ . '\Controllers\ProductAttributeTerms',
			'product-categories'      => __NAMESPACE__ . '\Controllers\ProductCategories',
			'products'                => __NAMESPACE__ . '\Controllers\Products',
		];
	}
}
