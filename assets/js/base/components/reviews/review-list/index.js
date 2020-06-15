/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	REVIEW_RATINGS_ENABLED,
	SHOW_AVATARS,
} from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import ReviewListItem from '../review-list-item';
import './style.scss';

const ReviewList = ( { attributes, reviews } ) => {
	const showReviewImage =
		( SHOW_AVATARS || attributes.imageType === 'product' ) &&
		attributes.showReviewImage;
	const showReviewRating =
		REVIEW_RATINGS_ENABLED && attributes.showReviewRating;
	const attrs = {
		...attributes,
		showReviewImage,
		showReviewRating,
	};

	return (
		<ul className="wc-block-review-list wc-block-components-review-list">
			{ reviews.length === 0 ? (
				<ReviewListItem attributes={ attrs } />
			) : (
				reviews.map( ( review, i ) => (
					<ReviewListItem
						key={ review.id || i }
						attributes={ attrs }
						review={ review }
					/>
				) )
			) }
		</ul>
	);
};

ReviewList.propTypes = {
	attributes: PropTypes.object.isRequired,
	reviews: PropTypes.array.isRequired,
};

export default ReviewList;
