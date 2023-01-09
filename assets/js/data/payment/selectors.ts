/**
 * External dependencies
 */
import { objectHasProp } from '@woocommerce/types';
import deprecated from '@wordpress/deprecated';
import { getSetting } from '@woocommerce/settings';
import type { GlobalPaymentMethod } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { PaymentState } from './default-state';
import { filterActiveSavedPaymentMethods } from './utils/filter-active-saved-payment-methods';
import { STATUS as PAYMENT_STATUS } from './constants';

const globalPaymentMethods: Record< string, string > = {};

if ( getSetting( 'globalPaymentMethods' ) ) {
	getSetting< GlobalPaymentMethod[] >( 'globalPaymentMethods' ).forEach(
		( method ) => {
			globalPaymentMethods[ method.id ] = method.title;
		}
	);
}

export const isPaymentPristine = ( state: PaymentState ) => {
	deprecated( 'isPaymentPristine', {
		since: '9.3.0',
		alternative: 'isPaymentIdle',
		plugin: 'WooCommerce Blocks',
		link: 'https://github.com/woocommerce/woocommerce-blocks/pull/8110',
	} );

	return state.status === PAYMENT_STATUS.IDLE;
};

export const isPaymentIdle = ( state: PaymentState ) =>
	state.status === PAYMENT_STATUS.IDLE;

export const isPaymentStarted = ( state: PaymentState ) => {
	return state.status === PAYMENT_STATUS.STARTED;
};

export const isPaymentProcessing = ( state: PaymentState ) =>
	state.status === PAYMENT_STATUS.PROCESSING;

export const isPaymentSuccess = ( state: PaymentState ) =>
	state.status === PAYMENT_STATUS.SUCCESS;

export const hasPaymentError = ( state: PaymentState ) =>
	state.status === PAYMENT_STATUS.ERROR;

export const isPaymentFailed = ( state: PaymentState ) =>
	state.status === PAYMENT_STATUS.FAILED;

export const isPaymentReady = ( state: PaymentState ) =>
	state.status === PAYMENT_STATUS.READY;

export const isPaymentFinished = ( state: PaymentState ) => {
	return (
		state.status === PAYMENT_STATUS.SUCCESS ||
		state.status === PAYMENT_STATUS.ERROR ||
		state.status === PAYMENT_STATUS.FAILED
	);
};

export const isExpressPaymentMethodActive = ( state: PaymentState ) => {
	return Object.keys( state.availableExpressPaymentMethods ).includes(
		state.activePaymentMethod
	);
};

export const getActiveSavedToken = ( state: PaymentState ) => {
	return typeof state.paymentMethodData === 'object' &&
		objectHasProp( state.paymentMethodData, 'token' )
		? state.paymentMethodData.token + ''
		: '';
};

export const getActivePaymentMethod = ( state: PaymentState ) => {
	return state.activePaymentMethod;
};

export const getAvailablePaymentMethods = ( state: PaymentState ) => {
	return state.availablePaymentMethods;
};

export const getAvailableExpressPaymentMethods = ( state: PaymentState ) => {
	return state.availableExpressPaymentMethods;
};

export const getPaymentMethodData = ( state: PaymentState ) => {
	return state.paymentMethodData;
};

export const getIncompatiblePaymentMethods = ( state: PaymentState ) => {
	return Object.fromEntries(
		Object.entries( globalPaymentMethods ).filter( ( [ k ] ) => {
			return ! (
				k in
				{
					...state.availablePaymentMethods,
					...state.availableExpressPaymentMethods,
				}
			);
		} )
	);
};

export const getSavedPaymentMethods = ( state: PaymentState ) => {
	return state.savedPaymentMethods;
};

/**
 * Filters the list of saved payment methods and returns only the ones which
 * are active and supported by the payment gateway
 */
export const getActiveSavedPaymentMethods = ( state: PaymentState ) => {
	const availablePaymentMethodKeys = Object.keys(
		state.availablePaymentMethods
	);

	return filterActiveSavedPaymentMethods(
		availablePaymentMethodKeys,
		state.savedPaymentMethods
	);
};

export const paymentMethodsInitialized = ( state: PaymentState ) => {
	return state.paymentMethodsInitialized;
};

export const expressPaymentMethodsInitialized = ( state: PaymentState ) => {
	return state.expressPaymentMethodsInitialized;
};

/**
 * @deprecated - Use these selectors instead: isPaymentIdle, isPaymentProcessing,
 * isPaymentFinished, hasPaymentError, isPaymentSuccess, isPaymentFailed.
 */
export const getCurrentStatus = ( state: PaymentState ) => {
	deprecated( 'getCurrentStatus', {
		since: '8.9.0',
		alternative:
			'isPaymentIdle, isPaymentProcessing, hasPaymentError, isPaymentSuccess, isPaymentFailed',
		plugin: 'WooCommerce Blocks',
		link: 'https://github.com/woocommerce/woocommerce-blocks/pull/7666',
	} );

	return {
		get isPristine() {
			deprecated( 'isPristine', {
				since: '9.3.0',
				alternative: 'isIdle',
				plugin: 'WooCommerce Blocks',
			} );
			return isPaymentIdle( state );
		}, // isPristine is the same as isIdle.
		isIdle: isPaymentIdle( state ),
		get isStarted() {
			deprecated( 'isStarted', {
				since: '9.3.0',
				plugin: 'WooCommerce Blocks',
				link: 'https://github.com/woocommerce/woocommerce-blocks/pull/8110',
			} );
			return isPaymentStarted( state );
		},
		isProcessing: isPaymentProcessing( state ),
		get isFinished() {
			deprecated( 'isFinished', {
				since: '9.3.0',
				plugin: 'WooCommerce Blocks',
				link: 'https://github.com/woocommerce/woocommerce-blocks/pull/8110',
			} );
			return isPaymentFinished( state );
		},
		hasError: hasPaymentError( state ),
		hasFailed: isPaymentFailed( state ),
		isSuccessful: isPaymentSuccess( state ),
		isDoingExpressPayment: isExpressPaymentMethodActive( state ),
	};
};

export const getShouldSavePaymentMethod = ( state: PaymentState ) => {
	return state.shouldSavePaymentMethod;
};

export const getPaymentResult = ( state: PaymentState ) => {
	return state.paymentResult;
};

// We should avoid using this selector and instead use the focused selectors
// We're keeping it because it's used in our unit test: assets/js/blocks/cart-checkout-shared/payment-methods/test/payment-methods.js
// to mock the selectors.
export const getState = ( state: PaymentState ) => {
	return state;
};
