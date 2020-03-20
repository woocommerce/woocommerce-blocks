/**
 * External dependencies
 */
import { useCheckoutContext } from '@woocommerce/base-context';

/**
 * Exposes billing data api interface from the payment method data context.
 *
 */
export const useBillingData = () => {
	const { billingData, dispatchActions } = useCheckoutContext();
	const { billingAddress } = billingData;
	const setBillingAddress = ( address ) =>
		dispatchActions.setBillingData( {
			...billingData,
			billingAddress: {
				...address,
			},
		} );
	return {
		billingAddress,
		setBillingAddress,
	};
};
