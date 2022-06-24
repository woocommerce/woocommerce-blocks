/**
 * External dependencies
 */
import { getPaymentMethods } from '@woocommerce/blocks-registry';
import { PaymentMethods } from '@woocommerce/type-defs/payments';

/**
 * Internal dependencies
 */
import type { CustomerPaymentMethods } from './types';

/**
 * Gets the payment methods saved for the current user after filtering out disabled ones.
 */
export const filterEnabledCustomerPaymentMethods = (
	availablePaymentMethods: PaymentMethods = {},
	customerPaymentMethods: CustomerPaymentMethods
): CustomerPaymentMethods => {
	if ( Object.keys( availablePaymentMethods ).length === 0 ) {
		return {};
	}
	const registeredPaymentMethods = getPaymentMethods();
	const availablePaymentMethodsWithConfig = Object.fromEntries(
		Object.keys( availablePaymentMethods ).map( ( name ) => [
			name,
			registeredPaymentMethods[ name ],
		] )
	);

	const paymentMethodKeys = Object.keys( customerPaymentMethods );
	const enabledCustomerPaymentMethods = {} as CustomerPaymentMethods;
	paymentMethodKeys.forEach( ( type ) => {
		const methods = customerPaymentMethods[ type ].filter(
			( {
				method: { gateway },
			}: {
				method: {
					gateway: string;
				};
			} ) =>
				gateway in availablePaymentMethodsWithConfig &&
				availablePaymentMethodsWithConfig[ gateway ].supports
					?.showSavedCards
		);
		if ( methods.length ) {
			enabledCustomerPaymentMethods[ type ] = methods;
		}
	} );
	return enabledCustomerPaymentMethods;
};
