<?php
namespace Automattic\WooCommerce\StoreApi\Routes\V1;

use Automattic\WooCommerce\StoreApi\SchemaController;
use Automattic\WooCommerce\StoreApi\Schemas\v1\AbstractSchema;
use Automattic\WooCommerce\StoreApi\Utilities\OrderController;

/**
 * Order class.
 */
class Order extends AbstractRoute {
	/**
	 * The route identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'order';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const SCHEMA_TYPE = 'order';

	/**
	 * Order controller class instance.
	 *
	 * @var OrderController
	 */
	protected $order_controller;

	/**
	 * Constructor.
	 *
	 * @param SchemaController $schema_controller Schema Controller instance.
	 * @param AbstractSchema   $schema Schema class for this route.
	 */
	public function __construct( SchemaController $schema_controller, AbstractSchema $schema ) {
		parent::__construct( $schema_controller, $schema );

		$this->order_controller = new OrderController();
	}

	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/order/(?P<id>[\d]+)';
	}

	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			[
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_response' ],
				'permission_callback' => [ $this, 'is_authorized' ],
				'args'                => [
					'context' => $this->get_context_param( [ 'default' => 'view' ] ),
				],
			],
			'schema' => [ $this->schema, 'get_public_item_schema' ],
		];
	}

	/**
	 * Check if authorized to get the order.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return boolean|WP_Error
	 */
	public function is_authorized( \WP_REST_Request $request ) {
		$order_id  = absint( $request['id'] );
		$order_key = wc_clean( wp_unslash( $request->get_param( 'key' ) ) );
		$order     = $this->order_controller->get_order( $order_id );

		if ( ! $order || $order->get_id() !== $order_id || ! hash_equals( $order->get_order_key(), $order_key ) ) {
			return new \WP_Error( 'invalid_order', __( 'Sorry, this order is invalid and cannot be paid for.', 'woo-gutenberg-products-block' ), array( 'status' => 401 ) );
		}

		// Logged out customer does not have permission to pay for this order.
		if ( ! current_user_can( 'pay_for_order', $order_id ) && ! is_user_logged_in() ) {
			return new \WP_Error( 'invalid_user', __( 'Please log in to your account below to continue to the payment form.', 'woo-gutenberg-products-block' ), array( 'status' => 403 ) );
		}

		// Logged in customer trying to pay for someone else's order.
		if ( ! current_user_can( 'pay_for_order', $order_id ) ) {
			return new \WP_Error( 'invalid_user', __( 'This order cannot be paid for. Please contact us if you need assistance.', 'woo-gutenberg-products-block' ), array( 'status' => 403 ) );
		}

		// Does not need payment.
		if ( ! $order->needs_payment() ) {
			/* translators: %s: order status */
			return new \WP_Error( '@Todo', sprintf( __( 'This order&rsquo;s status is &ldquo;%s&rdquo;&mdash;it cannot be paid for. Please contact us if you need assistance.', 'woo-gutenberg-products-block' ), wc_get_order_status_name( $order->get_status() ) ), array( 'status' => 403 ) );
		}

		// Ensure order items are still stocked if paying for a failed order. Pending orders do not need this check because stock is held.
		if ( ! $order->has_status( wc_get_is_pending_statuses() ) ) {
			$quantities = array();

			foreach ( $order->get_items() as $item_key => $item ) {
				if ( $item && is_callable( array( $item, 'get_product' ) ) ) {
					$product = $item->get_product();

					if ( ! $product ) {
						continue;
					}

					$quantities[ $product->get_stock_managed_by_id() ] = isset( $quantities[ $product->get_stock_managed_by_id() ] ) ? $quantities[ $product->get_stock_managed_by_id() ] + $item->get_quantity() : $item->get_quantity();
				}
			}

			// Stock levels may already have been adjusted for this order (in which case we don't need to worry about checking for low stock).
			if ( ! $order->get_data_store()->get_stock_reduced( $order->get_id() ) ) {
				foreach ( $order->get_items() as $item_key => $item ) {
					if ( $item && is_callable( array( $item, 'get_product' ) ) ) {
						$product = $item->get_product();

						if ( ! $product ) {
							continue;
						}

						/**
						 * Filters whether or not the product is in stock for this pay for order.
						 *
						 * @param boolean True if in stock.
						 * @param \WC_Product $product Product.
						 * @param \WC_Order $order Order.
						 *
						 * @since 9.8.0-dev
						 */
						if ( ! apply_filters( 'woocommerce_pay_order_product_in_stock', $product->is_in_stock(), $product, $order ) ) {
							/* translators: %s: product name */
							return new \WP_Error( '@Todo', sprintf( __( 'Sorry, "%s" is no longer in stock so this order cannot be paid for. We apologize for any inconvenience caused.', 'woo-gutenberg-products-block' ), $product->get_name() ), array( 'status' => 403 ) );
						}

						// We only need to check products managing stock, with a limited stock qty.
						if ( ! $product->managing_stock() || $product->backorders_allowed() ) {
							continue;
						}

						// Check stock based on all items in the cart and consider any held stock within pending orders.
						$held_stock     = wc_get_held_stock_quantity( $product, $order->get_id() );
						$required_stock = $quantities[ $product->get_stock_managed_by_id() ];

						/**
						 * Filters whether or not the product has enough stock.
						 *
						 * @param boolean True if has enough stock.
						 * @param \WC_Product $product Product.
						 * @param \WC_Order $order Order.
						 *
						 * @since 9.8.0-dev
						 */
						if ( ! apply_filters( 'woocommerce_pay_order_product_has_enough_stock', ( $product->get_stock_quantity() >= ( $held_stock + $required_stock ) ), $product, $order ) ) {
							/* translators: 1: product name 2: quantity in stock */
							return new \WP_Error( '@Todo', sprintf( __( 'Sorry, we do not have enough "%1$s" in stock to fulfill your order (%2$s available). We apologize for any inconvenience caused.', 'woo-gutenberg-products-block' ), $product->get_name(), wc_format_stock_quantity_for_display( $product->get_stock_quantity() - $held_stock, $product ) ), array( 'status' => 403 ) );
						}
					}
				}
			}
		}

		return true;
	}

	/**
	 * Handle the request and return a valid response for this endpoint.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	protected function get_route_response( \WP_REST_Request $request ) {
		$order_id = absint( $request['id'] );
		return rest_ensure_response( $this->schema->get_item_response( $this->order_controller->get_order( $order_id ) ) );
	}
}
