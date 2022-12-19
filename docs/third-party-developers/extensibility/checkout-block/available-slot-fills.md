# Available Slots <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

-   [ExperimentalOrderMeta](#experimentalordermeta)
    -   [Passed parameters](#passed-parameters)
-   [ExperimentalOrderShippingPackages](#experimentalordershippingpackages)
    -   [Passed parameters](#passed-parameters-1)
-   [ExperimentalDiscountsMeta](#experimentaldiscountsmeta)
    -   [Passed paramters](#passed-paramters)

This document presents the list of available Slots that you can use for adding your custom content (Fill).

If you want to add a new SlotFill component, check the [Checkout - Slot Fill document](../../../../packages/checkout/slot/README.md). To read more about Slot and Fill, check the [Slot and Fill document](./slot-fills.md).

**Note About Naming:** Slots that are prefixed with `Experimental` are experimental and subject to change or remove. Once they graduate from the experimental stage, the naming would change and the `Experimental` prefix would be dropped. Check the [Feature Gating document](../../../internal-developers/blocks/feature-flags-and-experimental-interfaces.md) from more information.

## ExperimentalOrderMeta

This Slot renders below the Checkout summary section and above the "Proceed to Checkout" button in the Cart.

Cart:

![Example of ExperimentalOrderMeta in the Cart block](https://user-images.githubusercontent.com/1628454/154517779-117bb4e4-568e-413c-904c-855fc3450dfa.png)

Checkout:

![Example of ExperimentalOrderMeta in the Checkout block](https://user-images.githubusercontent.com/1628454/154697224-de245182-6783-4914-81ba-1dbcf77292eb.png)

### Passed parameters

-   `cart`: `wc/store/cart` data but in `camelCase` instead of `snake_case`. [Object breakdown.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/c00da597efe4c16fcf5481c213d8052ec5df3766/assets/js/type-defs/cart.ts#L172-L188)
-   `extensions`: external data registered by third-party developers using `ExtendSchema`. If you used `ExtendSchema` on `wc/store/cart` you would find your data under your namespace here.
-   `context`, equal to the name of the Block in which the fill is rendered: `woocommerce/cart` or `woocommerce/checkout`

## ExperimentalOrderShippingPackages

This slot renders inside the shipping step of Checkout and inside the shipping options in Cart.

Cart:

![Example of ExperimentalOrderShippingPackages in the Cart block](https://user-images.githubusercontent.com/6165348/118399054-2b4dec80-b653-11eb-94a0-989e2e6e362a.png)

Checkout:

![Example of ExperimentalOrderShippingPackages in the Checkout block](https://user-images.githubusercontent.com/6165348/118399133-90094700-b653-11eb-8ff0-c917947c199f.png)

### Passed parameters

-   `collapsible`: `Boolean|undefined` If a shipping package panel should be collapsible or not, this is false in Checkout and undefined in Cart.
-   `collapse`: `Boolean` If a panel should be collapsed by default, this is true if if panels are collapsible.
-   `showItems`: `Boolean|undefined` If we should show the content of each package, this is undefined in Cart and Checkout and is left to the actual package logic to decide.
-   `noResultsMessage`: A React element that you can render if there are no shipping options.
-   `renderOption`: a render function that takes a rate object and returns a render option.
-   `cart`: `wc/store/cart` data but in `camelCase` instead of `snake_case`. [Object breakdown.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/c00da597efe4c16fcf5481c213d8052ec5df3766/assets/js/type-defs/cart.ts#L172-L188)
-   `extensions`: external data registered by third-party developers using `ExtendSchema`, if you used `ExtendSchema` on `wc/store/cart` you would find your data under your namespace here.
-   `components`: an object containing components you can use to render your own shipping rates, it contains `ShippingRatesControlPackage`.
-   `context`, equal to the name of the Block in which the fill is rendered: `woocommerce/cart` or `woocommerce/checkout`

## ExperimentalDiscountsMeta

This slot renders below the `CouponCode` input.

Cart:

![Cart showing ExperimentalDiscountsMeta location](https://user-images.githubusercontent.com/5656702/122774218-ea27a880-d2a0-11eb-9450-11f119567f26.png)

Checkout:

![Checkout showing ExperimentalDiscountsMeta location](https://user-images.githubusercontent.com/5656702/122779606-efd3bd00-d2a5-11eb-8c84-6525eca5d704.png)

### Passed paramters

-   `cart`: `wc/store/cart` data but in `camelCase` instead of `snake_case`. [Object breakdown.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/c00da597efe4c16fcf5481c213d8052ec5df3766/assets/js/type-defs/cart.ts#L172-L188)
-   `extensions`: external data registered by third-party developers using `ExtendSchema`, if you used `ExtendSchema` on `wc/store/cart` you would find your data under your namespace here.
-   `context`, equal to the name of the Block in which the fill is rendered: `woocommerce/cart` or `woocommerce/checkout`

<!-- FEEDBACK -->

---

[We're hiring!](https://woocommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/woocommerce/woocommerce-blocks/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20./docs/third-party-developers/extensibility/checkout-block/available-slot-fills.md)

<!-- /FEEDBACK -->

