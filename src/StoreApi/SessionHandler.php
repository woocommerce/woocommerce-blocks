<?php

namespace Automattic\WooCommerce\StoreApi;

use Automattic\Jetpack\Constants;
use Automattic\WooCommerce\StoreApi\Utilities\JsonWebToken;
use WC_Session;

defined( 'ABSPATH' ) || exit;

/**
 * SessionHandler class
 */
final class SessionHandler extends WC_Session {
	/**
	 * Token from HTTP headers.
	 *
	 * @var string
	 */
	protected $token;

	/**
	 * Table name for session data.
	 *
	 * @var string Custom session table name
	 */
	protected $table;

	/**
	 * Expiration timestamp.
	 *
	 * @var int
	 */
	protected $session_expiration;

	/**
	 * Constructor for the session class.
	 */
	public function __construct() {
		$this->token = wc_clean( wp_unslash( $_SERVER['HTTP_CART_TOKEN'] ?? '' ) );
		$this->table = $GLOBALS['wpdb']->prefix . 'woocommerce_sessions';
	}

	/**
	 * Init hooks and session data.
	 */
	public function init() {
		$this->init_session_from_token();
		add_action( 'shutdown', array( $this, 'save_data' ), 20 );
	}

	/**
	 * Process the token header to load the correct session.
	 */
	protected function init_session_from_token() {
		$payload = JsonWebToken::get_parts( $this->token )->payload;

		$this->_customer_id       = $payload->user_id;
		$this->session_expiration = $payload->exp;
		$this->_data              = (array) $this->get_session( $this->_customer_id, array() );
	}

	/**
	 * Returns the session.
	 *
	 * @param string $customer_id Customer ID.
	 * @param mixed  $default Default session value.
	 *
	 * @return string|array|bool
	 */
	public function get_session( $customer_id, $default = false ) {
		global $wpdb;

		// This mimics behaviour from default WC_Session_Handler class. There will be no sessions retrieved while WP setup is due.
		if ( Constants::is_defined( 'WP_SETUP_CONFIG' ) ) {
			return false;
		}

		$value = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT session_value FROM $this->table WHERE session_key = %s", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
				$customer_id
			)
		);

		if ( is_null( $value ) ) {
			$value = $default;
		}

		return maybe_unserialize( $value );
	}

	/**
	 * Save data and delete user session.
	 */
	public function save_data() {
		// Dirty if something changed - prevents saving nothing new.
		if ( $this->_dirty ) {
			global $wpdb;

			$wpdb->query(
				$wpdb->prepare(
					"INSERT INTO $this->table (`session_key`, `session_value`, `session_expiry`) VALUES (%s, %s, %d) ON DUPLICATE KEY UPDATE `session_value` = VALUES(`session_value`), `session_expiry` = VALUES(`session_expiry`)", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
					$this->_customer_id,
					maybe_serialize( $this->_data ),
					$this->session_expiration
				)
			);

			$this->_dirty = false;
		}
	}

	/**
	 * Since there is no interface for the abstract session class, we need to wrap calls for methods present on
	 * WC_Session_Handler class that do not exist here (mostly cookie related methods) to prevent fatal errors
	 * due to an optimistic approach to calling methods on the session object.
	 * An example of this would be https://github.com/woocommerce/woocommerce-blocks/issues/9116
	 *
	 * @param string $name Method name.
	 * @param array  $arguments Method arguments.
	 * @throws \Error If the method does not exist on WC_Session_Handler.
	 *
	 * @return void
	 */
	public static function __callStatic( $name, $arguments ) {

		// If the methods does not exist on WC_Session_Handler, throw an error.
		if ( ! method_exists( \WC_Session_Handler::class, $name ) ) {
			throw new \Error( 'Call to undefined method ' . __CLASS__ . '::' . $name() );
		}

		// If the method exists on WC_Session_Handler, send a doing it wrong notice and suppress the fatal.
		wc_doing_it_wrong( __CLASS__ . '::' . $name, 'This method is not supported over Cart-Token API requests.', '10.1.0' );
	}

	/**
	 * Wrapper for object methods, calls the static shim.
	 *
	 * @param string $name Method name.
	 * @param array  $arguments Method arguments.
	 *
	 * @return void
	 */
	public function __call( $name, $arguments ) {
		self::__callStatic( $name, $arguments );
	}
}
