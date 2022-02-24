# BlockTemplateController
[Source file](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/trunk/src/BlockTemplatesController.php)

The BlockTemplateController class contains all the business logic which loads the templates into the Site Editor or on the front-end through various hooks available in WordPress & WooCommerce core. Without documenting every method individually, I will look to provide some insight into key functionality. 

## Table of Contents

* [Overview](#overview)
* [add_block_templates( $query_result, $query, $template_type )](#add_block_templates-query_result-query-template_type-)
* [get_block_file_template( $template, $id, $template_type )](#get_block_file_template-template-id-template_type-)
* [render_block_template()](#render_block_template)

## Overview

In the initialization of the class, we hook into the three hooks listed below. These provide us with all of the extensibility points necessary in order to load our own block templates alongside the themes.

Within each method section, I will explain in what scenarios they are executed. 

* filter: `get_block_templates` with `add_block_templates`.
* filter: `pre_get_block_file_template` with `get_block_file_template`.
* action: `template_redirect` with `render_block_template`.

## add_block_templates( $query_result, $query, $template_type )

This method is applied to the filter `get_block_templates`, which is executed before returning a unified list of template objects based on a query.

**Typically executed when:**
* Loading the "All Templates" view in the Site Editor
* Loading one of the templates on the frontend where the query would build a list of relevant templates based on a hierarchy (for example, the product page hierarchy could be an array containing  `single-product-[product-name].html`, `single-product.html`, `single.html`).

**This method is responsible for:**

* Giving our templates a user-friendly title (e.g. turning "single-product" into "Product Page").
* It collects all the WooCommerce templates from both the filesystem and the database (customized templates are stored in the database as posts) and adds them to the returned list.
* In the event the theme has a `archive-product.html` template file, but not category/tag template files, it is eligible to use the `archive-product.html` file in their place. So we trick Gutenberg in thinking some templates (e.g. category/tag) have a theme file available if it is using the `archive-product.html` template, even though _technically_ the theme does not have a specific file for them.
* If the query is targeting templates for a specific post type (e.g. on the Edit Post view), we do not add ineligible WooCommerce templates to the returned list.

### Return value

This method will return an array of `WP_Block_Template` values

## get_block_file_template( $template, $id, $template_type )

This method is applied to the filter `pre_get_block_file_template` inside the WordPress core function `get_block_file_template` (not to be confused with this method from the BlockTemplateController, of which has the same name). 

The order of execution is as follows:

1. `get_block_template()` from WordPress core will execute, and attempt to retrieve a customized version of the template from the database.
2. If it fails to retrieve one, it will execute the `get_block_file_template()` from WordPress core which will apply the filter `pre_get_block_file_template` which is what we hook into to return our template file, which will trigger an early return to prevent WordPress from continuing its query.

During step 2 it's important we hook into the `pre_get_block_file_template` because if we don't, the function will check if the first part of the template ID (e.g. `woocommerce/woocommerce`) is the same as the current themes ID (e.g. `twentytwentytwo`), which will resolve `false` and return `null` instead of the expected `WP_Block_Template` object.

**Typically executed when:**
* A user clears the customizations of a WooCommerce template.

**This method is responsible for:**
* Loading the template files from the filesystem, and building a `WP_Block_Template` version of it.

### Return value

This method will return `WP_Block_Template` or `null`

## render_block_template()

This method is applied to the filter `template_redirect` and executed before WordPress determines which template to load.

This allows us to hook into WooCommerce core through the filter `woocommerce_has_block_template` where we can determine if a specific block template exists and should be loaded.

**Typically executed when:**
* A user loads a page on the front-end.

**This method is responsible for:**
* Determining if the current page has an appropriate WooCommerce block template available to render.
* Checking if the currently loaded page is from WooCommerce. It then checks if the theme has an appropriate template to use, if it does not then it finally checks if WooCommerce has a default block template available. If so, we override the value through `woocommerce_has_block_template` to resolve true.

### Return value
Void. This method does not return a value but rather sets up hooks to render block templates on the front-end.
