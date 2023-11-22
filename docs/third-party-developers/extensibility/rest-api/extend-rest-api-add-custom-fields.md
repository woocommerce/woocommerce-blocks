# Extending the WooCommerce Checkout Block to Add Custom Fields

This documentation addresses the requirement for extending the WooCommerce checkout block to accept additional data from a new inner block.

## Overview

Developers can extend the checkout block to add new fields and process additional data through the checkout POST request. This involves leveraging the extensibility interfaces provided by WooCommerce Blocks, as demonstrated in [our tutorial](https://developer.woocommerce.com/2023/08/07/extending-the-woocommerce-checkout-block-to-add-custom-shipping-options/) for adding a "Not at home" shipping option.

## Prerequisites

- Basic understanding of React and the Gutenberg block editor.
- Familiarity with WooCommerce Blocks' extensibility interfaces and the Store API.

## Step-by-Step Guide

### 1. Set Up Your Development Environment

Ensure you have the following files in your project:

- `index.js`: Entry point for Webpack, imports, and registers the block type.
- `edit.js`: Handles the rendering of the block in the editor interface.
- `block.json`: Provides metadata and configurations for the block.
- `block.js`: Manages the block's state and user interactions.
- `frontend.js`: Registers the checkout block component for the frontend.
- `shipping-workshop-blocks-integration.php`: Integrates the checkout block within WooCommerce.
- `shipping-workshop-extend-store-endpoint.php`: Extends the Store API for the block's functionality.

Refer to [this tutorial](https://developer.woocommerce.com/2023/08/07/extending-the-woocommerce-checkout-block-to-add-custom-shipping-options/) for an example of adding a custom shipping option to the checkout block.

### 2. Add a custom field to the Checkout Block

To add your custom field to the Checkout Block you will need to add the following entries to the `block.json` file of your block:

```json
"parent": [ "woocommerce/checkout-shipping-methods-block" ],
"attributes": {
	"lock": {
		"type": "object",
		"default": {
			"remove": true,
			"move": true
		}
	}
}
```

- The [lock attribute](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-templates/#individual-block-locking) is an object that controls whether the block can be removed or moved. By default, the lock attribute is set to allow the block to be removed and moved. However, by modifying the lock attribute, you can “force” the block to be non-removable. For example, you can set both remove and move properties to false in order to prevent the block from being removed or moved.
- The [parent attribute](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#parent) specifies the parent block that this block should be nested within it. It determines where the block will render. In our example, the block is a child of the `woocommerce/checkout-shipping-methods-block`. This means that the your block will be rendered within the `woocommerce/checkout-shipping-methods-block`.

### 3. Setting custom checkout data

We can set the added field data to passe it to the `wc/store/checkout` endpoint when processing orders using the function `setExtensionData`:

```JavaScript
setExtensionData(
	'namespace-of-your-block',
	'key-of-your-data',
	value
);
```

#### Parameters

- namespace `string` - The namespace of your block.
- key `string` - The key of your data.
- value `any` - The value of your data.

### 4. Extend the Store API

To persist your custom fields data, you will need to extend the Store API. Refer to [Exposing your data in the Store API](https://github.com/woocommerce/woocommerce-blocks/blob/trunk/docs/third-party-developers/extensibility/rest-api/extend-rest-api-add-data.md).

## Conclusion

By following the steps above, you can add and process custom fields in the WooCommerce checkout block. For complete implementation and additional examples, refer to the provided [tutorial](https://developer.woocommerce.com/2023/08/07/extending-the-woocommerce-checkout-block-to-add-custom-shipping-options/) and the corresponding [GitHub repository](https://github.com).
