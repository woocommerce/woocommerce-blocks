<?php
/**
 * Cart Coupon Schema.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas;

defined( 'ABSPATH' ) || exit;

/**
 * CartCouponSchema class.
 *
 * @since 2.5.0
 */
class CartCouponSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'cart_coupon';

	/**
	 * Cart schema properties.
	 *
	 * @return array
	 */
	protected function get_properties() {
		return [
			'code'               => [
				'description' => __( 'The coupons unique code.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'arg_options' => [
					'sanitize_callback' => 'wc_format_coupon_code',
					'validate_callback' => [ $this, 'coupon_exists' ],
				],
			],
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
		return (bool) $coupon;
	}

	/**
	 * Convert a WooCommerce cart item to an object suitable for the response.
	 *
	 * @param string $coupon_code Coupon code from the cart.
	 * @return array
	 */
	public function get_item_response( $coupon_code ) {
		return [
			'code'               => $coupon_code,
			'total_discount'     => 0,
			'total_discount_tax' => 0,
		];
	}
}
