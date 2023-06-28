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
	 * @param string    $hook Hook name.
	 * @param \WC_Order $order Order object.
	 * @return string
	 */
	protected function get_hook_content( $hook, $order ) {
		ob_start();
		// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
		do_action( $hook, $order );
		return ob_get_clean();
	}

	/**
	 * Get current order.
	 *
	 * @return WC_Order|null
	 */
	protected function get_order() {
		$order_id = absint( get_query_var( 'order-received' ) );

		if ( $order_id ) {
			return wc_get_order( $order_id );
		}

		return null;
	}

	/**
	 * Get the frontend script handle for this block type.
	 *
	 * @param string $key Data to get, or default to everything.
	 */
	protected function get_block_type_script( $key = null ) {
		return null;
	}
}
