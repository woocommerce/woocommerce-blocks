<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * ProductReviews class.
 */
class ProductReviews extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-reviews';

	/**
	 * It isn't necessary register block assets because it is a server side block.
	 */
	protected function register_block_type_assets() {
		return null;
	}

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
		$post_id = $block->context['postId'];
		$old_global_product = $GLOBALS['product'];
		$old_global_query = $GLOBALS['wp_query'];

		$new_query = new \WP_Query(
			array(
				'feed'         => 1,
				'p'            => $post_id,
				'post_type'    => 'product',
				'withcomments' => 1,
			)
		);

		// Ovewriting the globals, because we need it in the template.
		$GLOBALS['product'] = wc_get_product( $post_id );
		$GLOBALS['wp_query'] = $new_query; // phpcs:ignore

		wc_get_template( 'single-product-reviews.php' );

		$reviews = ob_get_clean();

		// Resetting the globals to what it was.
		$GLOBALS['product'] = $old_global_product;
		$GLOBALS['wp_query'] = $old_global_query; // phpcs:ignore

		$classname = $attributes['className'] ?? '';

		return sprintf(
			'<div class="wp-block-woocommerce-product-reviews %1$s">
				%2$s
			</div>',
			esc_attr( $classname ),
			$reviews
		);
	}
}
