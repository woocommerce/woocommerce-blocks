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
		if ( ! $this->is_built() ) {
			$this->add_build_notice();
			return;
		}

		$this->add_hooks();
		$this->unhook_core_blocks();

		$this->assets   = new Assets();
		$this->rest_api = new RestApi();

		$this->assets->init();
		$this->rest_api->init();
	}

	/**
	 * Hook into WP.
	 */
	protected function add_hooks() {
		add_action( 'init', array( $this, 'register_blocks' ) );
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
	 * See if files have been built or not.
	 *
	 * @return bool
	 */
	protected function is_built() {
		return file_exists( dirname( __DIR__ ) . '/build/featured-product.js' );
	}

	/**
	 * Add a notice stating that the build has not been done yet.
	 */
	protected function add_build_notice() {
		add_action(
			'admin_notices',
			function() {
				echo '<div class="error"><p>';
				printf(
					/* Translators: %1$s is the install command, %2$s is the build command, %3$s is the watch command. */
					esc_html__( 'WooCommerce Blocks development mode requires files to be built. From the plugin directory, run %1$s to install dependencies, %2$s to build the files or %3$s to build the files and watch for changes.', 'woo-gutenberg-products-block' ),
					'<code>npm install</code>',
					'<code>npm run build</code>',
					'<code>npm start</code>'
				);
				echo '</p></div>';
			}
		);
	}

	/**
	 * Remove core blocks (for 3.6 and below).
	 */
	protected function unhook_core_blocks() {
		// Remove core blocks (for 3.6 and below).
		remove_action( 'init', array( 'WC_Block_Library', 'init' ) );
		remove_action( 'init', array( 'WC_Block_Library', 'register_blocks' ) );
		remove_action( 'init', array( 'WC_Block_Library', 'register_assets' ) );
		remove_filter( 'block_categories', array( 'WC_Block_Library', 'add_block_category' ) );
		remove_action( 'admin_print_footer_scripts', array( 'WC_Block_Library', 'print_script_settings' ), 1 );
	}
}
