# CSS build system

CSS files are build with Webpack, which gathers all SCSS files in the app and processes them with SASS and some PostCSS plugins like Autoprefixer. The resulting CSS files are merged into three files:

-   `editor.css`:
    -   Only loaded in the block editor.
    -   Bundles files located in:
        -   Inside the `/assets/js/components/` directory.
        -   Inside the `/assets/js/blocks/` directory and named `editor.css`.
-   `style.css`:
    -   Loaded in the editor and the frontend.
    -   Bundles files located in:
        -   Inside other `/assets/` subdirectories like `/assets/css/`, `/assets/js/base/components/`...
        -   Inside the `/assets/js/blocks/` directory and named `style.css`.
-   `vendors.css`:
    -   Loaded in the editor and the frontend of some blocks.
    -   Bundles files explicitly declared in Webpack entries which are located inside the `/node_modules/` directory.

## Legacy builds

Legacy builds use their own CSS files with the suffix `-legacy`, this allows saving some bytes because non-legacy block styles are not included. However, all components' styles are included no matter if they are only used by non-legacy blocks. So file size difference is not that big. See [#2818](https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/2818) for more details.

## Right-to-left

All files described above are generated in a LTR version and a RTL version. The RTL version is generated automatically with the `webpack-rtl-plugin` and has a `-rtl` suffix at the end of the file name.
