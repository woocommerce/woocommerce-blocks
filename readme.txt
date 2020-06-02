=== WooCommerce Blocks ===
Contributors: automattic, claudiulodro, tiagonoronha, jameskoster, ryelle, levinmedia, aljullu, mikejolley, nerrad, joshuawold, assassinateur, haszari
Tags: gutenberg, woocommerce, woo commerce, products, blocks, woocommerce blocks
Requires at least: 5.2
Tested up to: 5.4
Requires PHP: 5.6
Stable tag: 2.6.0
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

== Description ==

WooCommerce Blocks are the easiest, most flexible way to display your products on posts and pages!

**Note: Feature plugin for WooCommerce + Gutenberg. This plugin serves as a space to iterate and explore new Blocks and updates to existing blocks for WooCommerce, and how WooCommerce might work with the block editor.**

Use this plugin if you want access to the bleeding edge of available blocks for WooCommerce. However, stable blocks are bundled into WooCommerce, and can be added from the "WooCommerce" section in the block inserter.

**Featured Product Block**
Select and display a single product in a new, high impact fashion. Control text alignment, hide or show the price and description, add a color overlay, change the button call to action, and override the product photo.

**Featured Category Block**
Visually highlight a product category to increase traffic to that specific section on your shop.

**Hand-Picked products Block**
Display a grid of hand picked products. Products can be ordered in various ways.

**Best Selling Products Block**
Display a grid of your best selling products, filterable by category.

**Top Rated Products Block**
Display a grid of your top rated products, filterable by category.

**Newest Products Block**
Display a grid of your newest products, filterable by category.

**On Sale Products Block**
Display a grid of on sale products, filterable by category.

**Products by Category Block**
Display a grid of products from your selected category, or categories. Products can be ordered in various ways.

**Products by Tag Block**
Show a grid of products based on a specific tag that allows you to highlight products based on finer classification options.

**Products by Attribute Block**
Display a grid of products from your selected attributes.

**Product Categories List Block**
Display all your product categories as a list or dropdown and help shoppers to find a specific category.

**Reviews by Product**
Display reviews of a specific product to build trust in your product and brand.

**Reviews by Category**
Highlight reviews from specific categories and help merchants making an informed purchasing decision.

**All Reviews**
Show a list of all product reviews on a landing page, blog post or any other page in your site.

**Product Search**
Help shoppers find your products by placing a search box in specific locations.

**All Products**
Display all products from your store as a grid with pagination and sorting options. Requires WordPress 5.3.

**Filter Products by Price**
Display a slider to filter products in your store by price. Works in combination with the _All Products_ block. Requires WordPress 5.3.

**Filter Products by Attribute**
Display a list of filters based on a chosen product attribute. Works in combination with the _All Products_ block. Requires WordPress 5.3.

**Active Product Filters**
Display a list of active product filters. Works in combination with the _Filter Products by Price_ and _Filter Products by Attribute_ blocks. Requires WordPress 5.3.

We've also improved the category selection filter. If you select two or more categories, you can now chose to show products that include ANY or ALL selected categories.

== Getting Started ==

= Minimum Requirements =

* WordPress 5.0
* WooCommerce 3.7 or greater
* PHP version 5.6 or greater (PHP 7.2 or greater is recommended)
* MySQL version 5.0 or greater (MySQL 5.6 or greater is recommended)

