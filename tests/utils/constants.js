/**
 * External dependencies
 */
const config = require( 'config' );

/**
 * Constants used for E2E tests.
 *
 * @type {string}
 */
export const SIMPLE_VIRTUAL_PRODUCT_NAME = 'Woo Single #1';
export const SIMPLE_PHYSICAL_PRODUCT_NAME = '128GB USB Stick';
export const BILLING_DETAILS = config.get( 'addresses.customer.billing' );
