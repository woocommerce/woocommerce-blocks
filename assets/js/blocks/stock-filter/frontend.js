/**
 * External dependencies
 */
import { renderFrontend } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from './block.js';

const getProps = ( el ) => {
	return {
		attributes: {
			showCounts: el.dataset.showCounts === 'true',
			heading: el.dataset.heading,
			headingLevel: el.dataset.headingLevel || 3,
			showFilterButton: el.dataset.showFilterButton === 'true',
		},
		isEditor: false,
	};
};

renderFrontend( {
	selector: '.wp-block-woocommerce-stock-filter',
	Block,
	getProps,
} );
