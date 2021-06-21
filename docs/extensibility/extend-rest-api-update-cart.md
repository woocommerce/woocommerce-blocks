# Updating the cart with the Store API
If you're an extension developer, and your extension does some server-side processing as a result of some client-side
input, for example: a user presses a button your extension has added to the cart sidebar, and your extension performs
some checks (server-side) then applies a coupon, then you may want to use the `cart/extensions` endpoint to signal to
the Store API that some processing needs to take place.

Extensions may register a callback to run when the `cart/extensions` endpoint is hit. When it is, the server will
execute all registered callbacks for a specified namespace.

## Registering a callback to run when the `cart/extensions` endpoint is hit
Much like adding data to the Store API (described in more detail in
[Exposing your data in the Store API]('./extend-rest-api-add-data.md).) you may add the callback
by using a method on the `ExtendRestApi` class from WooCommerce Blocks.

```PHP

use Automattic\WooCommerce\Blocks\Package;
use Automattic\WooCommerce\Blocks\Domain\Services\ExtendRestApi;
use Automattic\WooCommerce\Blocks\StoreApi\Schemas\CartSchema;

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
The namespace you provide to the `register_update_callback` method should be unique to your extension.

Your callable should accept a single argument. This will be an array containing whatever data you choose to pass to it.
More information on how data gets passed from the client to the callback will be detailed over the next sections.

The callable need not return anything, its return value will not be used.

## Making the request to the `cart/extensions` endpoint
When you wish to make a request to the endpoint, you should do it by calling the `extensionCartUpdate` function, available
from `@woocommerce/blocks-checkout`.

This function takes a single argument, of type object. The object must contain two properties: `namespace` and `data`.

- `namespace` should be the same as the one you used when registering your callback with `ExtendRestApi` on the
server-side.
- `data` is an object containing the data you want to pass to the server-side function. These data must be serializable.

```javascript
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
