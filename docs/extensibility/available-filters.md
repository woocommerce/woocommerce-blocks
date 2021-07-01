# Filters
Like traditional WordPress filters (you register a callback with a specific filter, your callback accepts a number of
arguments, then it returns a value), we are introducing filters to the WooCommerce Blocks extension. These will function
very similarly to the traditional filters. 

Your extension will use `__experimentalRegisterCheckoutFilter` to set up a filter.

This function has the following signature:

```typescript
(
  namespace: string,
  filters: Record< string, CheckoutFilterFunction >
)
```

and a `CheckoutFilterFunction` has this signature:

```typescript
type CheckoutFilterFunction = < T >(
	value: T,
	extensions: Record< string, unknown >,
	args?: CheckoutFilterArguments
) => T;
```

In this, you'll specify which filter you want to work with (available filters are listed below) and the
function (`CheckoutFilterFunction`) to execute when this filter is applied.

When the `CheckoutFilterFunction` is invoked, the following arguments are passed to it:
- `value` - The value to be filtered. 
- `extensions` A n object containing extension data. If your extension has extended any of the store's API routes, one
  of the keys of this object will be your extension's namespace. The value will contain any data you add to the endpoint.
  Each key in the `extensions` object is an extension namespace, so a third party extension cannot interfere with _your_
  extension's schema modifications, unless there is a naming collision, so please ensure your extension has a unique
  namespace that is unlikely to conflict with other extensions.
- `args` - An object containing any additional data passed to the filter function. This usually (but not always) contains at least a key 
called `context`. The value of `context` will be (at the moment) either `cart` or `checkout`. This is provided to inform
  extensions about the exact location that the filter is being applied. The same filter can be applied in multiple
  places.

## Available filters

This section of the document will list the filters that are currently available to extensions, where exactly
the filter is applied, and what data might be passed to the `CheckoutFilterFunction`.

### Cart Line Items
Line items refers to each item listed in the cart or checkout. For instance
the "Sunglasses" and "Beanie with logo" in this image are the line items.

<img src="https://user-images.githubusercontent.com/5656702/117027554-b7c3eb00-acf4-11eb-8af1-b8bedbe20e05.png" width=600 />

The following filters are available for line items:

| Filter name  | Description | Return type  |
|---|---|---|
| `itemName` | Used to change the name of the item before it is rendered onto the page | `string` 
| `cartItemPrice`  | This is the price of the item, multiplied by the number of items in the cart. | `string` and **must** contain the substring `<price/>` where the price should appear.
| `subtotalPriceFormat`  | This is the price of a single item. Irrespective of the number in the cart, this value will always be the current price of _one_ item. | `string` and **must** contain the substring `<price/>` where the price should appear.
| `saleBadgePriceFormat`  | This is amount of money saved when buying this item. It is the difference between the item's regular price and its sale price. | `string` and **must** contain the substring `<price/>` where the price should appear.

