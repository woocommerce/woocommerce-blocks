# ClassicTemplate

[Source file](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/trunk/src/BlockTypes/ClassicTemplate.php)

The `ClassicTemplate` is a class used to set up the Classic Template block on the server-side, and render the correct template.

## Overview

It is from this file we enqueue the front-end scripts necessary for the product gallery, add to basket etc. functionality to work on the front-end.

From the `render()` method we inspect the `$attributes` object for a `template` property which helps determine which core PHP templating code to execute (e.g. `single-product`) for the front-end views.

![Classic Block Template Attribute](./assets/classic-template-attributes.png)
