<?php
/**
 * Customer controller.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Controllers;

defined( 'ABSPATH' ) || exit;

use \WP_Error as RestError;
use \WP_REST_Server as RestServer;
use \WP_REST_Controller as RestController;
use \WC_Customer as CustomerObject;
use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas\CustomerSchema;

/**
 * Customer API.
 */
class Customer extends RestController {
	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'wc/store';

	/**
	 * Route base.
	 *
	 * @var string
	 */
	protected $rest_base = 'customer';

	/**
	 * Schema class instance.
	 *
	 * @var object
	 */
	protected $schema;

	/**
	 * Setup API class.
	 */
	public function __construct() {
		$this->schema = new CustomerSchema();
	}

	/**
	 * Register routes.
	 *
	 * @todo /session
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'  => RestServer::READABLE,
					'callback' => [ $this, 'get_item' ],
					'args'     => [
						'context' => $this->get_context_param( [ 'default' => 'view' ] ),
					],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
	}

	/**
	 * Get the current customer.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_item( $request ) {
		$customer = wc()->cart->get_customer();

		if ( ! $customer || ! $customer instanceof CustomerObject ) {
			return new RestError(
				'woocommerce_rest_customer_error',
				__( 'Unable to retrieve customer.', 'woo-gutenberg-products-block' ),
				[ 'status' => 500 ]
			);
		}

		return $this->prepare_item_for_response( $customer, $request );
	}

	/**
	 * Customer item schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		return $this->schema->get_item_schema();
	}

	/**
	 * Prepares a single item output for response.
	 *
	 * @param CustomerObject   $customer    Customer Object.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response Response object.
	 */
	public function prepare_item_for_response( $customer, $request ) {
		return rest_ensure_response( $this->schema->get_item_response( $customer ) );
	}
}
