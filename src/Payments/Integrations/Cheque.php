<?php
/**
 * Temporary integration of the stripe payment method for the new cart and
 * checkout blocks. Once the api is demonstrated to be stable, this integration
 * will be moved to the Stripe extension
 *
 * @package WooCommerce/Blocks
 * @since $VID:$
 */

namespace Automattic\WooCommerce\Blocks\Payments\Integrations;

use Exception;
use WC_Stripe_Payment_Request;
use WC_Stripe_Helper;
use Automattic\WooCommerce\Blocks\Assets\Api;

/**
 * Cheque payment method integration
 *
 * @since $VID:$
 */
final class Cheque extends AbstractPaymentMethodType {
	/**
	 * Settings from the WP options table
	 *
	 * @var array
	 */
	private $cheque_settings;

	/**
	 * An instance of the Asset Api
	 *
	 * @var Api
	 */
	private $asset_api;

	/**
	 * Constructor
	 *
	 * @param string $name The name of the payment method type.
	 * @param Api    $asset_api An instance of Api.
	 */
	public function __construct( $name, Api $asset_api ) {
		$this->asset_api = $asset_api;
		parent::__construct( $name );
	}

	/**
	 * Initializes the payment method type.
	 */
	public function initialize() {
		$this->cheque_settings = get_option( 'woocommerce_cheque_settings', [] );
	}

	/**
	 * Returns an array of scripts/handles to be registered for this payment method.
	 *
	 * @return array
	 */
	public function get_payment_method_script_handles() {
		$this->asset_api->register_script(
			'wc-payment-method-cheque',
			'build/wc-payment-method-cheque.js'
		);
		return [ 'wc-payment-method-cheque' ];
	}

	/**
	 * Returns an array of key=>value pairs of data made available to the payment methods script.
	 *
	 * @return array
	 */
	public function get_payment_method_data() {
		return [
			'title'       => isset( $this->cheque_settings['title'] ) ? $this->cheque_settings['title'] : '',
			'description' => isset( $this->cheque_settings['description'] ) ? $this->cheque_settings['description'] : '',
		];
	}
}
