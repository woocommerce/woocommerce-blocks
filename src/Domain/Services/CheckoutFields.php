<?php

namespace Automattic\WooCommerce\Blocks\Domain\Services;

use Automattic\WooCommerce\Blocks\Assets\AssetDataRegistry;

/**
 * Service class managing checkout fields and its related extensibility points.
 */
abstract class CheckoutFields {


	/**
	 * Core checkout fields.
	 *
	 * @var array
	 */
	private $core_fields;

	/**
	 * Additional checkout fields.
	 *
	 * @var array
	 */
	private $additional_fields;

	/**
	 * Fields locations.
	 *
	 * @var array
	 */
	private $fields_locations;

	/**
	 * Instance of the asset data registry.
	 *
	 * @var AssetDataRegistry
	 */
	private $asset_data_registry;

	/**
	 * Sets up core fields.
	 *
	 * @param AssetDataRegistry $asset_data_registry Instance of the asset data registry.
	 */
	public function __construct( AssetDataRegistry $asset_data_registry ) {
		$this->asset_data_registry = $asset_data_registry;
		$this->core_fields         = array(
			'email'      => array(
				'label'          => __( 'Email address', 'woo-gutenberg-products-block' ),
				'optionalLabel'  => __(
					'Email address (optional)',
					'woo-gutenberg-products-block'
				),
				'required'       => true,
				'hidden'         => false,
				'autocomplete'   => 'email',
				'autocapitalize' => 'none',
				'index'          => 0,
			),
			'first_name' => array(
				'label'          => __( 'First name', 'woo-gutenberg-products-block' ),
				'optionalLabel'  => __(
					'First name (optional)',
					'woo-gutenberg-products-block'
				),
				'required'       => true,
				'hidden'         => false,
				'autocomplete'   => 'given-name',
				'autocapitalize' => 'sentences',
				'index'          => 10,
			),
			'last_name'  => array(
				'label'          => __( 'Last name', 'woo-gutenberg-products-block' ),
				'optionalLabel'  => __(
					'Last name (optional)',
					'woo-gutenberg-products-block'
				),
				'required'       => true,
				'hidden'         => false,
				'autocomplete'   => 'family-name',
				'autocapitalize' => 'sentences',
				'index'          => 20,
			),
			'company'    => array(
				'label'          => __( 'Company', 'woo-gutenberg-products-block' ),
				'optionalLabel'  => __(
					'Company (optional)',
					'woo-gutenberg-products-block'
				),
				'required'       => false,
				'hidden'         => false,
				'autocomplete'   => 'organization',
				'autocapitalize' => 'sentences',
				'index'          => 30,
			),
			'address_1'  => array(
				'label'          => __( 'Address', 'woo-gutenberg-products-block' ),
				'optionalLabel'  => __(
					'Address (optional)',
					'woo-gutenberg-products-block'
				),
				'required'       => true,
				'hidden'         => false,
				'autocomplete'   => 'address-line1',
				'autocapitalize' => 'sentences',
				'index'          => 40,
			),
			'address_2'  => array(
				'label'          => __( 'Apartment, suite, etc.', 'woo-gutenberg-products-block' ),
				'optionalLabel'  => __(
					'Apartment, suite, etc. (optional)',
					'woo-gutenberg-products-block'
				),
				'required'       => false,
				'hidden'         => false,
				'autocomplete'   => 'address-line2',
				'autocapitalize' => 'sentences',
				'index'          => 50,
			),
			'country'    => array(
				'label'         => __( 'Country/Region', 'woo-gutenberg-products-block' ),
				'optionalLabel' => __(
					'Country/Region (optional)',
					'woo-gutenberg-products-block'
				),
				'required'      => true,
				'hidden'        => false,
				'autocomplete'  => 'country',
				'index'         => 50,
			),
			'city'       => array(
				'label'          => __( 'City', 'woo-gutenberg-products-block' ),
				'optionalLabel'  => __(
					'City (optional)',
					'woo-gutenberg-products-block'
				),
				'required'       => true,
				'hidden'         => false,
				'autocomplete'   => 'address-level2',
				'autocapitalize' => 'sentences',
				'index'          => 70,
			),
			'state'      => array(
				'label'          => __( 'State/County', 'woo-gutenberg-products-block' ),
				'optionalLabel'  => __(
					'State/County (optional)',
					'woo-gutenberg-products-block'
				),
				'required'       => true,
				'hidden'         => false,
				'autocomplete'   => 'address-level1',
				'autocapitalize' => 'sentences',
				'index'          => 80,
			),
			'postcode'   => array(
				'label'          => __( 'Postal code', 'woo-gutenberg-products-block' ),
				'optionalLabel'  => __(
					'Postal code (optional)',
					'woo-gutenberg-products-block'
				),
				'required'       => true,
				'hidden'         => false,
				'autocomplete'   => 'postal-code',
				'autocapitalize' => 'characters',
				'index'          => 90,
			),
			'phone'      => array(
				'label'          => __( 'Phone', 'woo-gutenberg-products-block' ),
				'optionalLabel'  => __(
					'Phone (optional)',
					'woo-gutenberg-products-block'
				),
				'required'       => false,
				'hidden'         => false,
				'type'           => 'tel',
				'autocomplete'   => 'tel',
				'autocapitalize' => 'characters',
				'index'          => 100,
			),
		);

		$this->additional_fields = array(
			'plugin_vat'           => array(
				'label'          => __( 'VAT', 'woo-gutenberg-products-block' ),
				'optionalLabel'  => __(
					'VAT (optional)',
					'woo-gutenberg-products-block'
				),
				'required'       => false,
				'hidden'         => true,
				'autocomplete'   => 'vat',
				'autocapitalize' => 'characters',
			),
			'plugin_delivery_hour' => array(
				'label'          => __( 'VAT', 'woo-gutenberg-products-block' ),
				'optionalLabel'  => __(
					'VAT (optional)',
					'woo-gutenberg-products-block'
				),
				'required'       => false,
				'hidden'         => true,
				'autocomplete'   => 'vat',
				'autocapitalize' => 'characters',
			),
		);

		$this->fields_locations = array(
			// omit email from shipping and billing fields.
			'address'    => $this->get_address_fields_keys(), // everything here will be saved to customer and order.
			// @todo handle rendering contact fields.
			'contact'    => array( 'email' ), // everything here will be saved to order, and optionally to customer.
			// @todo handle rendering additional fields.
			'additional' => array( 'plugin_delivery_hour' ), // everything here will only be saved to order only.
		);
	}

