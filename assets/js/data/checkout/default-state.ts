/**
 * External dependencies
 */
import { isSameAddress } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import { STATUS, checkoutData } from './constants';
import { CheckoutState } from './types';

export const defaultState: CheckoutState = {
	redirectUrl: '',
	status: STATUS.PRISTINE,
	hasError: false,
	isCart: false,
	orderId: checkoutData.order_id,
	customerId: checkoutData.customer_id,
	calculatingCount: 0,
	orderNotes: '',
	useShippingAsBilling: isSameAddress(
		checkoutData.billing_address,
		checkoutData.shipping_address
	),
	shouldCreateAccount: false,
	processingResponse: null,
	extensionData: {},
};
