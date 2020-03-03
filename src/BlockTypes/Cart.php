<?php
/**
 * Cart block.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Package;

defined( 'ABSPATH' ) || exit;

/**
 * Cart class.
 */
class Cart extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'cart';

	/**
	 * Registers the block type with WordPress.
	 */
	public function register_block_type() {
		register_block_type(
			$this->namespace . '/' . $this->block_name,
			array(
				'render_callback' => array( $this, 'render' ),
				'editor_script'   => 'wc-' . $this->block_name . '-block',
				'editor_style'    => 'wc-block-editor',
				'style'           => [ 'wc-block-style', 'wc-block-vendors-style' ],
				'script'          => 'wc-' . $this->block_name . '-block-frontend',
			)
		);
	}

	/**
	 * Append frontend scripts when rendering the Cart block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public function render( $attributes = array(), $content = '' ) {
		$data_registry = Package::container()->get(
			\Automattic\WooCommerce\Blocks\Assets\AssetDataRegistry::class
		);
		if ( ! $data_registry->exists( 'shippingCountries' ) ) {
			$data_registry->add( 'shippingCountries', WC()->countries->get_shipping_countries() );
		}
		if ( ! $data_registry->exists( 'shippingStates' ) ) {
			$data_registry->add( 'shippingStates', WC()->countries->get_shipping_country_states() );
		}
		if ( ! $data_registry->exists( 'countryLocale' ) ) {
			$data_registry->add( 'countryLocale', WC()->countries->get_country_locale() );
		}
		if ( ! $data_registry->exists( 'defaultAddressFields' ) ) {
			$data_registry->add( 'defaultAddressFields', WC()->countries->get_default_address_fields() );
		}
    if ( ! $data_registry->exists( 'cartData' ) ) {
			$data_registry->add( 'cartData', WC()->api->get_endpoint_data( '/wc/store/cart' ) );
    }
		\Automattic\WooCommerce\Blocks\Assets::register_block_script(
			$this->block_name . '-frontend',
			$this->block_name . '-block-frontend'
		);
		return $content;
	}
}
