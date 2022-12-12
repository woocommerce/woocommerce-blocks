/**
 * External dependencies
 */
import { renderFrontend } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from './block';

export const parseAttributes = ( data: Record< string, unknown > ) => {
	return {
		displayStyle: data?.displayStyle,
		iconStyle: data?.iconStyle,
	};
};

const getProps = ( el: HTMLElement ) => {
	return {
		attributes: parseAttributes( el.dataset ),
	};
};

renderFrontend( {
	selector: '.wp-block-woocommerce-customer-account',
	Block,
	getProps,
} );
