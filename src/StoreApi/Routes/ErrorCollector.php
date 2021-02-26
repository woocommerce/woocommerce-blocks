<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Routes;

/**
 * ErrorCollector route.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class ErrorCollector extends AbstractRoute {
	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/error';
	}

	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			[
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'get_response' ],
				'permission_callback' => '__return_true',
				'args'                => [
					'origin'  => [
						'description' => __( 'Location where the error has happened', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
					],
					'content' => [
						'description' => __( 'Error content', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
					],
				],
			],
		];
	}

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Add option to enable or disable debug log.
		add_filter( 'woocommerce_get_sections_advanced', [ $this, 'add_errors_section_link' ], 10, 1 );
		add_filter( 'woocommerce_get_settings_advanced', [ $this, 'add_errors_settings_section' ], 10, 2 );
	}

	/**
	 * Inject Blocks Settings section.
	 *
	 * @param array $sections Already added sections.
	 *
	 * @return array
	 */
	public function add_errors_section_link( $sections ) {
		$sections['woocommerce-blocks'] = __( 'WooCommerce Blocks', 'woo-gutenberg-products-block' );
		return $sections;
	}

	/**
	 * Get settings array for WooCommerce Blocks
	 *
	 * @param array  $settings Settings array.
	 * @param string $current_section Current section slug.
	 *
	 * @return array
	 */
	public function add_errors_settings_section( $settings, $current_section ) {
		if ( 'woocommerce-blocks' === $current_section ) {
			$settings = array(
				array(
					'title' => 'WooCommerce Blocks Debug Settings',
					'type'  => 'title',
					'desc'  => '',
					'id'    => 'woocommerce_blocks_options',
				),
				array(
					'title'   => __( 'Blocks Debug', 'woo-gutenberg-products-block' ),
					'desc'    => __( 'Enable debug logging for WooCommerce Blocks', 'woo-gutenberg-products-block' ),
					'id'      => 'woocommerce_blocks_debug_enabled',
					'type'    => 'checkbox',
					'default' => 'no',
				),
				array(
					'type' => 'sectionend',
					'id'   => 'woocommerce_blocks_options',
				),
			);
		}
		return $settings;
	}

	/**
	 * Get the route response based on the type of request.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_response( \WP_REST_Request $request ) {
		try {
			if ( $this->requires_nonce( $request ) ) {
				$this->check_nonce( $request );
			}
			$response = parent::get_response( $request );
		} catch ( RouteException $error ) {
			$response = $this->get_route_error_response( $error->getErrorCode(), $error->getMessage(), $error->getCode(), $error->getAdditionalData() );
		} catch ( \Exception $error ) {
			$response = $this->get_route_error_response( 'unknown_server_error', $error->getMessage(), 500 );
		}

		if ( is_wp_error( $response ) ) {
			$response = $this->error_to_response( $response );
		}

		$response->header( 'X-WC-Store-API-Nonce', wp_create_nonce( 'wc_store_api' ) );
		$response->header( 'X-WC-Store-API-Nonce-Timestamp', time() );
		$response->header( 'X-WC-Store-API-User', get_current_user_id() );

		return $response;
	}

	/**
	 * Get route response for POST requests.
	 *
	 * When implemented, should return a \WP_REST_Response.
	 *
	 * @throws RouteException On error.
	 * @param \WP_REST_Request $request Request object.
	 */
	protected function get_route_post_response( \WP_REST_Request $request ) {
		$message = 'In ' . $request['origin'] . ' : ' . $request['content'];
		$logger  = wc_get_logger();
		$logger->error( $message, array( 'source' => 'woocommerce-blocks' ) );
		return rest_ensure_response( 'OK' );
	}

	/**
	 * Checks if a nonce is required for the route.
	 *
	 * @param \WP_REST_Request $request Request.
	 * @return bool
	 */
	protected function requires_nonce( \WP_REST_Request $request ) {
		return 'POST' === $request->get_method();
	}

	/**
	 * For non-GET endpoints, require and validate a nonce to prevent CSRF attacks.
	 *
	 * Nonces will mismatch if the logged in session cookie is different! If using a client to test, set this cookie
	 * to match the logged in cookie in your browser.
	 *
	 * @throws RouteException On error.
	 *
	 * @param \WP_REST_Request $request Request object.
	 */
	protected function check_nonce( \WP_REST_Request $request ) {
		$nonce = $request->get_header( 'X-WC-Store-API-Nonce' );

		if ( apply_filters( 'woocommerce_store_api_disable_nonce_check', true ) ) {
			return;
		}

		if ( null === $nonce ) {
			throw new RouteException( 'woocommerce_rest_missing_nonce', __( 'Missing the X-WC-Store-API-Nonce header. This endpoint requires a valid nonce.', 'woo-gutenberg-products-block' ), 401 );
		}

		$valid_nonce = wp_verify_nonce( $nonce, 'wc_store_api' );

		if ( ! $valid_nonce ) {
			throw new RouteException( 'woocommerce_rest_invalid_nonce', __( 'X-WC-Store-API-Nonce is invalid.', 'woo-gutenberg-products-block' ), 403 );
		}
	}

}
