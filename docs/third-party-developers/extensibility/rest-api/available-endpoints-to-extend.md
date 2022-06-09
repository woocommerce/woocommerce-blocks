# Available endpoints to extend with ExtendSchema <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

-   [`wc/store/cart`](#wcstorecart)
    -   [Passed Parameters:](#passed-parameters)
    -   [Key:](#key)
-   [`wc/store/cart/items`](#wcstorecartitems)
    -   [Passed Parameters:](#passed-parameters-1)
    -   [Key:](#key-1)
-   [`wc/store/products`](#wcstoreproducts)
    -   [Passed Parameters:](#passed-parameters-2)
    -   [Key:](#key-2)

To see how to add your data to Store API using ExtendSchema, [check this document](./extend-rest-api-add-data.md). This is a list of available endpoints that you can extend. If you want to add a new endpoint, [check this document](./extend-rest-api-new-endpoint.md).

## `wc/store/cart`

The main cart endpoint is extensible via ExtendSchema. The data is available via the `extensions` key in the response.

### Passed Parameters

-   `data_callback`: none.
-   `schema_callback`: none.

### Key

-   `CartSchema::IDENTIFIER`

## `wc/store/cart/items`

The items endpoint, which is also available on `wc/store/cart` inside the `items` key. The data would be available inside each item of the `items` array.

### Passed Parameters

-   `data_callback`: `$cart_item`.
-   `schema_callback` none.

### Key

-   `CartItemSchema::IDENTIFIER`

## `wc/store/products`

The main products endpoint is extensible via ExtendSchema. The data is available via the `extensions` key for each `product` in the response array.

### Passed Parameters

-   `data_callback`: `$product`.
-   `schema_callback` none.

### Key

-   `ProductSchema::IDENTIFIER`

<!-- FEEDBACK -->

---

[We're hiring!](https://woocommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20./docs/extensibility/available-endpoints-to-extend.md)

<!-- /FEEDBACK -->
