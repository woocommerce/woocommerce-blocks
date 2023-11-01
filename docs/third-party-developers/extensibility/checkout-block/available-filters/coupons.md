# Coupons

The following Coupon filters are available:

-   [`coupons`](#coupons-1)
-   [`showApplyCouponNotice`](#showapplycouponnotice)
-   [`showRemoveCouponNotice`](#showremovecouponnotice)

## `coupons`

### Description <!-- omit in toc -->

The current functionality is to display the coupon codes in the Cart and Checkout sidebars. This could be undesirable if you dynamically generate a coupon code that is not user-friendly. It may, therefore, be desirable to change the way this code is displayed. To achieve this, the filter `coupons` exists. This filter could also be used to show or hide coupons. This filter must _not_ be used to alter the value/totals of a coupon. This will not carry through to the Cart totals.

### Parameters <!-- omit in toc -->

-   _coupons_ `object` - The coupons object with the following keys:
    -   _code_ `string` - The coupon code.
    -   _discount_type_ `string` - The type of discount. Can be `percent` or `fixed_cart`.
    -   _totals_ `object` - The totals object with the following keys:
        -   _currency_code_ `string` - The currency code.
        -   _currency_decimal_separator_ `string` - The currency decimal separator.
        -   _currency_minor_unit_ `number` - The currency minor unit.
        -   _currency_prefix_ `string` - The currency prefix.
        -   _currency_suffix_ `string` - The currency suffix.
        -   _currency_symbol_ `string` - The currency symbol.
        -   _currency_thousand_separator_ `string` - The currency thousand separator.
        -   _total_discount_ `string` - The total discount.
        -   _total_discount_tax_ `string` - The total discount tax.
-   _extensions_ `object` (default: `{}`) - The extensions object.
-   _args_ `object` - The arguments object with the following key:
    -   _context_ `string` (default: `summary`) - The context of the item.

### Returns <!-- omit in toc -->

-   `array` - The coupons array of objects with the same keys as above.

### Code example <!-- omit in toc -->

```ts
/**
 * Optional: Import `registerCheckoutFilters` using ES module syntax if you are using
 * @woocommerce/dependency-extraction-webpack-plugin for enhanced dependency management.
 *
 * Replace the line below with the following import statement:
 * import { registerCheckoutFilters } from '@woocommerce/checkout-data';
 *
 * @see https://www.npmjs.com/package/@woocommerce/dependency-extraction-webpack-plugin
 */
const { registerCheckoutFilters } = window.wc.blocksCheckout;

const modifyCoupons = ( coupons, extensions, args ) => {
	return coupons.map( ( coupon ) => {
		if ( ! coupon.label.match( /autocoupon(?:_\d+)+/ ) ) {
			return coupon;
		}

		return {
			...coupon,
			label: 'Automatic coupon',
		};
	} );
};

registerCheckoutFilters( 'example-extension', {
	coupons: modifyCoupons,
} );
```

> 💡 Filters can be also combined. See [Combined filters](../available-filters.md#combined-filters) for an example.

### Screenshot <!-- omit in toc -->

![Coupons filter](https://woocommerce.com/wp-content/uploads/2023/10/Screenshot-2023-10-27-at-19.10.47.png)

![Coupons filter](https://woocommerce.com/wp-content/uploads/2023/10/Screenshot-2023-10-27-at-19.14.23.png)

## `showApplyCouponNotice`

### Description <!-- omit in toc -->

### Parameters <!-- omit in toc -->

-   _value_ `boolean` (default: `true`) - Weather to show the apply coupon notice.
-   _extensions_ `object` (default: `{}`) - The extensions object.
-   _args_ `object` - The arguments object with the following keys:
    -   _context_ `string` (allowed values: `wc/cart` and `wc/checkout`) - The context of the coupon notice.
    -   _code_ `string` - The coupon code.

### Returns <!-- omit in toc -->

-   `boolean` - Weather to show the apply coupon notice.

### Code examples <!-- omit in toc -->

#### Basic example <!-- omit in toc -->

```ts
/**
 * Optional: Import `registerCheckoutFilters` using ES module syntax if you are using
 * @woocommerce/dependency-extraction-webpack-plugin for enhanced dependency management.
 *
 * Replace the line below with the following import statement:
 * import { registerCheckoutFilters } from '@woocommerce/checkout-data';
 *
 * @see https://www.npmjs.com/package/@woocommerce/dependency-extraction-webpack-plugin
 */
const { registerCheckoutFilters } = window.wc.blocksCheckout;

const modifyShowApplyCouponNotice = ( defaultValue, extensions, args ) => {
	return false;
};

registerCheckoutFilters( 'example-extension', {
	showApplyCouponNotice: modifyShowApplyCouponNotice,
} );
```

#### Advanced example <!-- omit in toc -->

```ts
/**
 * Optional: Import `registerCheckoutFilters` using ES module syntax if you are using
 * @woocommerce/dependency-extraction-webpack-plugin for enhanced dependency management.
 *
 * Replace the line below with the following import statement:
 * import { registerCheckoutFilters } from '@woocommerce/checkout-data';
 *
 * @see https://www.npmjs.com/package/@woocommerce/dependency-extraction-webpack-plugin
 */
const { registerCheckoutFilters } = window.wc.blocksCheckout;

const modifyShowApplyCouponNotice = ( defaultValue, extensions, args ) => {
	if ( args?.couponCode === '10off' ) {
		return false;
	}

	return defaultValue;
};

registerCheckoutFilters( 'example-extension', {
	showApplyCouponNotice: modifyShowApplyCouponNotice,
} );
```

> 💡 Filters can be also combined. See [Combined filters](../available-filters.md#combined-filters) for an example.

### Screenshot <!-- omit in toc -->

![Show Apply Coupon Notice filter](https://woocommerce.com/wp-content/uploads/2023/10/Screenshot-2023-10-27-at-21.09.19.png)

![Show Apply Coupon Notice filter](https://woocommerce.com/wp-content/uploads/2023/10/Screenshot-2023-10-27-at-21.11.35.png)

## `showRemoveCouponNotice`

### Description <!-- omit in toc -->

### Parameters <!-- omit in toc -->

-   _value_ `boolean` (default: `true`) - Weather to show the remove coupon notice.
-   _extensions_ `object` (default: `{}`) - The extensions object.
-   _args_ `object` - The arguments object with the following keys:
    -   _context_ `string` (allowed values: `wc/cart` and `wc/checkout`) - The context of the coupon notice.
    -   _code_ `string` - The coupon code.

### Returns <!-- omit in toc -->

-   `boolean` - Weather to show the apply coupon notice.

### Code examples <!-- omit in toc -->

#### Basic example <!-- omit in toc -->

```ts
/**
 * Optional: Import `registerCheckoutFilters` using ES module syntax if you are using
 * @woocommerce/dependency-extraction-webpack-plugin for enhanced dependency management.
 *
 * Replace the line below with the following import statement:
 * import { registerCheckoutFilters } from '@woocommerce/checkout-data';
 *
 * @see https://www.npmjs.com/package/@woocommerce/dependency-extraction-webpack-plugin
 */
const { registerCheckoutFilters } = window.wc.blocksCheckout;

const modifyShowRemoveCouponNotice = ( defaultValue, extensions, args ) => {
	return false;
};

registerCheckoutFilters( 'example-extension', {
	showRemoveCouponNotice: modifyShowRemoveCouponNotice,
} );
```

#### Advanced example <!-- omit in toc -->

```ts
/**
 * Optional: Import `registerCheckoutFilters` using ES module syntax if you are using
 * @woocommerce/dependency-extraction-webpack-plugin for enhanced dependency management.
 *
 * Replace the line below with the following import statement:
 * import { registerCheckoutFilters } from '@woocommerce/checkout-data';
 *
 * @see https://www.npmjs.com/package/@woocommerce/dependency-extraction-webpack-plugin
 */
const { registerCheckoutFilters } = window.wc.blocksCheckout;

const modifyShowRemoveCouponNotice = ( defaultValue, extensions, args ) => {
	if ( args?.couponCode === '10off' ) {
		return false;
	}

	return defaultValue;
};

registerCheckoutFilters( 'example-extension', {
	showRemoveCouponNotice: modifyShowRemoveCouponNotice,
} );
```

> 💡 Filters can be also combined. See [Combined filters](../available-filters.md#combined-filters) for an example.

### Screenshot <!-- omit in toc -->

![Show Remove Coupon Notice filter](https://woocommerce.com/wp-content/uploads/2023/10/Screenshot-2023-10-27-at-21.03.43.png)

![Show Remove Coupon Notice filter](https://woocommerce.com/wp-content/uploads/2023/10/Screenshot-2023-10-27-at-21.05.29.png)

<!-- FEEDBACK -->

---

[We're hiring!](https://woocommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/woocommerce/woocommerce-blocks/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20./docs/third-party-developers/extensibility/checkout-block/available-filters/coupons.md)
