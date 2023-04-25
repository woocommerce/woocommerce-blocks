<?php
namespace Automattic\WooCommerce\StoreApi\Schemas\V1;

use Automattic\WooCommerce\StoreApi\SchemaController;
use Automattic\WooCommerce\StoreApi\Schemas\ExtendSchema;

/**
 * OrderSchema class.
 */
class OrderSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'order';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'order';

	/**
	 * Item schema instance.
	 *
	 * @var OrderItemSchema
	 */
	public $item_schema;

	/**
	 * Constructor.
	 *
	 * @param ExtendSchema     $extend Rest Extending instance.
	 * @param SchemaController $controller Schema Controller instance.
	 */
	public function __construct( ExtendSchema $extend, SchemaController $controller ) {
		parent::__construct( $extend, $controller );
		$this->item_schema = $this->controller->get( OrderItemSchema::IDENTIFIER );
	}

	/**
	 * Order schema properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		return [
			'id'     => [
				'description' => __( 'The order ID to process during checkout.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'items'  => [
				'description' => __( 'Line items data.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'items'       => [
					'type'       => 'object',
					'properties' => $this->force_schema_readonly( $this->item_schema->get_properties() ),
				],
			],
			'totals' => [
				'description' => __( 'Order totals.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'properties'  => array_merge(
					$this->get_store_currency_properties(),
					[
						'subtotal'       => [
							'description' => __( 'Subtotal of the order.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_discount' => [
							'description' => __( 'Total discount from applied coupons.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_shipping' => [
							'description' => __( 'Total price of shipping.', 'woo-gutenberg-products-block' ),
							'type'        => [ 'string', 'null' ],
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_fees'     => [
							'description' => __( 'Total price of any applied fees.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_tax'      => [
							'description' => __( 'Total tax applied to the order.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_refund'   => [
							'description' => __( 'Total refund applied to the order.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'total_price'    => [
							'description' => __( 'Total price the customer will pay.', 'woo-gutenberg-products-block' ),
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
	 * Get an order for response.
	 *
	 * @param \WC_Order $order Order instance.
	 * @return array
	 */
	public function get_item_response( $order ) {
		return [
			'id'     => $order->get_id(),
			'items'  => $this->get_item_responses_from_schema( $this->item_schema, $order->get_items() ),
			'totals' => $this->get_totals( $order ),
		];
	}

	/**
	 * Get total data.
	 *
	 * @param \WC_Order $order Order instance.
	 * @return array
	 */
	public function get_totals( $order ) {
		return [
			'subtotal'       => $order->get_subtotal(),
			'total_discount' => $order->get_total_discount(),
			'total_shipping' => $order->get_total_shipping(),
			'total_fees'     => $order->get_total_fees(),
			'total_tax'      => $order->get_total_tax(),
			'total_refund'   => $order->get_total_refunded(),
			'total_price'    => $order->get_total(),
		];
	}
}
