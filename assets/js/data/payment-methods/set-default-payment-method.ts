/**
 * External dependencies
 */
import { select, dispatch } from '@wordpress/data';
import { PaymentMethods } from '@woocommerce/type-defs/payments';

/**
 * Internal dependencies
 */
import { STORE_KEY as PAYMENT_METHOD_DATA_STORE_KEY } from './constants';
import { STATUS } from '../../base/context/providers/cart-checkout/payment-methods/constants';
import { getCustomerPaymentMethods } from '../../base/context/providers/cart-checkout/payment-methods/utils';

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

	dispatch( PAYMENT_METHOD_DATA_STORE_KEY ).setPaymentStatus(
		STATUS.PRISTINE
	);
	const objectOfPaymentMethods =
		allPaymentMethodKeys.reduce< PaymentMethods >(
			( accumulator, current ) => {
				accumulator[ current ] = null;
				return accumulator;
			},
			{}
		);

	const customerPaymentMethods = getCustomerPaymentMethods(
		objectOfPaymentMethods
	);
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
