# 📣 Announcement: New documentation location

The documentation for WooCommerce Blocks has moved to the [WooCommerce monorepo](https://github.com/woocommerce/woocommerce/tree/trunk/plugins/woocommerce-blocks/docs/).

Please refer to the documentation in the new location as the files in this repository will no longer be updated and the repository will be archived.

---

# Checkout Order Processed

```php
// The action callback function.
function my_function_callback( $order ) {
  // Do something with the $order object.
  $order->save();
}

add_action( 'woocommerce_blocks_checkout_order_processed', 'my_function_callback', 10 );
```
