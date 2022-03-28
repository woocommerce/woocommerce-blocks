/**
 * External dependencies
 */
const config = require( 'config' );

/**
 * Constants used for E2E tests.
 *
 * @type {string}
 */
export const SIMPLE_PRODUCT_NAME = 'Woo Single #1';
export const BILLING_DETAILS = config.get( 'addresses.customer.billing' );
export const SINGLE_USE_COUPON_CODE = 'singleuse';
