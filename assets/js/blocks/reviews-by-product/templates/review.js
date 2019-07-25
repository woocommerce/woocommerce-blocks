/**
 * External dependencies
 */
import classNames from 'classnames';

const reviewTemplate = ( { className, id, i, isLoading, reviewReview, reviewAvatar, reviewReviewer, reviewRating, reviewDate, showAvatar, showReviewerName, showProductRating, showReviewDate } ) => {
	const classes = classNames( className, {
		'has-avatar': showAvatar,
		'has-date': showReviewDate,
		'has-name': showReviewerName,
		'has-rating': showProductRating,
		'is-loading': isLoading,
	} );

	return (
		<li className={ classes } key={ id || i } aria-hidden={ isLoading }>
			{ reviewReview }
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
