<?php
/**
 * Checkout route.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Routes;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Utilities\CartController;

/**
 * Checkout class.
 */
class Checkout extends AbstractRoute {
	/**
	 * Get the namespace for this route.
	 *
	 * @return string
	 */
	public function get_namespace() {
		return 'wc/store';
	}

	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/checkout';
	}

	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			[
				'methods'  => \WP_REST_Server::CREATABLE,
				'callback' => [ $this, 'post_response' ],
				// @todo Determine the args we want to accept here.
				'args'     => [],
			],
			'schema' => [ $this->schema, 'get_public_item_schema' ],
		];
	}

	/**
	 * Convert the cart into a new draft order, or update an existing draft order, and return an updated cart response.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function post_response( \WP_REST_Request $request ) {
		try {
			// @todo Add order and payment gateway processing here.
			// @todo we need to determine the fields we want to return after processing e.g. redirect URLs.
			$checkout_result = [
				'order' => new \WC_Order(),
			];
			$response        = $this->prepare_item_for_response( $checkout_result, $request );
			$response->set_status( 200 );
			return $response;
		} catch ( \WC_Rest_Exception $e ) {
			return new \WP_Error( $e->getErrorCode(), $e->getMessage(), $e->getCode() );
		} catch ( Exception $e ) {
			return new \WP_Error( 'checkout-error', $e->getMessage(), [ 'status' => 500 ] );
		}
	}
}