	/**
	 * Initialize hooks.
	 */
	public function init() {
		// @TODO: this should move to a class that only run on UI operations.
		add_action( 'woocommerce_blocks_checkout_enqueue_data', array( $this, 'add_fields_data' ) );
	}

	/**
	 * Add fields data to the asset data registry.
	 */
	public function add_fields_data() {
		$this->asset_data_registry->add( 'defaultAddressFields', array_merge( $this->core_fields, $this->additional_fields ), true );
		$this->asset_data_registry->add( 'addressFieldsLocations', $this->fields_locations, true );
	}

	/**
	 * Registers an additional field for Checkout.
	 *
	 * @param array $options The field options.
	 *
	 * @return true|WP_Error True if the field was registered, a WP_Error otherwise.
	 */
	abstract public function register_checkout_field( $options );

	/**
	 * Returns an array of fields for a given group.
	 *
	 * @param string $group The group to get fields for (address|contact|additional).
	 *
	 * @return array An array of fields.
	 */
	abstract public function get_fields_for_group( $group );

	/**
	 * Returns an array of fields keys for a the address group.
	 *
	 * @return array An array of fields keys.
	 */
	abstract protected function get_address_fields_keys();

	/**
	 * Returns an array of fields keys for a the contact group.
	 *
	 * @return array An array of fields keys.
	 */
	abstract protected function get_contact_fields_keys();

	/**
	 * Returns an array of fields keys for a the additional area group.
	 *
	 * @return array An array of fields keys.
	 */
	abstract protected function get_additional_fields_keys();

	/**
	 * Validates a field value for a given group.
	 *
	 * @param string $key The field key.
	 * @param mixed  $value The field value.
	 * @param string $group The group to validate the field for (address|contact|additional).
	 *
	 * TODO: we might not need the group param here.
	 *
	 * @return true|\WP_Error True if the field is valid, a WP_Error otherwise.
	 */
	abstract public function validate_field_for_group( $key, $value, $group );

	/**
	 * Returns true if the given key is a valid field.
	 *
	 * @param string $key The field key.
	 *
	 * @return bool True if the field is valid, false otherwise.
	 */
	abstract public function is_field( $key );

	/**
	 * Persists a field value for a given order. This would also optionally set the field value on the customer.
	 *
	 * @param string    $key The field key.
	 * @param mixed     $value The field value.
	 * @param \WC_Order $order The order to persist the field for.
	 *
	 * @return void
	 */
	abstract public function persist_field( $key, $value, $order );

	/**
	 * Persists a field value for a given customer.
	 *
	 * @param string       $key The field key.
	 * @param mixed        $value The field value.
	 * @param \WC_Customer $customer The customer to persist the field for.
	 *
	 * @return void
	 */
	abstract public function persist_field_for_customer( $key, $value, $customer );
	/**
	 * Returns a field value for a given customer.
	 *
	 * @param string       $field The field key.
	 * @param \WC_Customer $customer The customer to get the field value for.
	 *
	 * @return mixed The field value.
	 */
	abstract public function get_field_from_customer( $field, $customer );

	/**
	 * Returns a field value for a given order.
	 *
	 * @param string    $field The field key.
	 * @param \WC_Order $order The order to get the field value for.
	 *
	 * @return mixed The field value.
	 */
	abstract public function get_field_from_order( $field, $order );

	/**
	 * Returns an array of all fields values for a given customer.
	 *
	 * @param \WC_Customer $customer The customer to get the fields for.
	 *
	 * @return array An array of fields.
	 */
	abstract public function get_all_fields_from_customer( $customer );

	/**
	 * Returns an array of all fields values for a given order.
	 *
	 * @param \WC_Order $order The order to get the fields for.
	 *
	 * @return array An array of fields.
	 */
	abstract public function get_all_fields_from_order( $order );

}
