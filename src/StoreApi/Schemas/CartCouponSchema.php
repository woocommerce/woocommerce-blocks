<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Schemas;

use Automattic\WooCommerce\Blocks\StoreApi\Utilities\CartController;

/**
 * CartCouponSchema class.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @since 2.5.0
 * @since 3.9.0 Coupon type (`discount_type`) added.
 */
class CartCouponSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'cart_coupon';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'cart-coupon';

	/**
	 * Cart schema properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		return [
			'code'          => [
				'description' => __( 'The coupon\'s unique code.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'arg_options' => [
					'sanitize_callback' => 'wc_format_coupon_code',
					'validate_callback' => [ $this, 'coupon_exists' ],
				],
			],
			'discount_type' => [
				'description' => __( 'The discount type for the coupon (e.g. percentage or fixed amount)', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'arg_options' => [
					'validate_callback' => [ $this, 'coupon_exists' ],
				],
			],
			'totals'        => [
				'description' => __( 'Total amounts provided using the smallest unit of the currency.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'properties'  => array_merge(
					$this->get_store_currency_properties(),
					[
						'total_discount'     => [
							'description' => __( 'Total discount applied by this coupon.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_discount_tax' => [
							'description' => __( 'Total tax removed due to discount applied by this coupon.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
					]
				),
			],
		];
	}

	/**
	 * Check given coupon exists.
	 *
	 * @param string $coupon_code Coupon code.
	 * @return bool
	 */
	public function coupon_exists( $coupon_code ) {
		$coupon = new \WC_Coupon( $coupon_code );
		return (bool) $coupon->get_id() || $coupon->get_virtual();
	}

	/**
	 * Generate a response from passed coupon code.
	 *
	 * @param string $coupon_code Coupon code from the cart.
	 * @return array
	 */
	public function get_item_response( $coupon_code ) {
		$controller           = new CartController();
		$cart                 = $controller->get_cart_instance();
		$total_discounts      = $cart->get_coupon_discount_totals();
		$total_discount_taxes = $cart->get_coupon_discount_tax_totals();
		$coupon               = new \WC_Coupon( $coupon_code );
		return [
			'code'          => $coupon_code,
			'discount_type' => $coupon->get_discount_type(),
			'totals'        => (object) $this->prepare_currency_response(
				[
					'total_discount'     => $this->prepare_money_response( isset( $total_discounts[ $coupon_code ] ) ? $total_discounts[ $coupon_code ] : 0, wc_get_price_decimals() ),
					'total_discount_tax' => $this->prepare_money_response( isset( $total_discount_taxes[ $coupon_code ] ) ? $total_discount_taxes[ $coupon_code ] : 0, wc_get_price_decimals(), PHP_ROUND_HALF_DOWN ),
				]
			),
		];
	}
}
