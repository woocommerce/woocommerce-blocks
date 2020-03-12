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
	protected function get_item_schema() {
		return $this->schema->get_item_schema();
	}

	/**
	 * Prepare a single item for response.
	 *
	 * @param mixed            $item Item to format to schema.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response $response Response data.
	 */
	protected function prepare_item_for_response( $item, \WP_REST_Request $request ) {
		$response = rest_ensure_response( $this->schema->get_item_response( $item ) );
		$response->add_links( $this->prepare_links( $item, $request ) );

		return $response;
	}

	/**
	 * Retrieves the context param.
	 *
	 * Ensures consistent descriptions between endpoints, and populates enum from schema.
	 *
	 * @since 4.7.0
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
			'context'  => $this->get_context_param(),
			'page'     => array(
				'description'       => __( 'Current page of the collection.', 'woo-gutenberg-products-block' ),
				'type'              => 'integer',
				'default'           => 1,
				'sanitize_callback' => 'absint',
				'validate_callback' => 'rest_validate_request_arg',
				'minimum'           => 1,
			),
			'per_page' => array(
				'description'       => __( 'Maximum number of items to be returned in result set.', 'woo-gutenberg-products-block' ),
				'type'              => 'integer',
				'default'           => 10,
				'minimum'           => 1,
				'maximum'           => 100,
				'sanitize_callback' => 'absint',
				'validate_callback' => 'rest_validate_request_arg',
			),
			'search'   => array(
				'description'       => __( 'Limit results to those matching a string.', 'woo-gutenberg-products-block' ),
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
				'validate_callback' => 'rest_validate_request_arg',
			),
		);
	}
}
