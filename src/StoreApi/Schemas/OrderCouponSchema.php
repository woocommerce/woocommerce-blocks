<?php
/**
 * Order Coupon Schema.
 */

namespace Automattic\WooCommerce\Blocks\StoreApi\Schemas;

defined( 'ABSPATH' ) || exit;

/**
 * OrderCouponSchema class.
 */
class OrderCouponSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'order_coupon';

	/**
	 * Cart schema properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		return [
			'code'   => [
				'description' => __( 'The coupons unique code.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'totals' => [
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
	 * Convert an order coupon to an object suitable for the response.
	 *
	 * @param \WC_Order_Item_Coupon $coupon Order coupon array.
	 * @return array
	 */
	public function get_item_response( \WC_Order_Item_Coupon $coupon ) {
		return [
			'code'   => $coupon->get_code(),
			'totals' => (object) array_merge(
				$this->get_store_currency_response(),
				[
					'total_discount'     => $this->prepare_money_response( $coupon->get_discount(), wc_get_price_decimals() ),
					'total_discount_tax' => $this->prepare_money_response( $coupon->get_discount_tax(), wc_get_price_decimals(), PHP_ROUND_HALF_DOWN ),
				]
			),
		];
	}
}
