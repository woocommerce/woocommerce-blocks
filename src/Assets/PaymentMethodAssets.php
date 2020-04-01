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
	 * Constructor for class
	 *
	 * @param PaymentMethodRegistry $payment_method_registry An instance of Payment Method Registry.
	 * @param AssetDataRegistry     $asset_registry  Used for registering data to pass along to the request.
	 */
	public function __construct( PaymentMethodRegistry $payment_method_registry, AssetDataRegistry $asset_registry ) {
		$this->payment_method_registry = $payment_method_registry;
		$this->asset_registry          = $asset_registry;
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
	 * Register payment method scripts for usage.
	 */
	public function register_payment_method_scripts() {
		$payment_methods = $this->payment_method_registry->get_all_registered();
		foreach ( $payment_methods as $payment_method ) {
			$script_handles       = $payment_method->get_payment_method_script_handles();
			$admin_script_handles = $payment_method->get_payment_method_script_handles_for_admin();
			if ( is_admin() && ! empty( $admin_script_handles ) ) {
				foreach ( $admin_script_handles as $script_handle ) {
					wp_enqueue_script( $script_handle );
				}
			}
			if ( ! is_admin() && ! empty( $script_handles ) ) {
				foreach ( $script_handles as $script_handle ) {
					wp_enqueue_script( $script_handle );
				}
			}
		}
	}

	/**
	 * Register payment method styles for usage.
	 */
	public function register_payment_method_styles() {
		// @todo not sure where/how we should enqueue these yet. They can't
		// be enqueued in the block render function.
	}

	/**
	 * Adds data from payment methods to the asset registry.
	 */
	public function register_payment_method_data() {
		$payment_methods = $this->payment_method_registry->get_all_registered();

		foreach ( $payment_methods as $payment_method ) {
			$asset_data_key = $payment_method->get_name() . '_data';

			if ( ! $this->asset_registry->exists( $asset_data_key ) ) {
				$this->asset_registry->add( $asset_data_key, $payment_method->get_payment_method_data() );
			}
		}
	}
}
