<?php
namespace Automattic\WooCommerce\StoreApi\Schemas\V1;

use Automattic\WooCommerce\StoreApi\Exceptions\RouteException;
use Automattic\WooCommerce\StoreApi\Utilities\ValidationUtils;

/**
 * ShippingAddressSchema class.
 *
 * Provides a generic shipping address schema for composition in other schemas.
 */
class ShippingAddressSchema extends AbstractAddressSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'shipping_address';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'shipping-address';

	/**
	 * Returns the address data in array format.
	 *
	 * @param \WC_Order|\WC_Customer $customer_or_order An object with shipping address.
	 * @return array|null
	 */
	public function get_address_data( $customer_or_order ) {
		if ( ( $customer_or_order instanceof \WC_Customer || $customer_or_order instanceof \WC_Order ) ) {
			$validation_util  = new ValidationUtils();
			$shipping_country = $customer_or_order->get_shipping_country();
			$shipping_state   = $customer_or_order->get_shipping_state();

			if ( ! $validation_util->validate_state( $shipping_state, $shipping_country ) ) {
				$shipping_state = '';
			}

			return [
				'first_name' => $customer_or_order->get_shipping_first_name(),
				'last_name'  => $customer_or_order->get_shipping_last_name(),
				'company'    => $customer_or_order->get_shipping_company(),
				'address_1'  => $customer_or_order->get_shipping_address_1(),
				'address_2'  => $customer_or_order->get_shipping_address_2(),
				'city'       => $customer_or_order->get_shipping_city(),
				'state'      => $shipping_state,
				'postcode'   => $customer_or_order->get_shipping_postcode(),
				'country'    => $shipping_country,
				'phone'      => $customer_or_order->get_shipping_phone(),
			];
		}
		return null;
	}

	/**
	 * Convert a term object into an object suitable for the response.
	 *
	 * @param \WC_Order|\WC_Customer $customer_or_order An object with shipping address.
	 *
	 * @throws RouteException When the invalid object types are provided.
	 * @return stdClass
	 */
	public function get_item_response( $customer_or_order ) {
		$address = $this->get_address_data( $customer_or_order );

		if ( ! is_null( $address ) ) {
			return (object) $this->prepare_html_response( $address );
		}

		throw new RouteException(
			'invalid_object_type',
			sprintf(
				/* translators: Placeholders are class and method names */
				__( '%1$s requires an instance of %2$s or %3$s for the address', 'woo-gutenberg-products-block' ),
				'ShippingAddressSchema::get_item_response',
				'WC_Customer',
				'WC_Order'
			),
			500
		);
	}
}
