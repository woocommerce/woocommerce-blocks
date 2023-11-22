# Curating the Editor Experience

## Disable pattern directory**

To remove patterns provided by WooCommerce Blocks from being accessed in the Inserter, call `remove_theme_support( 'woocommerce-blocks-patterns' );` in a callback on the `after_setup_theme` action. For example:

```php
add_action( 'after_setup_theme', function() {
    remove_theme_support( 'woocommerce-blocks-patterns' );
} );
```
