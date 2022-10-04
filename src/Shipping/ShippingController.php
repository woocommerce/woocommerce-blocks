<?php
namespace Automattic\WooCommerce\Blocks\Shipping;

use Automattic\WooCommerce\Blocks\Domain\Package;

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
		add_action( 'woocommerce_load_shipping_methods', array( $this, 'register_local_pickup' ) );
	}

	/**
	 * Registers the local pickup method for blocks.
	 */
	public function register_local_pickup() {
		$local_pickup = new LocalPickup();
		wc()->shipping->register_shipping_method( $local_pickup );
	}
}
