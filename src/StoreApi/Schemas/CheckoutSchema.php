<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Schemas;

use Automattic\WooCommerce\Blocks\Payments\PaymentResult;
use Automattic\WooCommerce\Blocks\Domain\Services\ExtendRestApi;


/**
 * CheckoutSchema class.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class CheckoutSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'checkout';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'checkout';

	/**
	 * Billing address schema instance.
	 *
	 * @var BillingAddressSchema
	 */
	protected $billing_address_schema;

	/**
	 * Shipping address schema instance.
	 *
	 * @var ShippingAddressSchema
	 */
	protected $shipping_address_schema;

	/**
	 * Constructor.
	 *
	 * @param ExtendRestApi         $extend Rest Extending instance.
	 * @param BillingAddressSchema  $billing_address_schema Billing address schema instance.
	 * @param ShippingAddressSchema $shipping_address_schema Shipping address schema instance.
	 */
	public function __construct( ExtendRestApi $extend, BillingAddressSchema $billing_address_schema, ShippingAddressSchema $shipping_address_schema ) {
		$this->billing_address_schema  = $billing_address_schema;
		$this->shipping_address_schema = $shipping_address_schema;
		parent::__construct( $extend );
	}

	/**
	 * Checkout schema properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		return [
			'order_id'          => [
				'description' => __( 'The order ID to process during checkout.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'status'            => [
				'description' => __( 'Order status. Payment providers will update this value after payment.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'order_key'         => [
				'description' => __( 'Order key used to check validity or protect access to certain order data.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'customer_note'     => [
				'description' => __( 'Note added to the order by the customer during checkout.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'customer_id'       => [
				'description' => __( 'Customer ID if registered. Will return 0 for guests.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'billing_address'   => [
				'description' => __( 'Billing address.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'properties'  => $this->billing_address_schema->get_properties(),
				'arg_options' => [
					'sanitize_callback' => [ $this->billing_address_schema, 'sanitize_callback' ],
					'validate_callback' => [ $this->billing_address_schema, 'validate_callback' ],
				],
				'required'    => true,
			],
			'shipping_address'  => [
				'description' => __( 'Shipping address.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'properties'  => $this->shipping_address_schema->get_properties(),
				'arg_options' => [
					'sanitize_callback' => [ $this->shipping_address_schema, 'sanitize_callback' ],
					'validate_callback' => [ $this->shipping_address_schema, 'validate_callback' ],
				],
				'required'    => true,
			],
			'payment_method'    => [
				'description' => __( 'The ID of the payment method being used to process the payment.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'enum'        => wc()->payment_gateways->get_payment_gateway_ids(),
			],
			'create_account'    => [
				'description' => __( 'Whether to create a new user account as part of order processing.', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => [ 'view', 'edit' ],
			],
			'payment_result'    => [
				'description' => __( 'Result of payment processing, or false if not yet processed.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'properties'  => [
					'payment_status'  => [
						'description' => __( 'Status of the payment returned by the gateway. One of success, pending, failure, error.', 'woo-gutenberg-products-block' ),
						'readonly'    => true,
						'type'        => 'string',
					],
					'payment_details' => [
						'description' => __( 'An array of data being returned from the payment gateway.', 'woo-gutenberg-products-block' ),
						'readonly'    => true,
						'type'        => 'array',
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'key'   => [
									'type' => 'string',
								],
								'value' => [
									'type' => 'string',
								],
							],
						],
					],
					'redirect_url'    => [
						'description' => __( 'A URL to redirect the customer after checkout. This could be, for example, a link to the payment processors website.', 'woo-gutenberg-products-block' ),
						'readonly'    => true,
						'type'        => 'string',
					],
				],
			],
			self::EXTENDING_KEY => $this->get_extended_schema( self::IDENTIFIER ),
		];
	}

	/**
	 * Return the response for checkout.
	 *
	 * @param object $item Results from checkout action.
	 * @return array
	 */
	public function get_item_response( $item ) {
		return $this->get_checkout_response( $item->order, $item->payment_result );
	}

	/**
	 * Get the checkout response based on the current order and any payments.
	 *
	 * @param \WC_Order     $order Order object.
	 * @param PaymentResult $payment_result Payment result object.
	 * @return array
	 */
	protected function get_checkout_response( \WC_Order $order, PaymentResult $payment_result = null ) {
		return [
			'order_id'          => $order->get_id(),
			'status'            => $order->get_status(),
			'order_key'         => $order->get_order_key(),
			'customer_note'     => $order->get_customer_note(),
			'customer_id'       => $order->get_customer_id(),
			'billing_address'   => $this->billing_address_schema->get_item_response( $order ),
			'shipping_address'  => $this->shipping_address_schema->get_item_response( $order ),
			'payment_method'    => $order->get_payment_method(),
			'payment_result'    => [
				'payment_status'  => $payment_result->status,
				'payment_details' => $this->prepare_payment_details_for_response( $payment_result->payment_details ),
				'redirect_url'    => $payment_result->redirect_url,
			],
			self::EXTENDING_KEY => $this->get_extended_data( self::IDENTIFIER ),
		];
	}

	/**
	 * This prepares the payment details for the response so it's following the
	 * schema where it's an array of objects.
	 *
	 * @param array $payment_details An array of payment details from the processed payment.
	 *
	 * @return array An array of objects where each object has the key and value
	 *               as distinct properties.
	 */
	protected function prepare_payment_details_for_response( array $payment_details ) {
		return array_map(
			function( $key, $value ) {
				return (object) [
					'key'   => $key,
					'value' => $value,
				];
			},
			array_keys( $payment_details ),
			$payment_details
		);
	}
}
