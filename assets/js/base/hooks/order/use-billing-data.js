// @ts-nocheck
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

	const {
		billingAddress: { email, ...billingAddress },
	} = billingData;
	const setBillingAddress = ( address ) =>
		setBillingData( {
			...billingData,
			billingAddress: {
				...billingAddress,
				...address,
			},
		} );

	const setEmail = ( address ) =>
		setBillingData( {
			...billingData,
			billingAddress: {
				...billingAddress,
				email: address,
			},
		} );

	return {
		email,
		setEmail,
		billingAddress,
		setBillingAddress,
	};
};
