<?php
/**
 * Cart schema.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas;

defined( 'ABSPATH' ) || exit;

/**
 * CartSchema class.
 *
 * @since 2.5.0
 */
class CartSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'cart';

	/**
	 * Cart schema properties.
	 *
	 * @return array
	 */
	protected function get_properties() {
		return [
			'currency'           => array(
				'description' => __( 'Currency code (in ISO format) of the cart item prices.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'default'     => get_woocommerce_currency(),
				'enum'        => array_keys( get_woocommerce_currencies() ),
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'items'              => array(
				'description' => __( 'List of cart items.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
				'items'       => array(
					'type'       => 'object',
					'properties' => $this->force_schema_readonly( ( new CartItemSchema() )->get_properties() ),
				),
			),
			'items_count'        => array(
				'description' => __( 'Number of items in the cart.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'items_weight'       => array(
				'description' => __( 'Total weight (in grams) of all products in the cart.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'needs_shipping'     => array(
				'description' => __( 'True if the cart needs shipping. False for carts with only digital goods or stores with no shipping methods set-up.', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'total_items'        => array(
				'description' => __( 'Total price of items in the cart.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'total_items_tax'    => array(
				'description' => __( 'Total tax on items in the cart.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'total_fees'         => array(
				'description' => __( 'Total price of any applied fees.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'total_fees_tax'     => array(
				'description' => __( 'Total tax on fees.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'total_discount'     => array(
				'description' => __( 'Total discount from applied coupons.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'total_discount_tax' => array(
				'description' => __( 'Total tax removed due to discount from applied coupons.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'total_shipping'     => array(
				'description' => __( 'Total price of shipping.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'total_shipping_tax' => array(
				'description' => __( 'Total tax on shipping.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'total_tax'          => array(
				'description' => __( 'Total tax applied to items and shipping.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'total_price'        => array(
				'description' => __( 'Total price the customer will pay.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
		];
	}

	/**
	 * Convert a woo cart into an object suitable for the response.
	 *
	 * @param \WC_Cart $cart Cart class instance.
	 * @return array
	 */
	public function get_item_response( $cart ) {
		$cart_item_schema = new CartItemSchema();
		return [
			'currency'           => get_woocommerce_currency(),
			'items'              => array_values( array_map( [ $cart_item_schema, 'get_item_response' ], array_filter( $cart->get_cart() ) ) ),
			'items_count'        => $cart->get_cart_contents_count(),
			'items_weight'       => wc_get_weight( $cart->get_cart_contents_weight(), 'g' ),
			'needs_shipping'     => $cart->needs_shipping(),
			'total_items'        => wc_format_decimal( $cart->get_subtotal() ),
			'total_items_tax'    => wc_format_decimal( $cart->get_subtotal_tax() ),
			'total_fees'         => wc_format_decimal( $cart->get_fee_total() ),
			'total_fees_tax'     => wc_format_decimal( $cart->get_fee_tax() ),
			'total_discount'     => wc_format_decimal( $cart->get_discount_total() ),
			'total_discount_tax' => wc_format_decimal( $cart->get_discount_tax() ),
			'total_shipping'     => wc_format_decimal( $cart->get_shipping_total() ),
			'total_shipping_tax' => wc_format_decimal( $cart->get_shipping_tax() ),
			'total_tax'          => wc_format_decimal( $cart->get_total_tax() ),
			'total_price'        => wc_format_decimal( $cart->get_total() ),
		];
	}
}
