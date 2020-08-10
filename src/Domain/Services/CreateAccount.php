<?php
/**
 * Service class implementing new create account behaviour for order processing.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\Domain\Services;

use WP_REST_Request;
use WC_Order;

/**
 * Service class implementing new create account behaviour for order processing.
 */
class CreateAccount {
	/**
	 * Constructor.
	 */
	public function __construct() {
	}

	/**
	 * Init - register custom hook handler.
	 */
	public function init() {
		add_action( 'woocommerceblocks_create_account_for_order_request', [ $this, 'from_order_request' ], 10, 2 );
	}

	/**
	 * Create a user account for specified order and request (if necessary).
	 * If a new account is created:
	 * - The order is associated with the account.
	 * - The user is logged in.
	 *
	 * @param \WC_Order        $order   The order currently being processed.
	 * @param \WP_REST_Request $request The current request object being handled.
	 *
	 * @throws Exception On error.
	 */
	public function from_order_request( \WC_Order $order, \WP_REST_Request $request ) {
		if ( $this->should_create_customer_account( $request ) ) {
			$customer_id = $this->create_customer_account(
				$order->get_billing_email(),
				$order->get_billing_first_name(),
				$order->get_billing_last_name()
			);

			// Log the customer in and associate with the order.
			wc_set_customer_auth_cookie( $customer_id );
			$order->set_customer_id( get_current_user_id() );
		}
	}

	/**
	 * Check request options and store (shop) config to determine if a user account
	 * should be created as part of order processing.
	 *
	 * @param \WP_REST_Request $request The current request object being handled.
	 *
	 * @return boolean True if a new user account should be created.
	 */
	protected function should_create_customer_account( $request ) {
		if ( is_user_logged_in() ) {
			return false;
		}

		$checkout_requires_account = false === filter_var( get_option( 'woocommerce_enable_guest_checkout' ), FILTER_VALIDATE_BOOLEAN );
		if ( $checkout_requires_account ) {
			return true;
		}

		$user_requested_account = ! empty( $request['create_account'] ) && true === filter_var( $request['create_account'], FILTER_VALIDATE_BOOLEAN );
		if ( $user_requested_account ) {
			return true;
		}

		return false;
	}

	/**
	 * Convert an account creation error to an exception.
	 * THIS WILL BE GONE - temporary!
	 *
	 * @param \WP_Error $error An error object.
	 *
	 * @return Exception.
	 */
	private function map_create_account_error( \WP_Error $error ) {
		switch ( $error->get_error_code() ) {
			// WordPress core error codes.
			case 'empty_username':
			case 'invalid_username':
			case 'empty_email':
			case 'invalid_email':
			case 'email_exists':
			case 'registerfail':
				return new \Exception( 'woocommerce_rest_checkout_create_account_failure' );
		}

		return new \Exception( 'woocommerce_rest_checkout_create_account_failure' );
	}

	/**
	 * Create a new account for a customer (using a new blocks-specific PHP API).
	 *
	 * The account is created with a generated username. The customer is sent
	 * an email notifying them about the account and containing a link to set
	 * their (initial) password.
	 *
	 * @throws \Exception If an error is encountered when creating the user account.
	 *
	 * @param string $user_email The email address to use for the new account.
	 * @param string $first_name The first name to use for the new account.
	 * @param string $last_name  The last name to use for the new account.
	 *
	 * @return int User id if successful
	 */
	protected function create_customer_account( $user_email, $first_name, $last_name ) {
		if ( empty( $user_email ) || ! is_email( $user_email ) ) {
			throw new \Exception( 'registration-error-invalid-email' );
		}

		if ( email_exists( $user_email ) ) {
			throw new \Exception( 'registration-error-email-exists' );
		}

		$username = wc_create_new_customer_username( $user_email );

		// Handle password creation.
		$password           = wp_generate_password();
		$password_generated = true;

		// Use WP_Error to handle registration errors.
		$errors = new \WP_Error();

		do_action( 'woocommerce_register_post', $username, $user_email, $errors );

		$errors = apply_filters( 'woocommerce_registration_errors', $errors, $username, $user_email );

		if ( $errors->get_error_code() ) {
			return $errors;
		}

		$new_customer_data = apply_filters(
			'woocommerce_new_customer_data',
			array(
				'user_login' => $username,
				'user_pass'  => $password,
				'user_email' => $user_email,
				'first_name' => $first_name,
				'last_name'  => $last_name,
				'role'       => 'customer',
			)
		);

		$customer_id = wp_insert_user( $new_customer_data );

		if ( is_wp_error( $customer_id ) ) {
			throw $this->map_create_account_error( $customer_id );
		}

		do_action( 'woocommerce_created_customer', $customer_id, $new_customer_data, $password_generated );

		return $customer_id;
	}
}
