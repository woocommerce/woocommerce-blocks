# Storybook & Components

This repo includes [Storybook](https://storybook.js.org) tooling so we can test and develop components in isolation.

The storybook is automatically built and published to [GitHub pages](https://woocommerce.github.io/woocommerce-gutenberg-products-block/) on every push to the main branch. See [travis.yml](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/main/.travis.yml) for details.

https://woocommerce.github.io/woocommerce-gutenberg-products-block/

## Where are our components?
We have components in a few folders, for different contexts.

- [`assets/js/base/components`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/main/assets/js/base/components)
- [`assets/js/components`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/main/assets/js/components)
- [`assets/js/icons`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/main/assets/js/icons)

__`assets/js/base/components`__ are used in front-end code (as well as editor & admin). 
These components are typically general purpose (and the largest collection). 
These components help us build consistent interfaces across the front end (shopper) experience and elsewhere. 
In time, some of these components may move to a general purpose lib, such as [`@wordpress/components` in Gutenberg](https://github.com/WordPress/gutenberg/tree/master/packages/components).

__`assets/js/components`__ are used in the editor UI for our blocks. 
These components are typically more specialised to WooCommerce Blocks. 
They allow us to build a consistent and powerful UI for merchants for authoring content relating to Woo data - e.g. selecting products or product attributes.

__`assets/js/icons`__ is a suite of icons and SVG images that we use in our interfaces. 

For more info about individual components, refer to [Storybook](https://woocommerce.github.io/woocommerce-gutenberg-products-block/) or individual readme files.

## How to run Storybook locally and test components

- `npm run storybook`
- Point your browser at port 6006, e.g. http://localhost:6006
- Play with components 🎛!

## How to add a story for a component

- Add a `stories` folder alongside the component.
- Add stories in `.js` files in this folder. 

If you're stuck, copy source of an existing story to get started.
