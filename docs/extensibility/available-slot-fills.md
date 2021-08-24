# Available Slots

To see how to use a slotFill, [check this document](./slot-fills.md).

This is a list of available slots that you can use. If you want to add a new slotFill, [check this document](../../pacakges/checkout/slot/README.md).

**Note About Naming:** Slots that are prefixed with `Experminetal` are, as they say, exprimental and not final, they're are subject to change or remove, once they graduate from expermintal, the naming would change so you should be aware of that.
Check the [Feature Gating document](../blocks/feature-flags-and-experimental-interfaces.md) from more information.

## ExperimentalOrderMeta
This Slot renders below the Checkout summary section and above the "Proceed to Checkout" button in the Cart.

<img width="1135" alt="image" src="https://user-images.githubusercontent.com/6165348/118398683-a0202700-b651-11eb-8a4f-cd8b6ebff53f.png">

### Passed parameters

- `cart`: `wc/store/cart` data but in `camelCase` instead of `snake_case`. [Object breakdown.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/c00da597efe4c16fcf5481c213d8052ec5df3766/assets/js/type-defs/cart.ts#L172-L188)
- `extensions`: external data registered by third-party developers using `ExtendRestAPI`. If you used `ExtendRestAPI` on `wc/store/cart` you would find your data under your namespace here.

## ExperimentalOrderShippingPackages
This slot renders inside the shipping step of Checkout and inside the shipping options in Cart.

Cart:

<img width="1151" alt="image" src="https://user-images.githubusercontent.com/6165348/118399054-2b4dec80-b653-11eb-94a0-989e2e6e362a.png">

Checkout:

<img width="1233" alt="image" src="https://user-images.githubusercontent.com/6165348/118399133-90094700-b653-11eb-8ff0-c917947c199f.png">

### Passed parameters

- `collapsible`: `Boolean` If a shipping package panel should be collapsible or not, this is false in Checkout and true in Cart.
- `collapse`: `Boolean` If a panel should be collapsed by default, this is true if there's more than 1 fill registered (Core Shipping options are registered as a fill and they're counted).
- `showItems`: `Boolean` If we should show the content of each package, this is true if there's more than 1 fill registered (Core Shipping options are registered as a fill and they're counted).
- `noResultsMessage`: A React element that you can render if there are no shipping options.
- `renderOption`: a render function that takes a rate object and returns a render option.
- `cart`: `wc/store/cart` data but in `camelCase` instead of `snake_case`. [Object breakdown.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/c00da597efe4c16fcf5481c213d8052ec5df3766/assets/js/type-defs/cart.ts#L172-L188)
- `extensions`: external data registered by third-party developers using `ExtendRestAPI`, if you used `ExtendRestAPI` on `wc/store/cart` you would find your data under your namespace here.
- `components`: an object containing components you can use to render your own shipping rates, it contains `ShippingRatesControlPackage`.

## ExperimentalDiscountsMeta
This slot renders below the `CouponCode` input. 

Cart:
<img alt="Cart showing ExperimentalDiscountsMeta location" src="https://user-images.githubusercontent.com/5656702/122774218-ea27a880-d2a0-11eb-9450-11f119567f26.png" />

Checkout:
<img alt="Checkout showing ExperimentalDiscountsMeta location" src="https://user-images.githubusercontent.com/5656702/122779606-efd3bd00-d2a5-11eb-8c84-6525eca5d704.png" />

### Passed paramters
- `cart`: `wc/store/cart` data but in `camelCase` instead of `snake_case`. [Object breakdown.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/c00da597efe4c16fcf5481c213d8052ec5df3766/assets/js/type-defs/cart.ts#L172-L188)
- `extensions`: external data registered by third-party developers using `ExtendRestAPI`, if you used `ExtendRestAPI` on `wc/store/cart` you would find your data under your namespace here.
