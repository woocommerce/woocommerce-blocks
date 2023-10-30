<?php
declare( strict_types=1 );

namespace Automattic\WooCommerce\Blocks\Domain\Services;

use Automattic\WooCommerce\Blocks\Assets\Api as AssetApi;
use Automattic\WooCommerce\Internal\Features\FeaturesController;

/**
 * Class OrderSourceAttribution
 *
 * @since x.x.x
 */
class OrderSourceAttribution {

	/**
	 * Instance of the asset API.
	 *
	 * @var AssetApi
	 */
	protected $asset_api;

	/**
	 * Instance of the features controller.
	 *
	 * @var FeaturesController
	 */
	protected $features_controller;

	/**
	 * Constructor.
	 *
	 * @param AssetApi           $asset_api           Instance of the asset API.
	 * @param FeaturesController $features_controller Features controller.
	 */
	public function __construct( AssetApi $asset_api, FeaturesController $features_controller ) {
		$this->asset_api           = $asset_api;
		$this->features_controller = $features_controller;
	}

	/**
	 * Hook into WP.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function init() {
		if ( ! $this->features_controller->feature_is_enabled( 'order_source_attribution' ) ) {
			return;
		}

		add_action(
			'init',
			function() {
				$this->register_assets();
			}
		);

		add_action(
			'wp_enqueue_scripts',
			function() {
				$this->enqueue_scripts();
			}
		);
	}

	/**
	 * Register scripts.
	 */
	private function register_assets() {
		$this->asset_api->register_script(
			'wc-blocks-order-source-attribution',
			'build/wc-blocks-order-source-attribution.js',
			[ 'woocommerce-order-source-attribution-js' ]
		);
	}

	/**
	 * Enqueue the Order Source Attribution script.
	 *
	 * @since x.x.x
	 * @return void
	 */
	private function enqueue_scripts() {
		wp_enqueue_script( 'wc-blocks-order-source-attribution' );
	}
}
