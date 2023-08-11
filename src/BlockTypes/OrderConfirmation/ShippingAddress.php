<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes\OrderConfirmation;

/**
 * ShippingAddress class.
 */
class ShippingAddress extends AbstractOrderConfirmationBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'order-confirmation-shipping-address';

	/**
	 * This renders the content of the block within the wrapper.
	 *
	 * @param \WC_Order $order Order object.
	 * @param string    $permission Permission level for viewing order details.
	 * @param array     $attributes Block attributes.
	 * @return string
	 */
	protected function render_content( $order, $permission = false, $attributes = [] ) {
		if ( ! $permission ) {
			return $this->render_content_fallback();
		}

		if ( $order->needs_shipping_address() ) {
			if ( 'full' === $permission ) {
				$address = $order->get_formatted_shipping_address( esc_html__( 'This order has no shipping address.', 'woo-gutenberg-products-block' ) );
				$address = $address . ( $order->get_shipping_phone() ? '<br><span class="woocommerce-customer-details--phone">' . esc_html( $order->get_shipping_phone() ) . '</span>' : '' );
			} else {
				$states  = wc()->countries->get_states( $order->get_shipping_country() );
				$address = esc_html(
					sprintf(
					/* translators: %s location. */
						__( 'Shipping to %s', 'woo-gutenberg-products-block' ),
						implode(
							', ',
							array_filter(
								[
									$order->get_shipping_postcode(),
									$order->get_shipping_city(),
									$states[ $order->get_shipping_state() ] ?? $order->get_shipping_state(),
									wc()->countries->countries[ $order->get_shipping_country() ] ?? $order->get_shipping_country(),
								]
							)
						)
					)
				);
			}
		} else {
			$address = esc_html__( 'This order does not require shipping.', 'woo-gutenberg-products-block' );
		}

		return '<address>' . wp_kses_post( $address ) . '</address>';
	}
}
