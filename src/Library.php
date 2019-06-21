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

	/**
	 * Version of the blocks package/plugin.
	 *
	 * @const string
	 */
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
	 * Stores if init has ran.
	 *
	 * @var boolean
	 */
	protected $did_init = false;

	/**
	 * Initialize block library features.
	 */
	public function init() {
		if ( true === $this->did_init ) {
			return;
		}
		$this->define_constants();
		$this->add_hooks();

		$this->assets   = new Assets();
		$this->rest_api = new RestApi();
		$this->assets->init();
		$this->rest_api->init();
		$this->did_init = true;
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
	 * Hook into WP.
	 */
	protected function add_hooks() {
		add_action( 'init', array( $this, 'register_blocks' ) );
	}

	/**
	 * Define constants in global scope.
	 */
	protected function define_constants() {
		define( 'WGPB_VERSION', self::VERSION );
		define( 'WGPB_ABSPATH', dirname( __DIR__ ) . '/' );
	}
}
