<?php
/**
 * Contains the Bootstrap class
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\Domain;

use Automattic\WooCommerce\Blocks\Assets as BlockAssets;
use Automattic\WooCommerce\Blocks\Assets\Api as AssetApi;
use Automattic\WooCommerce\Blocks\Assets\AssetDataRegistry;
use Automattic\WooCommerce\Blocks\Assets\BackCompatAssetDataRegistry;
use Automattic\WooCommerce\Blocks\Library;
use Automattic\WooCommerce\Blocks\Registry\Container;
use Automattic\WooCommerce\Blocks\RestApi;
use Automattic\WooCommerce\Blocks\Payments\Api as PaymentsApi;
use Automattic\WooCommerce\Blocks\Payments\PaymentMethodRegistry;
use Automattic\WooCommerce\Blocks\Payments\Integrations\Stripe;
use Automattic\WooCommerce\Blocks\Payments\Integrations\Cheque;

/**
 * Takes care of bootstrapping the plugin.
 *
 * @since 2.5.0
 */
class Bootstrap {

	/**
	 * Holds the Dependency Injection Container
	 *
	 * @var Container
	 */
	private $container;

	/**
	 * Holds the Package instance
	 *
	 * @var Package
	 */
	private $package;

	/**
	 * Constructor
	 *
	 * @param Container $container  The Dependency Injection Container.
	 */
	public function __construct( Container $container ) {
		$this->container = $container;
		$this->package   = $container->get( Package::class );
		$this->init();
		/**
		 * Usable as a safe event hook for when the plugin has been loaded.
		 */
		do_action( 'woocommerce_blocks_loaded' );
	}

	/**
	 * Init the package - load the blocks library and define constants.
	 */
	protected function init() {
		if ( ! $this->has_core_dependencies() ) {
			return;
		}
		$this->remove_core_blocks();
		$this->add_build_notice();
		$this->define_feature_flag();
		$this->register_dependencies();
		$this->register_payment_methods();
		$this->initialize_dependencies();
	}

	/**
	 * Check core dependencies exist.
	 *
	 * @return boolean
	 */
	protected function has_core_dependencies() {
		return class_exists( 'WooCommerce' ) && function_exists( 'register_block_type' );
	}

	/**
	 * See if files have been built or not.
	 *
	 * @return bool
	 */
	protected function is_built() {
		return file_exists(
			$this->package->get_path( 'build/featured-product.js' )
		);
	}

	/**
	 * Add a notice stating that the build has not been done yet.
	 */
	protected function add_build_notice() {
		if ( $this->is_built() ) {
			return;
		}
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
	 * Remove core blocks.
	 *
	 * Older installs of WooCommerce (3.6 and below) did not use the blocks package and instead included classes directly.
	 * This code disables those core classes when running blocks as a feature plugin. Newer versions which use the Blocks package are unaffected.
	 *
	 * When the feature plugin supports only WooCommerce 3.7+ this method can be removed.
	 */
	protected function remove_core_blocks() {
		remove_action( 'init', array( 'WC_Block_Library', 'init' ) );
		remove_action( 'init', array( 'WC_Block_Library', 'register_blocks' ) );
		remove_action( 'init', array( 'WC_Block_Library', 'register_assets' ) );
		remove_filter( 'block_categories', array( 'WC_Block_Library', 'add_block_category' ) );
		remove_action( 'admin_print_footer_scripts', array( 'WC_Block_Library', 'print_script_settings' ), 1 );
		remove_action( 'init', array( 'WGPB_Block_Library', 'init' ) );
	}

	/**
	 * Define the global feature flag
	 */
	protected function define_feature_flag() {
		$allowed_flags = [ 'experimental', 'stable' ];
		$flag          = getenv( 'WOOCOMMERCE_BLOCKS_PHASE' );
		if ( ! in_array( $flag, $allowed_flags, true ) ) {
			if ( file_exists( __DIR__ . '/../../blocks.ini' ) ) {
				$woo_options = parse_ini_file( __DIR__ . '/../../blocks.ini' );
				$flag        = is_array( $woo_options ) && 'experimental' === $woo_options['woocommerce_blocks_phase'] ? 'experimental' : 'stable';
			} else {
				$flag = 'stable';
			}
		}
		define( 'WOOCOMMERCE_BLOCKS_PHASE', $flag );
	}

	/**
	 * Register core dependencies with the container.
	 */
	protected function register_dependencies() {
		$this->container->register(
			AssetApi::class,
			function ( Container $container ) {
				return new AssetApi( $container->get( Package::class ) );
			}
		);
		$this->container->register(
			AssetDataRegistry::class,
			function( Container $container ) {
				$asset_api        = $container->get( AssetApi::class );
				$load_back_compat = defined( 'WC_ADMIN_VERSION_NUMBER' )
					&& version_compare( WC_ADMIN_VERSION_NUMBER, '0.19.0', '<=' );
				return $load_back_compat
					? new BackCompatAssetDataRegistry( $asset_api )
					: new AssetDataRegistry( $asset_api );
			}
		);
		$this->container->register(
			PaymentMethodRegistry::class,
			function( Container $container ) {
				return new PaymentMethodRegistry();
			}
		);
		$this->container->register(
			PaymentsApi::class,
			function ( Container $container ) {
				$payment_method_registry = $container->get( PaymentMethodRegistry::class );
				$asset_data_registry     = $container->get( AssetDataRegistry::class );
				return new PaymentsApi( $payment_method_registry, $asset_data_registry );
			}
		);
		$this->container->register(
			RestApi::class,
			function ( Container $container ) {
				return new RestApi();
			}
		);
	}

	/**
	 * Register payment method integrations with the container.
	 *
	 * @internal Stripe is a temporary method that is used for setting up payment method integrations with Cart and
	 *           Checkout blocks. This logic should get moved to the payment gateway extensions.
	 */
	protected function register_payment_methods() {
		$this->container->register(
			Stripe::class,
			function( Container $container ) {
				$asset_api = $container->get( AssetApi::class );
				return new Stripe( $asset_api );
			}
		);
		$this->container->register(
			Cheque::class,
			function( Container $container ) {
				$asset_api = $container->get( AssetApi::class );
				return new Cheque( $asset_api );
			}
		);
	}

	/**
	 * Initialize core dependencies that were registered in the container.
	 */
	protected function initialize_dependencies() {
		$this->container->get( AssetDataRegistry::class );
		$this->container->get( PaymentsApi::class );
		$this->container->get( RestApi::class );
		Library::init();
		BlockAssets::init();
	}
}
