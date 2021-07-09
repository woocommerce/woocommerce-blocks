# Formatters
As part of ExtendRestAPI, we introduced `Formatters`, these are utility classes that allow you to format values to
so that they are compatible with the StoreAPI, values such as money, currency, or HTML.

- [MoneyFormatter](#MoneyFormatter)
- [CurrencyFormatter](#CurrencyFormatter)
- [HtmlFormatter](#HtmlFormatter)

## How to use them
To get a formatter, you can use the `get_formatter` method of the `ExtendRestApi` class. This method accepts a string,
which is the name of the formatter you want to use, e.g. (money, html, currency).

```php
get_formatter('money'); // For the MoneyFormatter
get_formatter('html'); // For the HtmlFormatter
get_formatter('currency'); // CurrencyFormatter
```

This returns a `FormatterInterface` which has the `format` method.

The `format` method signature is:
```php
format( $value, array $options = [] );
``` 
Only `MoneyFormatter`'s behaviour can be controlled by the `$options` parameter. 

## MoneyFormatter
The [`MoneyFormatter`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/trunk/src/StoreApi/Formatters/MoneyFormatter.php)
class can be used to format a monetary value using the store settings. The store settings may be overriden by passing
options to this formatter's `format` method.

### Arguments
- `$value` - `number` - The number you want to format into a monetary vaue
- `$options` - `array`
  - `decimals` - `integer` - Used to control how many decimal places should be displayed in the monetary value. Defaults
  to the store setting.
  - `rounding_mode` - `integer` - Used to determine how to round the monetary value. This should be one of the PHP
  rounding modes described in the
  [PHP round() documentation](https://www.php.net/manual/en/function.round.php). Defaults to `PHP_ROUND_HALF_UP`
  
### Example use and returned value
```php
get_formatter( 'money' )->format( 10.443, [
  'rounding_mode' => PHP_ROUND_HALF_DOWN,
  'decimals'      => 2
] );
```
returns `1044`

## CurrencyFormatter
This formatter takes an array of prices, and returns the same array but with currency data added. The currency data
added is:
- `currency_code` - The string representation of the currency, e.g. GPB or USD            
- `currency_symbol` - The symbol of the currency, e.g. &pound; or &dollar;           
- `currency_minor_unit` - How many decimal places will be shown in the currency       
- `currency_decimal_separator` - The string used to separate the whole value and the decimal value in the currency.
- `currency_thousand_separator` - The string used to separate thousands in the currency, for example: &pound;10,000 or &euro;10.000
- `currency_prefix` - A string that should appear before the value.
- `currency_suffix` - A string that should appear after the value.

### Arguments
`$value` - `number[]` - An array of prices that you want to merge with the store's currency settings
`$options` - There are no options that change the way this formatter behaves.

### Example use and returned value
```php
get_formatter( 'currency' )->format( [
  'price'         => 1800,
  'regular_price' => 1800,
  'sale_price'    => 1800,
] );
```
returns
```
  'price' => '1800' (length=4)
  'regular_price' => '1800' (length=4)
  'sale_price' => '1800' (length=4)
  'price_range' => null
  'currency_code' => 'GBP' (length=3)
  'currency_symbol' => '£' (length=2)
  'currency_minor_unit' => 2
  'currency_decimal_separator' => '.' (length=1)
  'currency_thousand_separator' => ',' (length=1)
  'currency_prefix' => '£' (length=2)
  'currency_suffix' => '' (length=0)
  ```

## HtmlFormatter
This formatter will take an HTML value, run it through: [`wptexturize`](https://developer.wordpress.org/reference/functions/wptexturize/),
[`convert_chars`](https://developer.wordpress.org/reference/functions/convert_chars/),
[`trim`](https://www.php.net/manual/en/function.trim.php), and [`wp_kses_post`](https://developer.wordpress.org/reference/functions/wp_kses_post/)
before returning it. The purpose of this formatter is to make HTML "safe" (in terms of correctly formatted characters).
`wp_kses_post` will ensure only HTML tags allowed in the context of a `post` are present in the string.

### Arguments
`$value` - `string` - The string you want to format into "safe" HTML.

### Example use and returned value
```php
get_formatter( 'html' )->format(
  "<script>alert('bad script!')</script> This \"coffee\" is <strong>very strong</strong>."
);
```
returns
`alert('bad script!') This &#8220;coffee&#8221; is <strong>very strong</strong>.`
