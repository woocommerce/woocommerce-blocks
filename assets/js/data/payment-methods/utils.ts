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

/**
 * Given the order of methods from WooCommerce -> Payments, this method takes that order and sorts the list of available
 * payment methods to match it. This is required to ensure the payment methods show up in the correct order in the
 * Checkout
 *
 * @param  order   The order of payment methods from WooCommerce -> Settings -> Payments.
 * @param  methods The list of payment method names to add to the state as available.
 *
 * @return string[] The list of available methods in their correct order.
 */
export const orderPaymentMethods = ( order: string[], methods: string[] ) => {
	const orderedMethods: string[] = [];
	order.forEach( ( paymentMethodName ) => {
		if ( methods.includes( paymentMethodName ) ) {
			orderedMethods.push( paymentMethodName );
		}
	} );
	// Now find any methods in `methods` that were not added to `orderedMethods` and append them to `orderedMethods`
	methods
		.filter( ( methodName ) => ! orderedMethods.includes( methodName ) )
		.forEach( ( methodName ) => orderedMethods.push( methodName ) );

	return orderedMethods;
};
