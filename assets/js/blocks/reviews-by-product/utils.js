/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Render the Reviews by Product block placeholder
 *
 * @param {Object} attributes Block attributes
 *
 * @return {Object} React JSx nodes of the block
 */
export function renderReviewsByProductPlaceholder( attributes ) {
	const { className, showProductRating, showReviewerName, showReviewerPicture, showReviewDate } = attributes;
	const classes = classNames( 'wc-block-reviews-by-product', 'is-loading', className, {
		'has-picture': showReviewerPicture,
		'has-name': showReviewerName,
		'has-rating': showProductRating,
		'has-date': showReviewDate,
	} );

	return (
		<div className={ classes } aria-hidden>
			<ul className="wc-block-reviews-by-product__list">
				<li className="wc-block-reviews-by-product__item">
					<span className="wc-block-reviews-by-product__text"></span>
					<div className="wc-block-reviews-by-product__info">
						{ showReviewerPicture && (
							<img alt="" src="" srcSet="" className="avatar avatar-60 photo" width="60" height="60" />
						) }
						<div className="wc-block-reviews-by-product__meta">
							{ showReviewerName && (
								<strong className="wc-block-reviews-by-product__author"></strong>
							) }
							{ showProductRating && (
								<div className="wc-block-reviews-by-product__rating">
									<div className="star-rating" role="img">
										<span>Rated <strong className="rating"></strong> out of 5</span>
									</div>
								</div>
							) }
						</div>
						{ showReviewDate && (
							<time className="wc-block-reviews-by-product__published-date" dateTime=""></time>
						) }
					</div>
				</li>
			</ul>
		</div>
	);
}
