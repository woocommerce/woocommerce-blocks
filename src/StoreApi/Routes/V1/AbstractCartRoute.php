<?php
namespace Automattic\WooCommerce\StoreApi\Routes\V1;

use Automattic\WooCommerce\StoreApi\Exceptions\RouteException;
use Automattic\WooCommerce\StoreApi\SchemaController;
use Automattic\WooCommerce\StoreApi\Schemas\V1\AbstractSchema;
use Automattic\WooCommerce\StoreApi\Schemas\V1\CartSchema;
use Automattic\WooCommerce\StoreApi\Schemas\V1\CartItemSchema;
use Automattic\WooCommerce\StoreApi\Utilities\CartController;
use Automattic\WooCommerce\StoreApi\Utilities\DraftOrderTrait;
use Automattic\WooCommerce\StoreApi\Utilities\OrderController;
/**
 * Abstract Cart Route
 */
abstract class AbstractCartRoute extends AbstractRoute {
	use DraftOrderTrait;

	/**
	 * The routes schema.
	 *
	 * @var string
	 */
	const SCHEMA_TYPE = 'cart';

	/**
	 * Schema class for the cart.
	 *
	 * @var CartSchema
	 */
	protected $cart_schema;

	/**
	 * Cart controller class instance.
	 *
	 * @var CartController
	 */
	protected $cart_controller;

	/**
	 * Order controller class instance.
	 *
	 * @var OrderController
	 */
	protected $order_controller;

	/**
	 * Request rate limit.
	 *
	 * @var integer
	 */
	protected $rate_limit = 1;

	/**
	 * Constructor.
	 *
	 * @param SchemaController $schema_controller Schema Controller instance.
	 * @param AbstractSchema   $schema Schema class for this route.
	 */
	public function __construct( SchemaController $schema_controller, AbstractSchema $schema ) {
		$this->schema_controller = $schema_controller;
		$this->schema            = $schema;
		$this->cart_schema       = $this->schema_controller->get( CartSchema::IDENTIFIER );
		$this->cart_item_schema  = $this->schema_controller->get( CartItemSchema::IDENTIFIER );
		$this->cart_controller   = new CartController();
		$this->order_controller  = new OrderController();
	}

	/**
	 * Are we updating data or getting data?
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return boolean
	 */
	protected function is_update_request( \WP_REST_Request $request ) {
		return in_array( $request->get_method(), [ 'POST', 'PUT', 'PATCH', 'DELETE' ], true );
	}

	/**
	 * Get the route response based on the type of request.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_response( \WP_REST_Request $request ) {
		$this->cart_controller->load_cart();
		$this->calculate_totals();
		$this->update_rate_limit();

		if ( $this->requires_nonce( $request ) ) {
			$this->add_nonce_headers();
			$nonce_check = $this->check_nonce( $request );

			if ( is_wp_error( $nonce_check ) ) {
				return $nonce_check;
			}
		}

		try {
			$response = parent::get_response( $request );
		} catch ( RouteException $error ) {
			$response = $this->get_route_error_response( $error->getErrorCode(), $error->getMessage(), $error->getCode(), $error->getAdditionalData() );
		} catch ( \Exception $error ) {
			$response = $this->get_route_error_response( 'woocommerce_rest_unknown_server_error', $error->getMessage(), 500 );
		}

		if ( is_wp_error( $response ) ) {
			$response = $this->error_to_response( $response );
		} elseif ( $this->is_update_request( $request ) ) {
			$this->cart_updated( $request );
		}

		return $response;
	}

	/**
	 * Get a list of nonce headers.
	 *
	 * @return array
	 */
	protected function get_nonce_headers() {
		return [
			'X-WC-Store-API-Nonce'           => wp_create_nonce( 'wc_store_api' ),
			'X-WC-Store-API-Nonce-Timestamp' => time(),
			'X-WC-Store-API-User'            => get_current_user_id(),
		];
	}

