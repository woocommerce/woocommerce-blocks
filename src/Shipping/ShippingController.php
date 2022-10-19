<?php
namespace Automattic\WooCommerce\Blocks\Shipping;

/**
 * ShippingController class.
 *
 * @internal
 */
class ShippingController {
	/**
	 * Initialization method.
	 */
	public function init() {
		add_action( 'woocommerce_load_shipping_methods', array( $this, 'register_shipping_methods' ) );
		add_filter( 'woocommerce_customer_taxable_address', array( $this, 'handle_customer_taxable_address' ) );
	}

	/**
	 * Registers the local pickup method for blocks.
	 */
	public function register_shipping_methods() {
		$pickup = new PickupLocation();
		wc()->shipping->register_shipping_method( $pickup );
	}

	/**
	 * Filter the location used for taxes based on the chosen pickup location.
	 *
	 * @param array $address Location args.
	 * @return array
	 */
	public function handle_customer_taxable_address( $address ) {
		$chosen_shipping_methods = wc()->session->get( 'chosen_shipping_methods' );

		// We can only work with this if there is a single shipping method.
		if ( count( $chosen_shipping_methods ) > 1 ) {
			return $address;
		}

		$shipping_method = current( $chosen_shipping_methods );
		$method_id       = explode( ':', $shipping_method )[0];
		$location_id     = explode( ':', $shipping_method )[1] ?? 0;

		// Only handle pickup locations method.
		if ( 'pickup_location' !== $method_id ) {
			return $address;
		}

		$pickup_locations = get_option( 'pickup_location_pickup_locations', [] );

		if ( ! empty( $pickup_locations[ $location_id ] ) && ! empty( $pickup_locations[ $location_id ]['address']['country'] ) ) {
			return array(
				$pickup_locations[ $location_id ]['address']['country'],
				$pickup_locations[ $location_id ]['address']['state'],
				$pickup_locations[ $location_id ]['address']['postcode'],
				$pickup_locations[ $location_id ]['address']['city'],
			);
		}

		return $address;
	}
}
