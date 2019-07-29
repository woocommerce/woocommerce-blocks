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
			showAvatar: el.classList.contains( 'has-avatar' ),
			showProductRating: el.classList.contains( 'has-rating' ),
			showReviewDate: el.classList.contains( 'has-date' ),
			showReviewerName: el.classList.contains( 'has-name' ),
		};

		render( <Block attributes={ attributes } />, el );
	} );
}
