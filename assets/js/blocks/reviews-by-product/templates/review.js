/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Template } from '../../../utils/template';
import avatarTemplate from './avatar';
import dateTemplate from './date';
import ratingTemplate from './rating';
import reviewerTemplate from './reviewer';
import reviewTextTemplate from './review-text';

const reviewTemplate = ( { className, id, i, isLoading, avatarUrls, dateCreated, rating, reviewer, text, showAvatar, showReviewerName, showProductRating, showReviewDate }, context ) => {
	const classes = classNames( className, {
		'has-avatar': showAvatar,
		'has-date': showReviewDate,
		'has-name': showReviewerName,
		'has-rating': showProductRating,
		'is-loading': isLoading,
	} );

	const ReviewTextTemplate = new Template( {
		name: 'review-review',
		templateArgs: { text },
		context,
		template: reviewTextTemplate,
	} );
	const reviewText = ReviewTextTemplate.render();

	let reviewAvatar = null;
	if ( showAvatar ) {
		const AvatarTemplate = new Template( {
			name: 'review-avatar',
			templateArgs: { avatarUrls, isLoading },
			context,
			template: avatarTemplate,
		} );
		reviewAvatar = AvatarTemplate.render();
	}

	const ReviewerTemplate = new Template( {
		name: 'review-reviewer',
		templateArgs: { reviewer },
		context,
		template: reviewerTemplate,
	} );
	const reviewReviewer = ReviewerTemplate.render();

	let reviewRating = null;
	if ( showProductRating ) {
		const RatingTemplate = new Template( {
			name: 'review-rating',
			templateArgs: { rating },
			context,
			template: ratingTemplate,
		} );
		reviewRating = RatingTemplate.render();
	}

	const DateTemplate = new Template( {
		name: 'review-date',
		templateArgs: { date: dateCreated },
		context,
		template: dateTemplate,
	} );
	const reviewDate = DateTemplate.render();

	return (
		<li className={ classes } key={ id || i } aria-hidden={ isLoading }>
			{ reviewText }
			{ ( showAvatar || showReviewerName || showProductRating || showReviewDate ) && (
				<div className="wc-block-reviews-by-product__info">
					{ reviewAvatar }
					{ ( showReviewerName || showProductRating ) && (
						<div className="wc-block-reviews-by-product__meta">
							{ reviewReviewer }
							{ reviewRating }
						</div>
					) }
					{ reviewDate }
				</div>
			) }
		</li>
	);
};

export default reviewTemplate;
