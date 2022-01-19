<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * ProductStockIndicator class.
 */
class ProductStockIndicator extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-stock-indicator';

	/**
	 * API version name.
	 *
	 * @var string
	 */
	protected $api_version = '2';

	/**
	 * Get block supports. Shared with the frontend.
	 * IMPORTANT: If you change anything here, make sure to update the JS file too.
	 *
	 * @return array
	 */
	protected function get_block_type_supports() {
		return array(
			'color'                  =>
			array(
				'link'  => false,
				'background' => false,
				'text' => true,

			),
			'typography'             =>
			array(
				'fontSize'   => true,
			),
			'__experimentalSelector' => '.wc-block-components-product-stock-indicator',
		);
	}

}
