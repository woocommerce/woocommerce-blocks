# WooCommerce Blocks Handbook <!-- omit in toc -->

The WooCommerce Blocks Handbook provides documentation for designers and developers on how to extend or contribute to blocks, and how internal developers should handle new releases.

## Table of Contents <!-- omit in toc -->

- [Contributors](#contributors)
- [Internal developers](#internal-developers)
- [Third-party developers](#third-party-developers)
- [Designers](#designers)

## Contributors

> You want to contribute to the WooCommerce Blocks plugin? The following documents explain you how to getting started.

-   [Contributing](contributors/contributing/README.md)
    -   [Getting Started](contributors/contributing/getting-started.md)
    -   [Coding Guidelines](contributors/contributing/coding-guidelines.md)
    -   [Block Script Assets](contributors/contributing/block-assets.md)
    -   [CSS Build System](contributors/contributing/css-build-system.md)
    -   [JavaScript Build System](contributors/contributing/javascript-build-system.md)
    -   [JavaScript Testing](contributors/contributing/javascript-testing.md)
    -   [Storybook & Components](contributors/contributing/storybook-and-components.md)

## Internal developers

> You are an internal developer? The following docuemnts explain the different blocks, the Block Client APIs, the Store API, the templates and the testing process.

-   [Blocks](internal-developers/blocks/README.md)
    -   [Stock Reservation during Checkout](internal-developers/blocks/stock-reservation.md)
    -   [Features Flags and Experimental interfaces](internal-developers/blocks/feature-flags-and-experimental-interfaces.md)
-   [Block Client APIs](internal-developers/block-client-apis/README.md)
    -   [Checkout API interface](internal-developers/block-client-apis/checkout/checkout-api.md)
    -   [Checkout Flow and Events](internal-developers/block-client-apis/checkout/checkout-flow-and-events.md)
    -   [Notices](internal-developers/block-client-apis/notices.md)
-   [Store API (REST API)](../src/StoreApi/README.md)
-   [Templates](internal-developers/templates/README.md)
    -   [BlockTemplateController.php](internal-developers/templates/block-template-controller.md)
    -   [ClassicTemplate.php](internal-developers/templates/classic-template.md)
-   [Testing](internal-developers/testing/README.md)
    -   [When to employ end to end testing](internal-developers/testing/when-to-employ-e2e-testing.md)
    -   [Smoke Testing](internal-developers/testing/smoke-testing.md)
    -   [Cart and Checkout Testing](internal-developers/testing/cart-checkout/README.md)
        -   [General Flow](internal-developers/testing/cart-checkout/general-flow.md)
        -   [Editor](internal-developers/testing/cart-checkout/editor.md)
        -   [Shipping](internal-developers/testing/cart-checkout/shipping.md)
        -   [Payments](internal-developers/testing/cart-checkout/payment.md)
        -   [Items](internal-developers/testing/cart-checkout/items.md)
        -   [Taxes](internal-developers/testing/cart-checkout/taxes.md)
        -   [Coupons](internal-developers/testing/cart-checkout/coupons.md)
        -   [Compatibility](internal-developers/testing/cart-checkout/compatibility.md)
    -   [Releases](internal-developers/testing/releases/README.md)

## Third-party developers

> You are a third-party developer? The following documents explain how to extend the WooCommerce Blocks plugin with your custom extention.

-   [Extensibility](third-party-developers/extensibility/README.md)
    -   Hooks
        -   [Actions](third-party-developers/extensibility/actions.md)
        -   [Filters](third-party-developers/extensibility/filters.md)
    -   REST API
        -   [Exposing your data in the Store API](third-party-developers/extensibility/extend-rest-api-add-data.md)
        -   [Available endpoints to extend with ExtendSchema](third-party-developers/extensibility/available-endpoints-to-extend.md)
        -   [Adding an endpoint to ExtendSchema](third-party-developers/extensibility/extend-rest-api-new-endpoint.md)
        -   [Available Formatters](third-party-developers/extensibility/extend-rest-api-formatters.md)
    -   Checkout Payment Methods
        -   [Checkout Flow and Events](third-party-developers/extensibility/checkout-flow-and-events.md)
        -   [Payment Method Integration](third-party-developers/extensibility/payment-method-integration.md)
        -   [Filtering Payment Methods](third-party-developers/extensibility/filtering-payment-methods.md)
    -   Checkout Block
        -   [IntegrationInterface](third-party-developers/extensibility/integration-interface.md)
        -   [Available Filters](third-party-developers/extensibility/available-filters.md)
        -   [Slots and Fills](third-party-developers/extensibility/slot-fills.md)
        -   [Available Slot Fills](third-party-developers/extensibility/available-slot-fills.md)
        -   [DOM Events](third-party-developers/extensibility/dom-events.md)
        -   [Filter Registry](../packages/checkout/filter-registry/README.md)

## Designers

> You are a designer? The following documents explain how to apply design-changes to the WooCommerce Blocks plugin.

-   [Theming](designers/theming/README.md)
    -   [All Products & filters](designers/theming/all-products-and-filters.md)
    -   [Cart and Checkout](designers/theming/cart-and-checkout.md)
    -   [Class names update in 4.6.0](designers/theming/class-names-update-460.md)
    -   [Class names update in 3.4.0](designers/theming/class-names-update-340.md)
    -   [Class names update in 3.3.0](designers/theming/class-names-update-330.md)
    -   [Class names update in 2.8.0](designers/theming/class-names-update-280.md)
    -   [Product grid blocks style update in 2.7.0](designers/theming/product-grid-270.md)

<!-- ## Tutorials -->

<!--
| Target group           | Document                                                             | Description                                                                                              |
| ---------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Contributors           | [Contributing](contributors/contributing/README.md)                  | These documents explain how you can contribute to the WooCommerce Blocks development.                    |
| Internal Developers    | [Blocks](internal-developers/blocks/README.md)                       | These documents explain the functionality specific to certain Blocks.                                    |
| Internal Developers    | [Block Client APIs](internal-developers/block-client-apis/README.md) | These documents explain the API interfaces.                                                              |
| Internal Developers    | [Store API (REST API)](../src/StoreApi/README.md)                    | These documents explain the Store API used to get product data on the frontend.                          |
| Internal Developers    | [Templates](internal-developers/templates/README.md)                 | These documents explain the technical aspects of the WooCommerce block templates and template parts.     |
| Internal Developers    | [Testing](internal-developers/testing/README.md)                     | These documents explain the testing process.                                                             |
| Third-Party Developers | [Extensibility](third-party-developers/extensibility/README.md)      | These documents explain the extensibility of WooCommerce Blocks.                                         |
| Designers              | [Theming](designers/theming/README.md)                               | These documents explain the theming for blocks, styles, CSS classnames and other theming best practices. |
 -->

<!-- FEEDBACK -->

---

[We're hiring!](https://woocommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20./docs/README.md)

<!-- /FEEDBACK -->
