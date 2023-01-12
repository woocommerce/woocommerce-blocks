<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use DOMDocument;

/**
 * ProductAddToCartButton class.
 */
class ProductAddToCartButton extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-add-to-cart-button';

	/**
	 * API version name.
	 *
	 * @var string
	 */
	protected $api_version = '2';

	/**
	 * Initialize this block type.
	 *
	 * - Hook into WP lifecycle.
	 * - Register the block with WordPress.
	 * - Hook into pre_render_block to update the query.
	 */
	protected function initialize() {
		parent::initialize();
		// add_filter(
		// 'render_block_context',
		// array( $this, 'render_block_context' ),
		// 10,
		// 3
		// );
		add_filter(
			'render_block',
			[ $this, 'on_render_block' ],
			10,
			3
		);
		// add_filter(
		// 'pre_render_block',
		// array( $this, 'update_query' ),
		// 10,
		// 3
		// );
	}

	/**
	 * Register the context.
	 */
	protected function get_block_type_uses_context() {
		return [ 'query', 'queryId', 'postId' ];
	}


	// public function update_query( $attributes, $content, $parent_block ) {
	// if ( 'core/button' !== $content['blockName'] ) {
	// return;
	// }

	// if ( $this->is_woocommerce_variation( $content ) ) {
	// do_action( 'qm/debug', $parent_block );
	// }

	// return array( $attributes, $content );
	// }

	public function render_block_context( $context ) {
		// do_action( 'qm/debug', $context );
		return $context;
	}

	/**
	 * Update the query for the product query block.
	 *
	 * @param string|null $pre_render   The pre-rendered content. Default null.
	 * @param array       $parsed_block The block being rendered.
	 */
	// public function on_render_block( $block_content, $block, $instance ) {
	// if ( 'core/button' !== $block['blockName'] ) {
	// return $block_content;
	// }

	// if ( $this->is_woocommerce_variation( $block ) ) {
	// do_action( 'qm/debug', $instance );
	// Read context from $instance
	// do_action( 'qm/debug', $instance->__get( 'context' ) );

	// Replace 'Add to Cart' in $block_content with "Manish"
	// return str_replace( 'Add to cart', '<button href="?add-to-cart=24" rel="nofollow" data-product_id="24" data-product_sku="woo-album">Add to cart</button>', $block_content );

	// }

	// return $block_content;
	// }

	public function on_render_block( $block_content, $block, $instance ) {
		if ( 'core/button' !== $block['blockName'] ) {
			return $block_content;
		}

		global $post;

		if ( $this->is_woocommerce_variation( $block ) ) {
			// do_action( 'qm/debug', 'use :' . $post->ID );

			$post_id = $post->ID;
			$product = wc_get_product( $post_id );

			if ( $product ) {
				// return str_replace(
				// 'Add to cart',
				// '<button href="?add-to-cart=24" rel="nofollow" data-product_id="24" data-product_sku="woo-album" class="ajax_add_to_cart add_to_cart_button ">Add to cart</button>',
				// $block_content
				// );

				$cart_redirect_after_add = get_option( 'woocommerce_cart_redirect_after_add' ) === 'yes';
				$html_element            = ( ! $product->has_options() && $product->is_purchasable() && $product->is_in_stock() && ! $cart_redirect_after_add ) ? 'button' : 'a';

				$html = '<div class="wp-block-button has-custom-font-size has-small-font-size"><a class="wp-block-button__link has-primary-color has-pale-pink-background-color has-text-color has-background wp-element-button">Add to cart</a></div>';

				$dom = new DOMDocument();
				$dom->loadHTML( $html );

				$div       = $dom->getElementsByTagName( 'div' )->item( 0 );
				$div_class = $div->getAttribute( 'class' );

				$div          = $dom->getElementsByTagName( 'a' )->item( 0 );
				$anchor_class = $div->getAttribute( 'class' );

				do_action( 'qm/debug', $div_class );
				// do_action( 'qm/debug', [ $block_content, $block ] );

				return apply_filters(
					'woocommerce_loop_add_to_cart_link',
					sprintf(
						'
						<div class="wp-block-button wc-block-components-product-button wc-block-grid__product-add-to-cart %9$s">
						<%1$s href="%2$s" rel="nofollow" data-product_id="%3$s" data-product_sku="%4$s" class="wp-block-button__link %5$s wc-block-components-product-button__button product_type_%6$s %10$s" >%7$s</%8$s>
						</div>
						',
						$html_element,
						esc_url( $product->add_to_cart_url() ),
						esc_attr( $product->get_id() ),
						esc_attr( $product->get_sku() ),
						$product->is_purchasable() ? 'ajax_add_to_cart add_to_cart_button' : '',
						esc_attr( $product->get_type() ),
						esc_html( $product->add_to_cart_text() ),
						$html_element,
						$div_class,
						$anchor_class
					),
					$product
				);
			}

			// return apply_filters(
			// 'woocommerce_loop_add_to_cart_link',
			// '<button href="?add-to-cart=24" rel="nofollow" data-product_id="24" data-product_sku="woo-album" class="ajax_add_to_cart add_to_cart_button ">Add to cart</button>'
			// );
		}

		return $block_content;
	}

	/**
	 * Check if a given block
	 *
	 * @param array $parsed_block The block being rendered.
	 * @return boolean
	 */
	private function is_woocommerce_variation( $parsed_block ) {
		return isset( $parsed_block['attrs']['__woocommerceNamespace'] )
		&& substr( $parsed_block['attrs']['__woocommerceNamespace'], 0, 11 ) === 'woocommerce';
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
		do_action( 'qm/debug', $attributes, $content, $block );
		if ( 'core/button' === $block['blockName'] && $this->is_woocommerce_variation( $block ) ) {
			do_action( 'qm/debug', $attributes, $content, $block );
		}

		parent::register_block_type_assets();
		$this->register_chunk_translations( [ $this->block_name ] );
		return $content;

		// if ( ! empty( $content ) ) {
		// parent::register_block_type_assets();
		// $this->register_chunk_translations( [ $this->block_name ] );
		// return $content;
		// }

		// $post_id = $block->context['postId'];
		// $product = wc_get_product( $post_id );

		// if ( $product ) {
		// $cart_redirect_after_add       = get_option( 'woocommerce_cart_redirect_after_add' ) === 'yes';
		// $html_element                  = ( ! $product->has_options() && $product->is_purchasable() && $product->is_in_stock() && ! $cart_redirect_after_add ) ? 'button' : 'a';
		// $styles_and_classes            = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes, array( 'border_radius', 'font_size', 'font_weight', 'margin', 'padding', 'text_color' ) );
		// $text_align_styles_and_classes = StyleAttributesUtils::get_text_align_class_and_style( $attributes );

		// return apply_filters(
		// 'woocommerce_loop_add_to_cart_link',
		// sprintf(
		// '<div class="wp-block-button wc-block-components-product-button wc-block-grid__product-add-to-cart %1$s">
		// <%2$s href="%3$s" rel="nofollow" data-product_id="%4$s" data-product_sku="%5$s" class="wp-block-button__link %6$s wc-block-components-product-button__button product_type_%7$s %8$s" style="%9$s">%10$s</%11$s>
		// </div>',
		// esc_attr( $text_align_styles_and_classes['class'] ?? '' ),
		// $html_element,
		// esc_url( $product->add_to_cart_url() ),
		// esc_attr( $product->get_id() ),
		// esc_attr( $product->get_sku() ),
		// $product->is_purchasable() ? 'ajax_add_to_cart add_to_cart_button' : '',
		// esc_attr( $product->get_type() ),
		// esc_attr( $styles_and_classes['classes'] ),
		// esc_attr( $styles_and_classes['styles'] ),
		// esc_html( $product->add_to_cart_text() ),
		// $html_element
		// ),
		// $product
		// );
		// }
	}
}
