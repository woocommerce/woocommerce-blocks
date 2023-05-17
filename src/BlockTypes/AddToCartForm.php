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
	 *
	 * @param \WC_Product $product Product object.
	 */
	protected function get_quantity_input( $product ) {
		return woocommerce_quantity_input(
			array(
				'min_value'   => apply_filters( 'woocommerce_quantity_input_min', $product->get_min_purchase_quantity(), $product ),
				'max_value'   => apply_filters( 'woocommerce_quantity_input_max', $product->get_max_purchase_quantity(), $product ),
				'input_value' => isset( $_POST['quantity'] ) ? wc_stock_amount( wp_unslash( $_POST['quantity'] ) ) : $product->get_min_purchase_quantity(),
			),
			$product
		);
	}

	/**
	 * Output the add to cart button.
	 *
	 * @param \WC_Product $product Product object.
	 */
	protected function get_add_to_cart_button( $product ) {
		return sprintf(
			'<button type="submit" name="add-to-cart" value="%1$s" class="single_add_to_cart_button button alt %2$s">%3$s</button>',
			esc_attr( $product->get_id() ),
			esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ),
			esc_html( $product->single_add_to_cart_text() )
		);
	}

	/**
	 * The add to cart form for a variable product.
	 *
	 * @param \WC_Product $product Product object.
	 */
	protected function add_variable_product_to_cart( $product ) {
		// Enqueue variation scripts.
		wp_enqueue_script( 'wc-add-to-cart-variation' );

		// Get Available variations?
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

		?><form class="variations_form cart" action="<?php echo esc_url( apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() ) ); ?>" method="post" enctype='multipart/form-data' data-product_id="<?php echo absint( $product->get_id() ); ?>" data-product_variations="<?php echo $variations_attr; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>">
			<?php do_action( 'woocommerce_before_variations_form' ); ?>

			<?php if ( empty( $available_variations ) && false !== $available_variations ) : ?>
				<p class="stock out-of-stock"><?php echo esc_html( apply_filters( 'woocommerce_out_of_stock_message', __( 'This product is currently out of stock and unavailable.', 'woo-gutenberg-products-block' ) ) ); ?></p>
			<?php else : ?>
				<table class="variations" role="presentation">
					<tbody>
					<?php foreach ( $attributes as $attribute_name => $options ) : ?>
						<tr>
							<th class="label"><label for="<?php echo esc_attr( sanitize_title( $attribute_name ) ); ?>"><?php echo wc_attribute_label( $attribute_name ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label></th>
							<td class="value">
								<?php
								wc_dropdown_variation_attribute_options(
									array(
										'options'   => $options,
										'attribute' => $attribute_name,
										'product'   => $product,
									)
								);
								echo end( $attribute_keys ) === $attribute_name ? wp_kses_post( apply_filters( 'woocommerce_reset_variations_link', '<a class="reset_variations" href="#">' . esc_html__( 'Clear', 'woo-gutenberg-products-block' ) . '</a>' ) ) : '';
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
					<div class="woocommerce-variation single_variation"></div>
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

	/**
	 * The add to cart form for a simple product.
	 *
	 * @param \WC_Product $product Product object.
	 */
	protected function add_simple_product_to_cart( $product ) {
		if ( ! $product->is_purchasable() || ! $product->is_in_stock() ) {
			return '';
		}

		echo wc_get_stock_html( $product ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

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
	 * The add to cart form for an external product.
	 *
	 * @param \WC_Product $product Product object.
	 */
	protected function add_external_product_to_cart( $product ) {
		$add_to_cart_url = $product->add_to_cart_url();
		$button_text     = $product->single_add_to_cart_text();

		if ( ! $button_text || ! $add_to_cart_url ) {
			return;
		}

		do_action( 'woocommerce_before_add_to_cart_form' );
		ob_start(); ?>
		<form class="cart" action="<?php echo esc_url( $product ); ?>" method="get">
			<?php do_action( 'woocommerce_before_add_to_cart_button' ); ?>

			<button type="submit" class="single_add_to_cart_button button alt<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?>"><?php echo esc_html( $button_text ); ?></button>

			<?php wc_query_string_form_fields( $add_to_cart_url ); ?>

			<?php do_action( 'woocommerce_after_add_to_cart_button' ); ?>
		</form>
		<?php do_action( 'woocommerce_after_add_to_cart_form' );

		return ob_get_clean();
	}

	/**
	 * The add to cart form for a grouped product.
	 *
	 * @param \WC_Product $product Product object.
	 */
	protected function add_grouped_product_to_cart( $product ) {
		$post = get_post( $product->get_id() );
		$grouped_products = array_filter( array_map( 'wc_get_product', $product->get_children() ), 'wc_products_array_filter_visible_grouped' );

		do_action( 'woocommerce_before_add_to_cart_form' );

		ob_start(); ?>

		<form class="cart grouped_form" action="<?php echo esc_url( apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() ) ); ?>" method="post" enctype='multipart/form-data'>
			<table cellspacing="0" class="woocommerce-grouped-product-list group_table">
				<tbody>
				<?php
				$quantites_required      = false;
				$previous_post           = $post;
				$grouped_product_columns = apply_filters(
					'woocommerce_grouped_product_columns',
					array(
						'quantity',
						'label',
						'price',
					),
					$product
				);
				$show_add_to_cart_button = false;

				do_action( 'woocommerce_grouped_product_list_before', $grouped_product_columns, $quantites_required, $product );

				foreach ( $grouped_products as $grouped_product_child ) {
					$post_object        = get_post( $grouped_product_child->get_id() );
					$quantites_required = $quantites_required || ( $grouped_product_child->is_purchasable() && ! $grouped_product_child->has_options() );
					$post               = $post_object; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
					setup_postdata( $post );

					if ( $grouped_product_child->is_in_stock() ) {
						$show_add_to_cart_button = true;
					}

					echo '<tr id="product-' . esc_attr( $grouped_product_child->get_id() ) . '" class="woocommerce-grouped-product-list-item ' . esc_attr( implode( ' ', wc_get_product_class( '', $grouped_product_child ) ) ) . '">';

					// Output columns for each product.
					foreach ( $grouped_product_columns as $column_id ) {
						do_action( 'woocommerce_grouped_product_list_before_' . $column_id, $grouped_product_child );

						switch ( $column_id ) {
							case 'quantity':
								ob_start();

								if ( ! $grouped_product_child->is_purchasable() || $grouped_product_child->has_options() || ! $grouped_product_child->is_in_stock() ) {
									woocommerce_template_loop_add_to_cart();
								} elseif ( $grouped_product_child->is_sold_individually() ) {
									echo '<input type="checkbox" name="' . esc_attr( 'quantity[' . $grouped_product_child->get_id() . ']' ) . '" value="1" class="wc-grouped-product-add-to-cart-checkbox" id="' . esc_attr( 'quantity-' . $grouped_product_child->get_id() ) . '" />';
									echo '<label for="' . esc_attr( 'quantity-' . $grouped_product_child->get_id() ) . '" class="screen-reader-text">' . esc_html__( 'Buy one of this item', 'woocommerce' ) . '</label>';
								} else {
									do_action( 'woocommerce_before_add_to_cart_quantity' );

									woocommerce_quantity_input(
										array(
											'input_name'  => 'quantity[' . $grouped_product_child->get_id() . ']',
											'input_value' => isset( $_POST['quantity'][ $grouped_product_child->get_id() ] ) ? wc_stock_amount( wc_clean( wp_unslash( $_POST['quantity'][ $grouped_product_child->get_id() ] ) ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Missing
											'min_value'   => apply_filters( 'woocommerce_quantity_input_min', 0, $grouped_product_child ),
											'max_value'   => apply_filters( 'woocommerce_quantity_input_max', $grouped_product_child->get_max_purchase_quantity(), $grouped_product_child ),
											'placeholder' => '0',
										)
									);

									do_action( 'woocommerce_after_add_to_cart_quantity' );
								}

								$value = ob_get_clean();
								break;
							case 'label':
								$value  = '<label for="product-' . esc_attr( $grouped_product_child->get_id() ) . '">';
								$value .= $grouped_product_child->is_visible() ? '<a href="' . esc_url( apply_filters( 'woocommerce_grouped_product_list_link', $grouped_product_child->get_permalink(), $grouped_product_child->get_id() ) ) . '">' . $grouped_product_child->get_name() . '</a>' : $grouped_product_child->get_name();
								$value .= '</label>';
								break;
							case 'price':
								$value = $grouped_product_child->get_price_html() . wc_get_stock_html( $grouped_product_child );
								break;
							default:
								$value = '';
								break;
						}

						echo '<td class="woocommerce-grouped-product-list-item__' . esc_attr( $column_id ) . '">' . apply_filters( 'woocommerce_grouped_product_list_column_' . $column_id, $value, $grouped_product_child ) . '</td>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

						do_action( 'woocommerce_grouped_product_list_after_' . $column_id, $grouped_product_child );
					}

					echo '</tr>';
				}
				$post = $previous_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
				setup_postdata( $post );

				do_action( 'woocommerce_grouped_product_list_after', $grouped_product_columns, $quantites_required, $product );
				?>
				</tbody>
			</table>

			<input type="hidden" name="add-to-cart" value="<?php echo esc_attr( $product->get_id() ); ?>" />

			<?php if ( $quantites_required && $show_add_to_cart_button ) : ?>

				<?php do_action( 'woocommerce_before_add_to_cart_button' ); ?>

				<button type="submit" class="single_add_to_cart_button button alt<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?>"><?php echo esc_html( $product->single_add_to_cart_text() ); ?></button>

				<?php do_action( 'woocommerce_after_add_to_cart_button' ); ?>

			<?php endif; ?>
		</form>

		<?php do_action( 'woocommerce_after_add_to_cart_form' );

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
			case 'variation':
				$render_product = $this->add_variable_product_to_cart( $product );
				break;
			case 'grouped':
				$render_product = $this->add_grouped_product_to_cart( $product );
				break;
			case 'external':
				$render_product = $this->add_external_product_to_cart( $product );
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
