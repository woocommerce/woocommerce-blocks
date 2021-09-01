<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Assets\AssetDataRegistry;
use Automattic\WooCommerce\Blocks\Assets\Api as AssetApi;
use Automattic\WooCommerce\Blocks\Integrations\IntegrationRegistry;

/**
 * CheckoutInnerBlock class.
 *
 * @internal
 */
class CheckoutInnerBlock extends AtomicBlock {
	/**
	 * Name of inner block area that extensions can insert blocks into.
	 *
	 * @var string
	 */
	protected $inner_block_area = '';

	/**
	 * Constructor.
	 *
	 * @param AssetApi            $asset_api Instance of the asset API.
	 * @param AssetDataRegistry   $asset_data_registry Instance of the asset data registry.
	 * @param IntegrationRegistry $integration_registry Instance of the integration registry.
	 * @param string              $block_name Optionally set block name during construct.
	 * @param string              $inner_block_area Name of inner block area that extensions can insert blocks into.
	 */
	public function __construct( AssetApi $asset_api, AssetDataRegistry $asset_data_registry, IntegrationRegistry $integration_registry, $block_name = '', $inner_block_area = '' ) {
		$this->inner_block_area = $inner_block_area;
		parent::__construct( $asset_api, $asset_data_registry, $integration_registry, $block_name );
	}

	/**
	 * Converts block attributes to HTML data attributes.
	 *
	 * @param array $attributes Key value pairs of attributes.
	 * @return string Rendered HTML attributes.
	 */
	protected function get_html_data_attributes( array $attributes ) {
		$data = parent::get_html_data_attributes( $attributes );

		if ( $this->inner_block_area ) {
			$data .= ' data-inner-block-area="' . esc_attr( $this->inner_block_area ) . '"';
		}

		return $data;
	}
}
