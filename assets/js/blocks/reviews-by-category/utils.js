/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import ReadMore from '../../components/read-more';

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
	const classArray = [ 'wc-block-reviews-by-category__item' ];

	if ( isLoading ) {
		classArray.push( 'is-loading' );
	}

	return classArray.join( ' ' );
}

function getReviewImage( review, imageType, isLoading ) {
	if ( isLoading || ! review ) {
		return (
			<div className="wc-block-reviews-by-category__image" width="48" height="48" />
		);
	}

	return (
		<div className="wc-block-reviews-by-category__image">
			{ imageType === 'product' ? (
				<img aria-hidden="true" alt="" src={ review.product_picture } className="wc-block-reviews-by-category__image" width="48" height="48" />
			) : (
				<img aria-hidden="true" alt="" src={ review.reviewer_avatar_urls[ '48' ] } srcSet={ review.reviewer_avatar_urls[ '96' ] + ' 2x' } className="wc-block-reviews-by-category__image" width="48" height="48" />
			) }
			{ review.verified && (
				<div className="wc-block-reviews-by-category__verified" title={ __( 'Verified buyer', 'woo-gutenberg-categorys-block' ) }>{ __( 'Verified buyer', 'woo-gutenberg-categorys-block' ) }</div>
			) }
		</div>
	);
}

function getReviewContent( review ) {
	return (
		<ReadMore
			maxLines={ 10 }
			moreText={ __( 'Read full review', 'woo-gutenberg-categorys-block' ) }
			lessText={ __( 'Hide full review', 'woo-gutenberg-categorys-block' ) }
			className="wc-block-reviews-by-category__text"
		>
			<div
				dangerouslySetInnerHTML={ {
					// `content` is the `review` parameter returned by the `reviews` endpoint.
					// It's filtered with `wp_filter_post_kses()`, which removes dangerous HTML tags,
					// so using it inside `dangerouslySetInnerHTML` is safe.
					__html: review.review || '',
				} }
			/>
		</ReadMore>
	);
}

/**
 * Render a review for the Reviews by Product block
 *
 * @param {object} attributes Block attributes
 * @param {object} [review={}] Object containing review data.
 * @param {number} [i=0] Index of the review in the list.
 *
 * @returns {object} React JSx nodes of the block
 */
export function renderReview( attributes, review = {}, i = 0 ) {
	const { imageType, showReviewDate, showReviewerName, showReviewImage, showReviewRating: showReviewRatingAttr } = attributes;
	const { id = null, date_created: dateCreated, formatted_date_created: formattedDateCreated, rating, reviewer = '' } = review;
	const isLoading = ! Object.keys( review ).length > 0;
	const showReviewRating = Number.isFinite( rating ) && showReviewRatingAttr;
	const classes = getReviewClasses( isLoading );
	const starStyle = {
		width: ( rating / 5 * 100 ) + '%',
	};

	return (
		<li className={ classes } key={ id || i } aria-hidden={ isLoading }>
			{ ( showReviewDate || showReviewerName || showReviewImage || showReviewRating ) && (
				<div className="wc-block-reviews-by-category__info">
					{ showReviewImage && getReviewImage( review, imageType, isLoading ) }
					{ ( showReviewerName || showReviewRating || showReviewDate ) && (
						<div className="wc-block-reviews-by-category__meta">
							{ showReviewerName && (
								<strong className="wc-block-reviews-by-category__author">{ reviewer }</strong>
							) }
							{ showReviewRating && (
								<div className="wc-block-reviews-by-category__rating">
									<div className="wc-block-reviews-by-category__rating__stars" role="img">
										<span style={ starStyle }>{ sprintf( __( 'Rated %d out of 5', 'woo-gutenberg-categorys-block' ), rating ) }</span>
									</div>
								</div>
							) }
							{ showReviewDate && (
								<time className="wc-block-reviews-by-category__published-date" dateTime={ dateCreated }>{ formattedDateCreated }</time>
							) }
						</div>
					) }
				</div>
			) }
			{ getReviewContent( review ) }
		</li>
	);
}
