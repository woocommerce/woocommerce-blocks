/**
 * External dependencies
 */
import { PaymentResult, Address } from '@woocommerce/types';

export interface CheckoutResponseSuccess {
	billing_address: Address;
	customer_id: number;
	customer_note: string;
	extensions: Record< string, unknown >;
	order_id: number;
	order_key: string;
	payment_method: string;
	payment_result: PaymentResult;
	shipping_address: Address;
	status: string;
}

export interface CheckoutResponseError {
	code: string;
	message: string;
	data: {
		status: number;
	};
}

export type CheckoutResponse = CheckoutResponseSuccess | CheckoutResponseError;
