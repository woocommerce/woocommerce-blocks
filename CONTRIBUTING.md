# Contributing

Thanks for your interest in contributing to WooCommerce Blocks! Below are some developer docs for working with the project.

To get started you need to install all required dependencies by running the following command in the plugin directory.

```bash
npm install && composer install
```

## NPM commands

We have a set of scripts in npm to automate important developer tasks.

### Build

-   Run `$ npm run build` to build all assets for production.
-   Run `$ npm start` to run the development build and watch for changes.

These scripts compile the code using `webpack`.

You can also run `$ npx webpack` to run the development build and not keep watching.

### Lint

Run `$ npm run lint` to check code against our linting rules.

This script runs 3 sub-commands: `lint:php`, `lint:css`, `lint:js`. Use these to run linters across the codebase (linters check for valid syntax).

-   `lint:php` runs phpcs via composer, which uses the [phpcs.xml](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/master/phpcs.xml) rule set.
-   `lint:css` runs stylelint over all the scss code in `assets/css`, using the rules in [.stylelintrc.json.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/master/.stylelintrc.json)
-   `lint:js` runs eslint over all the JavaScript, using the rules in [.eslintrc.js.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/master/.eslintrc.js)

### Test

Run `$ npm run test` to run unit tests on the JavaScript.

The test scripts use [wp-scripts](https://github.com/WordPress/gutenberg/tree/master/packages/scripts) to run jest for component and unit testing.

-   `test:update` updates the snapshot tests for components, used if you change a component that has tests attached.
-   Use `test:watch` to keep watch of files and automatically re-run tests.

### Create a plugin package in ZIP format

Run `$ npm run package-plugin` to trigger install and build, and then create a zip file which you can use to install WooCommerce Blocks in WordPress admin.

## Releases

See [release.md](release.md).

## Publishing `@woocommerce/block-library`

In the past, we published the blocks to NPM at [@woocommerce/block-library](https://www.npmjs.com/package/@woocommerce/block-library).

**Note: since version 2.3.0 `@woocommerce/block-library` has been deprecated, you shouldn't publish a new version without first discussing it with the team**

To release a new version, perform the following steps:

-   Run `npm pack` to prep a `.tgz` file.
-   Optionally test the package by uploading this onto a test site.
-   Run `npm publish --access public`, which will push the version up to npm.

## Legacy builds

This plugin supports two type of builds:

-   legacy builds (assets have `-legacy` suffix on their file names)
-   main builds (without the `-legacy` prefix)

The legacy builds are loaded in a site environment where the WordPress version doesn't meet minimum requirements for a components used in a set build.

You can read more about legacy builds in the [this doc](./assets/js/legacy/README.md).
