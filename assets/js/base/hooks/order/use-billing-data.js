/**
 * External dependencies
 */
import { useCheckoutContext } from '@woocommerce/base-context';
import { useCallback } from '@wordpress/element';
/**
 * Exposes billing data api interface from the payment method data context.
 *
 */
export const useBillingData = () => {
	const {
		billingData,
		dispatchActions: { setBillingData },
	} = useCheckoutContext();
	const { email, ...billingAddress } = billingData;
	const setBillingAddress = useCallback(
		( address ) =>
			setBillingData( {
				...billingData,
				...address,
			} ),
		[ setBillingData ]
	);
	const setEmail = ( address ) =>
		setBillingData( {
			...billingData,
			email: address,
		} );
	return {
		email,
		setEmail,
		billingAddress,
		setBillingAddress,
	};
};
