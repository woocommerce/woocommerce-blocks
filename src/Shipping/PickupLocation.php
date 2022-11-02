<?php
namespace Automattic\WooCommerce\Blocks\Shipping;

use WC_Shipping_Method;

/**
 * Local Pickup Shipping Method.
 */
class PickupLocation extends WC_Shipping_Method {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->id                 = 'pickup_location';
		$this->method_title       = __( 'Local Pickup', 'woo-gutenberg-products-block' );
		$this->method_description = __( 'Allow customers to choose a local pickup location during checkout.', 'woo-gutenberg-products-block' );
		$this->init();
	}

	/**
	 * Init function.
	 */
	public function init() {
		$this->init_form_fields();
		$this->init_settings();

		$this->enabled          = $this->get_option( 'enabled' );
		$this->title            = $this->get_option( 'title' );
		$this->tax_status       = $this->get_option( 'tax_status' );
		$this->cost             = $this->get_option( 'cost' );
		$this->pickup_locations = get_option( $this->id . '_pickup_locations', [] );

		add_action( 'woocommerce_update_options_shipping_' . $this->id, array( $this, 'process_admin_options' ) );
		add_filter( 'woocommerce_attribute_label', array( $this, 'translate_meta_data' ), 10, 3 );
	}

	/**
	 * Calculate shipping.
	 *
	 * @param array $package Package information.
	 */
	public function calculate_shipping( $package = array() ) {
		if ( $this->pickup_locations ) {
			foreach ( $this->pickup_locations as $index => $location ) {
				if ( ! $location['enabled'] ) {
					continue;
				}
				$this->add_rate(
					array(
						'id'          => $this->id . ':' . $index,
						// This is the label shown in shipping rate/method context e.g. London (Local Pickup).
						'label'       => wp_kses_post( $location['name'] . ' (' . $this->title . ')' ),
						'package'     => $package,
						'cost'        => $this->cost,
						'description' => $location['details'],
						'meta_data'   => array(
							'pickup_location' => wp_kses_post( $location['name'] ),
							'pickup_address'  => wc()->countries->get_formatted_address( $location['address'], ', ' ),
						),
					)
				);
			}
		}
	}

	/**
	 * Initialize form fields.
	 */
	public function init_form_fields() {
		$this->form_fields = array(
			'enabled'    => array(
				'title'   => __( 'Enable', 'woo-gutenberg-products-block' ),
				'type'    => 'checkbox',
				'label'   => __( 'If enabled, this method will appear on the block based checkout.', 'woo-gutenberg-products-block' ),
				'default' => 'no',
			),
			'title'      => array(
				'title'       => __( 'Title', 'woo-gutenberg-products-block' ),
				'type'        => 'text',
				'description' => __( 'This controls the title which the user sees during checkout.', 'woo-gutenberg-products-block' ),
				'default'     => __( 'Local pickup', 'woo-gutenberg-products-block' ),
				'desc_tip'    => true,
			),
			'tax_status' => array(
				'title'   => __( 'Tax status', 'woo-gutenberg-products-block' ),
				'type'    => 'select',
				'class'   => 'wc-enhanced-select',
				'default' => 'taxable',
				'options' => array(
					'taxable' => __( 'Taxable', 'woo-gutenberg-products-block' ),
					'none'    => _x( 'None', 'Tax status', 'woo-gutenberg-products-block' ),
				),
			),
			'cost'       => array(
				'title'       => __( 'Cost', 'woo-gutenberg-products-block' ),
				'type'        => 'text',
				'placeholder' => '0',
				'description' => __( 'Optional cost for local pickup.', 'woo-gutenberg-products-block' ),
				'default'     => '',
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
		return apply_filters( 'woocommerce_shipping_' . $this->id . '_is_available', 'yes' === $this->enabled, $package, $this );
	}

	/**
	 * Process options in admin.
	 */
	public function process_admin_options() {
		parent::process_admin_options();

		$locations      = [];
		$location_names = array_map( 'sanitize_text_field', wp_unslash( $_POST['locationName'] ?? [] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Missing

		foreach ( $location_names as $index => $location_name ) {
			$locations[] = [
				'name'    => $location_name,
				'address' => [
					'address_1' => wc_clean( wp_unslash( $_POST['address_1'][ $index ] ?? '' ) ), // phpcs:ignore WordPress.Security.NonceVerification.Missing
					'city'      => wc_clean( wp_unslash( $_POST['city'][ $index ] ?? '' ) ), // phpcs:ignore WordPress.Security.NonceVerification.Missing
					'state'     => wc_clean( wp_unslash( $_POST['state'][ $index ] ?? '' ) ), // phpcs:ignore WordPress.Security.NonceVerification.Missing
					'postcode'  => wc_clean( wp_unslash( $_POST['postcode'][ $index ] ?? '' ) ), // phpcs:ignore WordPress.Security.NonceVerification.Missing
					'country'   => wc_clean( wp_unslash( $_POST['country'][ $index ] ?? '' ) ), // phpcs:ignore WordPress.Security.NonceVerification.Missing
				],
				'details' => wc_clean( wp_unslash( $_POST['details'][ $index ] ?? '' ) ), // phpcs:ignore WordPress.Security.NonceVerification.Missing
				'enabled' => wc_string_to_bool( wc_clean( wp_unslash( $_POST['locationEnabled'][ $index ] ?? 1 ) ) ) ? 1 : 0, // phpcs:ignore WordPress.Security.NonceVerification.Missing
			];
		}

		update_option( $this->id . '_pickup_locations', $locations );
		$this->pickup_locations = $locations;
	}

	/**
	 * Translates meta data for the shipping method.
	 *
	 * @param string $label Meta label.
	 * @param string $name Meta key.
	 * @param mixed  $product Product if applicable.
	 * @return string
	 */
	public function translate_meta_data( $label, $name, $product ) {
		if ( $product ) {
			return $label;
		}
		switch ( $name ) {
			case 'pickup_location':
				return __( 'Pickup Location', 'woo-gutenberg-products-block' );
			case 'pickup_address':
				return __( 'Pickup Address', 'woo-gutenberg-products-block' );
		}
		return $label;
	}

	/**
	 * Admin options screen.
	 *
	 * See also WC_Shipping_Method::admin_options().
	 */
	public function admin_options() {
		global $hide_save_button;
		$hide_save_button = true;

		wp_enqueue_script( 'wc-shipping-method-pickup-location' );

		echo '<h2>' . esc_html__( 'Local Pickup', 'woo-gutenberg-products-block' ) . '</h2>';
		echo '<div class="wrap"><div id="wc-shipping-method-pickup-location-settings-container"></div></div>';

		// parent::admin_options();
	}
}
