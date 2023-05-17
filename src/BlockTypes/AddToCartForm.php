<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * CatalogSorting class.
 */
class AddToCartForm extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'add-to-cart-form';

	/**
	 * Output the quantity input for add to cart form block.
	 */
	protected function get_quantity_input( $product ) {
		return woocommerce_quantity_input(
			array(
				'min_value'   => apply_filters( 'woocommerce_quantity_input_min', $product->get_min_purchase_quantity(), $product ),
				'max_value'   => apply_filters( 'woocommerce_quantity_input_max', $product->get_max_purchase_quantity(), $product ),
				'input_value' => isset( $_POST['quantity'] ) ? wc_stock_amount( wp_unslash( $_POST['quantity'] ) ) : $product->get_min_purchase_quantity(), // WPCS: CSRF ok, input var ok.
			),
			$product
		);
	}
	protected function get_add_to_cart_button( $product ) {
		return sprintf(
			'<button type="submit" name="add-to-cart" value="%1$s" class="single_add_to_cart_button button alt %2$s">%3$s</button>',
			esc_attr( $product->get_id() ),
			esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ),
			esc_html( $product->single_add_to_cart_text() )
		);
	}
	protected function add_variable_product_to_cart( $product ) {
		$attributes           = $product->get_variation_attributes();
		$attribute_keys       = array_keys( $attributes );
		$available_variations = $product->get_available_variations();
		$variations_json      = wp_json_encode( $available_variations );
		$variations_attr      = function_exists( 'wc_esc_json' ) ? wc_esc_json( $variations_json ) : _wp_specialchars( $variations_json, ENT_QUOTES, 'UTF-8', true );

		do_action( 'woocommerce_before_add_to_cart_form' );

		ob_start();

		sprintf(
			'<form class="variations_form cart" action="%1$s" method="post" enctype="multipart/form-data" data-product_id="%2$s" data-product_variations="%3$s"></form>',
			esc_url( apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() ) ),
			absint( $product->get_id() ),
			$variations_attr
		);

		?><form class="variations_form cart" action="<?php echo esc_url( apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() ) ); ?>" method="post" enctype='multipart/form-data' data-product_id="<?php echo absint( $product->get_id() ); ?>" data-product_variations="<?php echo $variations_attr; // WPCS: XSS ok. ?>">
			<?php do_action( 'woocommerce_before_variations_form' ); ?>

			<?php if ( empty( $available_variations ) && false !== $available_variations ) : ?>
				<p class="stock out-of-stock"><?php echo esc_html( apply_filters( 'woocommerce_out_of_stock_message', __( 'This product is currently out of stock and unavailable.', 'woocommerce' ) ) ); ?></p>
			<?php else : ?>
				<table class="variations" cellspacing="0" role="presentation">
					<tbody>
					<?php foreach ( $attributes as $attribute_name => $options ) : ?>
						<tr>
							<th class="label"><label for="<?php echo esc_attr( sanitize_title( $attribute_name ) ); ?>"><?php echo wc_attribute_label( $attribute_name ); // WPCS: XSS ok. ?></label></th>
							<td class="value">
								<?php
								wc_dropdown_variation_attribute_options(
									array(
										'options'   => $options,
										'attribute' => $attribute_name,
										'product'   => $product,
									)
								);
								echo end( $attribute_keys ) === $attribute_name ? wp_kses_post( apply_filters( 'woocommerce_reset_variations_link', '<a class="reset_variations" href="#">' . esc_html__( 'Clear', 'woocommerce' ) . '</a>' ) ) : '';
								?>
							</td>
						</tr>
					<?php endforeach; ?>
					</tbody>
				</table>
				<?php do_action( 'woocommerce_after_variations_table' ); ?>

				<div class="single_variation_wrap">
					<?php
					/**
					 * Hook: woocommerce_before_single_variation.
					 */
					do_action( 'woocommerce_before_single_variation' );
					?>
					<div class="woocommerce-variation single_variation">
						<div class="woocommerce-variation-add-to-cart variations_button">
							<?php do_action( 'woocommerce_before_add_to_cart_button' ); ?>
							<?php
							do_action( 'woocommerce_before_add_to_cart_quantity' );

							$this->get_quantity_input( $product );

							do_action( 'woocommerce_after_add_to_cart_quantity' );
							?>
							<button type="submit" class="single_add_to_cart_button button alt<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?>"><?php echo esc_html( $product->single_add_to_cart_text() ); ?></button>

							<?php do_action( 'woocommerce_after_add_to_cart_button' ); ?>

							<input type="hidden" name="add-to-cart" value="<?php echo absint( $product->get_id() ); ?>" />
							<input type="hidden" name="product_id" value="<?php echo absint( $product->get_id() ); ?>" />
							<input type="hidden" name="variation_id" class="variation_id" value="0" />
						</div>
					</div>
					<?php
					/**
					 * Hook: woocommerce_after_single_variation.
					 */
					do_action( 'woocommerce_after_single_variation' );
					?>
				</div>
			<?php endif; ?>

			<?php do_action( 'woocommerce_after_variations_form' ); ?>
		</form>

		<?php
		do_action( 'woocommerce_after_add_to_cart_form' );

		return ob_get_clean();
	}

	protected function add_simple_product_to_cart( $product ) {
		if ( ! $product->is_purchasable() || ! $product->is_in_stock() ) {
			return '';
		}

		echo wc_get_stock_html( $product ); // WPCS: XSS ok.

		do_action( 'woocommerce_before_add_to_cart_form' );
		$add_to_cart_form_action = esc_url( apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() ) );

		echo sprintf(
			'<form class="cart" action="%1$s" method="post" enctype="multipart/form-data">%2$s %3$s</form>',
			$add_to_cart_form_action,
			$this->get_quantity_input( $product ),
			$this->get_add_to_cart_button( $product )
		);

		do_action( 'woocommerce_after_add_to_cart_form' );

		return ob_get_clean();
	}

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
		$post_id = $block->context['postId'];

		if ( ! isset( $post_id ) ) {
			return '';
		}

		$product = wc_get_product( $post_id );
		if ( ! $product instanceof \WC_Product ) {
			return '';
		}

		$product_type = $product->get_type();

		$render_product = '';
		switch ( $product_type ) {
			case 'simple':
				$render_product = $this->add_simple_product_to_cart( $product );
				break;
			case 'variable':
				$render_product = $this->add_variable_product_to_cart( $product );
				break;
			case 2:
				echo "i equals 2";
				break;
		}

		if ( ! $render_product ) {
			return '';
		}

		$classname          = $attributes['className'] ?? '';
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		return sprintf(
			'<div class="wp-block-add-to-cart-form %1$s %2$s" style="%3$s">%4$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			esc_attr( $classes_and_styles['styles'] ),
			$render_product
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

	/**
	 * It isn't necessary register block assets because it is a server side block.
	 */
	protected function register_block_type_assets() {
		return null;
	}
}
