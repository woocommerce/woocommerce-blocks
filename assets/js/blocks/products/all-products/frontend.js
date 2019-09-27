/**
 * External dependencies
 */
import { render } from 'react-dom';

/**
 * Internal dependencies
 */
import Block from './block';

const containers = document.querySelectorAll(
	'.wp-block-woocommerce-all-products'
);

if ( containers.length ) {
	// Use Array.forEach for IE11 compatibility
	Array.prototype.forEach.call( containers, ( el, i ) => {
		const attributes = JSON.parse( el.dataset.attributes );

		render(
			<Block
				attributes={ attributes }
				urlParameterSuffix={ i > 0 ? `_${ i + 1 }` : '' }
			/>,
			el
		);
	} );
}
