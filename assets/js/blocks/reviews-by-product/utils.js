/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

export const getReviews = ( args ) => {
	return apiFetch( {
		path: '/wc/blocks/products/reviews?' + Object.entries( args ).map( ( arg ) => arg.join( '=' ) ).join( '&' ),
		parse: false,
	} ).then( ( response ) => {
		return response.json().then( ( reviews ) => {
			const totalReviews = parseInt( response.headers.get( 'x-wp-total' ), 10 );
			return { reviews, totalReviews };
		} );
	} );
};

function getReviewClasses( isLoading ) {
	const classArray = [ 'wc-block-reviews-by-product__item' ];

	if ( isLoading ) {
		classArray.push( 'is-loading' );
	}

	return classArray.join( ' ' );
}

function getReviewImage( review, imageType, isLoading ) {
	if ( isLoading || ! review ) {
		return (
			<div className="wc-block-reviews-by-product__image" width="48" height="48" />
		);
	}

	return (
		<div className="wc-block-reviews-by-product__image">
			{ imageType === 'product' ? (
				<img aria-hidden="true" alt="" src={ review.product_picture } className="wc-block-reviews-by-product__image" width="48" height="48" />
			) : (
				<img aria-hidden="true" alt="" src={ review.reviewer_avatar_urls[ '48' ] } srcSet={ review.reviewer_avatar_urls[ '96' ] + ' 2x' } className="wc-block-reviews-by-product__image" width="48" height="48" />
			) }
			{ review.verified && (
				<div className="wc-block-reviews-by-product__verified" title={ __( 'Verified buyer', 'woo-gutenberg-products-block' ) }>{ __( 'Verified buyer', 'woo-gutenberg-products-block' ) }</div>
			) }
		</div>
	);
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
	const { imageType, showReviewDate, showReviewerName, showReviewImage, showReviewRating: showReviewRatingAttr } = attributes;
	const { id = null, date_created: dateCreated, formatted_date_created: formattedDateCreated, rating, review: text = '', reviewer = '' } = review;
	const isLoading = ! Object.keys( review ).length > 0;
	const showReviewRating = Number.isFinite( rating ) && showReviewRatingAttr;
	const classes = getReviewClasses( isLoading );
	const starStyle = {
		width: ( rating / 5 * 100 ) + '%',
	};

	return (
		<li className={ classes } key={ id || i } aria-hidden={ isLoading }>
			{ ( showReviewDate || showReviewerName || showReviewImage || showReviewRating ) && (
				<div className="wc-block-reviews-by-product__info">
					{ showReviewImage && getReviewImage( review, imageType, isLoading ) }
					{ ( showReviewerName || showReviewRating || showReviewDate ) && (
						<div className="wc-block-reviews-by-product__meta">
							{ showReviewerName && (
								<strong className="wc-block-reviews-by-product__author">{ reviewer }</strong>
							) }
							{ showReviewRating && (
								<div className="wc-block-reviews-by-product__rating">
									<div className="wc-block-reviews-by-product__rating__stars" role="img">
										<span style={ starStyle }>{ sprintf( __( 'Rated %d out of 5', 'woo-gutenberg-products-block' ), rating ) }</span>
									</div>
								</div>
							) }
							{ showReviewDate && (
								<time className="wc-block-reviews-by-product__published-date" dateTime={ dateCreated }>{ formattedDateCreated }</time>
							) }
						</div>
					) }
				</div>
			) }
			<span
				className="wc-block-reviews-by-product__text"
				dangerouslySetInnerHTML={ {
					// `text` is the `review` parameter returned by the `reviews` endpoint.
					// It's filtered with `wp_filter_post_kses()`, which removes dangerous HTML tags,
					// so using it inside `dangerouslySetInnerHTML` is safe.
					__html: text || '',
				} }
			/>
		</li>
	);
}
