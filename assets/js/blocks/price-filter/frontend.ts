/**
 * External dependencies
 */
import { renderFrontend } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from './block';

const getProps = ( el: HTMLElement ) => {
	return {
		attributes: {
			showInputFields: el.dataset.showinputfields === 'true',
			showFilterButton: el.dataset.showfilterbutton === 'true',
		},
		isEditor: false,
	};
};

renderFrontend( {
	selector: '.wp-block-woocommerce-price-filter',
	Block,
	getProps,
} );
