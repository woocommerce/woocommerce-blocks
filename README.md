# WooCommerce Product Blocks

Feature plugin for WooCoomerce + Gutenberg. Now that the product blocks have been merged into WooCommerce 3.6, this plugin serves as a space to iterate and explore how else WooCommerce might work with the block editor. 

If you're just looking to use these blocks, update to WooCommerce 3.6! The blocks are bundled into WooCommerce, and can be added from the "WooCommerce" section in the block inserter.

If you want to see what we're working on for future versions, or want to help out, read on.

## Getting started with the stable version:

We release a new version of WooCommerce Blocks onto WordPress.org every few weeks, which can be used as an easier way to preview the features.

1. Make sure you have WordPress 5.0+ and WooCommerce 3.6+
2. The stable version is available on WordPress.org. [Download the stable version here.](https://wordpress.org/plugins/woo-gutenberg-products-block/)
3. Activate the plugin.

## Getting started with the development version:

1. Make sure you have WordPress 5.0+ and WooCommerce 3.6+
2. Get a copy of this plugin using the green "Clone or download" button on the right.
3. `npm install` to install the dependencies.
4. `npm run build` (build once) or `npm start` (keep watching for changes) to compile the code.
5. Activate the plugin.

The source code is in the `assets/` folder and the compiled code is built into `build/`.

**Gutenberg Tutorial and Docs**: https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/introducing-attributes-and-editable-fields/

**Using API in Gutenberg**: https://github.com/WordPress/gutenberg/tree/master/packages/api-fetch

## Vision for the Feature

Users should be able to insert a variety of products from their store (specific products, products in a category, with assorted layouts and visual styles, etc.) into their post content using a simple and powerful visual editor.
