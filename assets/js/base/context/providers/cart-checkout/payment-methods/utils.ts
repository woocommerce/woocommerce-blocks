/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';
import { getPaymentMethods } from '@woocommerce/blocks-registry';

/**
 * Internal dependencies
 */
import type { PaymentMethods, CustomerPaymentMethod } from './types';

/**
 * Gets the payment methods saved for the current user after filtering out disabled ones.
 */
export const getCustomerPaymentMethods = (
	availablePaymentMethods: PaymentMethods = {}
): Record< string, CustomerPaymentMethod > => {
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
	const customerPaymentMethods = getSetting<
		Record< string, CustomerPaymentMethod[] >
	>( 'customerPaymentMethods', {} );

	const paymentMethodKeys = Object.keys( customerPaymentMethods );
	const enabledCustomerPaymentMethods = {} as Record<
		string,
		CustomerPaymentMethod
	>;
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
