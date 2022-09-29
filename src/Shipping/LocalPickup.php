<?php
namespace Automattic\WooCommerce\Blocks\Shipping;

use WC_Shipping_Method;

/**
 * Local Pickup Shipping Method.
 */
class LocalPickup extends WC_Shipping_Method {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->id                 = 'blocks_local_pickup';
		$this->method_title       = __( 'Local pickup (Blocks)', 'woo-gutenberg-products-block' );
		$this->method_description = __( 'Allows users to select local pickup on the block based checkout.', 'woo-gutenberg-products-block' );
		$this->init();
	}

	/**
	 * Init function.
	 */
	public function init() {
		$this->init_form_fields();
		$this->init_settings();

		$this->enabled = $this->get_option( 'enabled' );
		$this->title   = $this->get_option( 'title' );

		add_action( 'woocommerce_update_options_shipping_' . $this->id, array( $this, 'process_admin_options' ) );
	}

	/**
	 * Calculate shipping.
	 *
	 * @param array $package Package information.
	 */
	public function calculate_shipping( $package = array() ) {
		$rate = array(
			'id'      => $this->id,
			'label'   => $this->title,
			'package' => $package,
		);
		$this->add_rate( $rate );
	}

	/**
	 * Initialize form fields.
	 */
	public function init_form_fields() {
		$this->form_fields = array(
			'enabled' => array(
				'title'   => __( 'Enable', 'woo-gutenberg-products-block' ),
				'type'    => 'checkbox',
				'label'   => __( 'If enabled, this method will appear on the block based checkout.', 'woo-gutenberg-products-block' ),
				'default' => 'no',
			),
			'title'   => array(
				'title'       => __( 'Title', 'woo-gutenberg-products-block' ),
				'type'        => 'text',
				'description' => __( 'This controls the title which the user sees during checkout.', 'woo-gutenberg-products-block' ),
				'default'     => __( 'Local pickup', 'woo-gutenberg-products-block' ),
				'desc_tip'    => true,
			),
		);
	}

	/**
	 * See if the method is available.
	 *
	 * @param array $package Package information.
	 * @return bool
	 */
	public function is_available( $package ) {
		$is_available = 'yes' === $this->enabled;

		return apply_filters( 'woocommerce_shipping_' . $this->id . '_is_available', $is_available, $package, $this );
	}
}
