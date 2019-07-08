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
	'.wc-block-reviews-by-product'
);

if ( containers.length ) {
	forEach( containers, ( el ) => {
		const attributes = {
			orderby: el.dataset.orderby,
			perPage: el.dataset.perPage,
			productId: el.dataset.productId,
			showReviewerPicture: el.classList.contains( 'has-picture' ),
			showReviewerName: el.classList.contains( 'has-name' ),
			showProductRating: el.classList.contains( 'has-rating' ),
			showReviewDate: el.classList.contains( 'has-date' ),
		};

		render( <Block attributes={ attributes } />, el );
	} );
}
