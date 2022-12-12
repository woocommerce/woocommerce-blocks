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
		customerAccountDisplayStyle: data?.customerAccountDisplayStyle,
		customerAccountIconStyle: data?.customerAccountIconStyle,
	};
};

const getProps = ( el: HTMLElement ) => {
	return {
		attributes: parseAttributes( el.dataset ),
		isEditor: false,
	};
};

renderFrontend( {
	selector: '.wp-block-woocommerce-customer-account',
	Block,
	getProps,
} );
