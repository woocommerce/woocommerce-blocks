/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { getSetting } from '@woocommerce/settings';
import LoadMoreButton from '@woocommerce/base-components/load-more-button';
import {
	ReviewList,
	ReviewSortSelect,
} from '@woocommerce/base-components/reviews';
import withReviews from '@woocommerce/base-hocs/with-reviews';
import type { ChangeEventHandler, MouseEventHandler } from 'react';

/**
 * Internal dependencies
 */
import { ReviewListAttributes } from '../../base/components/reviews/review-list';
import { Review } from '../../base/components/reviews/types';

type FrontendBlockAttributes = ReviewListAttributes & {
	showOrderby?: 'false' | 'true';
	showLoadMore?: 'false' | 'true';
};

interface FrontendBlockProps {
	attributes: FrontendBlockAttributes;
	onAppendReviews: MouseEventHandler;
	onChangeOrderby: ChangeEventHandler< HTMLSelectElement >;
	sortSelectValue: 'most-recent' | 'highest-rating' | 'lowest-rating';
	reviews: Review[];
	totalReviews: number;
}

/**
 * Block rendered in the frontend.
 *
 * @param {FrontendBlockProps}                                 props                 Incoming props for the component.
 * @param {FrontendBlockAttributes}                            props.attributes      Incoming block attributes.
 * @param {MouseEventHandler}                                  props.onAppendReviews Function called when appending review.
 * @param {ChangeEventHandler< HTMLSelectElement >}            props.onChangeOrderby
 * @param {Array<Review>}                                      props.reviews
 * @param {'most-recent' | 'highest-rating' | 'lowest-rating'} props.sortSelectValue
 * @param {number}                                             props.totalReviews
 */
const FrontendBlock = ( {
	attributes,
	onAppendReviews,
	onChangeOrderby,
	reviews,
	sortSelectValue,
	totalReviews,
}: FrontendBlockProps ) => {
	if ( reviews.length === 0 ) {
		return null;
	}

	const reviewRatingsEnabled = getSetting< boolean >(
		'reviewRatingsEnabled',
		true
	);

	return (
		<>
			{ attributes.showOrderby !== 'false' && reviewRatingsEnabled && (
				<ReviewSortSelect
					value={ sortSelectValue }
					onChange={ onChangeOrderby }
					readOnly
				/>
			) }
			<ReviewList attributes={ attributes } reviews={ reviews } />
			{ attributes.showLoadMore !== 'false' &&
				totalReviews > reviews.length && (
					<LoadMoreButton
						onClick={ onAppendReviews }
						screenReaderLabel={ __(
							'Load more reviews',
							'woo-gutenberg-products-block'
						) }
					/>
				) }
		</>
	);
};

export default withReviews( FrontendBlock );
