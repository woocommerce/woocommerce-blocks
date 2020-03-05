/**
 * External dependencies
 */
import { usePaymentMethodDataContext } from '@woocommerce/base-context';

export const useBillingData = () => {
	const { billingData, setBillingData } = usePaymentMethodDataContext();
	return {
		billingData,
		setBillingData,
	};
};
