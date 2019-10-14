<?php
/**
 * Helper class to bridge the gap between the cart API and Woo core.
 *
 * Overrides some of the woo core cart methods to make them work with the API and generally increase flexibility. Some of this logic should move to core.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\StoreApi\Utilities;

defined( 'ABSPATH' ) || exit;

use \WP_Error as Error;

/**
 * Cart Controller class.
 */
class CartController {

	/**
	 * Based on the core cart class but returns errors rather than rendering notices directly.
	 *
	 * @param array $request Add to cart request params.
	 * @return string|Error
	 */
	public function add_to_cart( $request ) {
		$request = wp_parse_args(
			$request,
			[
				'id'             => 0,
				'quantity'       => 1,
				'variation'      => [],
				'cart_item_data' => [],
			]
		);

		$product = $this->get_product_for_cart( $request );

		if ( is_wp_error( $product ) ) {
			return $product;
		}

		if ( $product->is_type( 'variation' ) ) {
			$product_id   = $product->get_parent_id();
			$variation_id = $product->get_id();
		} else {
			$product_id   = $product->get_id();
			$variation_id = 0;
		}

		$request          = $this->filter_request_data( $request, $product );
		$cart_id          = wc()->cart->generate_cart_id( $product_id, $variation_id, $request['variation'], $request['cart_item_data'] );
		$existing_cart_id = wc()->cart->find_product_in_cart( $cart_id );

		if ( $product->is_sold_individually() && $existing_cart_id ) {
			/* translators: %s: product name */
			return new Error( 'woocommerce_rest_cart_product_sold_individually', sprintf( __( '"%s" is already inside your cart.', 'woo-gutenberg-products-block' ), $product->get_name() ) );
		}

		if ( ! $product->is_in_stock() ) {
			/* translators: %s: product name */
			return new Error( 'woocommerce_rest_cart_product_no_stock', sprintf( __( 'You cannot add &quot;%s&quot; to the cart because the product is out of stock.', 'woo-gutenberg-products-block' ), $product->get_name() ) );
		}

		if ( $product->managing_stock() ) {
			$cart_product_quantities   = wc()->cart->get_cart_item_quantities();
			$stock_controller_id       = $product->get_stock_managed_by_id();
			$stock_controller_quantity = isset( $cart_product_quantities[ $stock_controller_id ] ) ? $cart_product_quantities[ $stock_controller_id ] : 0;

			if ( ! $product->has_enough_stock( $stock_controller_quantity + $request['quantity'] ) ) {
				return new Error(
					'woocommerce_rest_cart_product_no_stock',
					/* translators: 1: product name 2: quantity in stock */
					sprintf( __( 'You cannot add that amount of &quot;%1$s&quot; to the cart because there is not enough stock (%2$s remaining).', 'woo-gutenberg-products-block' ), $product->get_name(), wc_format_stock_quantity_for_display( $product->get_stock_quantity(), $product ) )
				);
			}
		}

		if ( $existing_cart_id ) {
			wc()->cart->set_quantity( $existing_cart_id, $request['quantity'] + wc()->cart->cart_contents[ $existing_cart_id ]['quantity'], true );
			return $existing_cart_id;
		}

		wc()->cart->cart_contents[ $cart_id ] = apply_filters(
			'woocommerce_add_cart_item',
			array_merge(
				$cart_item_data,
				array(
					'key'          => $cart_id,
					'product_id'   => $product_id,
					'variation_id' => $variation_id,
					'variation'    => $request['variation'],
					'quantity'     => $request['quantity'],
					'data'         => $product,
					'data_hash'    => wc_get_cart_item_data_hash( $product ),
				)
			),
			$cart_id
		);

		wc()->cart->cart_contents = apply_filters( 'woocommerce_cart_contents_changed', wc()->cart->cart_contents );

		do_action( 'woocommerce_add_to_cart', $cart_id, $product_id, $request['quantity'], $variation_id, $request['variation'], $request['cart_item_data'] );

		return $cart_id;
	}

	/**
	 * Return a cart item from the woo core cart class.
	 *
	 * @param string $item_id Cart item id.
	 * @return array
	 */
	public function get_item( $item_id ) {
		return isset( wc()->cart->cart_contents[ $item_id ] ) ? wc()->cart->cart_contents[ $item_id ] : [];
	}

	/**
	 * Returns all cart items.
	 *
	 * @return array
	 */
	public function get_items() {
		return array_filter( wc()->cart->get_cart() );
	}

	/**
	 * Empty cart contents.
	 */
	public function empty_cart() {
		wc()->cart->empty_cart();
	}

	/**
	 * Get a product object to be added to the cart.
	 *
	 * @param array $request Add to cart request params.
	 * @return \WC_Product|Error Returns a product object if purchasable.
	 */
	protected function get_product_for_cart( $request ) {
		$product = wc_get_product( $request['id'] );

		if ( ! $product || 'trash' === $product->get_status() ) {
			return new Error( 'woocommerce_rest_cart_invalid_product', __( 'This product cannot be added to the cart.', 'woo-gutenberg-products-block' ) );
		}

		if ( ! $product->is_purchasable() ) {
			return new Error( 'woocommerce_rest_cart_product_is_not_purchasable', __( 'This product cannot be purchased.', 'woo-gutenberg-products-block' ) );
		}

		return $product;
	}

	/**
	 * Filter data for add to cart requests.
	 *
	 * @param array       $request Add to cart request params.
	 * @param \WC_Product $product Product being added to the cart.
	 * @return array
	 */
	protected function filter_request_data( $request, $product ) {
		if ( $product->is_type( 'variation' ) ) {
			$product_id   = $product->get_parent_id();
			$variation_id = $product->get_id();
		} else {
			$product_id   = $product->get_id();
			$variation_id = 0;
		}

		$request['cart_item_data'] = (array) apply_filters( 'woocommerce_add_cart_item_data', $request['cart_item_data'], $product_id, $variation_id, $request['quantity'] );

		if ( $product->is_sold_individually() ) {
			$request['quantity'] = apply_filters( 'woocommerce_add_to_cart_sold_individually_quantity', 1, $request['quantity'], $product_id, $variation_id, $request['cart_item_data'] );
		}

		return $request;
	}
}
