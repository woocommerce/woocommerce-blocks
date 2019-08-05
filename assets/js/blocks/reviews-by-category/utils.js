/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

function getReviewClasses( isLoading ) {
	const classArray = [ 'wc-block-reviews-by-category__item' ];

	if ( isLoading ) {
		classArray.push( 'is-loading' );
	}

	return classArray.join( ' ' );
}
/**
 * Render a review for the Reviews by Product block
 *
 * @param {Object} attributes Block attributes
 * @param {Object} review Object containing review data.
 *
 * @return {Object} React JSx nodes of the block
 */
export function renderReview( attributes, review = {}, i = 0 ) {
	const { showAvatar, showProductRating: showProductRatingAttr, showReviewDate, showReviewerName } = attributes;
	const { id = null, date_created: dateCreated, formatted_date_created: formattedDateCreated, rating, review: text = '', reviewer = '', reviewer_avatar_urls: avatarUrls = {} } = review;
	const isLoading = ! Object.keys( review ).length > 0;
	const showProductRating = Number.isFinite( rating ) && showProductRatingAttr;
	const classes = getReviewClasses( isLoading );
	const starStyle = {
		width: ( rating / 5 * 100 ) + '%',
	};

	return (
		<li className={ classes } key={ id || i } aria-hidden={ isLoading }>
			<span
				className="wc-block-reviews-by-category__text"
				dangerouslySetInnerHTML={ {
					// `text` is the `review` parameter returned by the `reviews` endpoint.
					// It's filtered with `wp_filter_post_kses()`, which removes dangerous HTML tags,
					// so using it inside `dangerouslySetInnerHTML` is safe.
					__html: text || '',
				} }
			/>
			{ ( showAvatar || showReviewerName || showProductRating || showReviewDate ) && (
				<div className="wc-block-reviews-by-category__info">
					{ showAvatar && (
						isLoading ? (
							<div className="wc-block-reviews-by-category__avatar" width="48" height="48" />
						) : (
							<img alt="" src={ avatarUrls[ '48' ] } srcSet={ avatarUrls[ '96' ] + ' 2x' } className="wc-block-reviews-by-category__avatar" width="48" height="48" />
						)
					) }
					{ ( showReviewerName || showProductRating ) && (
						<div className="wc-block-reviews-by-category__meta">
							{ showReviewerName && (
								<strong className="wc-block-reviews-by-category__author">{ reviewer }</strong>
							) }
							{ showProductRating && (
								<div className="wc-block-reviews-by-category__rating">
									<div className="wc-block-reviews-by-category__rating__stars" role="img">
										<span style={ starStyle }>{ sprintf( __( 'Rated %d out of 5', 'woo-gutenberg-categorys-block' ), rating ) }</span>
									</div>
								</div>
							) }
						</div>
					) }
					{ showReviewDate && (
						<time className="wc-block-reviews-by-category__published-date" dateTime={ dateCreated }>{ formattedDateCreated }</time>
					) }
				</div>
			) }
		</li>
	);
}
