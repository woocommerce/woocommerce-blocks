<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Routes;

use Automattic\WooCommerce\Blocks\StoreApi\Utilities\CartController;
use Automattic\WooCommerce\Blocks\StoreApi\Schemas\AbstractSchema;
use Automattic\WooCommerce\Blocks\StoreApi\Schemas\CartSchema;

/**
 * Abstract Cart Route
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
abstract class AbstractCartRoute extends AbstractRoute {
	/**
	 * Schema class for this route's response.
	 *
	 * @var AbstractSchema|CartSchema
	 */
	protected $schema;

	/**
	 * Schema class for the cart.
	 *
	 * @var CartSchema
	 */
	protected $cart_schema;

	/**
	 * Constructor accepts two types of schema; for for the item being returned, and one for the cart as a whole. These
	 * may be the same depending on the route.
	 *
	 * @param CartSchema     $cart_schema Schema class for the cart.
	 * @param AbstractSchema $item_schema Schema class for this route's items if it differs from the cart schema.
	 */
	public function __construct( CartSchema $cart_schema, AbstractSchema $item_schema = null ) {
		$this->schema      = is_null( $item_schema ) ? $cart_schema : $item_schema;
		$this->cart_schema = $cart_schema;
	}

	/**
	 * Get the route response based on the type of request.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_response( \WP_REST_Request $request ) {
		$this->maybe_load_cart();
		$this->calculate_totals();
		return parent::get_response( $request );
	}

	/**
	 * Ensures the cart totals are calculated before an API response is generated.
	 */
	protected function calculate_totals() {
		wc()->cart->get_cart();
		wc()->cart->calculate_fees();
		wc()->cart->calculate_shipping();
		wc()->cart->calculate_totals();
	}

	/**
	 * If there is a draft order, releases stock.
	 *
	 * @return void
	 */
	protected function maybe_release_stock() {
		$draft_order = wc()->session->get( 'store_api_draft_order', 0 );

		if ( ! $draft_order ) {
			return;
		}

		wc_release_stock_for_order( $draft_order );
	}

	/**
	 * Get route response when something went wrong.
	 *
	 * @param string $error_code String based error code.
	 * @param string $error_message User facing error message.
	 * @param int    $http_status_code HTTP status. Defaults to 500.
	 * @param array  $additional_data  Extra data (key value pairs) to expose in the error response.
	 * @return \WP_Error WP Error object.
	 */
	protected function get_route_error_response( $error_code, $error_message, $http_status_code = 500, $additional_data = [] ) {
		switch ( $http_status_code ) {
			case 409:
				// If there was a conflict, return the cart so the client can resolve it.
				$controller = new CartController();
				$cart       = $controller->get_cart_instance();

				return new \WP_Error(
					$error_code,
					$error_message,
					array_merge(
						$additional_data,
						[
							'status' => $http_status_code,
							'cart'   => $this->cart_schema->get_item_response( $cart ),
						]
					)
				);
		}
		return new \WP_Error( $error_code, $error_message, [ 'status' => $http_status_code ] );
	}
}
