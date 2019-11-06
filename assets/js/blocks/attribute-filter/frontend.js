/**
 * External dependencies
 */
import { render } from 'react-dom';

/**
 * Internal dependencies
 */
import Block from './block.js';

const containers = document.querySelectorAll(
	'.wp-block-woocommerce-attribute-filter'
);

if ( containers.length ) {
	Array.prototype.forEach.call( containers, ( el ) => {
		const attributes = {
			attributeId: parseInt( el.dataset.attributeid || 0, 10 ),
			showCounts: el.dataset.showcounts === 'true',
			queryType: el.dataset.querytype,
		};
		el.classList.remove( 'is-loading' );

		if ( ! attributes.attributeId ) {
			return null;
		}

		render( <Block attributes={ attributes } />, el );
	} );
}
