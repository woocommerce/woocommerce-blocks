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
		$content            = $this->render_order_details_table( $this->get_order() );
		$classname          = $attributes['className'] ?? '';
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		if ( isset( $attributes['align'] ) ) {
			$classname .= " align{$attributes['align']}";
		}

		return sprintf(
			'<div class="woocommerce wc-block-order-%4$s %1$s %2$s">%3$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			$content,
			esc_attr( $this->block_name )
		);
	}

	/**
	 * Render order details table items.
	 *
	 * @param \WC_Order $order Order object.
	 * @return string
	 */
	protected function render_order_details_table_items( $order ) {
		ob_start();

		// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
		$show_purchase_note = $order->has_status( apply_filters( 'woocommerce_purchase_note_order_statuses', array( 'completed', 'processing' ) ) );

		// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
		foreach ( $order->get_items( apply_filters( 'woocommerce_purchase_order_item_types', 'line_item' ) ) as $item_id => $item ) {
			$product = $item->get_product();

			wc_get_template(
				'order/order-details-item.php',
				array(
					'order'              => $order,
					'item_id'            => $item_id,
					'item'               => $item,
					'show_purchase_note' => $show_purchase_note,
					'purchase_note'      => $product ? $product->get_purchase_note() : '',
					'product'            => $product,
				)
			);
		}

		return ob_get_clean();
	}

	/**
	 * Render order details table totals.
	 *
	 * @param \WC_Order $order Order object.
	 * @return string
	 */
	protected function render_order_details_table_totals( $order ) {
		ob_start();

		foreach ( $order->get_order_item_totals() as $key => $total ) {
			?>
				<tr>
					<th scope="row"><?php echo esc_html( $total['label'] ); ?></th>
					<td><?php echo wp_kses_post( $total['value'] ); ?></td>
				</tr>
				<?php
		}

		if ( $order->get_customer_note() ) {
			?>
			<tr>
				<th><?php esc_html_e( 'Note:', 'woo-gutenberg-products-block' ); ?></th>
				<td><?php echo wp_kses_post( nl2br( wptexturize( $order->get_customer_note() ) ) ); ?></td>
			</tr>
			<?php
		}

		return ob_get_clean();
	}

	/**
	 * Render order details table.
	 *
	 * @param \WC_Order $order Order object.
	 * @return string
	 */
	protected function render_order_details_table( $order ) {
		if ( ! $order ) {
			return '';
		}
		return '
		<section class="woocommerce-order-details">
			' . $this->get_hook_content( 'woocommerce_order_details_before_order_table', $order ) . '
			<table class="woocommerce-table woocommerce-table--order-details shop_table order_details">
				<thead>
					<tr>
						<th class="woocommerce-table__product-name product-name">' . esc_html__( 'Product', 'woo-gutenberg-products-block' ) . '</th>
						<th class="woocommerce-table__product-table product-total">' . esc_html__( 'Total', 'woo-gutenberg-products-block' ) . '</th>
					</tr>
				</thead>
				<tbody>
					' . $this->get_hook_content( 'woocommerce_order_details_before_order_table_items', $order ) . '
					' . $this->render_order_details_table_items( $order ) . '
					' . $this->get_hook_content( 'woocommerce_order_details_after_order_table_items', $order ) . '
				</tbody>
				<tfoot>
					' . $this->render_order_details_table_totals( $order ) . '
				</tfoot>
			</table>
			' . $this->get_hook_content( 'woocommerce_order_details_after_order_table', $order ) . '
		</section>
		';
	}
}
