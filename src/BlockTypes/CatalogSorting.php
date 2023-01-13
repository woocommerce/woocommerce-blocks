<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * CatalogSorting class.
 */
class CatalogSorting extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'catalog-sorting';

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
		woocommerce_catalog_ordering();
		$catalog_sorting = ob_get_clean();

		if ( ! $catalog_sorting ) {
			return;
		}

		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		return "<div class='wc-block-catalog-sorting " . esc_attr( $classes_and_styles['classes'] ) . "' style='" . esc_attr( $classes_and_styles['styles'] ) . "'>" . $catalog_sorting . '</div>';
	}

	/**
	 * Get the frontend script handle for this block type.
	 *
	 * @param string $key Data to get, or default to everything.
	 */
	protected function get_block_type_script( $key = null ) {
		return null;
	}
}
