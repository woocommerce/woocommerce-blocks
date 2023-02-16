<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * ProductDetails class.
 */
class ProductDetails extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-details';

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
		$tabs = $this->render_tabs();

		$classname = $attributes['className'] ?? '';

		return sprintf(
			'<div class="wp-block-woocommerce-product-details %1$s">
				%2$s
			</div>',
			esc_attr( $classname ),
			$tabs
		);
	}

	/**
	 * Gets the tabs with their content to be rendered by the block.
	 *
	 * @return string The tabs html to be rendered by the block
	 */
	protected function render_tabs() {
		// This filter ensures the review form is properly rendered when the Product Details block is used alongside
		// the Classic Single Product Block. It can be removed as soon as the Classic Single Product Block is deprecated.
		add_filter( 'woocommerce_product_review_comment_form_args', array( $this, 'review_comment_form' ), 0 );

		ob_start();

		while ( have_posts() ) {
			the_post();
			woocommerce_output_product_data_tabs();
		}

		return ob_get_clean();
	}

	/**
	 * Ensures the review form is properly rendered when the Product Details block is used alongside the Classic Single Product Block.
	 *
	 * This method can be removed as soon as the Classic Single Product Block is deprecated.
	 *
	 * @param array $comment_form The comment form arguments.
	 *
	 * @return array The updated comment form arguments.
	 */
	public function review_comment_form( $comment_form ) {
		$comment_form['comment_field'] = '<div class="comment-form-rating"><label for="rating">' . esc_html__( 'Your rating', 'woo-gutenberg-products-block' ) . ( wc_review_ratings_required() ? '&nbsp;<span class="required">*</span>' : '' ) . '</label><select name="rating" id="rating-select" required>
						<option value="">' . esc_html__( 'Rate&hellip;', 'woo-gutenberg-products-block' ) . '</option>
						<option value="5">' . esc_html__( 'Perfect', 'woo-gutenberg-products-block' ) . '</option>
						<option value="4">' . esc_html__( 'Good', 'woo-gutenberg-products-block' ) . '</option>
						<option value="3">' . esc_html__( 'Average', 'woo-gutenberg-products-block' ) . '</option>
						<option value="2">' . esc_html__( 'Not that bad', 'woo-gutenberg-products-block' ) . '</option>
						<option value="1">' . esc_html__( 'Very poor', 'woo-gutenberg-products-block' ) . '</option>
					</select></div>';

		$comment_form['comment_field'] .= '<p class="comment-form-comment"><label for="comment">' . esc_html__( 'Your review', 'woo-gutenberg-products-block' ) . '&nbsp;<span class="required">*</span></label><textarea id="comment" name="comment" cols="45" rows="8" required></textarea></p>';

		return $comment_form;
	}
}
