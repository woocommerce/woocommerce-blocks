<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * SingleProductDetails class.
 */
class SingleProductDetails extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'single-product-details';

	/**
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block instance.
	 *
	 * @return string Rendered block output.
	 */
	protected function render( $attributes, $content, $block ) {
		$tabs = $this->render_tabs();

		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		return sprintf(
			'<div class="wp-block-woocommerce-single-product-details %1$s" style="%2$s">
				<div class="woocommerce-tabs wc-tabs-wrapper">
					%3$s
				</div>
			</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classes_and_styles['styles'] ),
			$tabs,
		);
	}

	protected function render_tabs(){
		ob_start();

		while ( have_posts() ) {
			global $product, $post;
			the_post();
			$product_tabs = apply_filters( 'woocommerce_product_tabs', array() );
			$tabs_title = '';
			$tabs_content = '';
			if ( ! empty( $product_tabs ) ) {
				foreach ( $product_tabs as $key => $product_tab  ) {
					$tabs_title .= sprintf('
						<li id="tab-title-%1$s" role="tab" aria-controls="tab-%1$s">
							<a href="#tab-%1$s">
								%2$s
							</a>
						</li>
						',
						esc_attr( $key ),
						esc_attr( $product_tab['title'] ),
					);

					$tabs_content .= sprintf('
						<div class="woocommerce-Tabs-panel woocommerce-Tabs-panel--%1$s panel entry-content wc-tab" id="tab-%1$s" role="tabpanel" aria-labelledby="tab-title-%1$s">
							<h2>%2$s</h2>
							<div class="woocommerce-product-details__short-%1$s">

							</div>
						</div>
						',
						esc_attr( $key ),
						esc_attr( $product_tab['title'] ),
					);
				}
			}
			$tabs = sprintf('
				<ul class="tabs" role="tablist">
					%1$s
				</ul>

				%2$s

				',
				$tabs_title,
				$tabs_content
			);
			echo $tabs;
		}

		$tabs = ob_get_clean();

		return $tabs;
	}
}
