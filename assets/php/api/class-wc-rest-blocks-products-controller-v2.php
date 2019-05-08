<?php
/**
 * REST API Products controller customized for Products Block.
 *
 * Handles requests to the /products endpoint.
 *
 * @internal These overrides need rolling into core when releasing a new version.
 *
 * @package WooCommerce\Blocks\Products\Rest\Controller
 */

defined( 'ABSPATH' ) || exit;

/**
 * REST API Products controller class.
 *
 * @package WooCommerce/API
 */
class WC_REST_Blocks_Products_Controller_V2 extends WC_REST_Blocks_Products_Controller {

	/**
	 * Register the routes for products.
	 *
	 * Only difference here is the override property.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'get_items_permissions_check' ),
					'args'                => $this->get_collection_params(),
				),
				'schema' => array( $this, 'get_public_item_schema' ),
			),
			true
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)',
			array(
				'args'   => array(
					'id' => array(
						'description' => __( 'Unique identifier for the resource.', 'woo-gutenberg-products-block' ),
						'type'        => 'integer',
					),
				),
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_item' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
					'args'                => array(
						'context' => $this->get_context_param(
							array(
								'default' => 'view',
							)
						),
					),
				),
				'schema' => array( $this, 'get_public_item_schema' ),
			),
			true
		);
	}

	/**
	 * Update the collection params.
	 *
	 * Adds new options for 'orderby', and new parameters 'category_operator', 'attribute_operator'.
	 *
	 * @return array
	 */
	public function get_collection_params() {
		$params                 = parent::get_collection_params();
		$params['tag_operator'] = array(
			'description'       => __( 'Operator to compare product tags.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'enum'              => array( 'in', 'not_in', 'and' ),
			'default'           => 'in',
			'sanitize_callback' => 'sanitize_key',
			'validate_callback' => 'rest_validate_request_arg',
		);
		return $params;
	}

	/**
	 * Make extra product orderby features supported by WooCommerce available to the WC API.
	 * This includes 'price', 'popularity', and 'rating'.
	 *
	 * @param WP_REST_Request $request Request data.
	 * @return array
	 */
	protected function prepare_objects_query( $request ) {
		$args             = parent::prepare_objects_query( $request );
		$operator_mapping = array(
			'in'     => 'IN',
			'not_in' => 'NOT IN',
			'and'    => 'AND',
		);

		// New handling for tags.
		$tag_operator = $operator_mapping[ $request->get_param( 'tag_operator' ) ];

		if ( $tag_operator && isset( $args['tax_query'] ) ) {
			foreach ( $args['tax_query'] as $i => $tax_query ) {
				if ( 'product_tag' === $tax_query['taxonomy'] ) {
					$args['tax_query'][ $i ]['operator'] = $tag_operator;
				}
			}
		}

		return $args;
	}
}
