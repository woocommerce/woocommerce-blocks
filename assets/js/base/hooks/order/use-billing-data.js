/**
 * External dependencies
 */
import { useCheckoutContext } from '@woocommerce/base-context';

/**
 * Exposes billing data api interface from the payment method data context.
 *
 */
export const useBillingData = () => {
	const {
		billingData,
		dispatchActions: { setBillingData },
	} = useCheckoutContext();
	const { billingAddress, emailAddress } = billingData;
	const setBillingAddress = ( address ) =>
		setBillingData( {
			...billingData,
			billingAddress: {
				...address,
			},
		} );

	const setEmailAddress = ( email ) =>
		setBillingData( { ...billingData, emailAddress: email } );
	return {
		emailAddress,
		setEmailAddress,
		billingAddress,
		setBillingAddress,
	};
};
