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
	private $fields;

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
		$this->fields              = array(
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
		$this->initialize();
	}

	/**
	 * Initialize hooks.
	 */
	public function initialize() {
		// @TODO: this should move to a class that only run on UI operations.
		add_action( 'woocommerce_blocks_checkout_enqueue_data', array( $this, 'add_fields_data' ) );
	}

	/**
	 * Add fields data to the asset data registry.
	 */
	public function add_fields_data() {
		$this->asset_data_registry->add( 'defaultAddressFields', $this->fields, true );
	}
}
