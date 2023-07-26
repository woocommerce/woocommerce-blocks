<?php
namespace Automattic\WooCommerce\StoreApi\Utilities;

use Automattic\WooCommerce\StoreApi\Exceptions\RouteException;

/**
 * OrderAuthorizationTrait
 *
 * Shared functionality for getting order authorization.
 */
trait OrderAuthorizationTrait {
	/**
	 * Check if authorized to get the order.
	 *
	 * @throws RouteException If the order is not found or the order key is invalid.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return boolean|WP_Error
	 */
	public function is_authorized( \WP_REST_Request $request ) {
		$order_id      = absint( $request['id'] );
		$order_key     = sanitize_text_field( wp_unslash( $request->get_param( 'key' ) ) );
		$billing_email = sanitize_text_field( wp_unslash( $request->get_param( 'billing_email' ) ) );

		try {
			$this->order_controller->validate_order( $order_id, $order_key, $billing_email );
		} catch ( RouteException $error ) {
			return new \WP_Error(
				$error->getErrorCode(),
				$error->getMessage(),
				array( 'status' => $error->getCode() )
			);
		}

		return true;
	}

	/**
	 * Validate a given billing email against an existing order.
	 *
	 * @throws RouteException Exception if invalid data is detected.
	 * @param integer $order_id Order ID.
	 * @param string  $billing_email Billing email.
	 */
	public function validate_billing_email_matches_order( $order_id, $billing_email ) {
		$order = wc_get_order( $order_id );

		if ( ! $order || ! $billing_email || $order->get_billing_email() !== $billing_email ) {
			throw new RouteException( 'woocommerce_rest_invalid_billing_email', __( 'Invalid billing email provided.', 'woo-gutenberg-products-block' ), 401 );
		}
	}

}
