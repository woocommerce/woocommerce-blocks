<?php
namespace Automattic\WooCommerce\StoreApi;

use Automattic\WooCommerce\StoreApi\Authentication;
use Automattic\WooCommerce\StoreApi\Formatters;
use Automattic\WooCommerce\StoreApi\Formatters\CurrencyFormatter;
use Automattic\WooCommerce\StoreApi\Formatters\HtmlFormatter;
use Automattic\WooCommerce\StoreApi\Formatters\MoneyFormatter;
use Automattic\WooCommerce\StoreApi\RoutesController;
use Automattic\WooCommerce\StoreApi\SchemaController;
use Automattic\WooCommerce\StoreApi\Schemas\ExtendSchema;

/**
 * StoreApi class.
 */
final class StoreApi {
	/**
	 * Formatters instance.
	 *
	 * @var Formatters
	 */
	private $formatters;

	/**
	 * RoutesController instance.
	 *
	 * @var RoutesController
	 */
	private $routes;

	/**
	 * SchemaController instance.
	 *
	 * @var SchemaController
	 */
	private $schema;

	/**
	 * Shared instance of the ExtendSchema class used for extending the API.
	 *
	 * @var ExtendSchema
	 */
	private $extend;

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->formatters = new Formatters();
		$this->formatters->register( 'money', MoneyFormatter::class );
		$this->formatters->register( 'html', HtmlFormatter::class );
		$this->formatters->register( 'currency', CurrencyFormatter::class );

		$this->extend = new ExtendSchema( $this->formatters );
		$this->schema = new SchemaController( $this->extend );
		$this->routes = new RoutesController( $this->schema );

		$this->initialize();
	}

	/**
	 * Initialize class features and hook into WP lifecycle.
	 */
	protected function initialize() {
		add_action( 'rest_api_init', array( $this, 'register_all_routes' ) );
		add_filter( 'rest_authentication_errors', array( $this, 'check_authentication' ) );
		add_action( 'set_logged_in_cookie', array( $this, 'set_logged_in_cookie' ) );
	}

	/**
	 * Register all Store API routes. This includes routes under specific version namespaces.
	 */
	public function register_all_routes() {
		$this->routes->register_routes( 'v1', 'wc/store' );
		$this->routes->register_routes( 'v1', 'wc/store/v1' );
	}

	/**
	 * Magic getter for protected properties.
	 *
	 * @param string $name Property name.
	 * @return Formatters|RoutesController|SchemaController|ExtendSchema
	 */
	public function __get( $name ) {
		if ( in_array( $name, [ 'formatters', 'extend', 'routes', 'schema' ], true ) ) {
			return $this->$name;
		}
		return null;
	}

	/**
	 * The Store API does not require authentication.
	 *
	 * @param \WP_Error|mixed $result Error from another authentication handler, null if we should handle it, or another value if not.
	 * @return \WP_Error|null|bool
	 */
	public function check_authentication( $result ) {
		if ( ! empty( $result ) ) {
			return $result;
		}

		if ( $this->is_request_to_store_api() ) {
			return true;
		}

		return $result;
	}

	/**
	 * When the login cookies are set, they are not available until the next page reload. For the Store API, specifically
	 * for returning updated nonces, we need this to be available immediately.
	 *
	 * @param string $logged_in_cookie The value for the logged in cookie.
	 */
	public function set_logged_in_cookie( $logged_in_cookie ) {
		if ( ! defined( 'LOGGED_IN_COOKIE' ) || ! $this->is_request_to_store_api() ) {
			return;
		}
		$_COOKIE[ LOGGED_IN_COOKIE ] = $logged_in_cookie;
	}

	/**
	 * Check if is request to the Store API.
	 *
	 * @return bool
	 */
	protected function is_request_to_store_api() {
		if ( empty( $GLOBALS['wp']->query_vars['rest_route'] ) ) {
			return false;
		}
		return 0 === strpos( $GLOBALS['wp']->query_vars['rest_route'], '/wc/store/' );
	}
}
