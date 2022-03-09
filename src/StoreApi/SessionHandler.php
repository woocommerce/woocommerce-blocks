<?php
namespace Automattic\WooCommerce\StoreApi;

use ReallySimpleJWT\Token;

defined( 'ABSPATH' ) || exit;

/**
 * SessionHandler class
 */
final class SessionHandler extends \WC_Session {
	/**
	 * Token from HTTP headers.
	 *
	 * @var string
	 */
	protected $token;

	/**
	 * True when a token has been used.
	 *
	 * @var boolean
	 */
	protected $has_token = false;

	/**
	 * Table name for session data.
	 *
	 * @var string Custom session table name
	 */
	protected $session_table;

	/**
	 * Constructor for the session class.
	 */
	public function __construct() {
		$headers             = getallheaders();
		$this->token         = $headers['Cart-Token'] ?? '';
		$this->session_table = $GLOBALS['wpdb']->prefix . 'woocommerce_sessions';
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
		if ( $this->token && Token::validate( $this->token, '@' . wp_salt() ) ) {
			$payload                   = Token::getPayload( $this->token, '@' . wp_salt() );
			$this->has_token           = true;
			$this->_customer_id        = $payload['user_id'];
			$this->_session_expiration = $payload['exp'];
			$this->_data               = (array) $this->get_session( $this->_customer_id, array() );
		} else {
			$this->_customer_id        = $this->generate_customer_id();
			$this->_session_expiration = time() + intval( apply_filters( 'wc_session_expiration', 60 * 60 * 48 ) ); // 48 Hours.
		}
	}

	/**
	 * Generate a unique customer ID.
	 *
	 * Uses Portable PHP password hashing framework to generate a unique cryptographically strong ID.
	 *
	 * @return string
	 */
	public function generate_customer_id() {
		require_once ABSPATH . 'wp-includes/class-phpass.php';

		$hasher      = new \PasswordHash( 8, false );
		$customer_id = md5( $hasher->get_random_bytes( 32 ) );

		return $customer_id;
	}

	/**
	 * Return true if the current user has an active session, i.e. a cookie to retrieve values.
	 *
	 * @return bool
	 */
	public function has_session() {
		return $this->has_token;
	}

	/**
	 * Returns the session.
	 *
	 * @param string $customer_id Customer ID.
	 * @param mixed  $default Default session value.
	 * @return string|array
	 */
	public function get_session( $customer_id, $default = false ) {
		global $wpdb;

		if ( ! $this->has_session() ) {
			return $default;
		}

		$value = $wpdb->get_var( $wpdb->prepare( "SELECT session_value FROM {$this->session_table} WHERE session_key = %s", $customer_id ) ); // @codingStandardsIgnoreLine.

		if ( is_null( $value ) ) {
			$value = $default;
		}

		return maybe_unserialize( $value );
	}
}
