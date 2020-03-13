<?php
/**
 * Abstract route.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Routes;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas\AbstractSchema;

/**
 * AbstractRoute class.
 */
abstract class AbstractRoute implements RouteInterface {
	/**
	 * Schema class instance.
	 *
	 * @var AbstractSchema
	 */
	protected $schema;

	/**
	 * Constructor.
	 *
	 * @param AbstractSchema $schema Schema class for this route.
	 */
	public function __construct( AbstractSchema $schema ) {
		$this->schema = $schema;
	}

	/**
	 * Get item schema properties.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		return $this->schema->get_item_schema();
	}

	/**
	 * Get the route response based on the type of request.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_response( \WP_REST_Request $request ) {
		$response = null;
		try {
			switch ( $request->get_method() ) {
				case 'POST':
					$response = $this->get_route_post_response( $request );
					break;
				case 'PUT':
				case 'PATCH':
					$response = $this->get_route_update_response( $request );
					break;
				case 'DELETE':
					$response = $this->get_route_delete_response( $request );
					break;
				default:
					$response = $this->get_route_response( $request );
					break;
			}
		} catch ( RouteException $error ) {
			$response = new \WP_Error( $error->getErrorCode(), $error->getMessage(), [ 'status' => $error->getCode() ] );
		} catch ( Exception $error ) {
			$response = new WP_Error( 'unknown_server_error', $error->getMessage(), [ 'status' => '500' ] );
		}
		return $response;
	}

	/**
	 * Get route response for GET requests.
	 *
	 * When implemented, should return a \WP_REST_Response.
	 *
	 * @throws RouteException On error.
	 * @param \WP_REST_Request $request Request object.
	 */
	protected function get_route_response( \WP_REST_Request $request ) {
		throw new RouteException( 'woocommerce_rest_invalid_endpoint', __( 'Method not implemented', 'woo-gutenberg-products-block' ), 404 );
	}

	/**
	 * Get route response for POST requests.
	 *
	 * When implemented, should return a \WP_REST_Response.
	 *
	 * @throws RouteException On error.
	 * @param \WP_REST_Request $request Request object.
	 */
	protected function get_route_post_response( \WP_REST_Request $request ) {
		throw new RouteException( 'woocommerce_rest_invalid_endpoint', __( 'Method not implemented', 'woo-gutenberg-products-block' ), 404 );
	}

	/**
	 * Get route response for PUT requests.
	 *
	 * When implemented, should return a \WP_REST_Response.
	 *
	 * @throws RouteException On error.
	 * @param \WP_REST_Request $request Request object.
	 */
	protected function get_route_update_response( \WP_REST_Request $request ) {
		throw new RouteException( 'woocommerce_rest_invalid_endpoint', __( 'Method not implemented', 'woo-gutenberg-products-block' ), 404 );
	}

	/**
	 * Get route response for DELETE requests.
	 *
	 * When implemented, should return a \WP_REST_Response.
	 *
	 * @throws RouteException On error.
	 * @param \WP_REST_Request $request Request object.
	 */
	protected function get_route_delete_response( \WP_REST_Request $request ) {
		throw new RouteException( 'woocommerce_rest_invalid_endpoint', __( 'Method not implemented', 'woo-gutenberg-products-block' ), 404 );
	}

	/**
	 * Prepare a single item for response.
	 *
	 * @param mixed            $item Item to format to schema.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response $response Response data.
	 */
	public function prepare_item_for_response( $item, \WP_REST_Request $request ) {
		$response = rest_ensure_response( $this->schema->get_item_response( $item ) );
		$response->add_links( $this->prepare_links( $item, $request ) );

		return $response;
	}

	/**
	 * Retrieves the context param.
	 *
	 * Ensures consistent descriptions between endpoints, and populates enum from schema.
	 *
	 * @param array $args Optional. Additional arguments for context parameter. Default empty array.
	 * @return array Context parameter details.
	 */
	protected function get_context_param( $args = array() ) {
		$param_details = array(
			'description'       => __( 'Scope under which the request is made; determines fields present in response.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_key',
			'validate_callback' => 'rest_validate_request_arg',
		);

		$schema = $this->get_item_schema();

		if ( empty( $schema['properties'] ) ) {
			return array_merge( $param_details, $args );
		}

		$contexts = array();

		foreach ( $schema['properties'] as $attributes ) {
			if ( ! empty( $attributes['context'] ) ) {
				$contexts = array_merge( $contexts, $attributes['context'] );
			}
		}

		if ( ! empty( $contexts ) ) {
			$param_details['enum'] = array_unique( $contexts );
			rsort( $param_details['enum'] );
		}

		return array_merge( $param_details, $args );
	}

	/**
	 * Prepares a response for insertion into a collection.
	 *
	 * @param \WP_REST_Response $response Response object.
	 * @return array|mixed Response data, ready for insertion into collection data.
	 */
	protected function prepare_response_for_collection( \WP_REST_Response $response ) {
		$data   = (array) $response->get_data();
		$server = rest_get_server();
		$links  = $server::get_compact_response_links( $response );

		if ( ! empty( $links ) ) {
			$data['_links'] = $links;
		}

		return $data;
	}

	/**
	 * Prepare links for the request.
	 *
	 * @param mixed            $item Item to prepare.
	 * @param \WP_REST_Request $request Request object.
	 * @return array
	 */
	protected function prepare_links( $item, $request ) {
		return [];
	}

	/**
	 * Retrieves the query params for the collections.
	 *
	 * @return array Query parameters for the collection.
	 */
	public function get_collection_params() {
		return array(
			'context' => $this->get_context_param(),
		);
	}
}
