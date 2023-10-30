# Additional Cart and Checkout inner block types

The following Additional Cart and Checkout inner block types filter is available:

-   [`additionalCartCheckoutInnerBlockTypes`](#additionalcartcheckoutinnerblocktypes)

## `additionalCartCheckoutInnerBlockTypes`

### Description <!-- omit in toc -->

The Cart and Checkout blocks are made up of inner blocks. These inner blocks areas allow certain block types to be added as children. By default, only `core/paragraph`, `core/image`, and `core/separator` are available to add.

By using the `additionalCartCheckoutInnerBlockTypes` filter it is possible to add items to this array to control what the editor can into an inner block.

This filter is called once for each inner block area, so it is possible to be very granular when determining what blocks can be added where.

### Parameters <!-- omit in toc -->

-   _defaultValue_ `array` (default: `[]`) - The default value of the filter.
-   _extensions_ `object` (default: `{}`) - The extensions object.
-   _args_ `object` - The arguments object with the following key:
    -   _block_ `string` - The block name of the inner block area, e.g. `woocommerce/checkout-shipping-address-block`.
-   _validation_ `boolean` or `Error` - Checks if the returned value is an arry of strings. If an error occurs, it will be thrown.

### Returns <!-- omit in toc -->

-   `array` - The modified array with allowed block types for the corresponding inner block area.

### Code example <!-- omit in toc -->

Let's suppose we want to allow the editor to add some blocks in specific places in the Cart and Checkout blocks.

1. Allow `core/quote` to be inserted in every block area in the Cart and Checkout blocks.
2. Allow `core/table` to be inserted in the Shipping Address block in the Checkout.

In our extension we could register a filter satisfy both of these conditions like so:

```tsx
document.addEventListener( 'DOMContentLoaded', function () {
	const { registerCheckoutFilters } = window.wc.blocksCheckout;

	const modifyAdditionalInnerBlockTypes = (
		defaultValue,
		extensions,
		args,
		validation
	) => {
		defaultValue.push( 'core/quote' );

		if ( args?.block === 'woocommerce/checkout-shipping-address-block' ) {
			defaultValue.push( 'core/table' );
		}

		return defaultValue;
	};

	registerCheckoutFilters( 'example-extension', {
		additionalCartCheckoutInnerBlockTypes: modifyAdditionalInnerBlockTypes,
	} );
} );
```

To call this filter within the editor, wrap the filter registration in a `DOMContentLoaded` event listener and ensure the code runs in the admin panel.

> 💡 Filters can be also combined. See [Combined filters](../available-filters.md#combined-filters) for an example.

### Screenshot <!-- omit in toc -->

![Additional Cart and Checkout inner block types filter](https://woocommerce.com/wp-content/uploads/2023/10/Screenshot-2023-10-26-at-18.20.37.png)

<!-- FEEDBACK -->

---

[We're hiring!](https://woocommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/woocommerce/woocommerce-blocks/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20./docs/third-party-developers/extensibility/checkout-block/available-filters/additional-cart-checkout-inner-block-types.md)
