<?php
/**
 * Registers controllers in the blocks REST API namespace.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\Utilities\SingletonTrait;

/**
 * RestApi class.
 */
class RestApi {
	use SingletonTrait;

	/**
	 * REST API controllers.
	 *
	 * @var array
	 */
	protected $controllers = [];

	/**
	 * Initialize class features.
	 */
	public function init() {
		if ( ! has_action( 'rest_api_init', array( $this, 'register_rest_routes' ) ) ) {
			add_action( 'rest_api_init', array( $this, 'register_rest_routes' ), 10 );
		}
	}

	/**
	 * Register REST API routes.
	 */
	public function register_rest_routes() {
		$controllers = $this->get_controllers();

		foreach ( $controllers as $controller_name => $controller_class ) {
			$this->controllers[ $controller_name ] = new $controller_class();
			$this->controllers[ $controller_name ]->register_routes();
		}
	}

	/**
	 * Return a list of controller classes for this REST API namespace.
	 *
	 * @return array
	 */
	protected static function get_controllers() {
		return [
			'product-attributes'      => __NAMESPACE__ . '\RestApi\Controllers\ProductAttributes',
			'product-attribute-terms' => __NAMESPACE__ . '\RestApi\Controllers\ProductAttributeTerms',
			'product-categories'      => __NAMESPACE__ . '\RestApi\Controllers\ProductCategories',
			'products'                => __NAMESPACE__ . '\RestApi\Controllers\Products',
		];
	}
}
