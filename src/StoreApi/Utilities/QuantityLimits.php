<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Utilities;

use Automattic\WooCommerce\Checkout\Helpers\ReserveStock;
use Automattic\WooCommerce\Blocks\StoreApi\Utilities\DraftOrderTrait;

/**
 * QuantityLimits class.
 *
 * Returns limits for products and cart items when using the StoreAPI and supporting classes.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @since 2.5.0
 */
class QuantityLimits {
	use DraftOrderTrait;

	/**
	 * Get quantity limits (min, max, step/multiple) for a product or cart item.
	 *
	 * @param \WC_Product|array $cart_item_or_product Either a cart item or a product instance.
	 * @return object
	 */
	public function get_quantity_limits( $cart_item_or_product ) {
		$product = $cart_item_or_product instanceof \WC_Product ? $cart_item_or_product : $cart_item_or_product['data'];

		if ( ! $product instanceof \WC_Product ) {
			return [
				'minimum'     => 1,
				'maximum'     => null,
				'multiple_of' => 1,
			];
		}

		$multiple_of = $this->filter_value( 1, 'multiple_of', $cart_item_or_product );
		$minimum     = $this->filter_value( 1, 'minimum', $cart_item_or_product );
		$maximum     = $this->filter_value( $this->get_product_quantity_limit( $product ), 'maximum', $cart_item_or_product );

		return (object) [
			'minimum'     => $this->limit_to_multiple( $minimum, $multiple_of, 'ceil' ),
			'maximum'     => $this->limit_to_multiple( $maximum, $multiple_of, 'floor' ),
			'multiple_of' => $multiple_of,
		];
	}

	/**
	 * Get the limit for the total number of a product allowed in the cart.
	 *
	 * This is based on product properties, including remaining stock, and defaults to a maximum of 99 of any product
	 * in the cart at once.
	 *
	 * @param \WC_Product $product Product instance.
	 * @return int
	 */
	protected function get_product_quantity_limit( \WC_Product $product ) {
		$limits = [ 99 ];

		if ( $product->is_sold_individually() ) {
			$limits[] = 1;
		} elseif ( ! $product->backorders_allowed() ) {
			$limits[] = $this->get_remaining_stock( $product );
		}

		/**
		 * Filters the quantity limit for a product being added to the cart via the Store API.
		 *
		 * Filters the variation option name for custom option slugs.
		 *
		 * @param integer $quantity_limit Quantity limit which defaults to 99 unless sold individually.
		 * @param \WC_Product $product Product instance.
		 * @return integer
		 */
		return apply_filters( 'woocommerce_store_api_product_quantity_limit', max( min( array_filter( $limits ) ), 1 ), $product );
	}

		/**
		 * Check that a given quantity is valid according to any limits in place.
		 *
		 * @param integer           $quantity Quantity to validate.
		 * @param \WC_Product|array $cart_item_or_product Either a cart item or a product instance.
		 * @return \WP_Error|true
		 */
	public function validate_quantity( $quantity, $cart_item_or_product ) {
		$limits = $this->get_quantity_limits( $cart_item_or_product );

		if ( $quantity < $limits->minimum ) {
			return new \WP_Error(
				'invalid_quantity',
				sprintf(
					// Translators: %s amount.
					__( 'The minimum quantity that can be added to the cart is %s', 'woo-gutenberg-products-block' ),
					$limits->minimum
				)
			);
		}

		if ( $quantity > $limits->maximum ) {
			return new \WP_Error(
				'invalid_quantity',
				sprintf(
					// Translators: %s amount.
					__( 'The maximum quantity that can be added to the cart is %s', 'woo-gutenberg-products-block' ),
					$limits->maximum
				)
			);
		}

		if ( $quantity % $limits->multiple_of ) {
			return new \WP_Error(
				'invalid_quantity',
				sprintf(
					// Translators: %s amount.
					__( 'The quantity added to the cart must be a multiple of %s', 'woo-gutenberg-products-block' ),
					$limits->multiple_of
				)
			);
		}

		return true;
	}

	/**
	 * Returns the remaining stock for a product if it has stock.
	 *
	 * This also factors in draft orders.
	 *
	 * @param \WC_Product $product Product instance.
	 * @return integer|null
	 */
	protected function get_remaining_stock( \WC_Product $product ) {
		if ( is_null( $product->get_stock_quantity() ) ) {
			return null;
		}

		$reserve_stock  = new ReserveStock();
		$reserved_stock = $reserve_stock->get_reserved_stock( $product, $this->get_draft_order_id() );

		return $product->get_stock_quantity() - $reserved_stock;
	}

	/**
	 * Return a number using the closest multiple of another number. Used to enforce step/multiple values.
	 *
	 * @param int    $number Number to round.
	 * @param int    $multiple_of The multiple.
	 * @param string $rounding_function ceil, floor, or round.
	 * @return int
	 */
	protected function limit_to_multiple( int $number, int $multiple_of, string $rounding_function = 'ceil' ) {
		if ( $multiple_of <= 1 ) {
			return $number;
		}
		$rounding_function = in_array( $rounding_function, [ 'ceil', 'floor', 'round' ], true ) ? $rounding_function : 'round';
		return $rounding_function( $number / $multiple_of ) * $multiple_of;
	}

	/**
	 * Get a quantity for a product or cart item by running it through a filter hook.
	 *
	 * @param int|null          $value Value to filter.
	 * @param string            $value_type Type of value. Used for filter suffix.
	 * @param \WC_Product|array $cart_item_or_product Either a cart item or a product instance.
	 * @return int|null
	 */
	protected function filter_value( $value, string $value_type, $cart_item_or_product ) {
		$type = $cart_item_or_product instanceof \WC_Product ? 'product' : 'cart_item';
		/**
		 * Filters the quantity minimum for a cart item in Store API. This allows extensions to control the minimum qty
		 * of items already within the cart.
		 *
		 * Hook name will reflect the product or cart item depending on what is provided, so either:
		 *  - woocommerce_store_api_product_quantity_minimum
		 *  - woocommerce_store_api_cart_item_quantity_minimum
		 *
		 * @param integer $minimum Minimum qty which defaults to 1.
		 * @param array $cart_item_or_product Product or cart item being added/updated in the cart.
		 * @return integer
		 */
		return (int) apply_filters( "woocommerce_store_api_{$type}_quantity_{$value_type}", $value, $cart_item_or_product );
	}
}
