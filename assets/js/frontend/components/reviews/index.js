/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Review from '../review';

const Reviews = ( { attributes, componentId, reviews } ) => {
	const showReviewImage = ( wc_product_block_data.showAvatars || attributes.imageType === 'product' ) && attributes.showReviewImage;
	const showReviewRating = wc_product_block_data.enableReviewRating && attributes.showReviewRating;
	const attrs = {
		...attributes,
		showReviewImage,
		showReviewRating,
	};

	return (
		<ul
			key={ `wc-block-reviews-by-product__reviews-list-${ componentId }` }
			className="wc-block-reviews-by-product__list"
		>
			{ reviews.length === 0 ?
				(
					<Review attributes={ attrs } />
				) : (
					reviews.map( ( review, i ) => (
						<Review key={ review.id || i } attributes={ attrs } review={ review } />
					) )
				)
			}
		</ul>
	);
};

Reviews.propTypes = {
	attributes: PropTypes.object.isRequired,
	componentId: PropTypes.number.isRequired,
	reviews: PropTypes.array.isRequired,
};

export default Reviews;
