<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes\OrderConfirmation;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * Details class.
 */
class Details extends AbstractOrderConfirmationBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'order-confirmation-details';

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

		$content            = $order ? $this->render_content( $order ) : $this->render_content_fallback();
		$classname          = $attributes['className'] ?? '';
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		if ( isset( $attributes['align'] ) ) {
			$classname .= " align{$attributes['align']}";
		}

		return sprintf(
			'<div class="wc-block-%4$s %1$s %2$s">%3$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
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
	 * @return string
	 */
	protected function render_content( $order ) {
		return '
			<section class="woocommerce-order-details">
				' . $this->get_hook_content( 'woocommerce_order_details_before_order_table', [ $order ] ) . '
				<table class="woocommerce-table woocommerce-table--order-details shop_table order_details" cellspacing="0">
					<thead>
						<tr>
							<th class="woocommerce-table__product-name product-name">' . esc_html__( 'Product', 'woo-gutenberg-products-block' ) . '</th>
							<th class="woocommerce-table__product-table product-total">' . esc_html__( 'Total', 'woo-gutenberg-products-block' ) . '</th>
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
			</section>
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
				<td class="woocommerce-table__product-name product-name">
					' . wp_kses_post( $item_name ) . '&nbsp;
					' . wp_kses_post( $item_qty ) . '
					' . $this->get_hook_content( 'woocommerce_order_item_meta_start', [ $item_id, $item, $order, false ] ) . '
					' . wc_display_item_meta( $item, [ 'echo' => false ] ) . '
					' . $this->get_hook_content( 'woocommerce_order_item_meta_end', [ $item_id, $item, $order, false ] ) . '
					' . $this->render_order_details_table_item_purchase_note( $order, $product ) . '
				</td>
				<td class="woocommerce-table__product-total product-total">
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
		$return = '';

		foreach ( $order->get_order_item_totals() as $total ) {
			$return .= '
				<tr>
					<th scope="row">' . esc_html( $total['label'] ) . '</th>
					<td>' . wp_kses_post( $total['value'] ) . '</td>
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
			<th>' . esc_html__( 'Note:', 'woo-gutenberg-products-block' ) . '</th>
			<td>' . wp_kses_post( nl2br( wptexturize( $order->get_customer_note() ) ) ) . '</td>
		</tr>';
	}
}
