/**
 * External dependencies
 */
import { render } from 'react-dom';

/**
 * Internal dependencies
 */
import Block from './block.js';

const containers = document.querySelectorAll(
	'.wp-block-woocommerce-reviews-by-category'
);

if ( containers.length ) {
	// Use Array.forEach for IE11 compatibility
	Array.prototype.forEach.call( containers, ( el ) => {
		const attributes = {
			orderby: el.dataset.orderby,
			perPage: el.dataset.perPage,
			categoryId: el.dataset.categoryId,
			showAvatar: el.classList.contains( 'has-avatar' ),
			showProductRating: el.classList.contains( 'has-rating' ),
			showReviewDate: el.classList.contains( 'has-date' ),
			showReviewerName: el.classList.contains( 'has-name' ),
		};

		render( <Block attributes={ attributes } />, el );
	} );
}
