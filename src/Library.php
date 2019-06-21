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
	 * Initialize block library features.
	 */
	public function init() {
		add_action( 'init', array( $this, 'register_blocks' ) );

		Assets::instance()->init();
		RestApi::instance()->init();
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
}
