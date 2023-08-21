/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';
import type { BlockAttributes } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import ReviewListItem from '../review-list-item';
import type { Review } from '../types';
import './style.scss';

export type ReviewListAttributes = BlockAttributes & {
	imageType: string;
	showReviewImage: boolean;
	showReviewRating: boolean;
	showReviewDate: boolean;
	showReviewerName: boolean;
	showReviewContent: boolean;
	showProductName: boolean;
};

interface ReviewListProps {
	attributes: ReviewListAttributes;
	reviews: Review[];
}

const ReviewList = ( {
	attributes,
	reviews,
}: ReviewListProps ): JSX.Element => {
	const showAvatars = getSetting< boolean >( 'showAvatars', true );
	const reviewRatingsEnabled = getSetting< boolean >(
		'reviewRatingsEnabled',
		true
	);
	const showReviewImage =
		( showAvatars || attributes.imageType === 'product' ) &&
		attributes.showReviewImage;
	const showReviewRating =
		reviewRatingsEnabled && attributes.showReviewRating;
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

export default ReviewList;