	/**
	 * Add nonce headers to a response object.
	 *
	 * @param \WP_REST_Response $response The response object.
	 * @return \WP_REST_Response
	 */
	protected function add_nonce_headers( \WP_REST_Response $response ) {
		$nonce = wp_create_nonce( 'wc_store_api' );

		$response->header( 'Nonce', $nonce );
		$response->header( 'Nonce-Timestamp', time() );
		$response->header( 'User-ID', get_current_user_id() );

		// The following headers are deprecated and should be removed in a future version.
		$response->header( 'X-WC-Store-API-Nonce', $nonce );

		return $response;
	}

	/**
	 * Checks if a nonce is required for the route.
	 *
	 * @param \WP_REST_Request $request Request.
	 * @return bool
	 */
	protected function requires_nonce( \WP_REST_Request $request ) {
		return 'GET' !== $request->get_method();
	}

	/**
	 * Triggered after an update to cart data. Re-calculates totals and updates draft orders (if they already exist) to
	 * keep all data in sync.
	 *
	 * @param \WP_REST_Request $request Request object.
	 */
	protected function cart_updated( \WP_REST_Request $request ) {
		$draft_order = $this->get_draft_order();

		if ( $draft_order ) {
			$this->order_controller->update_order_from_cart( $draft_order );

			wc_do_deprecated_action(
				'woocommerce_blocks_cart_update_order_from_request',
				array(
					$draft_order,
					$request,
				),
				'7.2.0',
				'woocommerce_store_api_cart_update_order_from_request',
				'This action was deprecated in WooCommerce Blocks version 7.2.0. Please use woocommerce_store_api_cart_update_order_from_request instead.'
			);

			/**
			 * Fires when the order is synced with cart data from a cart route.
			 *
			 * @param \WC_Order $draft_order Order object.
			 * @param \WC_Customer $customer Customer object.
			 * @param \WP_REST_Request $request Full details about the request.
			 */
			do_action( 'woocommerce_store_api_cart_update_order_from_request', $draft_order, $request );
		}
	}

	/**
	 * Ensures the cart totals are calculated before an API response is generated.
	 */
	protected function calculate_totals() {
		wc()->cart->get_cart();
		wc()->cart->calculate_fees();
		wc()->cart->calculate_shipping();
		wc()->cart->calculate_totals();
	}

	/**
	 * For non-GET endpoints, require and validate a nonce to prevent CSRF attacks.
	 *
	 * Nonces will mismatch if the logged in session cookie is different! If using a client to test, set this cookie
	 * to match the logged in cookie in your browser.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_Error|boolean
	 */
	protected function check_nonce( \WP_REST_Request $request ) {
		$nonce = null;

		if ( $request->get_header( 'Nonce' ) ) {
			$nonce = $request->get_header( 'Nonce' );
		} elseif ( $request->get_header( 'X-WC-Store-API-Nonce' ) ) {
			$nonce = $request->get_header( 'X-WC-Store-API-Nonce' );

			// @todo Remove handling and sending of deprecated X-WC-Store-API-Nonce Header (Blocks 7.5.0)
			wc_deprecated_argument( 'X-WC-Store-API-Nonce', '7.2.0', 'Use the "Nonce" Header instead. This header will be removed after Blocks release 7.5' );
			rest_handle_deprecated_argument( 'X-WC-Store-API-Nonce', 'Use the "Nonce" Header instead. This header will be removed after Blocks release 7.5', '7.2.0' );
		}

		/**
		 * Filters the Store API nonce check.
		 *
		 * This can be used to disable the nonce check when testing API endpoints via a REST API client.
		 *
		 * @param boolean $disable_nonce_check If true, nonce checks will be disabled.
		 * @return boolean
		 */
		if ( apply_filters( 'woocommerce_store_api_disable_nonce_check', false ) ) {
			return true;
		}

		if ( null === $nonce ) {
			return $this->get_route_error_response( 'woocommerce_rest_missing_nonce', __( 'Missing the Nonce header. This endpoint requires a valid nonce.', 'woo-gutenberg-products-block' ), 401 );
		}

		if ( ! wp_verify_nonce( $nonce, 'wc_store_api' ) ) {
			return $this->get_route_error_response( 'woocommerce_rest_invalid_nonce', __( 'Nonce is invalid.', 'woo-gutenberg-products-block' ), 403 );
		}

		return true;
	}

