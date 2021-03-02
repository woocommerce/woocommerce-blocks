/**
 * External dependencies
 */
import type { ReactNode } from 'react';

export interface PaymentMethodConfig {
	// A unique string to identify the payment method client side.
	name: string;
	// A react node for your payment method UI.
	content: ReactNode;
	// A react node to display a preview of your payment method in the editor.
	edit: ReactNode;
	// A callback to determine whether the payment method should be shown in the checkout.
	canMakePayment: (
		cartData: Record< string, unknown >
	) => Promise< boolean | { error: { message: string } } >;
	// A unique string to represent the payment method server side. If not provided, defaults to name.
	paymentMethodId?: string;
	// Object that describes various features provided by the payment method.
	supports: Record< string, unknown >;
	// Array of card types (brands) supported by the payment method. (See stripe/credit-card for example.)
	icons: Record< string, unknown >;
	// A react node that will be used as a label for the payment method in the checkout.
	label: ReactNode;
	// An accessibility label. Screen readers will output this label when the payment method is selected.
	ariaLabel: string;
	// Optionally customize the label text for the checkout submit (`Place Order`) button.
	placeOrderButtonLabel?: string;
}
export type ExpressPaymentMethodConfig = Omit<
	PaymentMethodConfig,
	'icons' | 'label' | 'ariaLabel' | 'placeOrderButtonLabel'
>;
export type PaymentMethods = Partial< Record< string, PaymentMethodConfig > >;
export type ExpressPaymentMethods = Partial<
	Record< string, ExpressPaymentMethodConfig >
>;
export type PaymentMethodsDispatcher = (
	paymentMethods: PaymentMethods | ExpressPaymentMethods
) => undefined;
