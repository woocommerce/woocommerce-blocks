<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Schemas;

use Automattic\WooCommerce\Blocks\Domain\Services\ExtendRestApi;


/**
 * ProductReviewSchema class.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class ProductReviewSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'product_review';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'product-review';

	/**
	 * Image attachment schema instance.
	 *
	 * @var ImageAttachmentSchema
	 */
	protected $image_attachment_schema;

	/**
	 * Constructor.
	 *
	 * @param ExtendRestApi         $extend Rest Extending instance.
	 * @param ImageAttachmentSchema $image_attachment_schema Image attachment schema instance.
	 */
	public function __construct( ExtendRestApi $extend, ImageAttachmentSchema $image_attachment_schema ) {
		$this->image_attachment_schema = $image_attachment_schema;
		parent::__construct( $extend );
	}

	/**
	 * Product review schema properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		$properties = [
			'id'                     => [
				'description' => __( 'Unique identifier for the resource.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'date_created'           => [
				'description' => __( "The date the review was created, in the site's timezone.", 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'format'      => 'date-time',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'formatted_date_created' => [
				'description' => __( "The date the review was created, in the site's timezone in human-readable format.", 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'date_created_gmt'       => [
				'description' => __( 'The date the review was created, as GMT.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'format'      => 'date-time',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'product_id'             => [
				'description' => __( 'Unique identifier for the product that the review belongs to.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'product_name'           => [
				'description' => __( 'Name of the product that the review belongs to.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'product_permalink'      => [
				'description' => __( 'Permalink of the product that the review belongs to.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'product_image'          => [
				'description' => __( 'Image of the product that the review belongs to.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'properties'  => $this->image_attachment_schema->get_properties(),
			],
			'reviewer'               => [
				'description' => __( 'Reviewer name.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'review'                 => [
				'description' => __( 'The content of the review.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'arg_options' => [
					'sanitize_callback' => 'wp_filter_post_kses',
				],
				'readonly'    => true,
			],
			'rating'                 => [
				'description' => __( 'Review rating (0 to 5).', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'verified'               => [
				'description' => __( 'Shows if the reviewer bought the product or not.', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
		];

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
			$properties['reviewer_avatar_urls'] = array(
				'description' => __( 'Avatar URLs for the object reviewer.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
				'properties'  => $avatar_properties,
			);
		}

		return $properties;
	}

	/**
	 * Convert a WooCommerce product into an object suitable for the response.
	 *
	 * @param \WP_Comment $review Product review object.
	 * @return array
	 */
	public function get_item_response( \WP_Comment $review ) {
		$context = ! empty( $request['context'] ) ? $request['context'] : 'view';
		$rating  = get_comment_meta( $review->comment_ID, 'rating', true ) === '' ? null : (int) get_comment_meta( $review->comment_ID, 'rating', true );
		$data    = [
			'id'                     => (int) $review->comment_ID,
			'date_created'           => wc_rest_prepare_date_response( $review->comment_date ),
			'formatted_date_created' => get_comment_date( 'F j, Y', $review->comment_ID ),
			'date_created_gmt'       => wc_rest_prepare_date_response( $review->comment_date_gmt ),
			'product_id'             => (int) $review->comment_post_ID,
			'product_name'           => get_the_title( (int) $review->comment_post_ID ),
			'product_permalink'      => get_permalink( (int) $review->comment_post_ID ),
			'product_image'          => $this->image_attachment_schema->get_item_response( get_post_thumbnail_id( (int) $review->comment_post_ID ) ),
			'reviewer'               => $review->comment_author,
			'review'                 => $review->comment_content,
			'rating'                 => $rating,
			'verified'               => wc_review_is_from_verified_owner( $review->comment_ID ),
			'reviewer_avatar_urls'   => rest_get_avatar_urls( $review->comment_author_email ),
		];

		if ( 'view' === $context ) {
			$data['review'] = wpautop( $data['review'] );
		}

		return $data;
	}
}
