/**
 * External dependencies
 */
import isShallowEqual from '@wordpress/is-shallow-equal';
import { pluckAddress } from '@woocommerce/base-utils';

/**
 * @typedef {import('@woocommerce/type-defs/payments').PaymentDataItem} PaymentDataItem
 */

/**
 * Utility function for preparing payment data for the request.
 *
 * @param {Object}  paymentData          Arbitrary payment data provided by the payment method.
 * @param {boolean} shouldSave           Whether to save the payment method info to user account.
 * @param {Object}  activePaymentMethod  The current active payment method.
 *
 * @return {PaymentDataItem[]} Returns the payment data as an array of
 *                             PaymentDataItem objects.
 */
export const preparePaymentData = (
	paymentData,
	shouldSave,
	activePaymentMethod
) => {
	const apiData = Object.keys( paymentData ).map( ( property ) => {
		const value = paymentData[ property ];
		return { key: property, value };
	}, [] );
	const savePaymentMethodKey = `wc-${ activePaymentMethod }-new-payment-method`;
	apiData.push( {
		key: savePaymentMethodKey,
		value: shouldSave,
	} );
	return apiData;
};

/**
 * Does a shallow compare of important address data to determine if the cart needs updating.
 *
 * @param {Object} previousAddress An object containing all previous address information
 * @param {Object} address An object containing all address information
 *
 * @return {boolean} True if the store needs updating due to changed data.
 */
export const shouldUpdateAddressStore = ( previousAddress, address ) => {
	if ( ! address.country ) {
		return false;
	}
	return ! isShallowEqual(
		pluckAddress( previousAddress ),
		pluckAddress( address )
	);
};
