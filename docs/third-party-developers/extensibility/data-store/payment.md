# wc/store/payment

## Table of Contents

-   [Overview](#overview)
-   [Selectors](#selectors)
    -   [isExpressPaymentMethodActive](#isexpresspaymentmethodactive)
    -   [getActiveSavedToken](#getactivesavedtoken)

## Overview

The payment data store is used to store payment method data and payment processing information. When the payment status
changes, the data store will reflect this.

Currently, all the actions are internal-only while we determine which ones will be useful for extensions to interact
with. We do not encourage extensions to dispatch actions onto this data store yet.

## Selectors

### isExpressPaymentMethodActive

Returns whether an express payment method is active, this will be true when the express payment method is open and
taking user input. In the case of GPay it is when the modal is open but other payment methods may have different UIs.

#### _Returns_

`boolean` - Whether an express payment method is active.

#### _Example

```js
const store = select( 'wc/store/payment' );
const isExpressPaymentMethodActive = store.isExpressPaymentMethodActive();
```

### getActiveSavedToken

Returns the active saved token. Payment methods that customers have saved to their account have tokens associated with
them. If one of these is selected then this selector returns the token that is currently active. If one is not selected
this will return an empty string.

#### _Returns_

`string` - The active saved token ID, or empty string if a saved token is not selected.

#### _Example

```js
const store = select( 'wc/store/payment' );
const activeSavedToken = store.getActiveSavedToken();
```

<!-- FEEDBACK -->

---

[We're hiring!](https://woocommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/woocommerce/woocommerce-blocks/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20./docs/third-party-developers/extensibility/checkout-payment-methods/checkout-flow-and-events.md)

<!-- /FEEDBACK -->
