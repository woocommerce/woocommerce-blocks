<?php
/**
 * Plugin Name: WooCommerce Blocks
 * Plugin URI: https://github.com/woocommerce/woocommerce-gutenberg-products-block
 * Description: WooCommerce blocks for the Gutenberg editor.
 * Version: 2.5.0-dev
 * Author: Automattic
 * Author URI: https://woocommerce.com
 * Text Domain:  woo-gutenberg-products-block
 * Requires at least: 5.0
 * Requires PHP: 5.6
 * WC requires at least: 3.6
 * WC tested up to: 3.8
 *
 * @package WooCommerce\Blocks
 * @internal This file is only used when running the REST API as a feature plugin.
 */

defined( 'ABSPATH' ) || exit;

define( 'WOOCOMMERCE_BLOCKS__MINIMUM_WP_VERSION', '5.0' );
define( 'WOOCOMMERCE_BLOCKS__MINIMUM_PHP_VERSION', '5.6' );

if ( version_compare( $GLOBALS['wp_version'], WOOCOMMERCE_BLOCKS__MINIMUM_WP_VERSION, '<' ) ) {
	if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		error_log( // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
			sprintf(
				/* translators: Placeholders are numbers, versions of WordPress in use on the site, and required by WordPress. */
				esc_html__( 'Your version of WordPress (%1$s) is lower than the version required by WooCommerce Blocks (%2$s). Please update WordPress to continue enjoying WooCommerce Blocks.', 'woo-gutenberg-products-block' ),
				$GLOBALS['wp_version'],
				WOOCOMMERCE_BLOCKS__MINIMUM_WP_VERSION
			)
		);
	}
	/**
	 * Outputs for an admin notice about running WooCommerce Blocks on outdated WordPress.
	 *
	 * @since $VID:$
	 */
	function woocommerce_blocks_admin_unsupported_wp_notice() { ?>
		<div class="notice notice-error is-dismissible">
			<p><?php esc_html_e( 'WooCommerce Blocks requires a more recent version of WordPress and has been paused. Please update WordPress to continue enjoying WooCommerce Blocks.', 'woo-gutenberg-products-block' ); ?></p>
		</div>
		<?php
	}
	add_action( 'admin_notices', 'woocommerce_blocks_admin_unsupported_wp_notice' );
	return;
}

if ( version_compare( PHP_VERSION, WOOCOMMERCE_BLOCKS__MINIMUM_PHP_VERSION, '<' ) ) {
	if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		error_log( // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
			sprintf(
				/* translators: Placeholders are numbers, versions of PHP in use on the site, and required by WooCommerce Blocks. */
				esc_html__( 'Your version of PHP (%1$s) is lower than the version required by WooCommerce Blocks (%2$s). Please update PHP to continue enjoying WooCommerce Blocks.', 'woo-gutenberg-products-block' ),
				esc_html( phpversion() ),
				WOOCOMMERCE_BLOCKS__MINIMUM_PHP_VERSION
			)
		);
	}
	/**
	 * Outputs an admin notice for folks running an outdated version of PHP.
	 *
	 * @todo: Remove once WP 5.2 is the minimum version.
	 *
	 * @since $VID:$
	 */
	function woocommerce_blocks_admin_unsupported_php_notice() {
		?>
		<div class="notice notice-error is-dismissible">
			<p><?php esc_html_e( 'WooCommerce Blocks requires a more recent version of PHP and has been paused. Please update PHP to continue enjoying WooCommerce Blocks.', 'woo-gutenberg-products-block' ); ?></p>
			<p class="button-container">
				<?php
				printf(
					'<a class="button button-primary" href="%1$s" target="_blank" rel="noopener noreferrer">%2$s <span class="screen-reader-text">%3$s</span><span aria-hidden="true" class="dashicons dashicons-external"></span></a>',
					esc_url( wp_get_update_php_url() ),
					esc_html__( 'Learn more about updating PHP' ), // phpcs:ignore WordPress.WP.I18n.MissingArgDomain
					/* translators: accessibility text */
					esc_html__( '(opens in a new tab)' ) // phpcs:ignore WordPress.WP.I18n.MissingArgDomain
				);
				?>
			</p>
		</div>
		<?php
	}
	add_action( 'admin_notices', 'woocommerce_blocks_admin_unsupported_php_notice' );
	return;
}

/**
 * Autoload packages.
 *
 * The package autoloader includes version information which prevents classes in this feature plugin
 * conflicting with WooCommerce core.
 *
 * We want to fail gracefully if `composer install` has not been executed yet, so we are checking for the autoloader.
 * If the autoloader is not present, let's log the failure and display a nice admin notice.
 */
$autoloader = __DIR__ . '/vendor/autoload_packages.php';
if ( is_readable( $autoloader ) ) {
	require $autoloader;
} else {
	if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		error_log(  // phpcs:ignore
			sprintf(
				/* translators: 1: composer command. 2: plugin directory */
				esc_html__( 'Your installation of the WooCommerce Blocks feature plugin is incomplete. Please run %1$s within the %2$s directory.', 'woo-gutenberg-products-block' ),
				'`composer install`',
				'`' . esc_html( str_replace( ABSPATH, '', __DIR__ ) ) . '`'
			)
		);
	}
	/**
	 * Outputs an admin notice if composer install has not been ran.
	 */
	add_action(
		'admin_notices',
		function() {
			?>
			<div class="notice notice-error">
				<p>
					<?php
					printf(
						/* translators: 1: composer command. 2: plugin directory */
						esc_html__( 'Your installation of the WooCommerce Blocks feature plugin is incomplete. Please run %1$s within the %2$s directory.', 'woo-gutenberg-products-block' ),
						'<code>composer install</code>',
						'<code>' . esc_html( str_replace( ABSPATH, '', __DIR__ ) ) . '</code>'
					);
					?>
				</p>
			</div>
			<?php
		}
	);
	return;
}

/**
 * Loads the dependency injection container for woocommerce blocks.
 *
 * @param boolean $reset Used to reset the container to a fresh instance.
 *                       Note: this means all dependencies will be reconstructed.
 */
function wc_blocks_container( $reset = false ) {
	static $container;
	if (
		! $container instanceof Automattic\WooCommerce\Blocks\Registry\Container
		|| $reset
	) {
		$container = new Automattic\WooCommerce\Blocks\Registry\Container();
		// register Package.
		$container->register(
			Automattic\WooCommerce\Blocks\Domain\Package::class,
			function ( $container ) {
				return new Automattic\WooCommerce\Blocks\Domain\Package(
					'2.5.0-dev',
					__FILE__
				);
			}
		);
		// register Bootstrap.
		$container->register(
			Automattic\WooCommerce\Blocks\Domain\Bootstrap::class,
			function ( $container ) {
				return new Automattic\WooCommerce\Blocks\Domain\Bootstrap(
					$container
				);
			}
		);
	}
	return $container;
}

add_action( 'plugins_loaded', 'wc_blocks_bootstrap' );
/**
 * Boostrap WooCommerce Blocks App
 */
function wc_blocks_bootstrap() {
	// initialize bootstrap.
	wc_blocks_container()->get(
		Automattic\WooCommerce\Blocks\Domain\Bootstrap::class
	);
}
