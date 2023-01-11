<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * StoreNotices class.
 */
class StoreNotices extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'store-notices';

	/**
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block instance.
	 *
	 * @return string | void Rendered block output.
	 */
	protected function render( $attributes, $content, $block ) {
		ob_start();
		woocommerce_output_all_notices();
		$notices = ob_get_clean();

		if ( ! $notices ) {
			return;
		}

		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		return "<div class='wc-block-store-notices " . esc_attr( $classes_and_styles['classes'] ) . "' style='" . esc_attr( $classes_and_styles['styles'] ) . "'>" . $notices . '</div>';
	}
}
