# Translation basics

## Localization functions

Since [WordPress 2.1 Ella](https://wordpress.org/news/2007/01/ella-21/), WordPress offers i18n for PHP files, and since [WordPress 5.0 Bebo](https://wordpress.org/news/2018/12/bebo/), it also offers i18n for JS files. Handling translations is pretty straight forward. Both PHP and JS handle translations similar. WordPress offers the functions:

-   `__()`
-   `_e()`
-   `_ex()`
-   `_n()`
-   `_x()`
-   `_nx()`
-   `esc_html__()`
-   `esc_html_e()`
-   `esc_html_x()`
-   `esc_attr__()`
-   `esc_attr_e()`
-   `esc_attr_x()`

## GlotPress

All translations are handeled using [GlotPress](https://wordpress.org/plugins/glotpress/). As the WooCommerce Blocks plugin is hosted on https://wordpress.org/, all plugin-related translations can be found and managed on https://translate.wordpress.org/projects/wp-plugins/woo-gutenberg-products-block/.

## Text domain

To make the strings translatable, a text domain needs to be defined. The text domain has to match the slug of the plugin and is defined in the header of the main plugin file `woocommerce-gutenberg-products-block.php`:

```php
<?php
/**
 * [...]
 * Text Domain:  woo-gutenberg-products-block
 * [...]
 */
```

See also https://developer.wordpress.org/plugins/internationalization/how-to-internationalize-your-plugin/#text-domains.

## Domain Path

Only plugins that are not hosted in the official WordPress Plugin Directory need to define a `Domain Path`. As the WooCommerce Blocks plugin is hosted in the official WordPress Plugin Directory, it does not need a `Domain Path`.

See also https://developer.wordpress.org/plugins/internationalization/how-to-internationalize-your-plugin/#domain-path.

## Usage of localization functions

### `__()`

The function `__()` retrieves the translation of `$text`. This function is available both for PHP & JS/TS.

```php
// Schema
$translation = __( string $text, string $domain = 'default' );

// Example
$translation = __( 'Place Order', 'woo-gutenberg-products-block' );
```

See also https://developer.wordpress.org/reference/functions/__/.

### `_e()`

The function `_e()` displays the translation of `$text`. This function is only available for PHP.

```php
// Schema
_e( string $text, string $domain = 'default' );

// Example
_e( 'Place Order', 'woo-gutenberg-products-block' );
```

See also https://developer.wordpress.org/reference/functions/_e/.

### `_ex()`

The function `_ex()` displaya the translated string with gettext context. This function is only available for PHP.

```php
// Schema
_ex( string $text, string $domain = 'default' );

// Example
_ex( 'Place Order', 'Place order button text', 'woo-gutenberg-products-block' );
```

See also https://developer.wordpress.org/reference/functions/_ex/.

### `_n()`

The function `_n()` translates and retrieves the singular or plural form based on the supplied number. This function is available both for PHP & JS/TS.

```php
// Schema
$translation = _n( string $single, string $plural, int $number, string $domain = 'default' );

// Example
$translation = sprintf(
    /* translators: %s number of products in cart. */
    _n(
        '%d product',
        '%d products',
        absint( $category->count ),
        'woo-gutenberg-products-block'
    ),
    absint( $category->count )
);
```

See also https://developer.wordpress.org/reference/functions/_n/.

### `_x()`

The function `_x()` retrieves a translated string with gettext context. This function is available both for PHP & JS/TS.

```php
// Schema
$translation = _x( string $text, string $context, string $domain = 'default' );

// Example
$translation = _x( 'Draft', 'Order status', 'woo-gutenberg-products-block' );
```

See also https://developer.wordpress.org/reference/functions/_x/.

### `_nx()`

The function `_nx()` translates and retrieves the singular or plural form based on the supplied number, with gettext context. This function is available both for PHP & JS/TS.

```php
// Schema
$translation = _nx( string $single, string $plural, int $number, string $context, string $domain = 'default' );

// Example
$translation = sprintf(
    /* translators: %s number of products in cart. */
    _nx(
        '%d product',
        '%d products',
        absint( $category->count ),
        'Number of products in the cart',
        'woo-gutenberg-products-block'
    ),
    absint( $category->count )
);
```

See also https://developer.wordpress.org/reference/functions/_nx/.

### `esc_html__()`

The function `esc_html__()` retrieves the translation of `$text` and escapes it for safe use in HTML output. This function is only available for PHP.

```php
// Schema
$translation = esc_html__( string $text, string $domain = 'default' );

// Example
$translation = esc_html__( 'Select a category', 'woo-gutenberg-products-block' );
```

See also https://developer.wordpress.org/reference/functions/esc_html__/.

### `esc_html_e()`

The function `esc_html_e()` displays the translated text that has been escaped for safe use in HTML output. This function is only available for PHP.

```php
// Schema
esc_html_e( string $text, string $domain = 'default' );

// Example
esc_html_e( 'Select a category', 'woo-gutenberg-products-block' );
```

See also https://developer.wordpress.org/reference/functions/esc_html_e/.

### `esc_html_x()`

The function `esc_html_x()` translates a string with gettext context, and escapes it for safe use in HTML output. This function is only available for PHP.

```php
// Schema
$translation = esc_html_x( string $text, string $context, string $domain = 'default' );

// Example
$translation = esc_html_x( 'Select a category', 'Product category', 'woo-gutenberg-products-block' );
```

See also https://developer.wordpress.org/reference/functions/esc_html_x/.

### `esc_attr__()`

The function `esc_attr__()` retrieve the translation of `$text` and escapes it for safe use in an attribute. This function is only available for PHP.

```php
// Schema
$translation = esc_attr__( string $text, string $domain = 'default' );

// Example
$translation = esc_attr__( 'Search', 'woo-gutenberg-products-block' );
```

See also https://developer.wordpress.org/reference/functions/esc_attr__/.

### `esc_attr_e()`

The function `esc_attr_e()` displays the translated text that has been escaped for safe use in an attribute. This function is only available for PHP.

```php
// Schema
esc_attr_e( string $text, string $domain = 'default' );

// Example
esc_attr_e( 'Search', 'woo-gutenberg-products-block' );
```

See also https://developer.wordpress.org/reference/functions/esc_attr_e/.

### `esc_attr_x()`

The function `esc_attr_x()` translates the string with gettext context, and escapes it for safe use in an attribute. This function is only available for PHP.

```php
// Schema
$translation = esc_attr_x( string $text, string $domain = 'default' );

// Example
$translation = esc_attr_x( 'Search', 'Search button text' 'woo-gutenberg-products-block' );
```

See also https://developer.wordpress.org/reference/functions/esc_attr_x/.

<!-- FEEDBACK -->

---

[We're hiring!](https://woocommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20./docs/testing/README.md)

<!-- /FEEDBACK -->
