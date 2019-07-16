/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { format } from '@wordpress/date';
import classNames from 'classnames';

/**
 * Render a review for the Reviews by Product block
 *
 * @param {Object} attributes Block attributes
 * @param {Object} review Object containing review data.
 *
 * @return {Object} React JSx nodes of the block
 */
export function renderReview( attributes, review = {} ) {
	const { showAvatar, showProductRating: showProductRatingAttr, showReviewDate, showReviewerName } = attributes;
	const { id = null, date_created: dateCreated, rating, review: text = '', reviewer = '', reviewer_avatar_urls: avatarUrls = {} } = review;
	const isLoading = ! Object.keys( review ).length > 0;
	const showProductRating = Number.isFinite( rating ) && showProductRatingAttr;

	const classes = classNames( 'wc-block-reviews-by-product__item', {
		'has-avatar': showAvatar,
		'has-date': showReviewDate,
		'has-name': showReviewerName,
		'has-rating': showProductRating,
		'is-loading': isLoading,
	} );
	const starStyle = {
		width: ( rating / 5 * 100 ) + '%',
	};

	return (
		<li className={ classes } key={ id } aria-hidden={ isLoading }>
			<span
				className="wc-block-reviews-by-product__text"
				dangerouslySetInnerHTML={ {
					// `text` is the `review` parameter returned by the `reviews` endpoint.
					// It's filtered with `wp_filter_post_kses()`, which removes dangerous HTML tags,
					// so using it inside `dangerouslySetInnerHTML` is safe.
					__html: text || '',
				} }
			/>
			{ ( showAvatar || showReviewerName || showProductRating || showReviewDate ) && (
				<div className="wc-block-reviews-by-product__info">
					{ showAvatar && (
						isLoading ? (
							<div className="wc-block-reviews-by-product__avatar" width="48" height="48" />
						) : (
							<img alt="" src={ avatarUrls[ '48' ] } srcSet={ avatarUrls[ '96' ] + ' 2x' } className="wc-block-reviews-by-product__avatar" width="48" height="48" />
						)
					) }
					{ ( showReviewerName || showProductRating ) && (
						<div className="wc-block-reviews-by-product__meta">
							{ showReviewerName && (
								<strong className="wc-block-reviews-by-product__author">{ reviewer }</strong>
							) }
							{ showProductRating && (
								<div className="wc-block-reviews-by-product__rating">
									<div className="wc-block-reviews-by-product__rating__stars" role="img">
										<span style={ starStyle }>{ sprintf( __( 'Rated %d out of 5', 'woo-gutenberg-products-block' ), rating ) }</span>
									</div>
								</div>
							) }
						</div>
					) }
					{ showReviewDate && (
						<time className="wc-block-reviews-by-product__published-date" dateTime={ dateCreated }>{ format( 'F j, Y', dateCreated ) }</time>
					) }
				</div>
			) }
		</li>
	);
}
