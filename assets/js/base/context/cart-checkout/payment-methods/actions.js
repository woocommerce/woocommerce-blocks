/**
 * Internal dependencies
 */
import { STATUS } from './constants';
const { ERROR, FAILED, SUCCESS } = STATUS;
const SET_BILLING_DATA = 'set_billing_data';

export const statusOnly = ( type ) => ( { type } );
export const error = ( errorMessage ) => ( {
	type: ERROR,
	errorMessage,
} );
export const failed = ( {
	errorMessage,
	billingData,
	paymentMethodData,
} ) => ( {
	type: FAILED,
	errorMessage,
	billingData,
	paymentMethodData,
} );
export const success = ( { billingData, paymentMethodData } ) => ( {
	type: SUCCESS,
	billingData,
	paymentMethodData,
} );

export const setBillingData = ( billingData ) => ( {
	type: SET_BILLING_DATA,
	billingData,
} );
