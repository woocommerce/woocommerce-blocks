# Checkout - Components <!-- omit in toc -->

A library of components to be used for creating common UI elements shared between features of the WooCommerce Cart and Checkout Blocks.

## Table of Contents <!-- omit in toc -->

-   [Usage](#usage)

## Usage

When WooCommerce Blocks is installed and activated, these components can be accessed by importing from the `blocks-checkout` package.

```typescript
// Aliased import
import { Button } from '@woocommerce/blocks-checkout';

// Global import
// const { Button } = wc.blocksCheckout;

export default function MyButton() {
	return <Button>Click Me!</Button>;
}
```

These components are here so they can be consumed by extensions.
