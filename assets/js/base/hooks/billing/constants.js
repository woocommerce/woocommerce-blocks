/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';
import { mapValues } from 'lodash';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import { defaultBillingData } from './../../shared';

/**
 * @typedef {import('@woocommerce/type-defs/billing').BillingData} BillingData
 */

const checkoutData = getSetting( 'checkoutData', {} );
const billingAddress = mapValues( checkoutData.billing_address, ( value ) =>
	decodeEntities( value )
);

/**
 * @type {BillingData}
 */
export const DEFAULT_STATE = {
	...defaultBillingData,
	...billingAddress,
};
