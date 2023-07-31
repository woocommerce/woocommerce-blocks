<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes\OrderConfirmation;

use Automattic\WooCommerce\Blocks\BlockTypes\AbstractBlock;
use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

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
			$order      = $this->get_preview_order();
			$permission = 'full';
		} else {
			$order      = $this->get_order();
			$permission = $this->get_view_order_permissions( $order );
		}

		$block_content      = $order ? $this->render_content( $order, $permission, $attributes ) : $this->render_content_fallback();
		$classname          = $attributes['className'] ?? '';
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		if ( isset( $attributes['align'] ) ) {
			$classname .= " align{$attributes['align']}";
		}

		return sprintf(
			'<div class="wc-block-%5$s %1$s %2$s" style="%3$s">%4$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			esc_attr( $classes_and_styles['styles'] ),
			$block_content,
			esc_attr( $this->block_name )
		);
	}

	/**
	 * This renders the content of the block within the wrapper. The permission determines what data can be shown under
	 * the given context.
	 *
	 * @param \WC_Order $order Order object.
	 * @param string    $permission Permission level for viewing order details.
	 * @param array     $attributes Block attributes.
	 * @return string
	 */
	abstract protected function render_content( $order, $permission = false, $attributes = [] );

	/**
	 * This is what gets rendered when the order does not exist. Renders nothing by default, but can be overridden by
	 * child classes.
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
	 * View mode for order details based on the order, current user, and settings.
	 *
	 * Possible values are:
	 * - "full" user can view all order details.
	 * - "limited" user can view some order details, but no PII. This may happen for example, if the user checked out as a guest.
	 * - false user cannot view order details.
	 *
	 * @param \WC_Order|null $order Order object.
	 * @return "full"|"limited"|false
	 */
	protected function get_view_order_permissions( $order ) {
		if ( ! $order ) {
			return false;
		}

		if ( is_user_logged_in() ) {
			// If logged in, check the user owns the order.
			return $this->is_current_customer_order( $order ) ? 'full' : false;
		}

		// If the user is logged out, check the order key for validity.
		if ( $this->allow_guest_checkout() && $this->has_valid_order_key( $order ) ) {
			return $this->order_matches_session( $order ) ? 'full' : 'limited';
		}

		return false;
	}

	/**
	 * See if guest checkout is enabled.
	 *
	 * @return boolean
	 */
	protected function allow_guest_checkout() {
		return 'yes' === get_option( 'woocommerce_enable_guest_checkout' );
	}

	/**
	 * See if the order key is valid.
	 *
	 * @param \WC_Order $order Order object.
	 * @return boolean
	 */
	protected function has_valid_order_key( $order ) {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return ! empty( $_GET['key'] ) && $order->key_is_valid( wc_clean( wp_unslash( $_GET['key'] ) ) );
	}

	/**
	 * See if the current user has access to sensitive order details.
	 *
	 * @param \WC_Order $order Order object.
	 * @return boolean
	 */
	protected function is_current_customer_order( $order ) {
		return get_current_user_id() > 0 && $order->get_user_id() === get_current_user_id();
	}

	/**
	 * See if the order matches the current session.
	 *
	 * @param \WC_Order $order Order object.
	 * @return boolean
	 */
	protected function order_matches_session( $order ) {
		return $order->get_id() === wc()->session->get( 'store_api_draft_order' );
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
