/**
 * External dependencies
 */
import renderFrontend from '../../utils/render-frontend.js';

/**
 * Internal dependencies
 */
import Block from './block.js';

const getProps = ( el ) => {
	return {
		attributes: {
			attributeId: parseInt( el.dataset.attributeid || 0, 10 ),
			showCounts: el.dataset.showcounts === 'true',
			queryType: el.dataset.querytype,
		},
	};
};

renderFrontend( '.wp-block-woocommerce-attribute-filter', Block, getProps );
