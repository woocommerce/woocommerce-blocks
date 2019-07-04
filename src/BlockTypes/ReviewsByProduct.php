<?php
/**
 * Reviews by Product block.
 *
 * @package WooCommerce\Blocks
 */

namespace Automattic\WooCommerce\Blocks\BlockTypes;

defined( 'ABSPATH' ) || exit;

/**
 * ReviewsByProduct class.
 */
class ReviewsByProduct extends AbstractDynamicBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'reviews-by-product';

	/**
	 * Get a set of attributes shared across most of the grid blocks.
	 *
	 * @return array List of block attributes with type and defaults.
	 */
	protected function get_attributes() {
		return array(
			'className'           => $this->get_schema_string(),
			'editMode'            => $this->get_schema_boolean( true ),
			'editMode'            => $this->get_schema_boolean( true ),
			'orderby'             => $this->get_schema_reviews_orderby(),
			'reviewsShown'        => $this->get_schema_number( 10 ),
			'showProductRating'   => $this->get_schema_boolean( true ),
			'showReviewerName'    => $this->get_schema_boolean( true ),
			'showReviewerPicture' => $this->get_schema_boolean( true ),
			'showReviewDate'      => $this->get_schema_boolean( true ),
			'productId'           => $this->get_schema_number( 0 ),
		);
	}


	/**
	 * Get the block's attributes.
	 *
	 * @param array $attributes Block attributes.
	 * @return array Block attributes merged with defaults.
	 */
	protected function parse_attributes( $attributes ) {
		if ( array_key_exists( 'orderby', $attributes ) ) {
			if ( 'highest-rating' === $attributes['orderby'] ) {
				return array_merge(
					$attributes,
					array(
						'orderby'  => 'meta_value_num',
						'meta_key' => 'rating', // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
						'order'    => 'ASC',
					)
				);
			} elseif ( 'lowest-rating' === $attributes['orderby'] ) {
				return array_merge(
					$attributes,
					array(
						'orderby'  => 'meta_value_num',
						'meta_key' => 'rating', // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
						'order'    => 'DESC',
					)
				);
			}
		}

		return array_merge(
			$attributes,
			array(
				'orderby' => 'comment_date',
				'order'   => 'DESC',
			)
		);
	}

	/**
	 * Get the schema for the reviews' orderby attribute.
	 *
	 * @return array Property definition of `orderby` attribute.
	 */
	protected static function get_schema_reviews_orderby() {
		return array(
			'type'    => 'string',
			'enum'    => array( 'most-recent', 'highest-rating', 'lowest-rating' ),
			'default' => 'most-recent',
		);
	}

	/**
	 * Loads the reviews
	 *
	 * @return array Array of comments.
	 */
	protected function get_reviews() {
		$args = array(
			'number'   => $this->attributes['reviewsShown'],
			'order_by' => $this->attributes['orderby'],
			'order'    => $this->attributes['order'],
			'post_id'  => $this->attributes['productId'],
			'status'   => 'approve',
			'type'     => 'review',
		);
		if ( array_key_exists( 'meta_key', $this->attributes ) ) {
			$args['meta_key'] = $this->attributes['meta_key']; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
		}

		return get_comments( $args );
	}

	/**
	 * Render the reviewer picture
	 *
	 * @param object $comment Comment.
	 * @return string HTML code of the reviewer picture.
	 */
	protected function get_reviewer_picture_html( $comment ) {
		if ( ! $this->attributes['showReviewerPicture'] ) {
			return '';
		}

		return get_avatar( $comment, apply_filters( 'woocommerce_review_gravatar_size', '60' ), '' );
	}

	/**
	 * Render the reviewer name
	 *
	 * @param integer $comment_id Id of the comment.
	 * @return string HTML code of the reviewer name.
	 */
	protected function get_reviewer_name_html( $comment_id ) {
		if ( ! $this->attributes['showReviewerName'] ) {
			return '';
		}

		$author = get_comment_author( $comment_id );

		return "<strong class=\"wc-block-reviews-by-product__author\">{$author}</strong>";
	}

	/**
	 * Render the review rating
	 *
	 * @param integer $comment_id Id of the comment.
	 * @return string HTML code of the review rating.
	 */
	protected function get_review_rating_html( $comment_id ) {
		$rating = intval( get_comment_meta( $comment_id, 'rating', true ) );

		if ( ! $this->attributes['showProductRating'] || ! $rating || ! wc_review_ratings_enabled() ) {
			return '';
		}

		$rating_html = wc_get_rating_html( $rating );

		return "<div class=\"wc-block-reviews-by-product__rating\">{$rating_html}</div>";
	}

	/**
	 * Render the review date
	 *
	 * @param integer $comment_id Id of the comment.
	 * @return string HTML code of the review date.
	 */
	protected function get_review_date_html( $comment_id ) {
		if ( ! $this->attributes['showReviewDate'] ) {
			return '';
		}

		$datetime = esc_attr( get_comment_date( 'c', $comment_id ) );
		$date     = esc_html( get_comment_date( wc_date_format(), $comment_id ) );
		return "<time class=\"wc-block-reviews-by-product__published-date\" datetime=\"{$datetime}\">{$date}</time>";
	}

	/**
	 * Render the review date
	 *
	 * @param object $comment Comment.
	 * @return string HTML code of the review info.
	 */
	protected function get_review_info_html( $comment ) {
		$review_info = $this->get_reviewer_picture_html( $comment );
		if ( $this->attributes['showReviewerName'] || $this->attributes['showProductRating'] ) {
			$reviewer_name   = $this->get_reviewer_name_html( $comment->comment_ID );
			$reviewer_rating = $this->get_review_rating_html( $comment->comment_ID );
			$review_info    .= "<div class=\"wc-block-reviews-by-product__meta\">{$reviewer_name}{$reviewer_rating}</div>";
		}
		$review_info .= $this->get_review_date_html( $comment->comment_ID );

		return $review_info;
	}

	/**
	 * Render a single review.
	 *
	 * @param object $comment Comment.
	 * @return string HTML code of the review.
	 */
	protected function get_review_html( $comment ) {
		$text = get_comment_text( $comment->comment_ID );
		$info = $this->get_review_info_html( $comment );

		return "<li class=\"wc-block-reviews-by-product__item\">{$text}<div class=\"wc-block-reviews-by-product__info\">{$info}</div></li>";
	}

	/**
	 * Get the list of classes to apply to this block.
	 *
	 * @return string space-separated list of classes.
	 */
	protected function get_container_classes() {
		$classes = array(
			'wc-block-reviews-by-product',
		);

		if ( $this->attributes['showReviewerPicture'] ) {
			$classes[] = 'has-picture';
		}

		if ( $this->attributes['showReviewerName'] ) {
			$classes[] = 'has-name';
		}

		if ( $this->attributes['showProductRating'] ) {
			$classes[] = 'has-rating';
		}

		if ( $this->attributes['showReviewDate'] ) {
			$classes[] = 'has-date';
		}

		return implode( ' ', $classes );
	}

	/**
	 * Render the Reviews by Product block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public function render( $attributes = array(), $content = '' ) {
		$this->attributes = $this->parse_attributes( $attributes );
		$reviews          = $this->get_reviews();
		$reviews_html     = implode( '', array_map( array( $this, 'get_review_html' ), $reviews ) );
		$classes          = $this->get_container_classes();

		return '<div class="' . $classes . '"><ul class="wc-block-reviews-by-product__list ' . $this->attributes['className'] . '">' . $reviews_html . '</ul></div>';
	}
}
