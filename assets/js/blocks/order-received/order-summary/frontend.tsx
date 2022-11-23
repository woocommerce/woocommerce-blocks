/**
 * External dependencies
 */
import { renderFrontend } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from './block';

renderFrontend( {
	selector: '.wp-block-woocommerce-order-received-order-summary',
	Block,
} );
