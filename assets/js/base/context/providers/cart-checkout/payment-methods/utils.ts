/**
 * External dependencies
 */
import { getPaymentMethods } from '@woocommerce/blocks-registry';
import { select } from '@wordpress/data';
import { PaymentMethods } from '@woocommerce/type-defs/payments';
import { PAYMENT_METHOD_DATA_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import type { CustomerPaymentMethod } from './types';

/**
 * Gets the payment methods saved for the current user after filtering out disabled ones.
 */
export const getCustomerPaymentMethods = (
	availablePaymentMethods: PaymentMethods = {}
): Record< string, CustomerPaymentMethod[] > => {
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
	const customerPaymentMethods = select(
		PAYMENT_METHOD_DATA_STORE_KEY
	).getCustomerPaymentMethods();

	const paymentMethodKeys = Object.keys( customerPaymentMethods );
	const enabledCustomerPaymentMethods = {} as Record<
		string,
		CustomerPaymentMethod[]
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
