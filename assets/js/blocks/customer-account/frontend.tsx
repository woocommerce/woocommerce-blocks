/**
 * External dependencies
 */
import { renderFrontend } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from './block';

const getProps = () => {
	return {
		isEditor: false,
	};
};

renderFrontend( {
	selector: '.wp-block-woocommerce-customer-account',
	Block,
	getProps,
} );
