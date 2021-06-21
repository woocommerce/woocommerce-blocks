# Updating the cart with the Store API
If you're an extension developer, and your extension does some server-side processing as a result of some client-side
input, then you may want to use the `cart/extensions` endpoint to signal to
the Store API that some processing needs to take place.

Extensions may register a callback to run when the `cart/extensions` endpoint is hit. When it is, the server will
execute all registered callbacks for a specified namespace.

## Example use case
You are the author of an extension that automatically applies valid coupons to a user's cart when they press a
button.

Your extension adds a button to the sidebar in the Cart and Checkout blocks using the [`DiscountsMeta`](./available-slot-fills.md) Slot.

When this button is clicked, you want the server to do some work to figure out which coupons the customer is eligible
for, and then apply them to the cart.

When this is done, you expect to see the updated cart data in the client.

## Registering a callback to run when the `cart/extensions` endpoint is hit
Much like adding data to the Store API (described in more detail in
[Exposing your data in the Store API](./extend-rest-api-add-data.md).) you may add the callback
by invoking the `register_update_callback` method on the `ExtendRestApi` class from WooCommerce Blocks.

```PHP

use Automattic\WooCommerce\Blocks\Package;
use Automattic\WooCommerce\Blocks\Domain\Services\ExtendRestApi;

add_action('woocommerce_blocks_loaded', function() {
 // ExtendRestApi is stored in the container as a shared instance between the API and consumers.
 // You shouldn't initiate your own ExtendRestApi instance using `new ExtendRestApi` but should always use the shared instance from the Package dependency injection container.
 $extend = Package::container()->get( ExtendRestApi::class );
 $extend->register_update_callback(
   [
    'namespace' => 'my-extensions-unique-namespace',
    'callback'  => /* Add your callable here */
   ]
 )
} );
```

The method takes a single argument, an associative array.

The associative array must have the following entries:
- `namespace` (string) - The unique namespace of your extension.
- `callback` (Callable) - The function/method (or Callable) that will be executed when the `cart/extensions` endpoint is
  hit with a `namespace` that matches your extension's. The callable should take a single argument. The data passed into
  the callback via this argument will be an array containing whatever data you choose to pass to it.
More information on how data gets passed from the client to the callback will be detailed over the next sections.

The callable does not need to return anything, if it does, then its return value will not be used.

## Making the request to the `cart/extensions` endpoint
When you wish to make a request to the endpoint, you should do it by calling the `extensionCartUpdate` function, available
from `@woocommerce/blocks-checkout`.

This function takes a single argument, of type object. The object must contain two properties: `namespace` and `data`.

- `namespace` should be the same as the one you used when registering your callback with `ExtendRestApi` on the
server-side.
- `data` is an object containing the data you want to pass to the server-side function. These data must be serializable.

```javascript
import { extensionCartUpdate } from '@woocommerce/blocks-checkout';

extensionCartUpdate(
  {
    namespace: 'my-extensions-unique-namespace',
    data: {
      key: 'value',
      another_key: 100,
      third_key: {
        fourth_key: true,
      }
    }
  }
);
```

When this function is executed, after a short delay (due to batch requests) a POST request will be made to the
`cart/extensions` endpoint, the POSTed data will be the value of the `data` key in the argument object.

When the request completes, the API will return the current server-side cart to the client. The client will then update
the UI.

## Why can't I just POST to `cart/extensions` directly?
This endpoint returns an object representing the customer's cart, WooCommerce Blocks will then update the client-side
stores with the new cart data. The methods to do this are not available to third party extensions, which is why you must
use the `extensionCartUpdate` method.
