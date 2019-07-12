/**
 * External dependencies
 */
import { forEach } from 'lodash';
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Block from './block.js';

const containers = document.querySelectorAll(
	'.wp-block-woocommerce-reviews-by-product'
);

if ( containers.length ) {
	forEach( containers, ( el ) => {
		const attributes = {
			orderby: el.dataset.orderby,
			perPage: el.dataset.perPage,
			productId: el.dataset.productId,
			showAvatar: el.dataset.hasAvatar === 'true',
			showProductRating: el.dataset.hasRating === 'true',
			showReviewDate: el.dataset.hasReview === 'true',
			showReviewerName: el.dataset.hasName === 'true',
		};

		render( <Block attributes={ attributes } />, el );
	} );
}
