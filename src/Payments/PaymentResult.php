<?php
/**
 * Payment result.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\Payments;

defined( 'ABSPATH' ) || exit;

/**
 * PaymentResult class.
 */
class PaymentResult {
	/**
	 * List of valid payment statuses.
	 *
	 * @var array
	 */
	protected $valid_statuses = [ 'success', 'failure', 'pending', 'error' ];

	/**
	 * Current payment status.
	 *
	 * @var string
	 */
	protected $status = '';

	/**
	 * Array of details about the payment.
	 *
	 * @var string
	 */
	protected $payment_details = [];

	/**
	 * Constructor.
	 *
	 * @param string $status Sets the payment status for the result.
	 */
	public function __construct( $status = '' ) {
		if ( $status ) {
			$this->set_status( $status );
		}
	}

	/**
	 * Magic getter for protected properties.
	 *
	 * @param string $name Property name.
	 */
	public function __get( $name ) {
		if ( in_array( $name, [ 'status', 'payment_details' ], true ) ) {
			return $this->$name;
		}
		return null;
	}

	/**
	 * Set payment status.
	 *
	 * @throws \Exception When an invalid status is provided.
	 *
	 * @param string $payment_status Status to set.
	 */
	public function set_status( $payment_status ) {
		if ( ! in_array( $payment_status, $this->valid_statuses, true ) ) {
			throw new \Exception( sprintf( 'Invalid payment status %s. Use one of %s', $payment_status, implode( ', ', $this->valid_statuses ) ) );
		}
		$this->status = $payment_status;
	}

	/**
	 * Set payment details.
	 *
	 * @param array $payment_details Array of key value pairs of data.
	 */
	public function set_payment_details( $payment_details = [] ) {
		$this->payment_details = [];

		foreach ( $payment_details as $key => $value ) {
			$this->payment_details[ (string) $key ] = (string) $value;
		}
	}
}
