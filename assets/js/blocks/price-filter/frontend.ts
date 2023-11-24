/**
 * Internal dependencies
 */
import { renderFrontend } from '~/base/utils';
import Block from './block';
import { parseAttributes } from './utils';

const getProps = ( el: HTMLElement ) => {
	return {
		attributes: parseAttributes( el.dataset ),
		isEditor: false,
	};
};

renderFrontend( {
	selector: '.wp-block-woocommerce-price-filter',
	Block,
	getProps,
} );
