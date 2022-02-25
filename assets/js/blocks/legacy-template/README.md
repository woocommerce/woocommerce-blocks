# Legacy Template Block

The Legacy Template block is a placeholder block for specific WooCommerce block templates which are rendered on the server-side when a block theme is active.

Given a specific template attribute prop, the block will render a specific template both on the front-end and in the Site Editor in the form of a placeholder.

## Usage

### Props

* `attributes`
  * `template`: `single-product` | `archive-product` | `taxonomy-product_cat` | `taxonomy-product_tag`

```html
<!-- wp:woocommerce/legacy-template {"template":"single-product"} /-->
```

![Legacy Template Block Single Product](./assets/doc-image-single-product-legacy-block.png)
