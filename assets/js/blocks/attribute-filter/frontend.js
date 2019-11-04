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
			attributeId: el.dataset.attributeid || 1, // @todo
			showCounts: el.dataset.showcounts === 'true',
			displayStyle: el.dataset.displaystyle,
			queryType: el.dataset.querytype,
		};
		el.classList.remove( 'is-loading' );

		render( <Block attributes={ attributes } />, el );
	} );
}
