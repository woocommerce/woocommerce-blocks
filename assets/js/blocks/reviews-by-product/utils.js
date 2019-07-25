/**
 * External dependencies
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { Template } from '../../utils/template';
import reviewTextTemplate from './templates/review-text';
import avatarTemplate from './templates/avatar';
import reviewerTemplate from './templates/reviewer';
import ratingTemplate from './templates/rating';
import dateTemplate from './templates/date';
import reviewTemplate from './templates/review';

const render = ( args ) => {
	const {
		avatarUrls,
		className,
		dateCreated,
		id,
		i,
		isLoading,
		text,
		showAvatar,
		showProductRating,
		showReviewerName,
		showReviewDate,
		rating,
		reviewer,
	} = applyFilters( 'woocommerce-blocks-review-data-before', args );

	const ReviewTextTemplate = new Template( {
		name: 'review-review',
		templateArgs: { text },
		context: {}, // @todo
		template: reviewTextTemplate,
	} );
	const reviewReview = ReviewTextTemplate.render();

	let reviewAvatar = null;
	if ( showAvatar ) {
		const AvatarTemplate = new Template( {
			name: 'review-avatar',
			templateArgs: { avatarUrls, isLoading },
			context: {}, // @todo
			template: avatarTemplate,
		} );
		reviewAvatar = AvatarTemplate.render();
	}

	const ReviewerTemplate = new Template( {
		name: 'review-reviewer',
		templateArgs: { reviewer },
		context: {}, // @todo
		template: reviewerTemplate,
	} );
	const reviewReviewer = ReviewerTemplate.render();

	let reviewRating = null;
	if ( showProductRating ) {
		const RatingTemplate = new Template( {
			name: 'review-rating',
			templateArgs: { rating },
			context: {}, // @todo
			template: ratingTemplate,
		} );
		reviewRating = RatingTemplate.render();
	}

	const DateTemplate = new Template( {
		name: 'review-date',
		templateArgs: { date: dateCreated },
		context: {}, // @todo
		template: dateTemplate,
	} );
	const reviewDate = DateTemplate.render();

	const ReviewTemplate = new Template( {
		name: 'review',
		templateArgs: { className, id, i, isLoading, reviewReview, reviewAvatar, reviewReviewer, reviewRating, reviewDate, showAvatar, showReviewerName, showProductRating, showReviewDate },
		context: {}, // @todo
		template: reviewTemplate,
	} );

	return ReviewTemplate.render();
};

/**
 * Render a review for the Reviews by Product block
 *
 * @param {Object} attributes Block attributes
 * @param {Object} review Object containing review data.
 *
 * @return {Object} React JSx nodes of the block
 */
export function renderReview( attributes, review = {}, i = 0 ) {
	const { showAvatar, showProductRating, showReviewDate, showReviewerName } = attributes;
	const { id = null, date_created: dateCreated, rating, review: text = '', reviewer = '', reviewer_avatar_urls: avatarUrls = {} } = review;
	const isLoading = ! Object.keys( review ).length > 0;

	const className = 'wc-block-reviews-by-product__item';

	return render( {
		avatarUrls,
		className,
		dateCreated,
		id,
		i,
		isLoading,
		text,
		showAvatar,
		showProductRating,
		showReviewerName,
		showReviewDate,
		rating,
		reviewer,
	} );
}
