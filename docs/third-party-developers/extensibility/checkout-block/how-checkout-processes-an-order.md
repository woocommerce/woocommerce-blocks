# How The Checkout Block Processes an Order

This is an attempt to shed some light on the inner workings of the Checkout Flow. More specifically, what happens after a user hits the “Place Order” button.

## Structure

These are the main areas associated with processing the checkout for a user

### The Payment Registry [:file_folder:](https://href.li/?https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/blocks-registry/payment-methods/registry.ts#L1)

We have a payment registry that stores all the configuration information for each payment method. We can register a new payment method here with the `registerPaymentMethod` and `registerExpressPaymentMethod `functions, also available to third parties.

### Data Stores

We use data stores to keep track of data that is likely to change during a user’s session, such as the active payment method, wether the checkout has an error, etc. We split these data stores by areas of concern, so we have 2 data stores related to the checkout: `wc/store/checkout` [:file_folder:](https://href.li/?https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/data/checkout/index.ts#L1) and `wc/store/payment` [:file_folder:](https://href.li/?https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/data/payment-methods/index.ts#L1) . Data stores live in the `assets/js/data` folder.

### Contexts

We use several contexts that make data available to the Checkout block. Each of these provide data and functions related to a specific area of concern, via the use of a hook. For example, if we wanted to the `onPaymentProcessing` handler from the `PaymentEventsContext` context, we can do it like this:

```js
const { onPaymentProcessing } = usePaymentEventsContext();
```

The other job of contexts is to run side effects for our Checkout block. What typically happens is that the `CheckoutEvents` and `PaymentEvents` will listen for changes in the checkout and payment data stores, and dispatch actions on those stores based on some logic.

For example, in the `CheckoutEvents` context, we dispatch the `emitValidateEvent` action when the checkout status is `before_processing`. There is a lot of similar logic that reacts to changes in status and other state data from these two stores.

The Checkout contexts are:

-   [CheckoutEvents](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/base/context/providers/cart-checkout/checkout-events/index.tsx#L4) - provides some checkout related event handlers
-   [PaymentEvents](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/base/context/providers/cart-checkout/payment-methods/payment-method-events-context.tsx#L3) - provides event handlers related to payments
-   [CustomerData](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/base/context/providers/cart-checkout/customer/index.tsx#L1) - provides data related to the current customer
-   [ShippingData](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/base/context/providers/cart-checkout/shipping/index.js#L1) - provides data and actions related to shipping errors

### The Checkout Processor (checkout-processor.js)

This is a component that much like some of the contexts, subscribes to changes in the checkout or payment data stores, packages up some of this data and calls the StoreApi `/checkout` endpoint when the conditions are right.

## The Checkout Provider

This lives [here](https://github.com/woocommerce/woocommerce-blocks/blob/trunk/assets/js/base/context/providers/cart-checkout/checkout-provider.js), and wraps all the contexts mentioned above around the `CheckoutProcessor` component.

---

## Checkout User Flow

This is what happens when a user places an order:

### 1\. Click the "Place Order" button

The checkout process starts when a user clicks the button

### 2\. Checkout status is set to `before_processing` [:file_folder:](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/base/context/providers/cart-checkout/checkout-events/index.tsx#L167)

As soon as the user clicks the "Place Order" button, we change the checkout status to _"before_processing"_. This is where we handle the validation of the checkout information.

### 3\. Emit the `checkout_validation_before_processing` event [:file_folder:](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/base/context/providers/cart-checkout/checkout-events/index.tsx#L113)

This is where our own app, as well as third party plugins can register event listeners for dealing with validation. The event listeners for this event will run and if there are errors, we set checkout status to `idle` and display the errors to the user.

If there are no errors, we move to (4) below.

### 4\. Checkout status is set to `processing` [:file_folder:](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/data/checkout/thunks.ts#L76)

This is purely so that we know we are processing the checkout. It's used by step (5) below to change the payment status

### 5\. Payment status is set to `processing` [:file_folder:](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/base/context/providers/cart-checkout/payment-methods/payment-method-events-context.tsx#L94)

Once all the checkout processing is done and if there are no errors, the payment processing begins

### 6\. Emit the `payment_processing` event [:file_folder:](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/data/payment-methods/thunks.ts#L42)

We send out the `payment_processing` event. Third party plugins can register event listeners for this event and run their own code.

For example, the Stripe plugin checks the address and payment details here, and uses the stripe APIs to create a customer and payment reference within Stripe.

**Important to note the actual payment is not taken here**. **It's more of a pre-payment hook to run any third party code before the actual payment is attempted.**

### 7\. Process the `payment_processing` event listeners and set the payment and checkout states accordingly [:file_folder:](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/data/payment-methods/thunks.ts#L54-L132)

If the registered event listeners return errors, we will display this to the user

If the event listeners are considered successful, we sync up the address of the checkout with the payment address, store the `paymentMethodData` in the payment store, and set the payment status property `{ isProcessing: true }`

### 8\. POST to `/wc/store/v1/checkout` (assuming no errors present) [:file_folder:](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/base/context/providers/cart-checkout/checkout-processor.js#L234)

If everything is looking good, there are no payment errors, we call the `/checkout` StoreApi endpoint. This will take the final customer addresses and chosen payment method, and any additional payment data, then attempts payment and returns the result.

**Important: payment is attempted through the StoreApi, NOT through the `payment_processing` event that is sent from the client**

### 9\. The `processCheckoutResponse` action is triggered on the checkout store [:file_folder:](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/data/checkout/thunks.ts#L33)

Once the fetch to the StoreApi `/checkout` endpoint returns a response, we pass this to the `processCheckoutResponse` action on the `checkout` data store.

This does 3 things:

-   sets the redirect url to redirect to once the order is complete
-   stores the payment result in the `checkout` data store.
-   Change the checkout status to `after_processing` (step 10)

### 10\. Checkout status is set to `after_processing` [:file_folder:](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/data/checkout/thunks.ts#L42)

This indicates that we've finished the main checkout processing step. We run cleanup actions and display any errors that have been triggered during the last step here.

### 11\. The `checkout_after_processing_with_success` event is emitted [:file_folder:](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/data/checkout/thunks.ts#L118-L128)

If there are no errors, the `checkout_after_processing_with_success` event is triggered. This is where third party plugins can run some code after the checkout process has been successful.

Any event listeners are run here. If there are no errors from the event listeners, we call the `setComplete` action on the `checkout` data store to set the status to `complete` (step 13). An event listener can return an error here for whatever reason, which will be displayed to the user.

### 12\. The `checkout_after_processing_with_error` event is emitted [:file_folder:](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/data/checkout/thunks.ts#L104-L116)

If there has been an error from step 5, the `checkout_after_processing_with_error` event will be emitted. Again, third party plugins can register event listeners to run here to display an error to the user. We process the event listeners and display any errors to the user.

### 13\. Set checkout status to `complete` [:file_folder:](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/data/checkout/utils.ts#L146)

If there are no errors, we change the `status` property in the checkout data store to `complete`.

### 14\. Redirect [:file_folder:](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/base/context/providers/cart-checkout/checkout-processor.js#L193-L197)

Once the checkout status is set to `complete` and if there is a `redirectUrl` in the checkout data store, then we redirect the user to the URL.

## Other notable things

### Checking a payment method can pay

A payment method is registered with a configuration object, which looks like [this](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/types/type-defs/payments.ts#L60-L83). It must include a function named `canMakePayment`. This function should return true if the payment method can be used to pay for the current cart. The current cart (items, addresses, shipping methods etc.) is passed to this function, and each payment method is responsible for reporting whether it can be used.

There is a helper function `checkPaymentMethodsCanPay()` [:file_folder:](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/data/payment-methods/check-payment-methods.ts#L26) that goes through all the registered payment methods, checks if they can pay, and if so, adds them to the `availablePaymentMethods` property on the payment data store.

This must be called in a few places in order to validate the payment methods before they can be displayed to the user as viable options.

-   [Here](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/data/cart/index.ts#L46-L57), once the cart loads, we want to be able to display express payment methods, so we need to validate them first.
-   [Here](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/data/cart/index.ts#L42-L43), once the cart changes, we may want to enable/disable certain payment methods
-   [Here](https://github.com/woocommerce/woocommerce-blocks/blob/4af2c0916a936369be8a4f0044683b90b3af4f0d/assets/js/data/checkout/index.ts#L44-L49), once the checkout loads, we want to verify all registered payment methods
