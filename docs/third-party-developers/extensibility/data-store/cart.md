# wc/store/cart

## Table of Contents

-   [Selectors](#selectors)
    -   [getCartData](#getcartdata)
    -   [getCustomerData](#getcustomerdata)
    -   [getShippingRates](#getshippingrates)
    -   [getNeedsShipping](#getneedsshipping)
    -   [getHasCalculatedShipping](#gethascalculatedshipping)
    -   [getCartTotals](#getcarttotals)
    -   [getCartMeta](#getcartmeta)
    -   [getCartErrors](#getcarterrors)
    -   [isApplyingCoupon](#isapplyingcoupon)
    -   [isCartDataStale](#iscartdatastale)
    -   [getCouponBeingApplied](#getcouponbeingapplied)
    -   [isRemovingCoupon](#isremovingcoupon)
    -   [getCouponBeingRemoved](#getcouponbeingremoved)
    -   [getCartItem](#getcartitem)
    -   [isItemPendingQuantity](#isitempendingquantity)
    -   [isItemPendingDelete](#isitempendingdelete)
    -   [isCustomerDataUpdating](#iscustomerdataupdating)
    -   [isShippingRateBeingSelected](#isshippingratebeingselected)

## Selectors

### getCartData

Returns the Cart data from the state

#### _Returns_

`object` - The current cart data. This will be an object with the following keys:

- `coupons` - array containing the coupon items in the cart.
- `shippingRates` - array containing the cart shipping rates
- `shippingAddress` - object containing the shipping address
- `billingAddress` - object containing the billing address
- `items` - array containing the cart items
- `itemsCount` - number containing total number of items in the cart
- `itemsWeight` - number containing the total weight of items in the cart
- `crossSells` -  array containing the cross sells
- `needsPayment` - boolean indicating if the cart needs payment
- `needsShipping`- boolean indicating if the cart needs shipping
- `hasCalculatedShipping`- boolean indicating if the cart has calculated shipping
- `fees`- array containing the cart fees
- `totals`- object containing the cart totals
- `errors`- array containing the cart errors
- `paymentRequirements`- object containing the payment requirements
- `extensions`- object containing the extensions data

#### _Example_

```js
const store = select( 'wc/store/cart' );
const cartData = store.getCartData();
```

### getCustomerData

Returns the shipping and billing address from the state

#### _Returns_

`object`- The current shipping and billing address. This will be an object with the following keys:

- `shippingAddress`- Object containing the shipping address
- `billingAddress`- Object containing the billing address


#### _Example_

```js
const store = select( 'wc/store/cart' );
const customerData = store.getCustomerData();
```

### getShippingRates

Returns the shipping rates from the state

#### _Returns_

`array`- array containing the shipping rates.

#### _Example_

```js
const store = select( 'wc/store/cart' );
const shippingRates = store.getShippingRates();
```

### getNeedsShipping

Queries whether the cart needs shipping

#### _Returns_

`boolean`- True if the cart needs shipping

#### _Example_

```js
const store = select( 'wc/store/cart' );
const needsShipping = store.getNeedsShipping();
```

### getHasCalculatedShipping

Queries whether the cart shipping has been calculated.

#### _Returns_

`boolean`- True if the shipping has been calculated.

#### _Example_

```js
const store = select( 'wc/store/cart' );
const hasCalculatedShipping = store.getHasCalculatedShipping();
```

### getCartTotals

Returns the cart totals from state.

#### _Returns_

`object`- The current cart totals. This will be an object with the following keys:

- `total_items`- string containing the total items
- `total_items_tax`- string containing the total items tax
- `total_fees`- string containing the total fees
- `total_fees_tax`- string containing the total fees tax
- `total_discount`- string containing the total discount
- `total_discount_tax`- string containing the total discount tax
- `total_shipping`- string containing the total shipping
- `total_shipping_tax`- string containing the total shipping tax
- `total_tax`- string containing the total tax
- `total_price`- string containing the total price
- `tax_lines`- array containing the tax lines

#### _Example_

```js
const store = select( 'wc/store/cart' );
const cartTotals = store.getCartTotals();
```

### getCartMeta

Returns the cart meta from state.

#### _Returns_

`object`- The current cart meta. This will be an object with the following keys:

- `updatingCustomerData`- boolean indicating if the customer data is being updated
- `updatingSelectedRate`- boolean indicating if the selected rate is being updated
- `isCartDataStale`- boolean indicating if the cart data is stale
- `applyingCoupon`- string containing the coupon code being applied
- `removingCoupon`- string containing the coupon code being removed

#### _Example_

```js
const store = select( 'wc/store/cart' );
const cartMeta = store.getCartMeta();
```

### getCartErrors

Returns the cart errors from state.

#### _Returns_

`array`- array containing the cart errors.

#### _Example_

```js
const store = select( 'wc/store/cart' );
const cartErrors = store.getCartErrors();
```

### isApplyingCoupon

Queries whether a coupon is being applied.

#### _Returns_

`boolean`- True if a coupon is being applied.

#### _Example_

```js
const store = select( 'wc/store/cart' );
const isApplyingCoupon = store.isApplyingCoupon();
```

### isCartDataStale

Queries whether the cart data is stale.

#### _Returns_

`boolean`- True if the cart data is stale.

#### _Example_

```js
const store = select( 'wc/store/cart' );
const isCartDataStale = store.isCartDataStale();
```

### getCouponBeingApplied

Returns the coupon code being applied.

#### _Returns_

`string`- The coupon code being applied.

#### _Example_

```js
const store = select( 'wc/store/cart' );
const couponBeingApplied = store.getCouponBeingApplied();
```

### isRemovingCoupon

Queries whether a coupon is being removed.

#### _Returns_

`boolean`- True if a coupon is being removed.

#### _Example_

```js
const store = select( 'wc/store/cart' );
const isRemovingCoupon = store.isRemovingCoupon();
```

### getCouponBeingRemoved

Returns the coupon code being removed.

#### _Returns_

`string`- The coupon code being removed.

#### _Example_

```js
const store = select( 'wc/store/cart' );
const couponBeingRemoved = store.getCouponBeingRemoved();
```

### getCartItem

Returns a cart item from the state.

#### _Parameters_

- cartItemKey `string` - The cart item key.

#### _Returns_

`object`- The cart item. This will be an object with the following keys:

- `key`- string containing the cart item key
- `id`- number containing the cart item id
- `catalog_visibility`- string containing the catalog visibility
- `quantity_limits`- object containing the quantity limits
- `name`- string containing the cart item name
- `summary`- string containing the cart item summary
- `short_description`- string containing the cart item short description
- `description`- string containing the cart item description
- `sku`- string containing the cart item sku
- `low_stock_remaining`- null or number containing the low stock remaining
- `backorders_allowed`- boolean indicating if backorders are allowed
- `show_backorder_badge`- boolean indicating if the backorder badge should be shown
- `sold_individually`- boolean indicating if the item is sold individually
- `permalink`- string containing the cart item permalink
- `images`- array containing the cart item images
- `variation`- array containing the cart item variation
- `prices`- object containing the cart item prices
- `totals`- object containing the cart item totals

#### _Example_

```js
const store = select( 'wc/store/cart' );
const cartItem = store.getCartItem( cartItemKey );
```

### isItemPendingQuantity

Queries whether a cart item is pending quantity.

#### _Parameters_

- cartItemKey `string` - The cart item key.

#### _Returns_

`boolean`- True if the cart item is pending quantity.

#### _Example_

```js
const store = select( 'wc/store/cart' );
const isItemPendingQuantity = store.isItemPendingQuantity( cartItemKey );
```

### isItemPendingDelete

Queries whether a cart item is pending delete.

#### _Parameters_

- cartItemKey `string` - The cart item key.

#### _Returns_

`boolean`- True if the cart item is pending delete.

#### _Example_

```js
const store = select( 'wc/store/cart' );
const isItemPendingDelete = store.isItemPendingDelete( cartItemKey );
```

### isCustomerDataUpdating

Queries whether the customer data is being updated.

#### _Returns_

`boolean`- True if the customer data is being updated.

#### _Example_

```js
const store = select( 'wc/store/cart' );
const isCustomerDataUpdating = store.isCustomerDataUpdating();
```

### isShippingRateBeingSelected

Queries whether a shipping rate is being selected.

#### _Returns_

`boolean`- True if a shipping rate is being selected.

#### _Example_

```js
const store = select( 'wc/store/cart' );
const isShippingRateBeingSelected = store.isShippingRateBeingSelected();
```



<!-- FEEDBACK -->

---

[We're hiring!](https://woocommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/woocommerce/woocommerce-blocks/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20./docs/third-party-developers/extensibility/data-store/checkout.md)

<!-- /FEEDBACK -->

