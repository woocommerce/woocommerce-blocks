/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { getSetting } from '@woocommerce/settings';
import type { ChangeEventHandler, MouseEventHandler } from 'react';

/**
 * Internal dependencies
 */
import withReviews from '~/base/hocs/with-reviews';
import { Review } from '~/base/components/reviews/types';
import LoadMoreButton from '~/base/components/load-more-button';
import { ReviewList, ReviewSortSelect } from '~/base/components/reviews';
import { ReviewBlockAttributes } from './attributes';

interface FrontendBlockProps {
	attributes: ReviewBlockAttributes;
	onAppendReviews: MouseEventHandler;
	onChangeOrderby: ChangeEventHandler< HTMLSelectElement >;
	sortSelectValue: 'most-recent' | 'highest-rating' | 'lowest-rating';
	reviews: Review[];
	totalReviews: number;
}

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
			{ attributes.showOrderby && reviewRatingsEnabled && (
				<ReviewSortSelect
					value={ sortSelectValue }
					onChange={ onChangeOrderby }
				/>
			) }
			<ReviewList attributes={ attributes } reviews={ reviews } />
			{ attributes.showLoadMore && totalReviews > reviews.length && (
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
