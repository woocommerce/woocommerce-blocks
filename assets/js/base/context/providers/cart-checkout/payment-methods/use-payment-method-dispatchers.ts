/**
 * External dependencies
 */
import { useCallback, useMemo } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { PAYMENT_METHOD_DATA_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { actions, ActionType } from './actions';
import { STATUS } from './constants';
import type {
	PaymentStatusDispatchers,
	PaymentMethodDispatchers,
} from './types';
import { useCustomerData } from '../../../hooks/use-customer-data';

export const usePaymentMethodDataDispatchers = (
	dispatch: React.Dispatch< ActionType >
): {
	dispatchActions: PaymentMethodDispatchers;
	setPaymentStatus: () => PaymentStatusDispatchers;
} => {
	const { setBillingAddress, setShippingAddress } = useCustomerData();
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
			completed: () => dispatch( actions.statusOnly( STATUS.COMPLETE ) ),
			error: ( errorMessage ) =>
				setDataStorePaymentStatus( { hasError: true }, errorMessage ),
			failed: (
				errorMessage,
				paymentMethodData,
				billingAddress = undefined
			) => {
				if ( billingAddress ) {
					setBillingAddress( billingAddress );
				}
				setDataStorePaymentStatus(
					{ hasFailed: true },
					( errorMessage = errorMessage || '' ),
					paymentMethodData
				);
			},
			success: (
				paymentMethodData,
				billingAddress = undefined,
				shippingData = undefined
			) => {
				if ( billingAddress ) {
					setBillingAddress( billingAddress );
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
			dispatch,
			setBillingAddress,
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
