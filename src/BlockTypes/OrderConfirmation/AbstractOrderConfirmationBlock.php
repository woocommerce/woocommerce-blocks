<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes\OrderConfirmation;

use Automattic\WooCommerce\Blocks\BlockTypes\AbstractBlock;

/**
 * AbstractOrderConfirmationBlock class.
 */
abstract class AbstractOrderConfirmationBlock extends AbstractBlock {
	/**
	 * Get the content from a hook and return it.
	 *
	 * @param string $hook Hook name.
	 * @param array  $args Array of args to pass to the hook.
	 * @return string
	 */
	protected function get_hook_content( $hook, $args ) {
		ob_start();
		// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
		do_action_ref_array( $hook, $args );
		return ob_get_clean();
	}

	/**
	 * This renders the content of the block within the wrapper.
	 *
	 * @param \WC_Order $order Order object.
	 * @return string
	 */
	abstract protected function render_content( $order );

	/**
	 * This is what gets rendered when the order does not exist.
	 *
	 * @return string
	 */
	protected function render_content_fallback() {
		return '';
	}

	/**
	 * Get current order.
	 *
	 * @todo Check auth.
	 *
	 * @return \WC_Order|null
	 */
	protected function get_order() {
		$order_id = absint( get_query_var( 'order-received' ) );

		if ( $order_id ) {
			return wc_get_order( $order_id );
		}

		return null;
	}

	/**
	 * See if the current user has access to sensitive order details.
	 *
	 * @param \WC_Order|null $order Order object.
	 * @return boolean
	 */
	protected function is_current_customer_order( $order ) {
		if ( ! $order ) {
			return false;
		}

		if ( ! is_user_logged_in() || $order->get_user_id() !== get_current_user_id() ) {
			return false;
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( empty( $_GET['key'] ) || ! $order->key_is_valid( wc_clean( wp_unslash( $_GET['key'] ) ) ) ) {
			return false;
		}

		return true;
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
	 * Get a fake order for previews.
	 *
	 * @return \WC_Order Fake order.
	 */
	protected function get_preview_order() {
		$product = new \WC_Product();
		$product->set_name( 'Test Product' );
		$product->set_price( '10' );

		$order = new \WC_Order();
		$order->set_id( 123 );
		$order->set_billing_email( 'test@test.com' );
		$order->set_date_created( 'now' );
		$order->set_payment_method_title( 'Credit Card' );
		$order->set_total( 40 );

		$item_1 = new \WC_Order_Item_Product();
		$item_1->set_props(
			array(
				'product'  => $product,
				'quantity' => 4,
				'total'    => 40,
			)
		);
		$order->add_item( $item_1 );

		return $order;
	}
}
