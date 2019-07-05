<?php
/**
 * REST API Products controller customized for Products Block.
 *
 * Handles requests to the /products endpoint. These endpoints allow read-only access to editors.
 *
 * @internal This API is used internally by the block post editor--it is still in flux. It should not be used outside of wc-blocks.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\Controllers;

defined( 'ABSPATH' ) || exit;

use \WC_REST_Products_Controller;

/**
 * REST API Products controller class.
 */
class Products extends WC_REST_Products_Controller {

	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'wc/blocks';

	/**
	 * Route base.
	 *
	 * @var string
	 */
	protected $rest_base = 'products';

	/**
	 * Register the routes for products.
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'get_items_permissions_check' ),
					'args'                => $this->get_collection_params(),
				),
				'schema' => array( $this, 'get_public_item_schema' ),
			)
		);

		\register_rest_route(
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
					'methods'             => 'GET',
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
			)
		);
	}

	/**
	 * Check if a given request has access to read items.
	 *
	 * @param  \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|boolean
	 */
	public function get_items_permissions_check( $request ) {
		if ( ! \current_user_can( 'edit_posts' ) ) {
			return new \WP_Error( 'woocommerce_rest_cannot_view', __( 'Sorry, you cannot list resources.', 'woo-gutenberg-products-block' ), array( 'status' => \rest_authorization_required_code() ) );
		}
		return true;
	}

	/**
	 * Check if a given request has access to read an item.
	 *
	 * @param  \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|boolean
	 */
	public function get_item_permissions_check( $request ) {
		if ( ! \current_user_can( 'edit_posts' ) ) {
			return new \WP_Error( 'woocommerce_rest_cannot_view', __( 'Sorry, you cannot view this resource.', 'woo-gutenberg-products-block' ), array( 'status' => \rest_authorization_required_code() ) );
		}
		return true;
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

		$category_operator  = $operator_mapping[ $request->get_param( 'category_operator' ) ];
		$tag_operator       = $operator_mapping[ $request->get_param( 'tag_operator' ) ];
		$attribute_operator = $operator_mapping[ $request->get_param( 'attribute_operator' ) ];
		$catalog_visibility = $request->get_param( 'catalog_visibility' );

		if ( $category_operator && isset( $args['tax_query'] ) ) {
			foreach ( $args['tax_query'] as $i => $tax_query ) {
				if ( 'product_cat' === $tax_query['taxonomy'] ) {
					$args['tax_query'][ $i ]['operator']         = $category_operator;
					$args['tax_query'][ $i ]['include_children'] = 'AND' === $category_operator ? false : true;
				}
			}
		}

		if ( $tag_operator && isset( $args['tax_query'] ) ) {
			foreach ( $args['tax_query'] as $i => $tax_query ) {
				if ( 'product_tag' === $tax_query['taxonomy'] ) {
					$args['tax_query'][ $i ]['operator'] = $tag_operator;
				}
			}
		}

		if ( $attribute_operator && isset( $args['tax_query'] ) ) {
			foreach ( $args['tax_query'] as $i => $tax_query ) {
				if ( in_array( $tax_query['taxonomy'], wc_get_attribute_taxonomy_names(), true ) ) {
					$args['tax_query'][ $i ]['operator'] = $attribute_operator;
				}
			}
		}

		if ( in_array( $catalog_visibility, array_keys( wc_get_product_visibility_options() ), true ) ) {
			$exclude_from_catalog = 'search' === $catalog_visibility ? '' : 'exclude-from-catalog';
			$exclude_from_search  = 'catalog' === $catalog_visibility ? '' : 'exclude-from-search';

			$args['tax_query'][] = array(
				'taxonomy' => 'product_visibility',
				'field'    => 'name',
				'terms'    => array( $exclude_from_catalog, $exclude_from_search ),
				'operator' => 'hidden' === $catalog_visibility ? 'AND' : 'NOT IN',
			);
		}

		return $args;
	}

	/**
	 * Get product data.
	 *
	 * @param WC_Product $product Product instance.
	 * @param string     $context Request context.
	 *                            Options: 'view' and 'edit'.
	 * @return array
	 */
	protected function get_product_data( $product, $context = 'view' ) {
		$raw_data = parent::get_product_data( $product, $context );
		$data     = array();

		$data['id']                = $raw_data['id'];
		$data['name']              = $raw_data['name'];
		$data['permalink']         = $raw_data['permalink'];
		$data['sku']               = $raw_data['sku'];
		$data['description']       = $raw_data['description'];
		$data['short_description'] = $raw_data['short_description'];
		$data['price']             = $raw_data['price'];
		$data['price_html']        = $raw_data['price_html'];
		$data['images']            = $raw_data['images'];
		$data['average_rating']    = $raw_data['average_rating'];
		$data['rating_count']      = $raw_data['rating_count'];

		return $data;
	}

