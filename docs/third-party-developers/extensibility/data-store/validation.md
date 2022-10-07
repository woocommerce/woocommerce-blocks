# wc/store/validation

## Table of Contents

-   [Selectors](#selectors)
    -   [getValidationError](#getvalidationerror)
    -   [getValidationErrorId](#getvalidationerrorid)
    -   [hasValidationErrors](#hasvalidationerrors)
-   [Actions](#actions)
    -   [clearValidationErrors](#clearvalidationerrors)

## Selectors

### getValidationError

Returns the validation error.

#### _Parameters_

- _errorId_ `string` - The error ID to get validation errors for.

#### Example

```js
const store = select( 'wc/store/validation' );
const billingFirstNameError = store.getValidationError( 'billing-first-name' );
```


#### _Returns_

-   `object`: The validation error which is an object containing _message_ (`string`) and _hidden_ (`boolean`).

### getValidationErrorId

Gets a validation error ID for use in HTML which can be used as a CSS selector, or to reference an error message.
This will return the error ID prefixed with `validate-error-`, unless the validation error has `hidden` set to true, or
the validation error does not exist in the store.

#### _Parameters_

- _errorId_ `string` - The error ID to get the validation error ID for.

#### _Returns_

-   `string`: The validation error ID for use in HTML.

### hasValidationErrors

Returns true if validation errors occurred, and false otherwise.

#### _Returns_

-   `boolean`: Whether validation errors occured.

## Actions

### clearValidationErrors

Clears the validation errors.

<!-- FEEDBACK -->

---

[We're hiring!](https://woocommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/woocommerce/woocommerce-blocks/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20./docs/third-party-developers/extensibility/checkout-payment-methods/checkout-flow-and-events.md)

<!-- /FEEDBACK -->
