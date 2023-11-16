<?php

namespace Automattic\WooCommerce\Blocks\Domain\Services;

use Automattic\WooCommerce\Blocks\Assets\AssetDataRegistry;

/**
 * Service class managing checkout fields and its related extensibility points.
 */
class CheckoutFields {


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
				'autocomplete'   => 'tel',
				'autocapitalize' => 'characters',
				'index'          => 100,
			),
		);

		$this->additional_fields = array(
			'plugin_vat' => array(
				'label'          => __( 'VAT', 'woo-gutenberg-products-block' ),
				'optionalLabel'  => __(
					'VAT (optional)',
					'woo-gutenberg-products-block'
				),
				'required'       => false,
				'hidden'         => false,
				'autocomplete'   => 'vat',
				'autocapitalize' => 'characters',
			),
		);

		$this->fields_locations = array(
			// omit email from shipping and billing fields.
			'address'    => $this->get_address_fields_keys(),
			// @todo handle rendering contact fields.
			'contact'    => array( 'email' ),
			// @todo handle rendering additional fields.
			'additional' => array(),
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
	 * Get the keys of the address fields.
	 *
	 * @return array
	 */
	protected function get_address_fields_keys() {
		$core_fields       = array_keys( array_diff_key( $this->core_fields, array( 'email' => '' ) ) );
		$additional_fields = array( 'plugin_vat' );

		return array_merge( $core_fields, $additional_fields );
	}
}
