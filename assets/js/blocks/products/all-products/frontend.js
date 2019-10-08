/**
 * Internal dependencies
 */
import Block from './block';
import renderFrontend from '../../../utils/render-frontend.js';

const getProps = ( el, i ) => ( {
	attributes: JSON.parse( el.dataset.attributes ),
	urlParameterSuffix: i > 0 ? `_${ i + 1 }` : '',
} );

renderFrontend( '.wp-block-woocommerce-all-products', Block, getProps );
