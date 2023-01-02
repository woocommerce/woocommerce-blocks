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
		attributes: el.dataset,
		isEditor: false,
	};
};

renderFrontend( {
	selector: '.wp-block-woocommerce-results-count',
	Block,
	getProps,
} );
