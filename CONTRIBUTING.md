# Contributing

Thanks for your interest in contributing to WooCommerce Blocks! Below are some developer docs for working with the project.

To get started, first run `npm install` and `composer install`.

## npm scripts

We have a set of scripts in npm to handle repeated developer tasks.

### `build` & `start`

These scripts compile the code using `webpack`. Run `build` to build the production build, `start` to build the development build and then keep watching for changes. You can also run `npx webpack` to run the development build and not keep watching.

### `lint`

This script runs 3 sub-commands: `lint:php`, `lint:css`, `lint:js`. Use these to run linters across the codebase.

- `lint:php` runs phpcs via composer, which uses the [phpcs.xml](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/master/phpcs.xml) ruleset.
- `lint:css` runs stylelint over all the scss code in `assets/css`, using the rules in [.stylelintrc.json.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/master/.stylelintrc.json)
- `lint:js` runs eslint over all the JavaScript, using the rules in [.eslintrc.js.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/master/.eslintrc.js)

### `test`

The test scripts use [wp-scripts](https://github.com/WordPress/gutenberg/tree/master/packages/scripts) to run jest for component and unit testing.

- `test:update` updates the snapshot tests for components, used if you change a component that has tests attached.
- Use `test:watch` to keep watch of files and automatically re-run tests.

### `prepack`

This script is run automatically when `npm pack` or `npm publish` is run. It installs packages, runs the linters, runs the tests, and then builds the files from the source once more.

## Publishing @woocommerce/block-library

We publish the blocks to npm at [@woocommerce/block-library,](https://www.npmjs.com/package/@woocommerce/block-library) and then import them into WooCommerce core via [a grunt script.](https://github.com/woocommerce/woocommerce/blob/741bd5ba6d193e21893ef3af3d4f3f030a79c099/Gruntfile.js#L347) 

To release a new version, there are 3 basic steps. Prepare and test the release, publish the version, then import into WooCommerce core.

### Prepare and test the release

- Manually change the versions in `package.json` and `woocommerce-gutenberg-products-block.php` (once in the plugin header, and `WGPB_VERSION`).
- Run `npm pack` to prep a `.tgz` file.
- Optionally test the package by uploading this onto a test site.

### Publish this version

On GitHub…

- go to [Releases](https://github.com/woocommerce/woocommerce-gutenberg-products-block/releases) and click "Draft a new release"
- The Tag version should start with `v`, and use [semver](https://semver.org/) formatting, ex `v2.0.0-rc`, or `v1.4.1`
- The Release title should be the human-readable version, ex "2.0.0 Release Candidate" or "2.0.0 alpha release"
- Add the changelog to the description (TBD, maybe not for every release?)
- Upload the `.tgz` from `npm pack` in the previous step as an attached binary

On npm…

- Run `npm publish --access public`, which will push the version up to npm.
- Check [@woocommerce/block-library](https://www.npmjs.com/package/@woocommerce/block-library) for your update

### Pull into WooCommerce core

- Manually update the @woocommerce/block-library version in `package.json`
- In the woocommerce folder, run `npm install` to download the version you just specified
- Run the copy command, `npx grunt blocks`, to copy the build files from node_modules into their destinations in WC core
- Check that the changes imported look correct
- Make a PR on WooCommerce to import the new version

## Publishing the WooCommerce Blocks plugin

TBD
