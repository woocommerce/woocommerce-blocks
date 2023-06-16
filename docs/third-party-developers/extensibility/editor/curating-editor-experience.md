# Curating the Editor Experience

## Disable pattern directory**

To remove patterns provided by WooCommerce Blocks from being accessed in the Inserter, call `remove_theme_support( 'woocommerce-blocks-patterns' );` as a callback to `after_setup_theme` action in your functions.php file. Follow the example:

```php
add_action( 'after_setup_theme', function() {
    remove_theme_support( 'woocommerce-blocks-patterns' );
} );
```
