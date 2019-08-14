/**
 * External dependencies
 */
import { render } from 'react-dom';

/**
 * Internal dependencies
 */
import Block from './block.js';

const containers = document.querySelectorAll(
	'.wp-block-woocommerce-price-filter'
);

if ( containers.length ) {
	Array.prototype.forEach.call( containers, ( el ) => {
		const data = JSON.parse( JSON.stringify( el.dataset ) );
		const attributes = {
			showInputFields: data.showinputfields === 'true',
			showFilterButton: data.showfilterbutton === 'true',
		};
		el.classList.remove( 'is-loading' );

		render( <Block attributes={ attributes } />, el );
	} );
}
