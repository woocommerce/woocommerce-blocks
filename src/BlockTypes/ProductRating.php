<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;
/**
 * ProductRating class.
 */
class ProductRating extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-rating';

	/**
	 * Get the block's attributes.
	 *
	 * @param array $attributes Block attributes. Default empty array.
	 * @return array  Block attributes merged with defaults.
	 */
	private function parse_attributes( $attributes ) {
		// These should match what's set in JS `registerBlockType`.
		$defaults = array(
			'productId'                        => 0,
			'isDescendentOfQueryLoop'          => false,
			'textAlign'                        => '',
			'isDescendentOfSingleProductBlock' => false,
		);

		return wp_parse_args( $attributes, $defaults );
	}

	/**
	 * Overwrite parent method to prevent script registration.
	 *
	 * It is necessary to register and enqueues assets during the render
	 * phase because we want to load assets only if the block has the content.
	 */
	protected function register_block_type_assets() {
		return null;
	}

	/**
	 * Register the context.
	 */
	protected function get_block_type_uses_context() {
		return [ 'query', 'queryId', 'postId' ];
	}

	/**
	 * Include and render the block.
	 *
	 * @param array    $attributes Block attributes. Default empty array.
	 * @param string   $content    Block content. Default empty string.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {
		if ( ! empty( $content ) ) {
			parent::register_block_type_assets();
			$this->register_chunk_translations( [ $this->block_name ] );
			return $content;
		}

		$post_id = $block->context['postId'];

		if ( ! isset( $post_id ) ) {
			return '';
		}

		$product = wc_get_product( $post_id );
		if ( ! $product instanceof \WC_Product ) {
			return '';
		}

		if ( ! wc_review_ratings_enabled() ) {
			return '';
		}

		$rating_count = $product->get_rating_count();
		$review_count = $product->get_review_count();
		$average      = $product->get_average_rating();

		if ( ! $rating_count > 0 ) {
			return '';
		}

		$classname                             = $attributes['className'] ?? '';
		$classes_and_styles                    = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );
		$parsed_attributes                     = $this->parse_attributes( $attributes );
		$is_descendent_of_single_product_block = $parsed_attributes['isDescendentOfSingleProductBlock'] ?? false;
		$is_single_product                     = is_singular( 'product' ) || $is_descendent_of_single_product_block;

		ob_start();
		// translators: %s: is referring to the total of reviews for a product.
		echo $is_single_product && comments_open() ? wp_kses_post( sprintf( _n( '(%s customer review)', '(%s customer reviews)', $review_count, 'woo-gutenberg-products-block' ), '<span class="count">' . esc_html( $review_count ) . '</span>' ) ) : '';
		$customer_reviews   = ob_get_clean();
		$product_review_url = get_permalink( $post_id ) . '#reviews';

		return sprintf(
			'<div class="wc-block-components-product-rating wc-block-grid__product-rating %1$s %2$s" style="%3$s">%4$s<a href="%5$s" class="woocommerce-review-link" rel="nofollow">%6$s<span class="count"></a></div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			esc_attr( $classes_and_styles['styles'] ),
			wc_get_rating_html( $average, $rating_count ),
			esc_url( $product_review_url ),
			$customer_reviews
		);
	}
}
