<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes\OrderConfirmation;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * Totals class.
 */
class Totals extends AbstractOrderConfirmationBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'order-confirmation-totals';

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
		if ( ! empty( $attributes['isPreview'] ) ) {
			$order = $this->get_preview_order();
		} else {
			$order = $this->get_order();

			if ( ! $this->is_current_customer_order( $order ) ) {
				$order = null;
			}
		}

		$content            = $order ? $this->render_content( $order, $attributes ) : $this->render_content_fallback();
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes, [], [ 'border_color', 'border_radius', 'border_width', 'background_color', 'text_color' ] );
		$classname          = $attributes['className'] ?? '';

		if ( isset( $attributes['align'] ) ) {
			$classname .= " align{$attributes['align']}";
		}

		return sprintf(
			'<div class="wc-block-%5$s %1$s %2$s" style="%3$s">%4$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			esc_attr( $classes_and_styles['styles'] ),
			$content,
			esc_attr( $this->block_name )
		);
	}

	/**
	 * This is what gets rendered when the order does not exist.
	 *
	 * @return string
	 */
	protected function render_content_fallback() {
		return '<p>' . esc_html__( 'The details of your order can be found in the email that was sent to you when the order was placed.', 'woo-gutenberg-products-block' ) . '</p>';
	}

	/**
	 * This renders the content of the block within the wrapper.
	 *
	 * @param \WC_Order $order Order object.
	 * @param array     $attributes Block attributes.
	 * @return string
	 */
	protected function render_content( $order, $attributes = [] ) {
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes, [ 'border_color', 'border_radius', 'border_width', 'background_color', 'text_color' ] );

		return $this->get_hook_content( 'woocommerce_order_details_before_order_table', [ $order ] ) . '
			<table cellspacing="0" class="wc-block-order-confirmation-totals__table ' . esc_attr( $classes_and_styles['classes'] ) . '" style="' . esc_attr( $classes_and_styles['styles'] ) . '">
				<thead>
					<tr>
						<th class="wc-block-order-confirmation-totals__product">' . esc_html__( 'Product', 'woo-gutenberg-products-block' ) . '</th>
						<th class="wc-block-order-confirmation-totals__total">' . esc_html__( 'Total', 'woo-gutenberg-products-block' ) . '</th>
					</tr>
				</thead>
				<tbody>
					' . $this->get_hook_content( 'woocommerce_order_details_before_order_table_items', [ $order ] ) . '
					' . $this->render_order_details_table_items( $order ) . '
					' . $this->get_hook_content( 'woocommerce_order_details_after_order_table_items', [ $order ] ) . '
				</tbody>
				<tfoot>
					' . $this->render_order_details_table_totals( $order ) . '
					' . $this->render_order_details_table_customer_note( $order ) . '
				</tfoot>
			</table>
			' . $this->get_hook_content( 'woocommerce_order_details_after_order_table', [ $order ] ) . '
			' . $this->get_hook_content( 'woocommerce_after_order_details', [ $order ] ) . '
		';
	}

	/**
	 * Render order details table items.
	 *
	 * Loosely based on the templates order-details.php and order-details-item.php from core.
	 *
	 * @param \WC_Order $order Order object.
	 * @return string
	 */
	protected function render_order_details_table_items( $order ) {
		$return      = '';
		$order_items = array_filter(
			// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
			$order->get_items( apply_filters( 'woocommerce_purchase_order_item_types', 'line_item' ) ),
			function( $item ) {
				// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
				return apply_filters( 'woocommerce_order_item_visible', true, $item );
			}
		);

		foreach ( $order_items as $item_id => $item ) {
			$product = $item->get_product();
			$return .= $this->render_order_details_table_item( $order, $item_id, $item, $product );
		}

		return $return;
	}

	/**
	 * Render an item in the order details table.
	 *
	 * @param \WC_Order         $order Order object.
	 * @param integer           $item_id Item ID.
	 * @param \WC_Order_Item    $item Item object.
	 * @param \WC_Product|false $product Product object if it exists.
	 * @return string
	 */
	protected function render_order_details_table_item( $order, $item_id, $item, $product ) {
		$is_visible = $product && $product->is_visible();
		// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
		$row_class = apply_filters( 'woocommerce_order_item_class', 'woocommerce-table__line-item order_item', $item, $order );
		// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
		$product_permalink = apply_filters( 'woocommerce_order_item_permalink', $is_visible ? $product->get_permalink( $item ) : '', $item, $order );
		// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
		$item_name    = apply_filters(
			'woocommerce_order_item_name',
			$product_permalink ? sprintf( '<a href="%s">%s</a>', $product_permalink, $item->get_name() ) : $item->get_name(),
			$item,
			$is_visible
		);
		$qty          = $item->get_quantity();
		$refunded_qty = $order->get_qty_refunded_for_item( $item_id );
		$qty_display  = $refunded_qty ? '<del>' . esc_html( $qty ) . '</del> <ins>' . esc_html( $qty - ( $refunded_qty * -1 ) ) . '</ins>' : esc_html( $qty );
		// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
		$item_qty = apply_filters(
			'woocommerce_order_item_quantity_html',
			'<strong class="product-quantity">' . sprintf( '&times;&nbsp;%s', $qty_display ) . '</strong>',
			$item
		);

		return '
			<tr class="' . esc_attr( $row_class ) . '">
				<th scope="row" class="wc-block-order-confirmation-totals__product">
					' . wp_kses_post( $item_name ) . '&nbsp;
					' . wp_kses_post( $item_qty ) . '
					' . $this->get_hook_content( 'woocommerce_order_item_meta_start', [ $item_id, $item, $order, false ] ) . '
					' . wc_display_item_meta( $item, [ 'echo' => false ] ) . '
					' . $this->get_hook_content( 'woocommerce_order_item_meta_end', [ $item_id, $item, $order, false ] ) . '
					' . $this->render_order_details_table_item_purchase_note( $order, $product ) . '
				</td>
				<td class="wc-block-order-confirmation-totals__total">
					' . wp_kses_post( $order->get_formatted_line_subtotal( $item ) ) . '
				</td>
			</tr>
		';
	}

	/**
	 * Render an item purchase note.
	 *
	 * @param \WC_Order         $order Order object.
	 * @param \WC_Product|false $product Product object if it exists.
	 * @return string
	 */
	protected function render_order_details_table_item_purchase_note( $order, $product ) {
		// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
		$show_purchase_note = $order->has_status( apply_filters( 'woocommerce_purchase_note_order_statuses', array( 'completed', 'processing' ) ) );
		$purchase_note      = $product ? $product->get_purchase_note() : '';

		return $show_purchase_note && $purchase_note ? '<div class="product-purchase-note">' . wp_kses_post( $purchase_note ) . '</div>' : '';
	}

	/**
	 * Render order details table totals.
	 *
	 * @param \WC_Order $order Order object.
	 * @return string
	 */
	protected function render_order_details_table_totals( $order ) {
		add_filter( 'woocommerce_order_shipping_to_display_shipped_via', '__return_empty_string' );

		$return     = '';
		$total_rows = array_diff_key(
			$order->get_order_item_totals(),
			array(
				'cart_subtotal'  => '',
				'payment_method' => '',
			)
		);

		foreach ( $total_rows as $total ) {
			$return .= '
				<tr>
					<th class="wc-block-order-confirmation-totals__label" scope="row">' . esc_html( $total['label'] ) . '</th>
					<td class="wc-block-order-confirmation-totals__total">' . wp_kses_post( $total['value'] ) . '</td>
				</tr>
			';
		}

		return $return;
	}

	/**
	 * Render customer note.
	 *
	 * @param \WC_Order $order Order object.
	 * @return string
	 */
	protected function render_order_details_table_customer_note( $order ) {
		if ( ! $order->get_customer_note() ) {
			return '';
		}

		return '<tr>
			<th class="wc-block-order-confirmation-totals__label" scope="row">' . esc_html__( 'Note:', 'woo-gutenberg-products-block' ) . '</th>
			<td class="wc-block-order-confirmation-totals__note">' . wp_kses_post( nl2br( wptexturize( $order->get_customer_note() ) ) ) . '</td>
		</tr>';
	}
}
