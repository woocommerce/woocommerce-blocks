/**
 * External dependencies
 */
import { useCallback, useMemo } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { PAYMENT_METHOD_DATA_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import type {
	PaymentStatusDispatchers,
	PaymentMethodDispatchers,
} from '../../../../../data/payment-methods/types';
import { useCustomerData } from '../../../hooks/use-customer-data';

export const usePaymentMethodDataDispatchers = (): {
	dispatchActions: PaymentMethodDispatchers;
	setPaymentStatus: () => PaymentStatusDispatchers;
} => {
	const { setBillingData, setShippingAddress } = useCustomerData();
	const {
		setPaymentMethodData,
		setPaymentStatus: setDataStorePaymentStatus,
		setRegisteredPaymentMethods,
		setRegisteredExpressPaymentMethod,
		setActivePaymentMethod,
	} = useDispatch( PAYMENT_METHOD_DATA_STORE_KEY );

	const dispatchActions = useMemo(
		(): PaymentMethodDispatchers => ( {
			setRegisteredPaymentMethods: ( paymentMethods ) =>
				setRegisteredPaymentMethods( paymentMethods ),
			setRegisteredExpressPaymentMethods: ( paymentMethods ) =>
				setRegisteredExpressPaymentMethod( paymentMethods ),
			setActivePaymentMethod: ( paymentMethod, paymentMethodData = {} ) =>
				setActivePaymentMethod( paymentMethod, paymentMethodData ),
		} ),
		[
			setRegisteredPaymentMethods,
			setRegisteredExpressPaymentMethod,
			setActivePaymentMethod,
		]
	);

	const setPaymentStatus = useCallback(
		(): PaymentStatusDispatchers => ( {
			pristine: () => setDataStorePaymentStatus( { isPristine: true } ),
			started: () => setDataStorePaymentStatus( { isStarted: true } ),
			processing: () =>
				setDataStorePaymentStatus( { isProcessing: true } ),
			error: ( errorMessage ) =>
				setDataStorePaymentStatus( { hasError: true }, errorMessage ),
			failed: (
				errorMessage,
				paymentMethodData,
				billingData = undefined
			) => {
				if ( billingData ) {
					setBillingData( billingData );
				}
				setDataStorePaymentStatus(
					{ hasFailed: true },
					( errorMessage = errorMessage || '' ),
					paymentMethodData
				);
			},
			success: (
				paymentMethodData,
				billingData = undefined,
				shippingData = undefined
			) => {
				if ( billingData ) {
					setBillingData( billingData );
				}
				if (
					typeof shippingData !== undefined &&
					shippingData?.address
				) {
					setShippingAddress(
						shippingData.address as Record< string, unknown >
					);
				}
				setPaymentMethodData( paymentMethodData );
				setDataStorePaymentStatus( {
					isSuccessful: true,
				} );
			},
		} ),
		[
			setBillingData,
			setShippingAddress,
			setPaymentMethodData,
			setDataStorePaymentStatus,
		]
	);

	return {
		dispatchActions,
		setPaymentStatus,
	};
};
