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
		ob_start();

		while ( have_posts() ) {
			global $product;
			the_post();
			the_content();
		}

		$description = ob_get_clean();

		ob_start();

		while ( have_posts() ) {
			global $product;
			the_post();
			wc_display_product_attributes($product);
		}

		$product_attributes = ob_get_clean();

		while ( have_posts() ) {
			global $product;
			the_post();
			wp_list_comments( array( 'post_id' => the_ID() ) );
		}

		$comments = ob_get_clean();

		if ( ! $product ) {
			return 'hello';
		}

		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		return sprintf(
			'<div class="wp-block-woocommerce-single-product-details %1$s" style="%2$s">
				<div class="woocommerce-tabs wc-tabs-wrapper">
					<ul class="tabs" role="tablist">
						<li>
							<a href="#tab-description">
								Description
							</a>
						</li>
						<li>
							<a href="#tab-additional-information">
								Additional Information
							</a>
						</li>
						<li>
							<a href="#reviews">
								Reviews
							</a>
						</li>
					</ul>

					<div class="woocommerce-Tabs-panel woocommerce-Tabs-panel--description panel entry-content wc-tab" id="tab-description" role="tabpanel" aria-labelledby="tab-title-description">
						<h2>Description</h2>
						<div class="woocommerce-product-details__short-description">
							%3$s
						</div>
					</div>

					<div class="woocommerce-Tabs-panel woocommerce-Tabs-panel--additional-information panel entry-content wc-tab" id="tab-additional-information" role="tabpanel" aria-labelledby="tab-title-additional-information">
						<h2>Additional Information</h2>
						<div class="woocommerce-product-details__short-additional-information">
							%4$s
						</div>
					</div>

					<div class="woocommerce-Tabs-panel woocommerce-Tabs-panel--reviews panel entry-content wc-tab" id="tab-reviews" role="tabpanel" aria-labelledby="tab-title-reviews">
						<h2>Reviews</h2>
						<div class="woocommerce-product-details__short-reviews">
							%5$s
						</div>
					</div>

				</div>
			</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classes_and_styles['styles'] ),
			$description,
			$product_attributes,
			$comments
		);
	}
}
