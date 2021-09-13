/**
 * External dependencies
 */
import { CanMakePaymentCallback } from '@woocommerce/type-defs/payments';

type CanMakePaymentExtensionCallbacks = Record<
	string,
	CanMakePaymentCallback
>;
export type ExtensionNamespace = keyof CanMakePaymentExtensionsCallbacks;
export type PaymentMethodName = keyof CanMakePaymentExtensionCallbacks;

export type CanMakePaymentExtensionsCallbacks = Record<
	PaymentMethodName,
	CanMakePaymentExtensionCallbacks
>;

// Keeps callbacks registered by extensions for different payment methods
/* eslint prefer-const: 0 */
export let canMakePaymentExtensionsCallbacks: CanMakePaymentExtensionsCallbacks = {};

export const extensionsConfig = {
	canMakePayment: canMakePaymentExtensionsCallbacks,
};
