<?php
/**
 * Initializes blocks in WordPress.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\Utilities\SingletonTrait;

/**
 * Library class.
 */
class Library {
	use SingletonTrait;

	const VERSION = '2.2.0-dev';

	/**
	 * Assets class instance.
	 *
	 * @var Assets
	 */
	protected $assets;

	/**
	 * API class instance.
	 *
	 * @var RestApi
	 */
	protected $rest_api;

	/**
	 * Initialize block library features.
	 */
	public function init() {
		add_action( 'init', array( $this, 'register_blocks' ) );

		$this->define_constants();

		$this->assets   = new Assets();
		$this->rest_api = new RestApi();

		$this->assets->init();
		$this->rest_api->init();
	}

	/**
	 * Register blocks, hooking up assets and render functions as needed.
	 */
	public function register_blocks() {
		$blocks = [
			'HandpickedProducts',
			'ProductBestSellers',
			'ProductCategory',
			'ProductNew',
			'ProductOnSale',
			'ProductTopRated',
			'ProductsByAttribute',
			'FeaturedProduct',
		];

		foreach ( $blocks as $block_class ) {
			$class = __NAMESPACE__ . '\\BlockTypes\\' . $block_class;
			$block = new $class();
			$block->register_block_type();
		}
	}

	/**
	 * Define constants in global scope.
	 */
	protected function define_constants() {
		define( 'WGPB_VERSION', self::VERSION );
		define( 'WGPB_ABSPATH', dirname( __DIR__ ) . '/' );
	}
}
