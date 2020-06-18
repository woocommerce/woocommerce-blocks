<?php
/**
 * Registers controllers in the blocks REST API namespace.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\StoreApi\RoutesController;
use Automattic\WooCommerce\Blocks\StoreApi\SchemaController;

/**
 * RestApi class.
 */
class RestApi {
	/**
	 * Constructor
	 */
	public function __construct() {
		$this->init();
	}

	/**
	 * Initialize class features.
	 */
	protected function init() {
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ), 10 );
		add_action( 'woocommerce_delete_product_transients', array( $this, 'clean_store_api_product_transients' ) );

		if ( $this->is_request_to_store_api() ) {
			add_filter( 'rest_authentication_errors', array( $this, 'store_api_authentication' ) );
			add_filter( 'rest_pre_serve_request', array( $this, 'store_api_serve_request' ), 10, 4 );
		}
	}

	/**
	 * Register REST API routes.
	 */
	public function register_rest_routes() {
		$schemas = new SchemaController();
		$routes  = new RoutesController( $schemas );
		$routes->register_routes();
	}

	/**
	 * Get routes for a namespace.
	 *
	 * @param string $namespace Namespace to retrieve.
	 * @return array|null
	 */
	public function get_routes_from_namespace( $namespace ) {
		$rest_server     = rest_get_server();
		$namespace_index = $rest_server->get_namespace_index(
			[
				'namespace' => $namespace,
				'context'   => 'view',
			]
		);

		$response_data = $namespace_index->get_data();

		return isset( $response_data['routes'] ) ? $response_data['routes'] : null;
	}

	/**
	 * The Store API does not require authentication.
	 *
	 * @param \WP_Error|mixed $result Error from another authentication handler, null if we should handle it, or another value if not.
	 * @return \WP_Error|null|bool
	 */
	public function store_api_authentication( $result ) {
		// Pass through errors from other authentication methods used before this one.
		if ( ! empty( $result ) ) {
			return $result;
		}
		return true;
	}

	/**
	 * Optimized version of serve_request incorporating this fix:
	 * https://core.trac.wordpress.org/ticket/41358
	 *
	 * Improves performance if the site has lots of shutdown hooks active. Removes jsonp/embed support which is not being
	 * used.
	 *
	 * @param bool              $served  Whether the request has already been served.
	 * @param \WP_HTTP_Response $result  Result to send to the client. Usually a WP_REST_Response.
	 * @param \WP_REST_Request  $request Request used to generate the response.
	 * @param \WP_REST_Server   $server  Server instance.
	 * @return boolean
	 */
	public function store_api_serve_request( $served, $result, $request, $server ) {
		if ( empty( $result ) || 'HEAD' === $request->get_method() ) {
			return $served;
		}

		$code   = $result->get_status();
		$result = $server->response_to_data( $result, false );

		if ( 204 === $code || null === $result ) {
			return $served;
		}

		echo wp_json_encode( $result );

		if ( function_exists( 'fastcgi_finish_request' ) && version_compare( phpversion(), '7.0.16', '>=' ) ) {
			fastcgi_finish_request();
		}

		return true;
	}

	/**
	 * Clears transients when a product gets updated.
	 *
	 * @param int $product_id Product ID being cleaned.
	 */
	public function clean_store_api_product_transients( $product_id ) {
		delete_transient( 'wc_store_api_product_' . $product_id );
	}

	/**
	 * Check if is request to the Store API.
	 *
	 * @return bool
	 */
	protected function is_request_to_store_api() {
		if ( empty( $_SERVER['REQUEST_URI'] ) ) {
			return false;
		}

		$rest_prefix = trailingslashit( rest_get_url_prefix() );
		$request_uri = esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) );

		return false !== strpos( $request_uri, $rest_prefix . 'wc/store' );
	}
}
