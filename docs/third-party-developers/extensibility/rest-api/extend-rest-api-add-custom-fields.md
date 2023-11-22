# Extending the WooCommerce Checkout Block to Add a new Field Block

This documentation addresses the requirement for extending the WooCommerce checkout block to accept additional data from a new inner block.

## Overview

Developers can extend the checkout block to add new field blocks and process additional data through the checkout POST request. This involves leveraging the extensibility interfaces provided by WooCommerce Blocks, as demonstrated in [our tutorial](https://developer.woocommerce.com/2023/08/07/extending-the-woocommerce-checkout-block-to-add-custom-shipping-options/) for adding a "Not at home" shipping option.

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

Refer to [this tutorial](https://developer.woocommerce.com/2023/08/07/extending-the-woocommerce-checkout-block-to-add-custom-shipping-options/) for an example of adding a custom shipping option to the checkout block.

### 2. Add a new field block to the Checkout Block

To add a field block to the Checkout Block you will need to add the following entries to the `block.json` file of your block:

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

We can set the added field data to send it to the `wc/store/checkout` endpoint when processing orders using the function `setExtensionData`:

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

### 4. Processing the Checkout POST Request

To process the added field data, extend the Store API. We can do this within the `initialize` of your `IntegrationInterface` class.

#### Code Example

We will use the following PHP files in our example:

- The `custom-inner-block-blocks-integration.php` file:

```php
use Automattic\WooCommerce\Blocks\Integrations\IntegrationInterface;

/**
 * Class for integrating with WooCommerce Blocks
 */
class Custom_Inner_Block_Blocks_Integration implements IntegrationInterface {
	// ... Some code here

	/**
	 * When called invokes any initialization/setup for the integration.
	 */
	public function initialize() {
		require_once __DIR__ . '/custom-inner-block-extend-store-endpoint.php';
		// ... Some code here: (e.g. init functions that registers scripts and styles, and other instructions)
		$this->extend_store_api();
	}

	/**
	 * Extends the cart schema to include the custom-inner-block value.
	 */
	private function extend_store_api() {
		Custom_Inner_Block_Extend_Store_Endpoint::init();
	}
}
```

- The `custom-inner-block-extend-store-endpoint.php` file: extends the [Store API](https://github.com/woocommerce/woocommerce-blocks/tree/trunk/src/StoreApi) and adds hooks to save and display your new field block instructions.

```php
use Automattic\WooCommerce\Blocks\Package;
use Automattic\WooCommerce\Blocks\StoreApi\Schemas\CartSchema;
use Automattic\WooCommerce\Blocks\StoreApi\Schemas\CheckoutSchema;

/**
 * Your New Field Block Extend Store API.
 */
class Custom_Inner_Block_Extend_Store_Endpoint {
	/**
	 * Stores Rest Extending instance.
	 *
	 * @var ExtendRestApi
	 */
	private static $extend;

	/**
	 * Plugin Identifier, unique to each plugin.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'new-field-block';

	/**
	 * Bootstraps the class and hooks required data.
	 *
	 */
	public static function init() {
		self::$extend = Automattic\WooCommerce\StoreApi\StoreApi::container()->get( Automattic\WooCommerce\StoreApi\Schemas\ExtendSchema::class );
		self::extend_store();
	}

	/**
	 * Registers the actual data into each endpoint.
	 */
	public static function extend_store() {
		if ( is_callable( [ self::$extend, 'register_endpoint_data' ] ) ) {
			self::$extend->register_endpoint_data(
				[
					'endpoint'        => CheckoutSchema::IDENTIFIER,
					'namespace'       => self::IDENTIFIER,
					'schema_callback' => [ 'Custom_Inner_Block_Extend_Store_Endpoint', 'extend_checkout_schema' ],
					'schema_type'     => ARRAY_A,
				]
			);
		}
	}

	/**
	 * Register shipping workshop schema into the Checkout endpoint.
	 *
	 * @return array Registered schema.
	 *
	 */
	public static function extend_checkout_schema() {
		return [
            'Value_1'   => [
                'description' => // ... description of the field
                'type'        => // ... type of the field, this should be a string
                'context'     => // ... context of the field, this should be an array containing 'view' and 'edit'
                'readonly'    => // ... whether the field is readonly or not, this should be a boolean
                'optional'    => // ... whether the field is optional or not, this should be a boolean
            ],
			// ... other values
        ];
	}
}
```

## Conclusion

By following the steps above, you can add and process new field blocks in the WooCommerce checkout block. For complete implementation and additional examples, refer to the provided [tutorial](https://developer.woocommerce.com/2023/08/07/extending-the-woocommerce-checkout-block-to-add-custom-shipping-options/) and the corresponding [GitHub repository](https://github.com).
