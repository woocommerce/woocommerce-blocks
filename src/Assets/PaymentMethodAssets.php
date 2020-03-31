<?php
/**
 * Enqueues assets for registered payment types.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\Assets;

use Automattic\WooCommerce\Blocks\Payments\PaymentMethodRegistry;

/**
 * PaymentMethodAssets class.
 *
 * @since $VID:$
 */
class PaymentMethodAssets {

	/**
	 * Reference to the PaymentMethodRegistry instance
	 *
	 * @var PaymentMethodRegistry
	 */
	private $payment_method_registry;

	/**
	 * An instance of the AssetDataRegistry
	 *
	 * @var AssetDataRegistry
	 */
	private $asset_registry;

	/**
	 * An instance of the Asset Api
	 *
	 * @var Api
	 */
	private $asset_api;

	/**
	 * Constructor for class
	 *
	 * @param PaymentMethodRegistry $payment_method_registry An instance of Payment Method Registry.
	 * @param AssetDataRegistry     $asset_registry  Used for registering data to pass along to the request.
	 * @param Api                   $asset_api       Used for registering scripts and styles.
	 */
	public function __construct( PaymentMethodRegistry $payment_method_registry, AssetDataRegistry $asset_registry, Api $asset_api ) {
		$this->payment_method_registry = $payment_method_registry;
		$this->asset_registry          = $asset_registry;
		$this->asset_api               = $asset_api;
		$this->init();
	}

	/**
	 * Hook into WP asset registration for enqueueing asset data.
	 */
	protected function init() {
		add_action( 'woocommerce_blocks_enqueue_checkout_block_scripts_before', array( $this, 'register_payment_method_scripts' ) );
		add_action( 'woocommerce_blocks_enqueue_checkout_block_scripts_before', array( $this, 'register_payment_method_data' ) );
	}

	/**
	 * Registered payment method scripts for usage.
	 */
	public function register_payment_method_scripts() {
		$payment_methods = $this->payment_method_registry->get_all_registered();

		foreach ( $payment_methods as $payment_method ) {
			$scripts = array_filter( (array) $payment_method->scripts );

			if ( ! empty( $scripts ) ) {
				foreach ( $scripts as $script ) {
					$this->asset_api->register_script(
						$script['handle'],
						$script['src'],
						$script['deps']
					);
					wp_enqueue_script( $script['handle'] );
				}
			}
		}
	}

	/**
	 * Adds data from payment methods to the asset registry.
	 */
	public function register_payment_method_data() {
		$payment_methods = $this->payment_method_registry->get_all_registered();

		foreach ( $payment_methods as $payment_method ) {
			$asset_data_key = $payment_method->name . '_data';

			if ( ! $this->asset_registry->exists( $asset_data_key ) ) {
				$this->asset_registry->add( $asset_data_key, $payment_method->data );
			}
		}
	}
}
