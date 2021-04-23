<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\Blocks\Package;
use Automattic\WooCommerce\Blocks\Assets\Api as AssetApi;
use Automattic\WooCommerce\Blocks\Assets\AssetDataRegistry as AssetDataRegistry;

/**
 * AssetsController class.
 *
 * @since $VID:$
 * @internal
 */
class AssetsController {

	/**
	 * Asset API interface for various asset registration.
	 *
	 * @var AssetApi
	 */
	private $api;

	/**
	 * Constructor.
	 *
	 * @param AssetApi $asset_api  Asset API interface for various asset registration.
	 */
	public function __construct( AssetApi $asset_api ) {
		$this->api = $asset_api;
		$this->init();
	}

	/**
	 * Initialize class features.
	 */
	protected function init() {
		add_action( 'init', array( $this, 'register_assets' ) );
		add_action( 'body_class', array( $this, 'add_theme_body_class' ), 1 );
		add_action( 'admin_body_class', array( $this, 'add_theme_body_class' ), 1 );
		add_action( 'woocommerce_login_form_end', array( $this, 'redirect_to_field' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Register block scripts & styles.
	 *
	 * @since 2.5.0
	 * Moved data related enqueuing to new AssetDataRegistry class as part of ongoing refactoring.
	 */
	public function register_assets() {
		$this->register_style( 'wc-block-editor', plugins_url( $this->api->get_block_asset_build_path( 'editor', 'css' ), __DIR__ ), array( 'wp-edit-blocks' ) );
		$this->register_style( 'wc-block-style', plugins_url( $this->api->get_block_asset_build_path( 'style', 'css' ), __DIR__ ), array( 'wc-block-vendors-style' ) );

		wp_style_add_data( 'wc-block-editor', 'rtl', 'replace' );
		wp_style_add_data( 'wc-block-style', 'rtl', 'replace' );

		$this->api->register_script( 'wc-blocks-middleware', 'build/wc-blocks-middleware.js', [], false );
		$this->api->register_script( 'wc-blocks-data-store', 'build/wc-blocks-data.js', [ 'wc-blocks-middleware' ] );
		$this->api->register_script( 'wc-blocks', $this->api->get_block_asset_build_path( 'blocks' ), [], false );
		$this->api->register_script( 'wc-vendors', $this->api->get_block_asset_build_path( 'vendors' ), [], false );
		$this->api->register_script( 'wc-blocks-registry', 'build/wc-blocks-registry.js', [], false );
		$this->api->register_script( 'wc-shared-context', 'build/wc-shared-context.js', [] );
		$this->api->register_script( 'wc-shared-hocs', 'build/wc-shared-hocs.js', [], false );
		$this->api->register_script( 'wc-price-format', 'build/price-format.js', [], false );

		if ( Package::feature()->is_feature_plugin_build() ) {
			$this->api->register_script( 'wc-blocks-checkout', 'build/blocks-checkout.js', [] );
		}

		wp_add_inline_script(
			'wc-blocks-middleware',
			"
			var wcBlocksMiddlewareConfig = {
				storeApiNonce: '" . esc_js( wp_create_nonce( 'wc_store_api' ) ) . "',
				wcStoreApiNonceTimestamp: '" . esc_js( time() ) . "'
			};
			",
			'before'
		);
	}

	/**
	 * Register the vendors style file. We need to do it after the other files
	 * because we need to check if `wp-edit-post` has been enqueued.
	 */
	public function enqueue_scripts() {
		// @todo Remove fix to load our stylesheets after editor CSS.
		// See #3068 and #3898 for the rationale of this fix. It should be no
		// longer necessary when the editor is loaded in an iframe (https://github.com/WordPress/gutenberg/issues/20797).
		$this->register_style( 'wc-block-vendors-style', plugins_url( $this->api->get_block_asset_build_path( 'vendors-style', 'css' ), __DIR__ ), wp_style_is( 'wp-edit-post' ) ? [ 'wp-edit-post' ] : [] );
	}

	/**
	 * Add body classes to the frontend and within admin.
	 *
	 * @param string|array $classes Array or string of CSS classnames.
	 * @return string|array Modified classnames.
	 */
	public function add_theme_body_class( $classes ) {
		$class = 'theme-' . get_template();

		if ( is_array( $classes ) ) {
			$classes[] = $class;
		} else {
			$classes .= ' ' . $class . ' ';
		}

		return $classes;
	}

	/**
	 * Adds a redirect field to the login form so blocks can redirect users after login.
	 */
	public function redirect_to_field() {
		// phpcs:ignore WordPress.Security.NonceVerification
		if ( empty( $_GET['redirect_to'] ) ) {
			return;
		}
		echo '<input type="hidden" name="redirect" value="' . esc_attr( esc_url_raw( wp_unslash( $_GET['redirect_to'] ) ) ) . '" />'; // phpcs:ignore WordPress.Security.NonceVerification
	}

	/**
	 * Get the file modified time as a cache buster if we're in dev mode.
	 *
	 * @param string $file Local path to the file.
	 * @return string The cache buster value to use for the given file.
	 */
	protected function get_file_version( $file ) {
		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG && file_exists( \Automattic\WooCommerce\Blocks\Package::get_path() . $file ) ) {
			return filemtime( \Automattic\WooCommerce\Blocks\Package::get_path() . $file );
		}
		return \Automattic\WooCommerce\Blocks\Package::get_version();
	}

	/**
	 * Registers a style according to `wp_register_style`.
	 *
	 * @since 2.0.0
	 *
	 * @param string $handle Name of the stylesheet. Should be unique.
	 * @param string $src    Full URL of the stylesheet, or path of the stylesheet relative to the WordPress root directory.
	 * @param array  $deps   Optional. An array of registered stylesheet handles this stylesheet depends on. Default empty array.
	 * @param string $media  Optional. The media for which this stylesheet has been defined. Default 'all'. Accepts media types like
	 *                       'all', 'print' and 'screen', or media queries like '(orientation: portrait)' and '(max-width: 640px)'.
	 */
	protected function register_style( $handle, $src, $deps = [], $media = 'all' ) {
		$filename = str_replace( plugins_url( '/', __DIR__ ), '', $src );
		$ver      = self::get_file_version( $filename );
		wp_register_style( $handle, $src, $deps, $ver, $media );
	}
}
