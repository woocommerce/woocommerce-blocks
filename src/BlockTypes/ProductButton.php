<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * ProductButton class.
 */
class ProductButton extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-button';

	protected function get_block_type_script( $key = null ) {
		$script = [
			'handle'       => 'wc-' . $this->block_name . '-interactivity-frontend',
			'path'         => $this->asset_api->get_block_asset_build_path( $this->block_name . '-interactivity-frontend' ),
			'dependencies' => [],
		];

		return $key ? $script[ $key ] : $script;
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
		$post_id = $block->context['postId'];
		$product = wc_get_product( $post_id );

		if ( $product ) {
			$number_of_items_in_cart = $this->get_cart_item_quantities_by_product_id( $product->get_id() );

			wc_store(
				[
					'state' => [
						'woocommerce' => [
							'inTheCart' => sprintf( __( '%s in the cart', 'woo-gutenberg-products-block' ), '###' ),
							'viewCart'  => __( 'View cart', 'woo-gutenberg-products-block' ),
							'cartUrl'   => wc_get_cart_url(),
						],
					],
				]
			);

			$context = array(
				'woocommerce' => array(
					'isLoading'       => false,
					'numberOfItems'   => $number_of_items_in_cart,
					'addToCart'       => $number_of_items_in_cart > 0 ? sprintf( __( '%s in the cart', 'woo-gutenberg-products-block' ), $number_of_items_in_cart ) : $product->add_to_cart_text(),
					'productId'       => $product->get_id(),
					'isAdded'         => false,
					'moreThanOneItem' => $number_of_items_in_cart > 0,
				),
			);

			$parsed_context                = wp_json_encode( $context );
			$cart_redirect_after_add       = get_option( 'woocommerce_cart_redirect_after_add' ) === 'yes';
			$ajax_add_to_cart_enabled      = get_option( 'woocommerce_enable_ajax_add_to_cart' ) === 'yes';
			$is_ajax_button                = $ajax_add_to_cart_enabled && ! $cart_redirect_after_add && $product->supports( 'ajax_add_to_cart' ) && $product->is_purchasable() && $product->is_in_stock();
			$html_element                  = $is_ajax_button ? 'button' : 'a';
			$styles_and_classes            = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );
			$text_align_styles_and_classes = StyleAttributesUtils::get_text_align_class_and_style( $attributes );
			$classname                     = $attributes['className'] ?? '';
			$custom_width_classes          = isset( $attributes['width'] ) ? 'has-custom-width wp-block-button__width-' . $attributes['width'] : '';
			$is_added_class                = $context['woocommerce']['moreThanOneItem'] ? 'added' : '';
			$html_classes                  = implode(
				' ',
				array_filter(
					array(
						'wp-block-button__link',
						'wp-element-button',
						'wc-block-components-product-button__button',
						$product->is_purchasable() && $product->is_in_stock() ? 'add_to_cart_button' : '',
						$is_ajax_button ? '' : '',
						'product_type_' . $product->get_type(),
						$styles_and_classes['classes'],
					)
				)
			);
			/**
			 * Allow filtering of the add to cart button arguments.
			 *
			 * @since 9.7.0
			 */
			$args = apply_filters(
				'woocommerce_loop_add_to_cart_args',
				array(
					'class'      => $html_classes,
					'attributes' => array(
						'data-product_id'  => $product->get_id(),
						'data-product_sku' => $product->get_sku(),
						'aria-label'       => $product->add_to_cart_description(),
						'rel'              => 'nofollow',
					),
				),
				$product
			);

			if ( isset( $args['attributes']['aria-label'] ) ) {
				$args['attributes']['aria-label'] = wp_strip_all_tags( $args['attributes']['aria-label'] );
			}

			/**
			 * Filters the add to cart button class.
			 *
			 * @since 8.7.0
			 *
			 * @param string $class The class.
			 */
			return apply_filters(
				'woocommerce_loop_add_to_cart_link',
				sprintf(
					'<div class="wp-block-button wc-block-components-product-button %1$s %2$s" data-wc-context=%9$s>
					<%3$s href="%4$s" class="%5$s" style="%6$s"
					data-wc-on--click="actions.woocommerce.addToCart"
					data-wc-class--loading="context.woocommerce.isLoading"
					data-wc-class--added="context.woocommerce.moreThanOneItem"
					data-wc-text="state.woocommerce.addToCartText"
					%7$s>%8$s</%3$s>
					%10$s
				</div>',
					esc_attr( $text_align_styles_and_classes['class'] ?? '' ),
					esc_attr( $classname . ' ' . $custom_width_classes ),
					$html_element,
					esc_url( $product->add_to_cart_url() ),
					isset( $args['class'] ) ? esc_attr( $args['class'] . ' ' . $is_added_class ) : $is_added_class,
					esc_attr( $styles_and_classes['styles'] ),
					isset( $args['attributes'] ) ? wc_implode_html_attributes( $args['attributes'] ) : '',
					esc_html( $context['woocommerce']['addToCart'] ),
					'\'' . $parsed_context . '\'',
					$this->get_view_cart_html()
				),
				$product,
				$args
			);
		}
	}

	private function get_cart_item_quantities_by_product_id( $product_id ) {
		if ( ! isset( WC()->cart ) ) {
			return 0;
		}

		$cart = WC()->cart->get_cart_item_quantities();
		return isset( $cart[ $product_id ] ) ? $cart[ $product_id ] : 0;
	}

	private function get_view_cart_html() {
		return '<a hidden="!context.woocommerce.isAdded" data-wc-bind--hidden="!context.woocommerce.isAdded" data-wc-bind--href="state.woocommerce.cartUrl" class="added_to_cart wc_forward" data-wc-bind--title="state.woocommerce.viewCart" data-wc-text="state.woocommerce.viewCart"></a>';
	}

}
