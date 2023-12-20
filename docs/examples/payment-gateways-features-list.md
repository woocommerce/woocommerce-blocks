# 📣 Announcement: New documentation location

The documentation for WooCommerce Blocks has moved to the [WooCommerce monorepo](https://github.com/woocommerce/woocommerce/tree/trunk/plugins/woocommerce-blocks/docs/).

Please refer to the documentation in the new location as the files in this repository will no longer be updated and the repository will be archived.

---

# Payment Gateway Featured List

```php
// The action callback function.
function my_function_callback( $features, $gateway ) {
    if ( 'my-gateway' !== $gateway->id ) {
			return $features;
		}
    $features[] = 'some-feature';
    return $features;
}

add_filter( '__experimental_woocommerce_blocks_payment_gateway_features_list', 'my_function_callback', 10, 2 );
```