	/**
	 * Get route response when something went wrong.
	 *
	 * @param string $error_code String based error code.
	 * @param string $error_message User facing error message.
	 * @param int    $http_status_code HTTP status. Defaults to 500.
	 * @param array  $additional_data  Extra data (key value pairs) to expose in the error response.
	 * @return \WP_Error WP Error object.
	 */
	protected function get_route_error_response( $error_code, $error_message, $http_status_code = 500, $additional_data = [] ) {
		switch ( $http_status_code ) {
			case 409:
				// If there was a conflict, return the cart so the client can resolve it.
				$cart = $this->cart_controller->get_cart_instance();

				return new \WP_Error(
					$error_code,
					$error_message,
					array_merge(
						$additional_data,
						[
							'status' => $http_status_code,
							'cart'   => $this->cart_schema->get_item_response( $cart ),
						]
					)
				);
		}
		return new \WP_Error( $error_code, $error_message, [ 'status' => $http_status_code ] );
	}

	/**
	 * Runs before a request is handled.
	 *
	 * @param \WP_REST_Request $request Request.
	 * @return boolean True if the user has permission to make the request.
	 */
	public function permission_callback( \WP_REST_Request $request ) {
		$this->cart_controller->load_cart();
		$return = true;

		if ( $this->requires_nonce( $request ) ) {
			$nonce_check = $this->check_nonce( $request );

			if ( is_wp_error( $nonce_check ) ) {
				$return = $nonce_check;
			}
		}

		if ( ! is_wp_error( $return ) && $this->is_rate_limit_exceeded() ) {
			$return = new \WP_Error(
				'rate_limit_exceeded',
				sprintf(
					'Rate limit exceeded. Please wait %d seconds before making another request.',
					wc()->session->get( 'store-api-rate-limit' ) - time()
				),
				[
					'status' => 429,
				]
			);
		}

		if ( is_wp_error( $return ) ) {
			$return->add_data(
				[
					'headers' => array_merge(
						$this->get_nonce_headers(),
						$this->get_rate_limit_headers()
					),
				]
			);
		}

		return $return;
	}

	/**
	 * Check if rate limit was exceeded.
	 *
	 * @return boolean
	 */
	protected function is_rate_limit_exceeded() {
		$next_try_time = wc()->session->get( 'store-api-rate-limit' );

		return $next_try_time && time() < $next_try_time;
	}

	/**
	 * Update session rate limit after successful response.
	 */
	protected function update_rate_limit() {
		$delay = $this->rate_limit;
		add_action(
			'shutdown',
			function() use ( $delay ) {
				if ( $delay ) {
					$next_try_time     = wc()->session->get( 'store-api-rate-limit' );
					$new_next_try_time = time() + $delay;
					wc()->session->set( 'store-api-rate-limit', ! $next_try_time || $new_next_try_time > $next_try_time ? $new_next_try_time : $next_try_time );
				} else {
					wc()->session->set( 'store-api-rate-limit', null );
				}
			},
			0
		);
	}

	/**
	 * Get list of rate limit headers.
	 *
	 * @return array
	 */
	protected function get_rate_limit_headers() {
		$rate_limit = wc()->session->get( 'store-api-rate-limit' );

		if ( ! $rate_limit ) {
			return [];
		}

		$headers = [
			'X-RateLimit-Limit'     => 1,
			'X-RateLimit-Remaining' => 0,
			'X-RateLimit-Reset'     => wc()->session->get( 'store-api-rate-limit' ),
		];

		if ( $this->is_rate_limit_exceeded() ) {
			$headers['Retry-After'] = wc()->session->get( 'store-api-rate-limit' ) - time();
		}

		return $headers;
	}

	/**
	 * Add rate limit headers to a response object.
	 *
	 * @param \WP_REST_Response $response The response object.
	 * @return \WP_REST_Response
	 */
	protected function add_rate_limit_headers( \WP_REST_Response $response ) {
		foreach ( $this->get_rate_limit_headers() as $header => $value ) {
			$response->header( $header, $value );
		}
		return $response;
	}
}
