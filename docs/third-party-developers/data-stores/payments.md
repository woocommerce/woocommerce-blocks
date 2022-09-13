# Payments Data Store

## Overview

This is a the data store that handles all payment related data.

## Selectors

Selectors are functions that receive the state and return some derived data. You can use them like this:

```js
import { select } from '@wordpress/data';
const activePaymentMethod = select(
	`wc/store/payment-methods`
).getActivePaymentMethod();

// do something with activePaymentMethod
```

For more info on wordpress data selectors, see [the docs](https://developer.wordpress.org/block-editor/packages/packages-data/#select).

### `isExpressPaymentMethodActive()`

Returns `true` if the express payment method is active, `false` otherwise.

Returns `boolean`

### `getActivePaymentMethod()`

Returns the active payment method.

Returns `string` - name of the active payment method

### `getActivePaymentMethodToken()`

Returns the token for the active payment method.

Returns `string` - token for the active payment method

### `getAvailablePaymentMethods()`

Available payment methods are payment methods which have been validated and can make payment

Returns `Array<PaymentMethod>` - A payment method object has the following signature:

```js
{
	name: string;
	content: ReactNode;
	edit: ReactNode;
	paymentMethodId?: string;
	supports: {
		features: string[];
	};
	icons: null | PaymentMethodIcons;
	label: ReactNode;
	ariaLabel: string;
	placeOrderButtonLabel?: string;
	savedTokenComponent?: ReactNode | null;
	canMakePaymentFromConfig: CanMakePaymentCallback;
	canMakePayment: CanMakePaymentCallback;
}
```

### `getAvailableExpressPaymentMethods()`

Available express payment methods are those that can be used to pay in the current browser session. For example, if a user is signed into a Google account that has a payment method registered, Google Pay may be one of the available express payment methods.

Returns `Array<ExpressPaymentMethod>` - An express payment method object has the following signature:

```js
{
	name: string;
	content: ReactNode;
	edit: ReactNode;
	paymentMethodId?: string;
	supports: {
		features: string[];
	};
	canMakePaymentFromConfig: CanMakePaymentCallback;
	canMakePayment: CanMakePaymentCallback;
}
```
