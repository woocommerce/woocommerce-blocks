<?php
namespace Automattic\WooCommerce\Blocks\Domain\Services;

use Automattic\WooCommerce\Blocks\Package;
use Automattic\WooCommerce\Blocks\Assets\Api as AssetApi;

/**
 * Service class to integrate Blocks with the Jetpack WooCommerce Analytics extension,
 */
class JetpackWooCommerceAnalytics {
	/**
	 * Instance of the asset API.
	 *
	 * @var AssetApi
	 */
	protected $asset_api;

	/**
	 * Whether the required Jetpack WooCommerce Analytics classes are available.
	 *
	 * @var bool
	 */
	protected $is_compatible;

	/**
	 * Constructor.
	 *
	 * @param AssetApi $asset_api Instance of the asset API.
	 */
	public function __construct( AssetApi $asset_api ) {
		$this->asset_api = $asset_api;
	}

	/**
	 * Hook into WP.
	 */
	public function init() {
		add_action( 'init', array( $this, 'check_compatibility' ) );
		add_action( 'init', array( $this, 'init_if_compatible' ), 20 );
	}

	/**
	 * Check compatibility with Jetpack WooCommerce Analytics.
	 *
	 * @return void
	 */
	public function check_compatibility() {
		// Require Jetpack WooCommerce Analytics to be available.
		$this->is_compatible = class_exists( 'Jetpack_WooCommerce_Analytics_Universal', false ) &&
								class_exists( 'Jetpack_WooCommerce_Analytics', false ) &&
								\Jetpack_WooCommerce_Analytics::should_track_store();
	}

	/**
	 * Initialize if compatible.
	 */
	public function init_if_compatible() {
		if ( ! $this->is_compatible ) {
			return;
		}
		$this->register_assets();
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Register scripts.
	 */
	public function register_assets() {
		if ( ! $this->is_compatible ) {
			return;
		}
		$asset_file = include dirname( __FILE__ ) . '/../../../build/wc-blocks-jetpack-woocommerce-analytics.asset.php';
		$this->asset_api->register_script( 'wc-blocks-jetpack-woocommerce-analytics', 'build/wc-blocks-jetpack-woocommerce-analytics.js', array_merge( array( 'wc-blocks' ), $asset_file['dependencies'] ) );
	}

	/**
	 * Enqueue the Google Tag Manager script if prerequisites are met.
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( 'wc-blocks-jetpack-woocommerce-analytics' );
	}
}
