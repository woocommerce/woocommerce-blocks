# JS build system

WooCommerce Blocks uses Webpack to build the files that will be consumed by browsers. There are several different Webpack configs in order to build files for different contexts of the plugin. They can all be found in [`webpack.config.js`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/main/webpack.config.js#L148-L160), but this is a quick summary:

-   `CoreConfig`: config for shared libraries like settings, blocks data or some HOCs and context.
-   `MainConfig`: config that builds the JS files used by blocks in the editor and is responsible for registering the blocks in Gutenberg.
-   `FrontendConfig`: config that builds the JS files used by blocks in the store frontend.
-   `PaymentsConfig`: config that builds the JS files used by payment methods in the Cart and Checkout blocks.
-   `StylingConfig`: config that builds CSS files. You can read more about it in the page [CSS build system](css-build-system.md).

Details on each config can be found in [`webpack-configs.js`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/main/bin/webpack-configs.js). Entry points are declared in [`webpack-entries.js`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/main/bin/webpack-entries.js).

## Environment variables

Different builds are generated depending on the variable `NODE_ENV`. It can have two values: `production` or `development`. Production builds include tree-shaking, minification and other performance enhancements, while development builds are focused on development and include source maps. You can read more about [environment variables](https://webpack.js.org/guides/environment-variables/) in Webpack docs.

## Babel

Almost all our code is transpiled by Babel, this allows us to use the latest JavaScript technologies without having to worry about browser support. However, it's always a good practice to test the plugin in old browsers like IE11 to ensure nothing is broken.

Some of the Babel plugins we use can be found in [`webpack-configs.js`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/main/bin/webpack-configs.js).

## External scripts

Several scripts are loaded as externals. That means that they are imported in WC Blocks as any other package, but instead of being bundled in our built files, they are loaded from an external file. We use [`@wordpress/dependency-extraction-webpack-plugin`](https://developer.wordpress.org/block-editor/packages/packages-dependency-extraction-webpack-plugin/) to automatize dependency extraction for common WP scripts.

## Aliases

There are several aliases for internal imports which make importing files across the file tree easier. Instead of having to write a long relative path, they allow writing an alias:

```diff
-import { useStoreCartCoupons } from '../../../../base/hooks';
+import { useStoreCartCoupons } from '@woocommerce/base-hooks';
```

All available aliases can be found in [`webpack-helpers.js`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/main/bin/webpack-helpers.js#L26-L84).

## Styling

CSS builds follow a separate path from JS builds, more details can be found in the [CSS build system](css-build-system.md).

## Legacy builds

In the past, when building WC Blocks, special builds targeting old versions of WordPress were generated. Those builds were named 'legacy builds' and might have a smaller set of blocks available. For example, All Products and Filter blocks were not available on WP 5.2.

There were legacy builds of the `MainConfig`, `FrontendConfig` and `StylingConfig`. Currently, those builds are no longer generated since WC Blocks doesn't support WP 5.2 anymore, but the built system is still in place in case legacy builds are needed in the future.

## Relevant files

Webpack config is split between several files:

-   [`webpack.config.js`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/main/webpack.config.js): file that exports the configs.
-   [`bin/webpack-configs.js`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/main/bin/webpack-configs.js): definition of the different configs used by Webpack.
-   [`bin/webpack-entries.js`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/main/bin/webpack-entries.js): entries used by Webpack definitions.
-   [`bin/webpack-helpers.js`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/main/bin/webpack-helpers.js): includes several utils to load externals.
