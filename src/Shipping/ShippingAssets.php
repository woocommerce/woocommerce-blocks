<?php
namespace Automattic\WooCommerce\Blocks\Shipping;

use Automattic\WooCommerce\Blocks\Assets\Api as AssetApi;
use Automattic\WooCommerce\Blocks\Assets\AssetDataRegistry;

/**
 * ShippingAssets class.
 *
 * @internal
 */
class ShippingAssets {
	/**
	 * Instance of the asset API.
	 *
	 * @var AssetApi
	 */
	protected $asset_api;

	/**
	 * Instance of the asset data registry.
	 *
	 * @var AssetDataRegistry
	 */
	protected $asset_data_registry;

	/**
	 * Constructor.
	 *
	 * @param AssetApi          $asset_api Instance of the asset API.
	 * @param AssetDataRegistry $asset_data_registry Instance of the asset data registry.
	 */
	public function __construct( AssetApi $asset_api, AssetDataRegistry $asset_data_registry ) {
		$this->asset_api           = $asset_api;
		$this->asset_data_registry = $asset_data_registry;
	}

	/**
	 * Initialization method.
	 */
	public function init() {
		if ( is_admin() ) {
			$this->asset_data_registry->add(
				'countryStates',
				function() {
					return WC()->countries->get_states();
				},
				true
			);
		}
		$this->asset_data_registry->add( 'collectableMethodIds', array( 'Automattic\WooCommerce\StoreApi\Utilities\LocalPickupUtils', 'get_local_pickup_method_ids' ), true );
		$this->asset_data_registry->add( 'shippingCostRequiresAddress', get_option( 'woocommerce_shipping_cost_requires_address', false ) === 'yes' );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_scripts' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'hydrate_client_settings' ] );
	}

	/**
	 * Hydrate client settings
	 */
	public function hydrate_client_settings() {
		$locations = get_option( 'pickup_location_pickup_locations', [] );

		$formatted_pickup_locations = [];
		foreach ( $locations as $location ) {
			$formatted_pickup_locations[] = [
				'name'    => $location['name'],
				'address' => $location['address'],
				'details' => $location['details'],
				'enabled' => wc_string_to_bool( $location['enabled'] ),
			];
		}

		$has_legacy_pickup = false;

		// Get all shipping zones.
		$shipping_zones              = \WC_Shipping_Zones::get_zones( 'admin' );
		$international_shipping_zone = new \WC_Shipping_Zone( 0 );

		// Loop through each shipping zone.
		foreach ( $shipping_zones as $shipping_zone ) {
			// Get all registered rates for this shipping zone.
			$shipping_methods = $shipping_zone['shipping_methods'];
			// Loop through each registered rate.
			foreach ( $shipping_methods as $shipping_method ) {
				if ( 'local_pickup' === $shipping_method->id && 'yes' === $shipping_method->enabled ) {
					$has_legacy_pickup = true;
					break 2;
				}
			}
		}

		foreach ( $international_shipping_zone->get_shipping_methods( true ) as $shipping_method ) {
			if ( 'local_pickup' === $shipping_method->id ) {
				$has_legacy_pickup = true;
				break;
			}
		}

		$settings = array(
			'pickupLocationSettings' => get_option( 'woocommerce_pickup_location_settings', [] ),
			'pickupLocations'        => $formatted_pickup_locations,
			'readonlySettings'       => array(
				'hasLegacyPickup' => $has_legacy_pickup,
				'storeCountry'    => WC()->countries->get_base_country(),
				'storeState'      => WC()->countries->get_base_state(),
			),
		);

		wp_add_inline_script(
			'wc-shipping-method-pickup-location',
			sprintf(
				'var hydratedScreenSettings = %s;',
				wp_json_encode( $settings )
			),
			'before'
		);
	}

	/**
	 * Load admin scripts.
	 */
	public function admin_scripts() {
		$this->asset_api->register_script( 'wc-shipping-method-pickup-location', 'build/wc-shipping-method-pickup-location.js', [], true );
	}
}
