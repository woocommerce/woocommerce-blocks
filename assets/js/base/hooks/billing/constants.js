/**
 * @typedef {import('@woocommerce/type-defs/billing').BillingData} BillingData
 */

/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';
import { mapValues } from 'lodash';
import { decodeEntities } from '@wordpress/html-entities';

const checkoutData = getSetting( 'checkoutData', {} );

/**
 * @type {BillingData}
 */
export const DEFAULT_BILLING_DATA = {
	first_name: '',
	last_name: '',
	company: '',
	address_1: '',
	address_2: '',
	city: '',
	state: '',
	postcode: '',
	country: '',
	email: '',
	phone: '',
};

const billingAddress = mapValues( checkoutData.billing_address, ( value ) =>
	decodeEntities( value )
);

/**
 * @type {BillingData}
 */
export const DEFAULT_STATE = {
	...DEFAULT_BILLING_DATA,
	...billingAddress,
};
