/**
 * Internal dependencies
 */
import { renderFrontend } from '~/base/utils';
import Block from './block';
import { parseAttributes } from './utils';

const getProps = ( el: HTMLElement ) => {
	return {
		isEditor: false,
		attributes: parseAttributes( el.dataset ),
	};
};

renderFrontend( {
	selector: '.wp-block-woocommerce-attribute-filter',
	Block,
	getProps,
} );
