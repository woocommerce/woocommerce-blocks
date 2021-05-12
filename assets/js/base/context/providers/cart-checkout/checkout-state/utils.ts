/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { fromEntriesPolyfill } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import type { PaymentResultDataType, CheckoutResponse } from './types';

/**
 * Prepares the payment_result data from the server checkout endpoint response.
 */
export const prepareResponseData = ( data: {
	message?: string;
	// eslint-disable-next-line camelcase
	payment_status: string;
	// eslint-disable-next-line camelcase
	redirect_url: string;
	// eslint-disable-next-line camelcase
	payment_details?: Record< string, string >;
} ): PaymentResultDataType => {
	const responseData = {
		message: data?.message || '',
		paymentStatus: data.payment_status,
		redirectUrl: data.redirect_url,
		paymentDetails: {},
	} as PaymentResultDataType;
	if (
		data.hasOwnProperty( 'payment_details' ) &&
		Array.isArray( data.payment_details )
	) {
		data.payment_details.forEach(
			( { key, value }: { key: string; value: string } ) => {
				responseData.paymentDetails[ key ] = decodeEntities( value );
			}
		);
	}
	return responseData;
};

/**
 * Prepares the payment_result data from the server checkout endpoint response.
 */
export const preparePaymentResult = (
	response: CheckoutResponse
): PaymentResultDataType => {
	const paymentResult = {
		message: 'message' in response ? response.message : '',
		paymentStatus:
			'payment_result' in response
				? response.payment_result.payment_status
				: '',
		paymentDetails:
			'payment_result' in response &&
			Array.isArray( response.payment_result.payment_details )
				? ( fromEntriesPolyfill(
						response.payment_result.payment_details.map(
							( { key, value } ) => [
								key,
								decodeEntities( value ),
							]
						)
				  ) as Record< string, string > )
				: {},
		redirectUrl:
			'payment_result' in response &&
			'redirect_url' in response.payment_result
				? response.payment_result.redirect_url
				: '',
	};

	// If there was an error code but no message, set a default message.
	if (
		'data' in response &&
		'status' in response.data &&
		response.data.status > 299 &&
		! paymentResult.message
	) {
		paymentResult.message = __(
			'Something went wrong. Please contact us to get assistance.',
			'woo-gutenberg-products-block'
		);
	}

	return paymentResult;
};
