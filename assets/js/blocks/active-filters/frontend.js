/**
 * Internal dependencies
 */
import Block from './block.js';
import renderFrontend from '../../utils/render-frontend.js';

const getProps = ( el ) => {
	return {
		attributes: {
			displayStyle: el.dataset.displayStyle,
		},
	};
};

renderFrontend( '.wp-block-woocommerce-active-filters', Block, getProps );
