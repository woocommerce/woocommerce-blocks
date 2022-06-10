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
	const { setBillingData, setShippingAddress } = useCustomerData();
	const {
		setPaymentMethodData,
		setPaymentStatus: setDataStorePaymentStatus,
	} = useDispatch( PAYMENT_METHOD_DATA_STORE_KEY );

	const dispatchActions = useMemo(
		(): PaymentMethodDispatchers => ( {
			setRegisteredPaymentMethods: ( paymentMethods ) =>
				void dispatch(
					actions.setRegisteredPaymentMethods( paymentMethods )
				),
			setRegisteredExpressPaymentMethods: ( paymentMethods ) =>
				void dispatch(
					actions.setRegisteredExpressPaymentMethods( paymentMethods )
				),
			setActivePaymentMethod: ( paymentMethod, paymentMethodData = {} ) =>
				void dispatch(
					actions.setActivePaymentMethod(
						paymentMethod,
						paymentMethodData
					)
				),
		} ),
		[ dispatch ]
	);

	const setPaymentStatus = useCallback(
		(): PaymentStatusDispatchers => ( {
			pristine: () => dispatch( actions.statusOnly( STATUS.PRISTINE ) ),
			started: () => dispatch( actions.statusOnly( STATUS.STARTED ) ),
			processing: () =>
				dispatch( actions.statusOnly( STATUS.PROCESSING ) ),
			completed: () => dispatch( actions.statusOnly( STATUS.COMPLETE ) ),
			error: ( errorMessage ) =>
				dispatch( actions.error( errorMessage ) ),
			failed: (
				errorMessage,
				paymentMethodData,
				billingData = undefined
			) => {
				if ( billingData ) {
					setBillingData( billingData );
				}
				dispatch(
					actions.failed( {
						errorMessage: errorMessage || '',
						paymentMethodData: paymentMethodData || {},
					} )
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
			dispatch,
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
