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
			attributeId: parseInt( el.dataset[ 'attribute-id' ] || 0, 10 ),
			showCounts: el.dataset[ 'show-counts' ] === 'true',
			queryType: el.dataset[ 'query-type' ],
		},
	};
};

renderFrontend( '.wp-block-woocommerce-attribute-filter', Block, getProps );