Each of these filters has the following arguments passed to it: `{ context: 'cart', cartItem: CartItem }` ([CartItem](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/c00da597efe4c16fcf5481c213d8052ec5df3766/assets/js/type-defs/cart.ts#L113))

### Order Summary Items
In the Checkout block, there is a sidebar that contains a summary of what the customer is about to purchase.
There are some filters available to modify the way certain elements are displayed on each item. 

The sale badges are not shown here, so those filters are not applied in the Order Summary. 

<img src="https://user-images.githubusercontent.com/5656702/117026942-1b014d80-acf4-11eb-8515-b9b777d96a74.png" width=400 />

| Filter name  | Description | Return type  |
|---|---|---|
| `itemName` | Used to change the name of the item before it is rendered onto the page | `string`
| `cartItemPrice`  | This is the price of the item, multiplied by the number of items in the cart. | `string` and **must** contain the substring `<price/>` where the price should appear.
| `subtotalPriceFormat`  | This is the price of a single item. Irrespective of the number in the cart, this value will always be the current price of _one_ item. | `string` and **must** contain the substring `<price/>` where the price should appear.

Each of these filters has the following additional arguments passed to it: `{ context: 'summary', cartItem: CartItem }` ([CartItem](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/c00da597efe4c16fcf5481c213d8052ec5df3766/assets/js/type-defs/cart.ts#L113))

### Totals footer item (in Cart and Checkout)

The word 'Total' that precedes the amount due, present in both the Cart _and_ Checkout blocks, is also passed through filters.

| Filter name  | Description | Return type  |
|---|---|---|
| `totalLabel`  | This is the label for the cart total. It defaults to 'Total' (or the word for 'Total' if using translations). | `string`

There are no additional arguments passed to this filter.

### Coupons

The current functionality is to display the coupon codes in the Cart and Checkout sidebars. This could be undesirable
if you dynamically generate a coupon code that is not user-friendly. It may, therefore, be desirable to change the way
this code is displayed. To do this, the filter `coupons` exists.

This filter could also be used to show or hide coupons.

This filter must _not_ be used to alter the value/totals of a coupon. This will not carry through to the Cart totals.

| Filter name  | Description | Return type  |
|---|---|---|
| `coupons`  | This is an array of coupons currently applied to the cart. | `CartCoupon[]`

The additional argument supplied to this filter is: `{ context: 'summary' }`. A `CartCoupon` has the following shape:

```typescript
CartCoupon {
  code: string
  label: string
  discount_type: string
  totals: {
    currency_code: string
    currency_decimal_separator: string
    currency_minor_unit: number
    currency_prefix: string
    currency_suffix: string
    currency_symbol: string
    currency_thousand_separator: string
    total_discount: string
    total_discount_tax: string
  }
}
```
### Snackbar notices

There is a snackbar at the bottom of the page used to display notices to the customer, it looks like this:

<img src="https://user-images.githubusercontent.com/5656702/120882329-d573c100-c5ce-11eb-901b-d7f206f74a66.png" width=300 />

It may be desirable to hide this (by removing it from the array) or to change the text in the notice.

| Filter name  | Description | Return type  |
|---|---|---|
| `snackbarNotices`  | An array of notices waiting to be shown in the snackbar | `SnackbarNotice[]`

These are the relevant members of a `SnackbarNotice` object.

```typescript
SnackbarNotice {
  content: string;
  explicitDismiss: boolean;
  icon: string | null;
  isDismissable: boolean;
  onDismiss: Function;
  spokenMessage: string;
  status: string;
  type: string
}
```

## Examples

### Changing the wording of the Totals label in the Cart and Checkout
For this example, let's suppose we are building an extension that lets customers pay a deposit, and defer the full amount until a later date.

To make it easier to understand what the customer is paying and why, let's change the value of `Total` to `Deposit due today`.

1. We need to create a `CheckoutFilterFunction`.
```typescript
const replaceTotalWithDeposit = () => 'Deposit due today';
```
2. Now we need to register this filter function, and have it executed when the `totalLabel` filter is applied.
   We can access the `__experimentalRegisterCheckoutFilters` function on the `window.wc.blocksCheckout` object.
   As long as your extension's script is enqueued _after_ WooCommerce Blocks' scripts (i.e. by registering `wc-blocks-checkout` as a dependency), then this will be available.
 ```typescript
const { __experimentalRegisterCheckoutFilters } = window.wc.blocksCheckout;
__experimentalRegisterCheckoutFilters( 'my-hypothetical-deposit-plugin', {
  totalLabel: replaceTotalWithDeposit
} );
```

| Before | After |
|---|---|
| <img src="https://user-images.githubusercontent.com/5656702/117032889-cc56b200-acf9-11eb-9bf7-ae5f6a0b1538.png" width=300 /> | <img src="https://user-images.githubusercontent.com/5656702/117033039-ec867100-acf9-11eb-95d5-50c06bf2923c.png" width=300 /> |


### Changing the format of the item's single price
Let's say we want to add a little bit of text after an item's single price **in the Cart only**, just to make sure our customers know
that's the price per item.

1. We will need to register a function to be executed when the `subtotalPriceFormat` is applied. Since we only want this to happen in the 
Cart context, our function will need to check the additional arguments passed to it to ensure the `context` value is `cart`.
   
We can see from the table above, that our function needs to return a string that contains a substring of `<price/>`.
This is a placeholder for the numeric value. The Cart block will interpolate the value into the string we return.
```typescript
const appendTextToPriceInCart = ( value, extensions, args ) => {
  if( args?.context !== 'cart') {
      // Return early since this filter is not being applied in the Cart context.
      // We must return the original value we received here.
      return value;
  }
  return '<price/> per item';
};
```
2. Now we must register it. Refer to the first example for information about `__experimentalRegisterCheckoutFilters`.
```typescript
const { __experimentalRegisterCheckoutFilters } = window.wc.blocksCheckout;
__experimentalRegisterCheckoutFilters( 'my-hypothetical-price-plugin', {
  subtotalPriceFormat: appendTextToPriceInCart
} );
```


| Before | After |
|---|---|
| <img src="https://user-images.githubusercontent.com/5656702/117035086-d5488300-acfb-11eb-9954-feb326916168.png" width=400 /> | <img src="https://user-images.githubusercontent.com/5656702/117035616-70415d00-acfc-11eb-98d3-6c8096817e5b.png" width=400 /> |

### Change the name of a coupon
Let's say we're the author of an extension that automatically creates coupons for users, and applies them to the cart
when certain items are bought in combination.

Due to the internal workings of our extension, our automatically generated coupons are named something like
`autocoupon_2020_06_29` - this doesn't look fantastic, so we want to change this to look a bit nicer.

Our filtering function may look like this:

```typescript
const filterCoupons = ( coupons ) => {
  return coupons.map( ( coupon ) => {
  	// Regex to match autocoupon then unlimited undersores and numbers
    if ( ! coupon.label.match( /autocoupon(?:_\d+)+/ ) ) {
      return coupon;
    }
    return {
      ...coupon,
      label: 'Automatic coupon'
    };
  } );
};
```

We'd register our filter like this:
```typescript
import { __experimentalRegisterCheckoutFilters } from '@woocommerce/blocks-checkout';

__experimentalRegisterCheckoutFilters( 'automatic-coupon-extension', {
	coupons: filterCoupons,
} );
```

| Before | After |
|---|---|
| <img src="https://user-images.githubusercontent.com/5656702/123768988-bc55eb80-d8c0-11eb-9262-5d629837706d.png" /> | ![image](https://user-images.githubusercontent.com/5656702/124126048-2c57a380-da72-11eb-9b45-b2cae0cffc37.png) |


## Troubleshooting
If you are logged in to the store as an administrator, you should be shown an error like this if your filter is not
working correctly.

<img src="https://user-images.githubusercontent.com/5656702/117035848-b4ccf880-acfc-11eb-870a-31ae86dd6496.png" width=600 />

The error will also be shown in your console.
