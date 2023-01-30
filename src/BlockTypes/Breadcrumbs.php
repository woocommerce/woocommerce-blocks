<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * CatalogSorting class.
 */
class Breadcrumbs extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'breadcrumbs';

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
		woocommerce_breadcrumb();
		$breadcrumb = ob_get_clean();

		if ( ! $breadcrumb ) {
			return;
		}

		$classname             = $attributes['className'] ?? '';
		$classes_and_styles    = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );
		$align_class_and_style = StyleAttributesUtils::get_align_class_and_style( $attributes );
		$align_class           = $align_class_and_style['class'] ?? '';

		return sprintf(
			'<div class="woocommerce wc-block-breadcrumbs %1$s %2$s %3$s" style="%4$s">%5$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $align_class ),
			esc_attr( $classname ),
			esc_attr( $classes_and_styles['styles'] ),
			$breadcrumb
		);
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
