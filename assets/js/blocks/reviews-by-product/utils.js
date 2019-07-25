/**
 * Internal dependencies
 */
import { Template } from '../../utils/template';
import reviewTemplate from './templates/review';

/**
 * Render a review for the Reviews by Product block
 *
 * @param {Object} attributes Block attributes
 * @param {Object} review Object containing review data.
 *
 * @return {Object} React JSx nodes of the block
 */
export function renderReview( attributes, review = {}, i = 0, allowExtensibility = true ) {
	const { productId, showAvatar, showProductRating, showReviewDate, showReviewerName } = attributes;
	const { id = null, date_created: dateCreated, rating, review: text = '', reviewer = '', reviewer_avatar_urls: avatarUrls = {} } = review;
	const isLoading = ! Object.keys( review ).length > 0;

	const className = 'wc-block-reviews-by-product__item';

	const templateArgs = {
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
	};

	const context = { productId, review };

	const ReviewTemplate = new Template( {
		name: 'review',
		templateArgs,
		context,
		template: reviewTemplate,
		allowExtensibility,
	} );

	return ReviewTemplate.render();
}
