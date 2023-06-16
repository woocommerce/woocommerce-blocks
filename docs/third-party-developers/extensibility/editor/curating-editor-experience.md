# Curating the Editor Experience

## Disable pattern directory**

To remove patterns provided by WooCommerce Blocks from being accessed in the Inserter, the following can be added to your functions.php file:

```php
add_action( 'after_setup_theme', function() {
    remove_theme_support( 'woocommerce-blocks-patterns' );
} );
```
