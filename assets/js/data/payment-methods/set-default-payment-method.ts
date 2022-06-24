/**
 * External dependencies
 */
import { select, dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_KEY as PAYMENT_METHOD_DATA_STORE_KEY } from './constants';

export const setDefaultPaymentMethod = async ( methods: string[] ) => {
	const paymentMethodKeys = methods;

	const expressPaymentMethodKeys = select(
		PAYMENT_METHOD_DATA_STORE_KEY
	).getAvailableExpressPaymentMethods();
	const activePaymentMethod = select(
		PAYMENT_METHOD_DATA_STORE_KEY
	).getActivePaymentMethod();

	const allPaymentMethodKeys = [
		...paymentMethodKeys,
		...expressPaymentMethodKeys,
	];

	// Return if current method is valid.
	if (
		activePaymentMethod &&
		allPaymentMethodKeys.includes( activePaymentMethod )
	) {
		return;
	}

	dispatch( PAYMENT_METHOD_DATA_STORE_KEY ).setPaymentStatus( {
		isPristine: true,
	} );

	const customerPaymentMethods = select(
		PAYMENT_METHOD_DATA_STORE_KEY
	).getEnabledCustomerPaymentMethods();

	const customerPaymentMethod =
		Object.keys( customerPaymentMethods ).flatMap(
			( type ) => customerPaymentMethods[ type ]
		)[ 0 ] || undefined;

	if ( customerPaymentMethod ) {
		const token = customerPaymentMethod.tokenId.toString();
		const paymentMethodSlug = customerPaymentMethod.method.gateway;

		const savedTokenKey = `wc-${ paymentMethodSlug }-payment-token`;

		dispatch( PAYMENT_METHOD_DATA_STORE_KEY ).setActivePaymentMethod(
			paymentMethodSlug,
			{
				token,
				payment_method: paymentMethodSlug,
				[ savedTokenKey ]: token,
				isSavedToken: true,
			}
		);
		return;
	}

	dispatch( PAYMENT_METHOD_DATA_STORE_KEY ).setActivePaymentMethod(
		paymentMethodKeys[ 0 ]
	);
};
