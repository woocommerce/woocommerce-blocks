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
			$order                 = explode( '-', $attributes['orderby'] );
			$attributes['orderby'] = $order[0];
			if ( count( $order ) > 1 ) {
				$attributes['order'] = $order[1];
			} else {
				$attributes['order'] = 'DESC';
			}
		}

		return $attributes;
	}

	/**
	 * Get the schema for the reviews' orderby attribute.
	 *
	 * @return array Property definition of `orderby` attribute.
	 */
	protected static function get_schema_reviews_orderby() {
		return array(
			'type'    => 'string',
			'enum'    => array( 'comment_date-DESC', 'comment_date-ASC' ),
			'default' => 'recent',
		);
	}

	/**
	 * Render the review meta (author and date).
	 *
	 * @param array $comment Comment attributes.
	 */
	public function review_display_meta( $comment ) {
		$verified = wc_review_is_from_verified_owner( $comment->comment_ID );

		if ( ! $this->attributes['showReviewerName'] && ! $this->attributes['showReviewDate'] ) {
			return;
		}

		$html = '<p class="meta">';
		if ( $this->attributes['showReviewerName'] ) {
			$html .= '<strong class="woocommerce-review__author">' . get_comment_author() . '</strong>';
			if ( 'yes' === get_option( 'woocommerce_review_rating_verification_label' ) && $verified ) {
				$html .= '<em class="woocommerce-review__verified verified">(' . esc_attr__( 'verified owner', 'woo-gutenberg-products-block' ) . ')</em> ';
			}
		}
		if ( $this->attributes['showReviewerName'] && $this->attributes['showReviewDate'] ) {
			$html .= '<span class="woocommerce-review__dash">&ndash;</span>';
		}
		if ( $this->attributes['showReviewDate'] ) {
			$html .= '<time class="woocommerce-review__published-date" datetime="' . esc_attr( get_comment_date( 'c' ) ) . '">' . esc_html( get_comment_date( wc_date_format() ) ) . '</time>';
		}
		$html .= '</p>';

		echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
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

		$comments = get_comments(
			array(
				'number'   => $this->attributes['reviewsShown'],
				'order_by' => $this->attributes['orderby'],
				'order'    => $this->attributes['order'],
				'post_id'  => $this->attributes['productId'],
				'status'   => 'approve',
				'type'     => 'review',
			)
		);
		$args     = array(
			'callback' => 'woocommerce_comments',
			'echo'     => false,
		);
		remove_action( 'woocommerce_review_meta', 'woocommerce_review_display_meta', 10 );
		add_action( 'woocommerce_review_meta', array( $this, 'review_display_meta' ), 10 );
		if ( ! $this->attributes['showProductRating'] ) {
			remove_action( 'woocommerce_review_before_comment_meta', 'woocommerce_review_display_rating', 10 );
		}
		if ( ! $this->attributes['showReviewerPicture'] ) {
			remove_action( 'woocommerce_review_before', 'woocommerce_review_display_gravatar', 10 );
		}
		$list_comments = wp_list_comments( apply_filters( 'woocommerce_product_review_list_args', $args ), $comments );
		add_action( 'woocommerce_review_meta', 'woocommerce_review_display_meta', 10 );
		remove_action( 'woocommerce_review_meta', array( $this, 'review_display_meta' ), 10 );
		if ( ! $this->attributes['showProductRating'] ) {
			add_action( 'woocommerce_review_before_comment_meta', 'woocommerce_review_display_rating', 10 );
		}
		if ( ! $this->attributes['showReviewerPicture'] ) {
			add_action( 'woocommerce_review_before', 'woocommerce_review_display_gravatar', 10 );
		}
		return '<div id="reviews"><ol class="commentlist">' . $list_comments . '</ol></div>';
	}
}
