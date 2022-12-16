# Local Pickup

To test the new local pickup, you need to use this zip: [woocommerce-gutenberg-products-block.zip](https://github.com/woocommerce/woocommerce-blocks/files/10241580/woocommerce-gutenberg-products-block.zip)

## Managing Local Pickup

### Enabling local pickup

1. In a fresh website that uses Checkout shortcode as its main Checkout, go to **WooCommerce -> Settings -> Shipping**, you should **not** see a local pickup tab there.
2. Switch to using Checkout block for your main Checkout by removing the shortcode and adding Checkout block.
3. In your Checkout block, you should not see the shipping method toggle or pickup options block.
3. Visit  **WooCommerce -> Settings -> Shipping** again, you should see a Local Pickup tab there.
4. You should be able to toggle local pickup on from that screen.
5. In your Checkout page in the editor, you should see your shipping method and pickup options block.

### Adding locations

### Removing locations

### Adding local pickup price

### Editing Shipping methods toggle titles

### Enabling and disabling icons and pricing

## General testing

### Local Pickup enabled with no locations

1. In **WooCommerce -> Settings -> Shipping -> Local Pickup**, enable local pickup, but don't add any pickup locations.
2. Visit the frontend of your website, add an item to cart, and navigate to Checkout.
3. You should **not** see the shipping method toggle.

### Local Pickup enabled with locations

### Shipping selector toggle with different min/max prices for shipping

### Local pickup in cart

## Multiple Packages

### Multiple packages that all support Local Pickup

### Multiple packages in which one doesn't support Local Pickup (via multiple packages plugin)

### Multiple pacakges in Cart

## Conflict and disabling

### Enabling Shipping zone local pickup and new local pickup at same time

### Switching back to shortcode

### Disabling Local Pickup
