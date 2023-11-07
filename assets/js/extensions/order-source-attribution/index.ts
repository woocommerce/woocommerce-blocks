/**
 * External dependencies
 */
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';
import { dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { sbjs } from './sourcebuster.d.ts';

dispatch( CHECKOUT_STORE_KEY ).__internalSetExtensionData(
	'order-source-attribution',
	sbjs.get()
);
