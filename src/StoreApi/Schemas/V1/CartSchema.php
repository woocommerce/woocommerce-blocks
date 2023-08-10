<?php
namespace Automattic\WooCommerce\StoreApi\Schemas\V1;

use Automattic\WooCommerce\StoreApi\SchemaController;
use Automattic\WooCommerce\StoreApi\Utilities\CartController;
use Automattic\WooCommerce\StoreApi\Schemas\ExtendSchema;
use WC_Tax;

/**
 * CartSchema class.
 */
class CartSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'cart';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'cart';

	/**
	 * Item schema instance.
	 *
	 * @var CartItemSchema
	 */
	public $item_schema;

	/**
	 * Coupon schema instance.
	 *
	 * @var CartCouponSchema
	 */
	public $coupon_schema;

	/**
	 * Product item schema instance representing cross-sell items.
	 *
	 * @var ProductSchema
	 */
	public $cross_sells_item_schema;

	/**
	 * Fee schema instance.
	 *
	 * @var CartFeeSchema
	 */
	public $fee_schema;

	/**
	 * Shipping rates schema instance.
	 *
	 * @var CartShippingRateSchema
	 */
	public $shipping_rate_schema;

	/**
	 * Shipping address schema instance.
	 *
	 * @var ShippingAddressSchema
	 */
	public $shipping_address_schema;

	/**
	 * Billing address schema instance.
	 *
	 * @var BillingAddressSchema
	 */
	public $billing_address_schema;

	/**
	 * Error schema instance.
	 *
	 * @var ErrorSchema
	 */
	public $error_schema;

	/**
	 * Constructor.
	 *
	 * @param ExtendSchema     $extend Rest Extending instance.
	 * @param SchemaController $controller Schema Controller instance.
	 */
	public function __construct( ExtendSchema $extend, SchemaController $controller ) {
		parent::__construct( $extend, $controller );
		$this->item_schema             = $this->controller->get( CartItemSchema::IDENTIFIER );
		$this->cross_sells_item_schema = $this->controller->get( ProductSchema::IDENTIFIER );
		$this->coupon_schema           = $this->controller->get( CartCouponSchema::IDENTIFIER );
		$this->fee_schema              = $this->controller->get( CartFeeSchema::IDENTIFIER );
		$this->shipping_rate_schema    = $this->controller->get( CartShippingRateSchema::IDENTIFIER );
		$this->shipping_address_schema = $this->controller->get( ShippingAddressSchema::IDENTIFIER );
		$this->billing_address_schema  = $this->controller->get( BillingAddressSchema::IDENTIFIER );
		$this->error_schema            = $this->controller->get( ErrorSchema::IDENTIFIER );
	}

	/**
	 * Cart schema properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		return [
			'coupons'                 => [
				'description' => __( 'List of applied cart coupons.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type'       => 'object',
					'properties' => $this->force_schema_readonly( $this->coupon_schema->get_properties() ),
				],
			],
			'shipping_rates'          => [
				'description' => __( 'List of available shipping rates for the cart.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type'       => 'object',
					'properties' => $this->force_schema_readonly( $this->shipping_rate_schema->get_properties() ),
				],
			],
			'shipping_address'        => [
				'description' => __( 'Current set shipping address for the customer.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'properties'  => $this->force_schema_readonly( $this->shipping_address_schema->get_properties() ),
			],
			'billing_address'         => [
				'description' => __( 'Current set billing address for the customer.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'properties'  => $this->force_schema_readonly( $this->billing_address_schema->get_properties() ),
			],
			'items'                   => [
				'description' => __( 'List of cart items.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type'       => 'object',
					'properties' => $this->force_schema_readonly( $this->item_schema->get_properties() ),
				],
			],
			'items_count'             => [
				'description' => __( 'Number of items in the cart.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'items_weight'            => [
				'description' => __( 'Total weight (in grams) of all products in the cart.', 'woo-gutenberg-products-block' ),
				'type'        => 'number',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'cross_sells'             => [
				'description' => __( 'List of cross-sells items related to cart items.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type'       => 'object',
					'properties' => $this->force_schema_readonly( $this->cross_sells_item_schema->get_properties() ),
				],
			],
			'needs_payment'           => [
				'description' => __( 'True if the cart needs payment. False for carts with only free products and no shipping costs.', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'needs_shipping'          => [
				'description' => __( 'True if the cart needs shipping. False for carts with only digital goods or stores with no shipping methods set-up.', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'has_calculated_shipping' => [
				'description' => __( 'True if the cart meets the criteria for showing shipping costs, and rates have been calculated and included in the totals.', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'fees'                    => [
				'description' => __( 'List of cart fees.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type'       => 'object',
					'properties' => $this->force_schema_readonly( $this->fee_schema->get_properties() ),
				],
			],
			'totals'                  => [
				'description' => __( 'Cart total amounts provided using the smallest unit of the currency.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'properties'  => array_merge(
					$this->get_store_currency_properties(),
					[
						'total_items'        => [
							'description' => __( 'Total price of items in the cart.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_items_tax'    => [
							'description' => __( 'Total tax on items in the cart.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_fees'         => [
							'description' => __( 'Total price of any applied fees.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_fees_tax'     => [
							'description' => __( 'Total tax on fees.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_discount'     => [
							'description' => __( 'Total discount from applied coupons.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_discount_tax' => [
							'description' => __( 'Total tax removed due to discount from applied coupons.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_shipping'     => [
							'description' => __( 'Total price of shipping. If shipping has not been calculated, a null response will be sent.', 'woo-gutenberg-products-block' ),
							'type'        => [ 'string', 'null' ],
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_shipping_tax' => [
							'description' => __( 'Total tax on shipping. If shipping has not been calculated, a null response will be sent.', 'woo-gutenberg-products-block' ),
							'type'        => [ 'string', 'null' ],
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_price'        => [
							'description' => __( 'Total price the customer will pay.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_tax'          => [
							'description' => __( 'Total tax applied to items and shipping.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'tax_lines'          => [
							'description' => __( 'Lines of taxes applied to items and shipping.', 'woo-gutenberg-products-block' ),
							'type'        => 'array',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
							'items'       => [
								'type'       => 'object',
								'properties' => [
									'name'  => [
										'description' => __( 'The name of the tax.', 'woo-gutenberg-products-block' ),
										'type'        => 'string',
										'context'     => [ 'view', 'edit' ],
										'readonly'    => true,
									],
									'price' => [
										'description' => __( 'The amount of tax charged.', 'woo-gutenberg-products-block' ),
										'type'        => 'string',
										'context'     => [ 'view', 'edit' ],
										'readonly'    => true,
									],
									'rate'  => [
										'description' => __( 'The rate at which tax is applied.', 'woo-gutenberg-products-block' ),
										'type'        => 'string',
										'context'     => [ 'view', 'edit' ],
										'readonly'    => true,
									],
								],
							],
						],
					]
				),
			],
			'errors'                  => [
				'description' => __( 'List of cart item errors, for example, items in the cart which are out of stock.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type'       => 'object',
					'properties' => $this->force_schema_readonly( $this->error_schema->get_properties() ),
				],
			],
			'payment_methods'         => [
				'description' => __( 'List of available payment method IDs that can be used to process the order.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'payment_requirements'    => [
				'description' => __( 'List of required payment gateway features to process the order.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			self::EXTENDING_KEY       => $this->get_extended_schema( self::IDENTIFIER ),
		];
	}

	/**
	 * Convert a woo cart into an object suitable for the response.
	 *
	 * @param \WC_Cart $cart Cart class instance.
	 * @return array
	 */
	public function get_item_response( $cart ) {
		$controller = new CartController();

		// Get cart errors first so if recalculations are performed, it's reflected in the response.
		$cart_errors = $this->get_cart_errors( $cart );

		// The core cart class will not include shipping in the cart totals if `show_shipping()` returns false. This can
		// happen if an address is required, or through the use of hooks. This tracks if shipping has actually been
		// calculated so we can avoid returning costs and rates prematurely.
		$has_calculated_shipping = $cart->show_shipping();

		// Get shipping packages to return in the response from the cart.
		$shipping_packages = $has_calculated_shipping ? $controller->get_shipping_packages() : [];

		// Get visible cross sells products.
		$cross_sells = array_filter( array_map( 'wc_get_product', $cart->get_cross_sells() ), 'wc_products_array_filter_visible' );

		return [
			'items'                   => $this->get_item_responses_from_schema( $this->item_schema, $cart->get_cart() ),
			'coupons'                 => $this->get_item_responses_from_schema( $this->coupon_schema, $cart->get_applied_coupons() ),
			'fees'                    => $this->get_item_responses_from_schema( $this->fee_schema, $cart->get_fees() ),
			'totals'                  => (object) $this->prepare_currency_response( $this->get_totals( $cart ) ),
			'shipping_address'        => (object) $this->shipping_address_schema->get_item_response( wc()->customer ),
			'billing_address'         => (object) $this->billing_address_schema->get_item_response( wc()->customer ),
			'needs_payment'           => $cart->needs_payment(),
			'needs_shipping'          => $cart->needs_shipping(),
			'payment_requirements'    => $this->extend->get_payment_requirements(),
			'has_calculated_shipping' => $has_calculated_shipping,
			'shipping_rates'          => $this->get_item_responses_from_schema( $this->shipping_rate_schema, $shipping_packages ),
			'items_count'             => $cart->get_cart_contents_count(),
			'items_weight'            => wc_get_weight( $cart->get_cart_contents_weight(), 'g' ),
			'cross_sells'             => $this->get_item_responses_from_schema( $this->cross_sells_item_schema, $cross_sells ),
			'errors'                  => $cart_errors,
			'payment_methods'         => array_values( wp_list_pluck( WC()->payment_gateways->get_available_payment_gateways(), 'id' ) ),
			self::EXTENDING_KEY       => $this->get_extended_data( self::IDENTIFIER ),
		];
	}

	/**
	 * Get total data.
	 *
	 * @param \WC_Cart $cart Cart class instance.
	 * @return array
	 */
	protected function get_totals( $cart ) {
		$has_calculated_shipping = $cart->show_shipping();
		$decimals                = wc_get_price_decimals();

		return [
			'total_items'        => $this->prepare_money_response( $cart->get_subtotal(), $decimals ),
			'total_items_tax'    => $this->prepare_money_response( $cart->get_subtotal_tax(), $decimals ),
			'total_fees'         => $this->prepare_money_response( $cart->get_fee_total(), $decimals ),
			'total_fees_tax'     => $this->prepare_money_response( $cart->get_fee_tax(), $decimals ),
			'total_discount'     => $this->prepare_money_response( $cart->get_discount_total(), $decimals ),
			'total_discount_tax' => $this->prepare_money_response( $cart->get_discount_tax(), $decimals ),
			'total_shipping'     => $has_calculated_shipping ? $this->prepare_money_response( $cart->get_shipping_total(), $decimals ) : null,
			'total_shipping_tax' => $has_calculated_shipping ? $this->prepare_money_response( $cart->get_shipping_tax(), $decimals ) : null,
			// Explicitly request context='edit'; default ('view') will render total as markup.
			'total_price'        => $this->prepare_money_response( $cart->get_total( 'edit' ), $decimals ),
			'total_tax'          => $this->prepare_money_response( $cart->get_total_tax(), $decimals ),
			'tax_lines'          => $this->get_tax_lines( $cart ),
		];
	}

	/**
	 * Get tax lines from the cart and format to match schema.
	 *
	 * @param \WC_Cart $cart Cart class instance.
	 * @return array
	 */
	protected function get_tax_lines( $cart ) {
		$tax_lines = [];

		if ( 'itemized' !== get_option( 'woocommerce_tax_total_display' ) ) {
			return $tax_lines;
		}

		$cart_tax_totals = $cart->get_tax_totals();
		$decimals        = wc_get_price_decimals();

		foreach ( $cart_tax_totals as $cart_tax_total ) {
			$tax_lines[] = array(
				'name'  => $cart_tax_total->label,
				'price' => $this->prepare_money_response( $cart_tax_total->amount, $decimals ),
				'rate'  => WC_Tax::get_rate_percent( $cart_tax_total->tax_rate_id ),
			);
		}

		return $tax_lines;
	}

	/**
	 * Get cart validation errors.
	 *
	 * @param \WC_Cart $cart Cart class instance.
	 * @return array
	 */
	protected function get_cart_errors( $cart ) {
		$controller  = new CartController();
		$errors      = $controller->get_cart_errors();
		$cart_errors = [];

		foreach ( (array) $errors->errors as $code => $messages ) {
			foreach ( (array) $messages as $message ) {
				$cart_errors[] = new \WP_Error(
					$code,
					$message,
					$errors->get_error_data( $code )
				);
			}
		}

		return array_values( array_map( [ $this->error_schema, 'get_item_response' ], $cart_errors ) );
	}
}
