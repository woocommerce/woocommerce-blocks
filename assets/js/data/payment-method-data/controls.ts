/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';
import { getPaymentMethods } from '@woocommerce/blocks-registry';
import { Action } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { ACTION_TYPES } from './action-types';
import { checkPaymentMethodsCanPay } from './check-payment-methods';

export function initializePaymentMethods(): Action | void {
	const paymentMethods = getPaymentMethods();

	const displayOrder = Array.from(
		new Set( [
			...( getSetting( 'paymentGatewaySortOrder', [] ) as [  ] ),
			...Object.keys( paymentMethods ),
		] )
	);
	if ( displayOrder.length !== Object.keys( paymentMethods ).length ) {
		// Not all payment methods we are expecting have been registered.
		return;
	}
	return {
		type: ACTION_TYPES.SET_PAYMENT_METHODS_INITIALIZED,
		initialized: true,
	};
}
export function initializeExpressPaymentMethods(): Action | void {
	const paymentMethods = getPaymentMethods();

	const displayOrder = Array.from(
		new Set( [
			...( getSetting( 'paymentGatewaySortOrder', [] ) as [  ] ),
			...Object.keys( paymentMethods ),
		] )
	);
	if ( displayOrder.length !== Object.keys( paymentMethods ).length ) {
		// Not all payment methods we are expecting have been registered.
		return;
	}
	return {
		type: ACTION_TYPES.SET_EXPRESS_PAYMENT_METHODS_INITIALIZED,
		initialized: true,
	};
}

export default {
	async [ ACTION_TYPES.SET_PAYMENT_METHODS_INITIALIZED ]() {
		return new Promise< Action | void >( ( resolve, reject ) => {
			checkPaymentMethodsCanPay()
				.then( () =>
					resolve( {
						type: ACTION_TYPES.SET_PAYMENT_METHODS_INITIALIZED,
						initialized: true,
					} )
				)
				.catch( reject );
		} );
	},
	async [ ACTION_TYPES.SET_EXPRESS_PAYMENT_METHODS_INITIALIZED ]() {
		return new Promise< Action | void >( ( resolve, reject ) => {
			checkExpressPaymentMethodsCanPay()
				.then( () =>
					resolve( {
						type:
							ACTION_TYPES.SET_EXPRESS_PAYMENT_METHODS_INITIALIZED,
						initialized: true,
					} )
				)
				.catch( reject );
		} );
	},
};
