<?php
namespace Automattic\WooCommerce\Blocks\Domain;

use Automattic\WooCommerce\Blocks\Assets\Api as AssetApi;
use Automattic\WooCommerce\Blocks\Assets\AssetDataRegistry;
use Automattic\WooCommerce\Blocks\AssetsController;
use Automattic\WooCommerce\Blocks\BlockTemplatesController;
use Automattic\WooCommerce\Blocks\BlockTypesController;
use Automattic\WooCommerce\Blocks\Domain\Services\CreateAccount;
use Automattic\WooCommerce\Blocks\Domain\Services\DraftOrders;
use Automattic\WooCommerce\Blocks\Domain\Services\FeatureGating;
use Automattic\WooCommerce\Blocks\Domain\Services\GoogleAnalytics;
use Automattic\WooCommerce\Blocks\InboxNotifications;
use Automattic\WooCommerce\Blocks\Installer;
use Automattic\WooCommerce\Blocks\Payments\Api as PaymentsApi;
use Automattic\WooCommerce\Blocks\Payments\Integrations\BankTransfer;
use Automattic\WooCommerce\Blocks\Payments\Integrations\CashOnDelivery;
use Automattic\WooCommerce\Blocks\Payments\Integrations\Cheque;
use Automattic\WooCommerce\Blocks\Payments\Integrations\PayPal;
use Automattic\WooCommerce\Blocks\Payments\PaymentMethodRegistry;
use Automattic\WooCommerce\Blocks\Registry\Container;
use Automattic\WooCommerce\StoreApi\StoreApi;
use Automattic\WooCommerce\StoreApi\RoutesController;
use Automattic\WooCommerce\StoreApi\SchemaController;

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
		if ( $this->has_core_dependencies() ) {
			$this->init();
			/**
			 * Fires after WooCommerce Blocks plugin has loaded.
			 *
			 * This hook is intended to be used as a safe event hook for when the plugin has been loaded, and all
			 * dependency requirements have been met.
			 */
			do_action( 'woocommerce_blocks_loaded' );
		}
	}

	/**
	 * Init the package - load the blocks library and define constants.
	 */
	protected function init() {
		$this->register_dependencies();
		$this->register_payment_methods();

		add_action(
			'admin_init',
			function() {
				InboxNotifications::create_surface_cart_checkout_blocks_notification();
			},
			10,
			0
		);

		$is_rest = wc()->is_rest_api_request();

		// Load assets in admin and on the frontend.
		if ( ! $is_rest ) {
			$this->add_build_notice();
			$this->container->get( AssetDataRegistry::class );
			$this->container->get( Installer::class );
			$this->container->get( AssetsController::class );
		}
		$this->container->get( DraftOrders::class )->init();
		$this->container->get( CreateAccount::class )->init();
		$this->container->get( StoreApi::class )->init();
		$this->container->get( GoogleAnalytics::class );
		$this->container->get( BlockTypesController::class );
		$this->container->get( BlockTemplatesController::class );
		if ( $this->package->feature()->is_feature_plugin_build() ) {
			$this->container->get( PaymentsApi::class );
		}
	}

	/**
	 * Check core dependencies exist.
	 *
	 * @return boolean
	 */
	protected function has_core_dependencies() {
		$has_needed_dependencies = class_exists( 'WooCommerce', false );
		if ( $has_needed_dependencies ) {
			$plugin_data = \get_file_data(
				$this->package->get_path( 'woocommerce-gutenberg-products-block.php' ),
				[
					'RequiredWCVersion' => 'WC requires at least',
				]
			);
			if ( isset( $plugin_data['RequiredWCVersion'] ) && version_compare( \WC()->version, $plugin_data['RequiredWCVersion'], '<' ) ) {
				$has_needed_dependencies = false;
				add_action(
					'admin_notices',
					function() {
						if ( should_display_compatibility_notices() ) {
							?>
							<div class="notice notice-error">
								<p><?php esc_html_e( 'The WooCommerce Blocks feature plugin requires a more recent version of WooCommerce and has been paused. Please update WooCommerce to the latest version to continue enjoying WooCommerce Blocks.', 'woo-gutenberg-products-block' ); ?></p>
							</div>
							<?php
						}
					}
				);
			}
		}
		return $has_needed_dependencies;
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
					/* translators: %1$s is the install command, %2$s is the build command, %3$s is the watch command. */
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
	 * Register core dependencies with the container.
	 */
	protected function register_dependencies() {
		$this->container->register(
			FeatureGating::class,
			function () {
				return new FeatureGating();
			}
		);
		$this->container->register(
			AssetApi::class,
			function ( Container $container ) {
				return new AssetApi( $container->get( Package::class ) );
			}
		);
		$this->container->register(
			AssetDataRegistry::class,
			function( Container $container ) {
				return new AssetDataRegistry( $container->get( AssetApi::class ) );
			}
		);
		$this->container->register(
			AssetsController::class,
			function( Container $container ) {
				return new AssetsController( $container->get( AssetApi::class ) );
			}
		);
		$this->container->register(
			PaymentMethodRegistry::class,
			function() {
				return new PaymentMethodRegistry();
			}
		);
		$this->container->register(
			Installer::class,
			function () {
				return new Installer();
			}
		);
		$this->container->register(
			BlockTypesController::class,
			function ( Container $container ) {
				$asset_api           = $container->get( AssetApi::class );
				$asset_data_registry = $container->get( AssetDataRegistry::class );
				return new BlockTypesController( $asset_api, $asset_data_registry );
			}
		);
		$this->container->register(
			BlockTemplatesController::class,
			function () {
				return new BlockTemplatesController();
			}
		);
		$this->container->register(
			DraftOrders::class,
			function( Container $container ) {
				return new DraftOrders( $container->get( Package::class ) );
			}
		);
		$this->container->register(
			CreateAccount::class,
			function( Container $container ) {
				return new CreateAccount( $container->get( Package::class ) );
			}
		);
		$this->container->register(
			GoogleAnalytics::class,
			function( Container $container ) {
				// Require Google Analytics Integration to be activated.
				if ( ! class_exists( 'WC_Google_Analytics_Integration', false ) ) {
					return;
				}
				$asset_api = $container->get( AssetApi::class );
				return new GoogleAnalytics( $asset_api );
			}
		);
		if ( $this->package->feature()->is_feature_plugin_build() ) {
			$this->container->register(
				PaymentsApi::class,
				function ( Container $container ) {
					$payment_method_registry = $container->get( PaymentMethodRegistry::class );
					$asset_data_registry     = $container->get( AssetDataRegistry::class );
					return new PaymentsApi( $payment_method_registry, $asset_data_registry );
				}
			);
		}
		$this->container->register(
			StoreApi::class,
			function () {
				return new StoreApi();
			}
		);
		// Maintains backwards compatibility with previous Store API namespace.
		$this->container->register(
			'Automattic\WooCommerce\Blocks\StoreApi\Formatters',
			function( Container $container ) {
				$this->deprecated_dependency( 'Automattic\WooCommerce\Blocks\StoreApi\Formatters', '7.2.0', 'Automattic\WooCommerce\StoreApi\Formatters', '7.4.0' );
				return $container->get( StoreApi::class )::container()->get( \Automattic\WooCommerce\StoreApi\Formatters::class );
			}
		);
		$this->container->register(
			'Automattic\WooCommerce\Blocks\Domain\Services\ExtendRestApi',
			function( Container $container ) {
				$this->deprecated_dependency( 'Automattic\WooCommerce\Blocks\Domain\Services\ExtendRestApi', '7.2.0', 'Automattic\WooCommerce\StoreApi\Schemas\ExtendSchema', '7.4.0' );
				return $container->get( StoreApi::class )::container()->get( \Automattic\WooCommerce\StoreApi\Schemas\ExtendSchema::class );
			}
		);
		$this->container->register(
			'Automattic\WooCommerce\Blocks\StoreApi\SchemaController',
			function( Container $container ) {
				$this->deprecated_dependency( 'Automattic\WooCommerce\Blocks\StoreApi\SchemaController', '7.2.0', 'Automattic\WooCommerce\StoreApi\SchemaController', '7.4.0' );
				return $container->get( StoreApi::class )::container()->get( SchemaController::class );
			}
		);
		$this->container->register(
			'Automattic\WooCommerce\Blocks\StoreApi\RoutesController',
			function( Container $container ) {
				$this->deprecated_dependency( 'Automattic\WooCommerce\Blocks\StoreApi\RoutesController', '7.2.0', 'Automattic\WooCommerce\StoreApi\RoutesController', '7.4.0' );
				return $container->get( StoreApi::class )::container()->get( RoutesController::class );
			}
		);
	}

	/**
	 * Throws a deprecation notice for a dependency without breaking requests.
	 *
	 * @param string $function Class or function being deprecated.
	 * @param string $version Version in which it was deprecated.
	 * @param string $replacement Replacement class or function, if applicable.
	 * @param string $trigger_error_version Optional version to start surfacing this as a PHP error rather than a log. Defaults to $version.
	 */
	protected function deprecated_dependency( $function, $version, $replacement = '', $trigger_error_version = '' ) {
		if ( ! defined( 'WP_DEBUG' ) || ! WP_DEBUG ) {
			return;
		}

		$trigger_error_version = $trigger_error_version ? $trigger_error_version : $version;
		$error_message         = $replacement ? sprintf(
			'%1$s is <strong>deprecated</strong> since version %2$s! Use %3$s instead.',
			$function,
			$version,
			$replacement
		) : sprintf(
			'%1$s is <strong>deprecated</strong> since version %2$s with no alternative available.',
			$function,
			$version
		);

		do_action( 'deprecated_function_run', $function, $replacement, $version );

		$log_error = false;

		// If headers have not been sent yet, log to avoid breaking the request.
		if ( ! headers_sent() ) {
			$log_error = true;
		}

		// If the $trigger_error_version was not yet reached, only log the error.
		if ( version_compare( $this->package->get_version(), $trigger_error_version, '<' ) ) {
			$log_error = true;
		}

		// Apply same filter as WP core.
		if ( ! apply_filters( 'deprecated_function_trigger_error', true ) ) {
			$log_error = true;
		}

		if ( $log_error ) {
			// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
			error_log( $error_message );
		} else {
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped, WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
			trigger_error( $error_message, E_USER_DEPRECATED );
		}
	}

	/**
	 * Register payment method integrations with the container.
	 */
	protected function register_payment_methods() {
		$this->container->register(
			Cheque::class,
			function( Container $container ) {
				$asset_api = $container->get( AssetApi::class );
				return new Cheque( $asset_api );
			}
		);
		$this->container->register(
			PayPal::class,
			function( Container $container ) {
				$asset_api = $container->get( AssetApi::class );
				return new PayPal( $asset_api );
			}
		);
		$this->container->register(
			BankTransfer::class,
			function( Container $container ) {
				$asset_api = $container->get( AssetApi::class );
				return new BankTransfer( $asset_api );
			}
		);
		$this->container->register(
			CashOnDelivery::class,
			function( Container $container ) {
				$asset_api = $container->get( AssetApi::class );
				return new CashOnDelivery( $asset_api );
			}
		);
	}
}
