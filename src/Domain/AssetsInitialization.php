<?php
namespace Automattic\WooCommerce\Blocks\Domain;

use Automattic\WooCommerce\Blocks\Package;
use Automattic\WooCommerce\Blocks\Assets\Api;

/**
 * Class instance for assets initialization.
 *
 * @since 4.6.0
 */
class AssetsInitialization {

	/**
	 * Asset API interface for various asset registration.
	 *
	 * @var API
	 */
	private $api;

	/**
	 * Constructor
	 *
	 * @param Api $asset_api  Asset API interface for various asset registration.
	 */
	public function __construct( Api $asset_api ) {
		$this->api = $asset_api;
		$this->init();
	}

	/**
	 * Hook into WP asset initialization.
	 */
	protected function init() {
		add_action( 'init', array( $this, 'register_assets' ) );
		add_action( 'body_class', array( __CLASS__, 'add_theme_body_class' ), 1 );
		add_action( 'admin_body_class', array( __CLASS__, 'add_theme_admin_body_class' ), 1 );
		add_action( 'woocommerce_login_form_end', array( __CLASS__, 'redirect_to_field' ) );
	}

	/**
	 * Register block scripts & styles.
	 *
	 * @since 2.5.0
	 * @since 4.6.0 moved from Assets.php in a refactor.
	 */
	public function register_assets() {
		$this->register_blocks_styles();
		$this->register_blocks_scripts();
	}

	/**
	 * Register blocks styles.
	 *
	 * @since 4.6.0
	 */
	private function register_blocks_styles() {
		// @todo Remove fix to load our stylesheets after editor CSS.
		// See #3068 for the rationale of this fix. It should be no longer
		// necessary when the editor is loaded in an iframe (https://github.com/WordPress/gutenberg/issues/20797).
		if ( is_admin() ) {
			$block_style_dependencies = array( 'wp-edit-post' );
		} else {
			$block_style_dependencies = array();
		}

		$this->api->register_style( 'wc-block-vendors-style', $this->api->get_block_asset_build_path( 'vendors-style', 'css' ), $block_style_dependencies );
		$this->api->register_style( 'wc-block-editor', $this->api->get_block_asset_build_path( 'editor', 'css' ), array( 'wp-edit-blocks' ) );
		$this->api->register_style( 'wc-block-style', $this->api->get_block_asset_build_path( 'style', 'css' ), array( 'wc-block-vendors-style' ) );

		wp_style_add_data( 'wc-block-editor', 'rtl', 'replace' );
		wp_style_add_data( 'wc-block-style', 'rtl', 'replace' );
	}

	/**
	 * Register blocks scripts.
	 *
	 * @since 4.6.0
	 */
	private function register_blocks_scripts() {
		// Shared libraries and components across multiple blocks.
		$this->api->register_script( 'wc-blocks-middleware', 'build/wc-blocks-middleware.js', [], false );
		$this->api->register_script( 'wc-blocks-data-store', 'build/wc-blocks-data.js', [ 'wc-blocks-middleware' ], false );
		$this->api->register_script( 'wc-blocks', $this->api->get_block_asset_build_path( 'blocks' ), [], false );
		$this->api->register_script( 'wc-vendors', $this->api->get_block_asset_build_path( 'vendors' ), [], false );
		$this->api->register_script( 'wc-blocks-registry', 'build/wc-blocks-registry.js', [], false );
		$this->api->register_script( 'wc-shared-context', 'build/wc-shared-context.js', [], false );
		$this->api->register_script( 'wc-shared-hocs', 'build/wc-shared-hocs.js', [], false );
		$this->api->register_script( 'wc-price-format', 'build/price-format.js', [], false );

		if ( Package::feature()->is_feature_plugin_build() ) {
			$this->api->register_script( 'wc-blocks-checkout', 'build/blocks-checkout.js', [], false );
		}

		wp_add_inline_script(
			'wc-blocks-middleware',
			"
			var wcStoreApiNonce = '" . esc_js( wp_create_nonce( 'wc_store_api' ) ) . "';
			var wcStoreApiNonceTimestamp = '" . esc_js( time() ) . "';
			",
			'before'
		);
	}

	/**
	 * Add body classes.
	 *
	 * @param array $classes Array of CSS classnames.
	 * @return array Modified array of CSS classnames.
	 */
	public static function add_theme_body_class( $classes = [] ) {
		$classes[] = 'theme-' . get_template();
		return $classes;
	}

	/**
	 * Add theme class to admin body.
	 *
	 * @param array $classes String with the CSS classnames.
	 * @return array Modified string of CSS classnames.
	 */
	public static function add_theme_admin_body_class( $classes = '' ) {
		$classes .= ' theme-' . get_template();
		return $classes;
	}


	/**
	 * Adds a redirect field to the login form so blocks can redirect users after login.
	 */
	public static function redirect_to_field() {
		// phpcs:ignore WordPress.Security.NonceVerification
		if ( empty( $_GET['redirect_to'] ) ) {
			return;
		}
		echo '<input type="hidden" name="redirect" value="' . esc_attr( esc_url_raw( wp_unslash( $_GET['redirect_to'] ) ) ) . '" />'; // phpcs:ignore WordPress.Security.NonceVerification
	}

}
