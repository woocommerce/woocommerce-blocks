/**
 * External dependencies
 */
import type { ReactNode } from 'react';

export type ObjectType = Record< string, unknown >;
export type EmptyObjectType = Record< string, never >;

/**
 * Internal dependencies
 */
import type { CartTotals } from './cart';
import {
	CartResponseBillingAddress,
	CartResponseShippingAddress,
} from './cart-response';

export interface Supports {
	showSavedCards?: boolean;
	showSaveOption?: boolean;
	features?: string[];
	// Deprecated, in favour of showSavedCards and showSaveOption
	savePaymentInfo?: boolean;
}

export interface CanMakePaymentArgument {
	cartTotals: CartTotals;
	cartNeedsShipping: boolean;
	billingData: CartResponseBillingAddress;
	shippingAddress: CartResponseShippingAddress;
	selectedShippingMethods: Array< unknown >;
	paymentRequirements: Array< string >;
}

export type CanMakePayment = (
	cartData: CanMakePaymentArgument
	// ) => Promise< boolean | { error: { message: string } } >;
) => boolean;

export interface PaymentMethodConfig {
	// A unique string to identify the payment method client side.
	name: string;
	// A react node for your payment method UI.
	content: ReactNode;
	// A react node to display a preview of your payment method in the editor.
	edit: ReactNode;
	// A callback to determine whether the payment method should be shown in the checkout.
	canMakePayment: CanMakePayment;
	// A unique string to represent the payment method server side. If not provided, defaults to name.
	paymentMethodId?: string;
	// Object that describes various features provided by the payment method.
	supports: Supports;
	// Array of card types (brands) supported by the payment method. (See stripe/credit-card for example.)
	icons?: ObjectType;
	// A react node that will be used as a label for the payment method in the checkout.
	label: ReactNode;
	// An accessibility label. Screen readers will output this label when the payment method is selected.
	ariaLabel: string;
	// Optionally customize the label text for the checkout submit (`Place Order`) button.
	placeOrderButtonLabel?: string;
	// A React node that contains logic handling any processing your payment method has to do with saved payment methods if your payment method supports them
	savedTokenComponent?: ReactNode;
}

export type ExpressPaymentMethodConfig = Omit<
	PaymentMethodConfig,
	'icons' | 'label' | 'ariaLabel' | 'placeOrderButtonLabel'
>;

export type PaymentMethods =
	| Record< string, PaymentMethodConfig >
	| EmptyObjectType;

export type ExpressPaymentMethods =
	| Record< string, ExpressPaymentMethodConfig >
	| EmptyObjectType;