Visit the [WooCommerce server requirements documentation](https://docs.woocommerce.com/document/server-requirements/) for a detailed list of server requirements.

= Automatic installation =

Automatic installation is the easiest option as WordPress handles the file transfers itself and you don’t need to leave your web browser. To do an automatic install of this plugin, log in to your WordPress dashboard, navigate to the Plugins menu and click Add New.

In the search field type “WooCommerce Gutenberg Products Block” and click Search Plugins. Once you’ve found this plugin you can view details about it such as the point release, rating and description. Most importantly of course, you can install it by simply clicking “Install Now”.

= Manual installation =

The manual installation method involves downloading the plugin and uploading it to your webserver via your favourite FTP application. The WordPress codex contains [instructions on how to do this here](https://codex.wordpress.org/Managing_Plugins#Manual_Plugin_Installation).

= Sample data =

WooCommerce comes with some sample data you can use to populate the products and get started building Products blocks quickly and easily. You can use the core [CSV importer](https://docs.woocommerce.com/document/product-csv-importer-exporter/) or our [CSV Import Suite plugin](https://woocommerce.com/products/product-csv-import-suite/) to import sample_products.csv.

= Where can I report bugs or contribute to the project? =

Bugs should be reported in the [WooCommerce Gutenberg Products Block GitHub repository](https://github.com/woocommerce/woocommerce-gutenberg-products-block/).

= This is awesome! Can I contribute? =

Yes you can! Join in on our [GitHub repository](https://github.com/woocommerce/woocommerce-gutenberg-products-block/) :)

Release and roadmap notes available on the [WooCommerce Developers Blog](https://woocommerce.wordpress.com/2019/01/15/woocommerce-blocks-1-3-0-release-notes/)

== Screenshots ==

1. The Featured Product Block
2. Selecting a product for the Featured Product Block
3. Selecting Products for the Hand-Picked Products Block
4. Selecting categories in the Products By Category block
5. WooCommerce Product Blocks in the block inserter menu

== Changelog ==

= 2.6.1 - 2020-06-01 =

- fix: Updated the wc_reserved_stock table for compatibility with versions of MySql < 5.6.5. [#2590](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/2590)

= 2.6.0 - 2020-05-25 =
**New Blocks**

The Cart and Checkout blocks are released in this version for wider review and testing as a part of our consideration for including them in WooCommerce Core. You can read more [about these blocks here](https://woocommerce.wordpress.com/?p=6384).

Also, note that we are aware of the increased file size for the All Products and Filter blocks frontend JavaScript. It is from some dependency changes. We will be addressing this in the next release.

You can read [more about the release here](https://woocommerce.wordpress.com/?p=6577)

- bug: Add placeholder to the on-sale products block when no results are found. [#1519](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1519)
- bug: Added correct ellipsis character in Product Search block [#1672](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1672)
- bug: If product is changed for featured product block, update the link in the button. [#1894](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1894)
- bug: Import from `@woocommerce/settings` in `@woocommerce/block-settings` [#2330](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/2330)
- dev: Accessibility of the All Products block and filter blocks has been improved. [#1656](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1656)
- dev: All Products Block: Update sorting labels to match frontend options [#2462](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/2462)
- dev: Change PropType validation for Icon component [#1737](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1737)
- dev: Changed default rows and columns for product grid blocks to 3x3. [#1613](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1613)
- dev: Check for instance of WP_Block in render_callback [#2258](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/2258)
- dev: Devs: `ENABLE_REVIEW_RATING` setting was renamed to `REVIEW_RATINGS_ENABLED` and now it also verifies reviews are enabled, to better match WooCommerce API. [#1374](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1374)
- dev: Fix price filtering when stored prices do not match displayed prices (determined by tax settings). [#1612](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1612)
- dev: HTML editing is no longer supported in several blocks. [#1395](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1395)
- dev: Implement __experimentalCreateInterpolateElement for translations. [#1736](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1736)
- dev: Load WooCommerce Core translations for 'Sale!' and some other strings if translations are unavailable for WooCommerce Blocks. [#1694](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1694)
- dev: Prevent data hydration on REST requests [#2176](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/2176)
- dev: Show relationship between terms in the active filters block. [#1630](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1630)
- dev: Table creation validation for install routine [#2287](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/2287)
- dev: Update the icons used in the blocks. [#1644](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1644)
- enhancement: Add dropdown display style to Filter Products by Attribute block. [#1255](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1255)
- enhancement: Add option to display a Filter button to Filter Products by Attribute block. [#1332](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1332)
- enhancement: Add support for image for product categories block [#1739](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/1739)
- enhancement: An error notice will be shown in All Product if the customer is trying to add a product above stock or sold individually. [#2278](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/2278)
- performance: Improvements to REST API performance [#2248](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/2248)
- performance: Avoid loading Assets API during REST requests [#2286](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/2286)

= 2.5.16 - 2020-04-07 =
- Performance: Use the latest version of Jetpack Autoloader. #2132

= 2.5.15 - 2020-03-31 =
- Fix broken product grid blocks styles in old versions of WordPress. #2000

= 2.5.14 - 2020-03-03 =
- Added screen reader text to product counts in the product category list block #1828
- Added screenreader alternative text to the sale badge. #1826
- Product Search block is now compatible with WordPress 5.4 and the last versions of Gutenberg. #1841
- Security: Improved escaping of attributes on blocks. #1854

= 2.5.13 - 2020-02-18 =
- Respect hidden products in All Products block. #1753

= 2.5.12 - 2020-02-05 =
- Fix ratings appearing as text in the editor instead. #1650
- Fix error with the All Products block and Internet Explorer 11 when adding products to the cart. #1642
- bug: Check for instance of WooCommerce and WP_Error before initializing session and cart in `rest_authentication_errors` callback. #1698
- Fix display of price slider when using RTL languages. #1651
- Renamed the "all products" align option so it's clear the final element gets alignment, not just buttons. #1659

= 2.5.11 - 2020-01-20 =
- bug: Fix a javascript error when editing All Products inner blocks "Link to Product Page" option #1593
- bug: Fix an issue in All Products when ordering by newness was reversed #1598
- bug: Fix a javascript error in editor when user re-selects same attribute in Filter Products by Attribute block #1596
- bug: Fix a render issue for product attribute values with ampersand (&) or other special characters #1608
- bug: Fix bug in Safari and other Webkit browsers that was causing the All Products block to show 0 results when resetting the sort value. #1611

= 2.5.10 - 2020-01-09 =
- All Products block: fix wrong price format for variable products with certain currency settings. #1518

= 2.5.9 - 2020-01-07 =
- Fix issue in All Products block that was causing Variable products price to exclude taxes in some cases. #1503

= 2.5.8 - 2020-01-02 =
- Fixed a bug where Filter by Price didn't show up. #1450
- Price filter now allows entering any number in the input fields, even if it's out of constrains. #1457
- Make price slider accurately represent the selected price. #1453

= 2.5.7 - 2019-12-20 =
- Add translation comments and use correct functions #1412, #1415
- bug: Fix Price Filter constraints when price is decimal #1419

= 2.5.6 - 2019-12-17 =
- Fix broken build resulting in blocks not working.

= 2.5.5 - 2019-12-17 =
- bug: Fix broken atomic blocks in the All Products Block #1402
- bug: Only allow one instance of the All Products block per page/post. #1383
- bug: All Products Block: Fix default sort order changes not updating block in editor. #1385
- bug: Normalize set minPrice and maxPrice values by step #1379
- bug: Fix messaging when there are no attributes #1382
- Price Filter: fix NaN values shown in some occasions while loading . #1386
- bug: Fix incorrect property name for price format #1397
- Remove double colon on active filter block price label. #1399
- Fix: Attribute filters were not updating based on changes in the Price filter when query type was set to OR. #1390

= 2.5.4 - 2019-12-11 =
- bug: Fix increase in some bundle sizes #1363

= 2.5.3 - 2019-12-09 =
- Prevent Filter Products by Attribute block hiding non-matching options when Query Type is set to OR. #1339
- Fix price slider layout in narrow columns #1231

= 2.5.2 - 2019-12-02 =
- Fixed a PHP Notice in Featured Category Block when the category is invalid. #1291 👏 @strategio
- Filter Products by Attribute block now uses the attribute label instead of the slug to set the default title. #1271
- Fix Filter Products by Price slider being reset to 0-0 when filters were cleared from the Active Filters block. #1278
- Don't enqueue wcSettings unless the route requires it. #1292
- Add `getAdminLink()` utility method. #1244

= 2.5.1 - 2019-11-26 =
- Fix Products by Tag, Products by Attribute and Handpicked products blocks showing an invalid attributes error. #1254
- Fix the price slider updating instantly even when filter button was enabled. #1228
- Honor CSS classes in the editor for blocks added in 2.5. #1227
- Fix variable products price format in All Products block. #1210
- Allow the feature plugin to use WooCommerce Core translated strings. #1242
- Reduce number of queries ran by multiple filter blocks with All Products block. #1233
- Fix heading level setting for the All Products Title Block. #1230
- Fix editor styles (background color) for titles of "Filter by…" blocks. #1256
- Fix bug with cart not updating. #1258
- Fix issue in the Filter by Attribute selector that was preventing to reselect the currently selected attribute. #1264

= 2.5.0 - 2019-11-19 =

- Feature: Introduce an All Products block, a new block listing products using client side rendering. Requires WordPress 5.3.
- Feature: Introduce a Filter Products by Price block. Allow customers to filter the All Products block by price. Requires WordPress 5.3.
- Feature: Introduce a Filter Products by Attribute block which works alongside the new "All products" block. Requires WordPress 5.3.
- Feature: Introduce an Active Filters block that lists all currently used filters. Requires WordPress 5.3.
- Show a friendly error message in the frontend if blocks throw a JS error.
- Show a message in the editor if no products are found rather than show nothing.
- Show previews for all included blocks in the block inserter. Requires WordPress 5.3.
- Products on Sale, Products Tag and Product Search blocks have new icons.
- Officialy deprecate NPM package `@woocommerce/block-library`.
- Use Server Side Rendering for Product Category List block to remove the need to pass large amounts of data around when not needed.
- RTL fixes to several blocks.
- All block icons are displayed gray in the editor shortcuts inserter.
- Make it easier for themes to style the Product Categories List block: new class names allow writing simpler selectors and it's now possible to remove the parentheses around the count number.

= 2.4.1 - 2019-08-30 =

- Fix conflict with WooCommerce Admin.

= 2.4.0 - 2019-08-29 =
- Feature: A new block named 'All Reviews' was added in order to display a list of reviews from all products and categories of your store. #902
- Feature: Added Reviews by Product block.
- Feature: Added Reviews by Category block.
- Feature: Added a new product search block to insert a product search field on a page.
- Enhancement: Add error handling for API requests to the featured product block.
- Enhancement: Allow hidden products in handpicked products block.
- Fix: Prevented block settings being output on every route.  Now they are only needed when the route has blocks requiring them.
- Dev: Introduced higher order components, global data handlers, and refactored some blocks.
- Dev: Created new HOCs for retrieving data: `withProduct`, `withComponentId`, `withCategory`.
- Dev: Export block settings to an external global `wc.blockSettings` that can be reliably used by extensions by enqueuing their script with the `wc-block-settings` as the handle. #903
- Dev: Added new generic base components: `<OrderSelect />` and `<Label />` so they can be shared between different blocks. #905

= 2.3.1 - 2019-08-27 =

- Fix: Fix deprecation notices with PHP 7.4.
- Fix: Removed unused screen-reader-text css styles for buttons which caused some theme conflicts.
- Fix: Left align stars to fix alignment in Storefront.
- Fix: Best-sellers block query results #917
- Fix: Fix duplicated translatable string #843

= 2.3.0 - 2019-08-12 =

- Feature: Added a new Featured Category Block; feature a category and show a link to it's archive.
- Feature: Added a new Products by Tag(s) block.
- Feature: Allow individual variations to be selected in the Featured Product block.
- Feature: Added a button alignment option to product grid blocks to align buttons horizontally across the row.
- Feature: Added a cancel button to the product category block editor to discard unsaved changes.
- Enhancement: Change the toggle for list type in Product Category List block to a button toggle component for clarity.
- Build: Updated build process and plugin structure to follow modern best practices. Minimum PHP version bumped to 5.6.
- Fix: Correctly hide products from grids when visibility is hidden.
- Fix: Fix Featured Category block using radio buttons instead of checkboxes.
- Fix: Use externals for frontend dependencies so they are shared between extensions and blocks. That saves 2.57MB on page weight.
- Fix: Load frontend scripts dynamically only when the page contains a block that requires them.
- Fix: Reduce dependencies of JavaScript powered frontend blocks.
- Fix: Disable HTML editing on dynamic blocks which have no content.
- Fix: Hide background opacity control in Featured Product settings if there is no background image.
- Fix: Reduce CSS specificity to make styling easier.
- Fix: Fix author access to API for handpicked products block.

= 2.2.1 - 2019-07-04 =

- Fix: Allow custom CSS classes on grid blocks.
- Fix: Allow custom CSS classes on featured product block.
- Fix: Allow custom CSS classes on product categories list.

= 2.2.0 - 2019-06-26 =

- Feature: Add Product Categories List navigation block for showing a list of categories on your site.
- Enhancement: All grid blocks are now rendered directly by the blocks code, not using the shortcode.
- Enhancement: Brand the WooCommerce Blocks for better discoverability in the block inserter.
- Build: Update build process to dynamically generate required WordPress dependencies.
- Build: Update packages.

= 2.1.0 - 2019-05-14 =

- Feature: Add focal point picker to the Featured Product block, so you can adjust the background image position (only available on WP 5.2+ or with Gutenberg plugin).
- Fix: Improved fetching products from API, so searching for products in Featured Product & Hand-picked Products is faster for stores with over 200 products.
- Fix: It might be possible to request over 100 products for the editor preview, but this would cause an API error - we now limit the preview request to 100 products.
- Build: Update build script to show visual progress indicator.
- Build: Update packages.

= 2.0.1 - 2019-04-22 =

- Fix: Fix warnings about blocks already being registered.
- Fix: Fix a conflict with WooCommerce 3.6 and WooCommerce Blocks 1.4 (this change only applies to the version of blocks bundled with WooCommerce core).

= 2.0.0 - 2019-04-18 =

- **BREAKING:** Requires WordPress 5.0+, WooCommerce 3.6+
- **BREAKING:** Remove the legacy block entirely
- **BREAKING:** Remove the `wc-pb/v3/*` endpoints in favor of new core `wc-blocks/v1/*` endpoints
- Feature: Add content visibility settings to show/hide title, price, rating, button
- Feature: Add transforms between basic product grid blocks
- Fix: Add product rating display to preview, to better match front end
- Fix: Product titles render HTML correctly in preview
- Fix: Icons are now aligned correctly in placeholders
- Fix: Grid block preview column width now matches the front-end
- Fix: Webpack now builds using a custom jsonp callback, fixing possible collisions with other projects
- API: Change namespace, endpoints now accessed at `/wc/blocks/*`
- API: Add `catalog_visibility` parameter for fetching products
- API: Update structure of attribute term endpoint to return `attribute.slug`, `attribute.name` etc
- API: Update parameters to use full names, `category_operator`, `attribute_operator`
- Components: Move SearchListControl to `@woocommerce/components` library
- Components: Added new control component GridContentControl to manage content visibility
- Build: Reorganize CSS into one file for editor preview, and one file for front-end styles
- Build: Move registration code to a new class
- Build: Update packages