	/**
	 * Get the images for a product or product variation.
	 *
	 * @param \WC_Product|\WC_Product_Variation $product Product instance.
	 * @return array
	 */
	protected function get_images( $product ) {
		$images         = array();
		$attachment_ids = array();

		// Add featured image.
		if ( has_post_thumbnail( $product->get_id() ) ) {
			$attachment_ids[] = $product->get_image_id();
		}

		// Add gallery images.
		$attachment_ids = array_merge( $attachment_ids, $product->get_gallery_image_ids() );

		// Build image data.
		foreach ( $attachment_ids as $attachment_id ) {
			$attachment_post = get_post( $attachment_id );
			if ( is_null( $attachment_post ) ) {
				continue;
			}

			$attachment = wp_get_attachment_image_src( $attachment_id, 'full' );
			if ( ! is_array( $attachment ) ) {
				continue;
			}

			$images[] = array(
				'id'   => (int) $attachment_id,
				'src'  => current( $attachment ),
				'name' => get_the_title( $attachment_id ),
				'alt'  => get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ),
			);
		}

		return $images;
	}

	/**
	 * Update the collection params.
	 *
	 * Adds new options for 'orderby', and new parameters 'category_operator', 'attribute_operator'.
	 *
	 * @return array
	 */
	public function get_collection_params() {
		$params                       = parent::get_collection_params();
		$params['orderby']['enum']    = array_merge( $params['orderby']['enum'], array( 'menu_order', 'comment_count' ) );
		$params['category_operator']  = array(
			'description'       => __( 'Operator to compare product category terms.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'enum'              => array( 'in', 'not_in', 'and' ),
			'default'           => 'in',
			'sanitize_callback' => 'sanitize_key',
			'validate_callback' => 'rest_validate_request_arg',
		);
		$params['tag_operator']       = array(
			'description'       => __( 'Operator to compare product tags.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'enum'              => array( 'in', 'not_in', 'and' ),
			'default'           => 'in',
			'sanitize_callback' => 'sanitize_key',
			'validate_callback' => 'rest_validate_request_arg',
		);
		$params['attribute_operator'] = array(
			'description'       => __( 'Operator to compare product attribute terms.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'enum'              => array( 'in', 'not_in', 'and' ),
			'default'           => 'in',
			'sanitize_callback' => 'sanitize_key',
			'validate_callback' => 'rest_validate_request_arg',
		);
		$params['catalog_visibility'] = array(
			'description'       => __( 'Determines if hidden or visible catalog products are shown.', 'woo-gutenberg-products-block' ),
			'type'              => 'string',
			'enum'              => array( 'visible', 'catalog', 'search', 'hidden' ),
			'sanitize_callback' => 'sanitize_key',
			'validate_callback' => 'rest_validate_request_arg',
		);

		return $params;
	}

	/**
	 * Get the Product's schema, conforming to JSON Schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		$schema = array(
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => 'product_block_product',
			'type'       => 'object',
			'properties' => array(
				'id'                => array(
					'description' => __( 'Unique identifier for the resource.', 'woo-gutenberg-products-block' ),
					'type'        => 'integer',
					'context'     => array( 'view', 'edit', 'embed' ),
					'readonly'    => true,
				),
				'name'              => array(
					'description' => __( 'Product name.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit', 'embed' ),
				),
				'permalink'         => array(
					'description' => __( 'Product URL.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'format'      => 'uri',
					'context'     => array( 'view', 'edit', 'embed' ),
					'readonly'    => true,
				),
				'description'       => array(
					'description' => __( 'Product description.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit', 'embed' ),
				),
				'short_description' => array(
					'description' => __( 'Product short description.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit', 'embed' ),
				),
				'sku'               => array(
					'description' => __( 'Unique identifier.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
				),
				'price'             => array(
					'description' => __( 'Current product price.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
					'readonly'    => true,
				),
				'price_html'        => array(
					'description' => __( 'Price formatted in HTML.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
					'readonly'    => true,
				),
				'average_rating'    => array(
					'description' => __( 'Reviews average rating.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
					'readonly'    => true,
				),
				'rating_count'      => array(
					'description' => __( 'Amount of reviews that the product has.', 'woo-gutenberg-products-block' ),
					'type'        => 'integer',
					'context'     => array( 'view', 'edit' ),
					'readonly'    => true,
				),
				'images'            => array(
					'description' => __( 'List of images.', 'woo-gutenberg-products-block' ),
					'type'        => 'object',
					'context'     => array( 'view', 'edit', 'embed' ),
					'items'       => array(
						'type'       => 'object',
						'properties' => array(
							'id'   => array(
								'description' => __( 'Image ID.', 'woo-gutenberg-products-block' ),
								'type'        => 'integer',
								'context'     => array( 'view', 'edit' ),
							),
							'src'  => array(
								'description' => __( 'Image URL.', 'woo-gutenberg-products-block' ),
								'type'        => 'string',
								'format'      => 'uri',
								'context'     => array( 'view', 'edit' ),
							),
							'name' => array(
								'description' => __( 'Image name.', 'woo-gutenberg-products-block' ),
								'type'        => 'string',
								'context'     => array( 'view', 'edit' ),
							),
							'alt'  => array(
								'description' => __( 'Image alternative text.', 'woo-gutenberg-products-block' ),
								'type'        => 'string',
								'context'     => array( 'view', 'edit' ),
							),
						),
					),
				),
			),
		);
		return $this->add_additional_fields_schema( $schema );
	}
}
