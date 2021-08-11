<?php
namespace Automattic\WooCommerce\Blocks\Tests;

use Automattic\WooCommerce\Proxies\LegacyProxy;
use Automattic\WooCommerce\Testing\Tools\DependencyManagement\MockableLegacyProxy;

// Require composer dependencies.
require_once dirname( dirname( __DIR__ ) ) . '/woocommerce/vendor/autoload.php';
require_once dirname( __DIR__ ) . '/vendor/autoload.php';

// Determine the tests directory (from a WP dev checkout).
// Try the WP_TESTS_DIR environment variable first.
$_wc_tests_framework_dir = dirname( dirname( __DIR__ ) ) . '/woocommerce/tests/legacy';
$_tests_dir = getenv( 'WP_TESTS_DIR' );

// Next, try the WP_PHPUNIT composer package.
if ( ! $_tests_dir ) {
	$_tests_dir = getenv( 'WP_PHPUNIT__DIR' );
}

// See if we're installed inside an existing WP dev instance.
if ( ! $_tests_dir ) {
	$_try_tests_dir = __DIR__ . '/../../../../../tests/phpunit';
	if ( file_exists( $_try_tests_dir . '/includes/functions.php' ) ) {
		$_tests_dir = $_try_tests_dir;
	}
}
// Fallback.
if ( ! $_tests_dir ) {
	$_tests_dir = '/tmp/wordpress-tests-lib';
}

// Give access to tests_add_filter() function.
require_once $_tests_dir . '/includes/functions.php';

/**
 * Re-initialize the dependency injection engine.
 *
 * The dependency injection engine has been already initialized as part of the Woo initialization, but we need
 * to replace the registered read-only container with a fully configurable one for testing.
 * To this end we hack a bit and use reflection to grab the underlying container that the read-only one stores
 * in a private property.
 *
 * Additionally, we replace the legacy/function proxies with mockable versions to easily replace anything
 * in tests as appropriate.
 *
 * @throws \Exception The Container class doesn't have a 'container' property.
 */
function wc_blocks_initialize_dependency_injection() {
	try {
		$inner_container_property = new \ReflectionProperty( \Automattic\WooCommerce\Container::class, 'container' );
	} catch ( ReflectionException $ex ) {
		throw new \Exception( "Error when trying to get the private 'container' property from the " . \Automattic\WooCommerce\Container::class . ' class using reflection during unit testing bootstrap, has the property been removed or renamed?' );
	}

	$inner_container_property->setAccessible( true );
	$inner_container = $inner_container_property->getValue( wc_get_container() );

	$inner_container->replace( LegacyProxy::class, MockableLegacyProxy::class );
	$inner_container->reset_all_resolved();

	$GLOBALS['wc_container'] = $inner_container;
}

/**
 * Manually load the plugin being tested.
 */
function manually_load_plugins() {
	require dirname( dirname( __DIR__ ) ) . '/woocommerce/woocommerce.php';
    require dirname( __DIR__ ) . '/woocommerce-gutenberg-products-block.php';
}

tests_add_filter( 'muplugins_loaded', __NAMESPACE__ . '\\manually_load_plugins' );

/**
 * Manually install plugins being tested.
 */
function manually_install_plugins() {
	\Automattic\WooCommerce\Blocks\Package::container()->get( \Automattic\WooCommerce\Blocks\Installer::class )->maybe_create_tables();
}

tests_add_filter( 'setup_theme', __NAMESPACE__ . '\\manually_install_plugins' );

// Start up the WP testing environment.
require $_tests_dir . '/includes/bootstrap.php';

// Re-initialize the dependency injection engine.
wc_blocks_initialize_dependency_injection();
