<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\StoreApi\RoutesController;
use Automattic\WooCommerce\StoreApi\Schema\ExtendSchema;
use Automattic\WooCommerce\StoreApi\SchemaController;
use Automattic\WooCommerce\StoreApi\Authentication;

/**
 * RestApi class.
 *
 * Registers controllers in the blocks REST API namespace.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class RestApi {
	/**
	 * RoutesController instance.
	 *
	 * @var RoutesController
	 */
	private $routes_controller;

	/**
	 * RoutesController instance.
	 *
	 * @var RoutesController
	 */
	private $schema;

	/**
	 * RoutesController instance.
	 *
	 * @var RoutesController
	 */
	private $auth;

	/**
	 * Shared instance of the ExtendSchema class used for extending the API.
	 *
	 * @var ExtendSchema
	 */
	private $extend_schema;

	/**
	 * Constructor
	 *
	 * @param RoutesController $routes Rest Routes instance.
	 */
	public function __construct( RoutesController $routes ) {
		$this->extend_schema     = $routes;
		$this->auth              = new Authentication();
		$this->routes_controller = new RoutesController();
		$this->initialize();
	}

	/**
	 * Initialize class features.
	 */
	protected function initialize() {
		add_action( 'rest_api_init', array( $this->routes_controller, 'register_all_routes' ) );
		add_filter( 'rest_authentication_errors', array( $this->auth, 'check_authentication' ) );
		add_action( 'set_logged_in_cookie', array( $this->auth, 'set_logged_in_cookie' ) );
	}
}
