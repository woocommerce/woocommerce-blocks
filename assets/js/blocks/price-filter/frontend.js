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
		el.classList.remove( 'is-loading' );

		render( <Block />, el );
	} );
}
