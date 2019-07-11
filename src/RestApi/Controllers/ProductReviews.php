<?php
/**
 * REST API Reviews controller customized for Blocks.
 *
 * Handles requests to the /products/reviews endpoint.
 *
 * @package WooCommerce/Blocks
 * @internal This API is used internally by the block post editor--it is still in flux. It should not be used outside of wc-blocks.
 * @internal This endpoint is open to anyone and is used on the frontend. Personal data such as reviewer email address is purposely left out. Only approved reviews are returned.
 */

namespace Automattic\WooCommerce\Blocks\RestApi\Controllers;

defined( 'ABSPATH' ) || exit;

use \WC_REST_Product_Reviews_Controller;

/**
 * REST API Product Reviews controller class.
 */
class ProductReviews extends WC_REST_Product_Reviews_Controller {

	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'wc/blocks';

	/**
	 * Register the routes for product reviews.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'get_items_permissions_check' ),
					'args'                => $this->get_collection_params(),
				),
				'schema' => array( $this, 'get_public_item_schema' ),
			)
		);
	}

	/**
	 * Check if a given request has access to read the attributes.
	 *
	 * @param  \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|boolean
	 */
	public function get_items_permissions_check( $request ) {
		if ( 'edit' === $request['context'] ) {
			return new WP_Error( 'rest_forbidden_context', __( 'Sorry, you are not allowed to edit resources.', 'woo-gutenberg-products-block' ), array( 'status' => rest_authorization_required_code() ) );
		}
		return true;
	}

	/**
	 * Prepare a single product review output for response.
	 *
	 * @param \WP_Comment      $review Product review object.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response $response Response data.
	 */
	public function prepare_item_for_response( $review, $request ) {
		$context = ! empty( $request['context'] ) ? $request['context'] : 'view';
		$data    = array(
			'id'                   => (int) $review->comment_ID,
			'date_created'         => wc_rest_prepare_date_response( $review->comment_date ),
			'date_created_gmt'     => wc_rest_prepare_date_response( $review->comment_date_gmt ),
			'product_id'           => (int) $review->comment_post_ID,
			'reviewer'             => $review->comment_author,
			'review'               => $review->comment_content,
			'rating'               => (int) get_comment_meta( $review->comment_ID, 'rating', true ),
			'verified'             => wc_review_is_from_verified_owner( $review->comment_ID ),
			'reviewer_avatar_urls' => rest_get_avatar_urls( $review->comment_author_email ),
		);

		if ( 'view' === $context ) {
			$data['review'] = wpautop( $data['review'] );
		}

		$data = $this->add_additional_fields_to_object( $data, $request );
		$data = $this->filter_response_by_context( $data, $context );

		return rest_ensure_response( $data );
	}

	/**
	 * Get the Product Review's schema, conforming to JSON Schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		$schema = array(
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => 'product_block_review',
			'type'       => 'object',
			'properties' => array(
				'id'               => array(
					'description' => __( 'Unique identifier for the resource.', 'woo-gutenberg-products-block' ),
					'type'        => 'integer',
					'context'     => array( 'view', 'edit' ),
					'readonly'    => true,
				),
				'date_created'     => array(
					'description' => __( "The date the review was created, in the site's timezone.", 'woo-gutenberg-products-block' ),
					'type'        => 'date-time',
					'context'     => array( 'view', 'edit' ),
					'readonly'    => true,
				),
				'date_created_gmt' => array(
					'description' => __( 'The date the review was created, as GMT.', 'woo-gutenberg-products-block' ),
					'type'        => 'date-time',
					'context'     => array( 'view', 'edit' ),
					'readonly'    => true,
				),
				'product_id'       => array(
					'description' => __( 'Unique identifier for the product that the review belongs to.', 'woo-gutenberg-products-block' ),
					'type'        => 'integer',
					'context'     => array( 'view', 'edit' ),
					'readonly'    => true,
				),
				'reviewer'         => array(
					'description' => __( 'Reviewer name.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
					'readonly'    => true,
				),
				'review'           => array(
					'description' => __( 'The content of the review.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
					'arg_options' => array(
						'sanitize_callback' => 'wp_filter_post_kses',
					),
					'readonly'    => true,
				),
				'rating'           => array(
					'description' => __( 'Review rating (0 to 5).', 'woo-gutenberg-products-block' ),
					'type'        => 'integer',
					'context'     => array( 'view', 'edit' ),
					'readonly'    => true,
				),
				'verified'         => array(
					'description' => __( 'Shows if the reviewer bought the product or not.', 'woo-gutenberg-products-block' ),
					'type'        => 'boolean',
					'context'     => array( 'view', 'edit' ),
					'readonly'    => true,
				),
			),
		);

		if ( get_option( 'show_avatars' ) ) {
			$avatar_properties = array();
			$avatar_sizes      = rest_get_avatar_sizes();

			foreach ( $avatar_sizes as $size ) {
				$avatar_properties[ $size ] = array(
					/* translators: %d: avatar image size in pixels */
					'description' => sprintf( __( 'Avatar URL with image size of %d pixels.', 'woo-gutenberg-products-block' ), $size ),
					'type'        => 'string',
					'format'      => 'uri',
					'context'     => array( 'embed', 'view', 'edit' ),
				);
			}
			$schema['properties']['reviewer_avatar_urls'] = array(
				'description' => __( 'Avatar URLs for the object reviewer.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
				'properties'  => $avatar_properties,
			);
		}

		return $schema;
	}
}
