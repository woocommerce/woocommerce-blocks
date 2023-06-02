<?php
namespace Automattic\WooCommerce\StoreApi\Routes\V1;

use Automattic\WooCommerce\StoreApi\SchemaController;
use Automattic\WooCommerce\StoreApi\Schemas\v1\AbstractSchema;
use Automattic\WooCommerce\StoreApi\Utilities\OrderController;
use Automattic\WooCommerce\StoreApi\Exceptions\RouteException;

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
	 * phpcs:ignore
	 */
	public function is_authorized( \WP_REST_Request $request ) {
		$order_id  = absint( $request['id'] );
		$order_key = wc_clean( wp_unslash( $request->get_param( 'key' ) ) );
		$user_id   = get_current_user_id();
		$order     = wc_get_order( $order_id );

		try {
			$this->order_controller->validate_order_key( $order_id, $order_key );

			// Logged in customer trying to pay for someone else's order.
			if ( ! current_user_can( 'pay_for_order', $order_id ) ) {
				throw new RouteException( 'woocommerce_rest_invalid_user', __( 'This order cannot be paid for. Please contact us if you need assistance.', 'woo-gutenberg-products-block' ), 403 );
			}
		} catch ( RouteException $error ) {
			return new \WP_Error(
				$error->getErrorCode(),
				$error->getMessage(),
				array( 'status' => $error->getCode() )
			);
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
