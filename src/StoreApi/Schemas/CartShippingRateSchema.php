<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Schemas;

use WC_Shipping_Rate as ShippingRate;

/**
 * CartShippingRateSchema class.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class CartShippingRateSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'cart-shipping-rate';

	/**
	 * Cart schema properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		return [
			'package_id'     => [
				'description' => __( 'The ID of the package the shipping rates belong to.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'name'           => [
				'description' => __( 'Name of the package.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'destination'    => [
				'description' => __( 'Shipping destination address.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'properties'  => [
					'address_1' => [
						'description' => __( 'First line of the address being shipped to.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
						'readonly'    => true,
					],
					'address_2' => [
						'description' => __( 'Second line of the address being shipped to.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
						'readonly'    => true,
					],
					'city'      => [
						'description' => __( 'City of the address being shipped to.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
						'readonly'    => true,
					],
					'state'     => [
						'description' => __( 'ISO code, or name, for the state, province, or district of the address being shipped to.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
						'readonly'    => true,
					],
					'postcode'  => [
						'description' => __( 'Zip or Postcode of the address being shipped to.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
						'readonly'    => true,
					],
					'country'   => [
						'description' => __( 'ISO code for the country of the address being shipped to.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
						'readonly'    => true,
					],
				],
			],
			'items'          => [
				'description' => __( 'List of cart items the returned shipping rates apply to.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type'       => 'object',
					'properties' => [
						'key'      => [
							'description' => __( 'Unique identifier for the item within the cart.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'name'     => [
							'description' => __( 'Name of the item.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'quantity' => [
							'description' => __( 'Quantity of the item in the current package.', 'woo-gutenberg-products-block' ),
							'type'        => 'number',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
					],
				],
			],
			'shipping_rates' => [
				'description' => __( 'List of shipping rates.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type'       => 'object',
					'properties' => $this->get_rate_properties(),
				],
			],
		];
	}

	/**
	 * Schema for a single rate.
	 *
	 * @return array
	 */
	protected function get_rate_properties() {
		return array_merge(
			[
				'rate_id'       => [
					'description' => __( 'ID of the shipping rate.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'name'          => [
					'description' => __( 'Name of the shipping rate, e.g. Express shipping.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'description'   => [
					'description' => __( 'Description of the shipping rate, e.g. Dispatched via USPS.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'delivery_time' => [
					'description' => __( 'Delivery time estimate text, e.g. 3-5 business days.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'price'         => [
					'description' => __( 'Price of this shipping rate using the smallest unit of the currency.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'taxes'         => [
					'description' => __( 'Taxes applied to this shipping rate using the smallest unit of the currency.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'method_id'     => [
					'description' => __( 'ID of the shipping method that provided the rate.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'instance_id'   => [
					'description' => __( 'Instance ID of the shipping method that provided the rate.', 'woo-gutenberg-products-block' ),
					'type'        => 'integer',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'meta_data'     => [
					'description' => __( 'Meta data attached to the shipping rate.', 'woo-gutenberg-products-block' ),
					'type'        => 'array',
					'context'     => [ 'view', 'edit' ],
					'items'       => [
						'type'       => 'object',
						'properties' => [
							'key'   => [
								'description' => __( 'Meta key.', 'woo-gutenberg-products-block' ),
								'type'        => 'string',
								'context'     => [ 'view', 'edit' ],
								'readonly'    => true,
							],
							'value' => [
								'description' => __( 'Meta value.', 'woo-gutenberg-products-block' ),
								'type'        => 'string',
								'context'     => [ 'view', 'edit' ],
								'readonly'    => true,
							],
						],
					],
				],
				'selected'      => [
					'description' => __( 'True if this is the rate currently selected by the customer for the cart.', 'woo-gutenberg-products-block' ),
					'type'        => 'boolean',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
			],
			$this->get_store_currency_properties()
		);
	}

	/**
	 * Convert a shipping rate from WooCommerce into a valid response.
	 *
	 * @param array $package Shipping package complete with rates from WooCommerce.
	 * @return array
	 */
	public function get_item_response( $package ) {
		// Add product names and quantities.
		$items = array();
		foreach ( $package['contents'] as $item_id => $values ) {
			$items[] = [
				'key'      => $item_id,
				'name'     => $values['data']->get_name(),
				'quantity' => $values['quantity'],
			];
		}

		// Generate package name.
		$package_number       = absint( $package['package_id'] ) + 1;
		$package_display_name = apply_filters(
			'woocommerce_shipping_package_name',
			$package_number > 1 ?
				sprintf(
					/* translators: %d: shipping package number */
					_x( 'Shipping %d', 'shipping packages', 'woo-gutenberg-products-block' ),
					$package_number
				) :
				_x( 'Shipping', 'shipping packages', 'woo-gutenberg-products-block' ),
			$package['package_id'],
			$package
		);

		return [
			'package_id'     => $package['package_id'],
			'name'           => $package_display_name,
			'destination'    => (object) $this->prepare_html_response(
				[
					'address_1' => $package['destination']['address_1'],
					'address_2' => $package['destination']['address_2'],
					'city'      => $package['destination']['city'],
					'state'     => $package['destination']['state'],
					'postcode'  => $package['destination']['postcode'],
					'country'   => $package['destination']['country'],
				]
			),
			'items'          => $items,
			'shipping_rates' => $this->prepare_rates_response( $package ),
		];
	}

	/**
	 * Prepare an array of rates from a package for the response.
	 *
	 * @param array $package Shipping package complete with rates from WooCommerce.
	 * @return array
	 */
	protected function prepare_rates_response( $package ) {
		$rates          = $package['rates'];
		$selected_rates = wc()->session->get( 'chosen_shipping_methods', array() );
		$selected_rate  = isset( $chosen_shipping_methods[ $package['package_id'] ] ) ? $chosen_shipping_methods[ $package['package_id'] ] : '';

		if ( empty( $selected_rate ) && ! empty( $package['rates'] ) ) {
			$selected_rate = wc_get_chosen_shipping_method_for_package( $package['package_id'], $package );
		}

		$response = [];

		foreach ( $package['rates'] as $rate ) {
			$response[] = $this->get_rate_response( $rate, $selected_rate );
		}

		return $response;
	}

	/**
	 * Response for a single rate.
	 *
	 * @param WC_Shipping_Rate $rate Rate object.
	 * @param string           $selected_rate Selected rate.
	 * @return array
	 */
	protected function get_rate_response( $rate, $selected_rate = '' ) {
		return array_merge(
			[
				'rate_id'       => $this->get_rate_prop( $rate, 'id' ),
				'name'          => $this->prepare_html_response( $this->get_rate_prop( $rate, 'label' ) ),
				'description'   => $this->prepare_html_response( $this->get_rate_prop( $rate, 'description' ) ),
				'delivery_time' => $this->prepare_html_response( $this->get_rate_prop( $rate, 'delivery_time' ) ),
				'price'         => $this->prepare_money_response( $this->get_rate_prop( $rate, 'cost' ), wc_get_price_decimals() ),
				'taxes'         => $this->prepare_money_response( array_sum( $this->get_rate_prop( $rate, 'taxes' ) ), wc_get_price_decimals() ),
				'instance_id'   => $this->get_rate_prop( $rate, 'instance_id' ),
				'method_id'     => $this->get_rate_prop( $rate, 'method_id' ),
				'meta_data'     => $this->get_rate_meta_data( $rate ),
				'selected'      => $selected_rate === $this->get_rate_prop( $rate, 'id' ),
			],
			$this->get_store_currency_response()
		);
	}

	/**
	 * Gets a prop of the rate object, if callable.
	 *
	 * @param WC_Shipping_Rate $rate Rate object.
	 * @param string           $prop Prop name.
	 * @return string
	 */
	protected function get_rate_prop( $rate, $prop ) {
		$getter = 'get_' . $prop;
		return \is_callable( array( $rate, $getter ) ) ? $rate->$getter() : '';
	}

	/**
	 * Converts rate meta data into a suitable response object.
	 *
	 * @param WC_Shipping_Rate $rate Rate object.
	 * @return array
	 */
	protected function get_rate_meta_data( $rate ) {
		$meta_data = $rate->get_meta_data();

		return array_reduce(
			array_keys( $meta_data ),
			function( $return, $key ) use ( $meta_data ) {
				$return[] = [
					'key'   => $key,
					'value' => $meta_data[ $key ],
				];
				return $return;
			},
			[]
		);
	}
}
