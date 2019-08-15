/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import ReviewListItem from '../review-list-item';
import './style.scss';

const ReviewList = ( { attributes, componentId, reviews, showProductNames } ) => {
	const showReviewImage = ( wc_product_block_data.showAvatars || attributes.imageType === 'product' ) && attributes.showReviewImage;
	const showReviewRating = wc_product_block_data.enableReviewRating && attributes.showReviewRating;
	const attrs = {
		...attributes,
		showReviewImage,
		showReviewRating,
	};

	return (
		<ul
			key={ `wc-block-review-list-${ componentId }` }
			className="wc-block-review-list"
		>
			{ reviews.length === 0 ?
				(
					<ReviewListItem attributes={ attrs } />
				) : (
					reviews.map( ( review, i ) => (
						<ReviewListItem key={ review.id || i } attributes={ attrs } review={ review } showProductNames={ showProductNames } />
					) )
				)
			}
		</ul>
	);
};

ReviewList.propTypes = {
	attributes: PropTypes.object.isRequired,
	componentId: PropTypes.number.isRequired,
	reviews: PropTypes.array.isRequired,
	showProductNames: PropTypes.bool,
};

export default ReviewList;
