/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Placeholder } from '@wordpress/components';
import Gridicon from 'gridicons';

const NoCategoryReviewsPlaceholder = () => {
	return (
		<Placeholder
			className="wc-block-all-reviews"
			icon={ <Gridicon icon="grid" /> }
			label={ __( 'All Reviews', 'woo-gutenberg-products-block' ) }
		>
			{ __( 'This block lists reviews from all products and categories. Currently your store does not have any reviews yet, but they will show up here when it does.', 'woo-gutenberg-products-block' ) }
		</Placeholder>
	);
};

export default NoCategoryReviewsPlaceholder;
