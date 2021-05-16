# Slots and Fills

## The problem
You added custom data to the [Store API](./extend-rest-api-add-data.md), you changed several strings using [Checkout filters](./available-filters.md), but now, you want to render your own components in specific places in Cart and Checkout.

## Solution

Slots and Fills adds the possiblity to render your own HTML in pre-defined places in Cart and Checkout, your component would get access to contextual data and will get re-rendered when needed.

A Slot is a place in Cart and Checkout that can render indefinite number of external components.

A Fill is the component provided by third-party developers to render inside a Slot.

Slots and Fills uses the WordPress's API, [so you can expand more on its API there.](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/slot-fill).

## Basic Usage

`ExperimentalOrderMeta` is a fill that will render in a slot below the order summary section in Cart and Checkout blocks.
The `ExperimentalOrderMeta` will automatically pass props to its top level child, `cart` which contains cart data, `extensions` which contains data registered with `ExtendRestAPI` in `wc/store/cart` endpoint.

```jsx
const { registerPlugin } = wp.plugins;
const { ExperimentalOrderMeta } = wc.blocksCheckout;

const MyCustomComponent = ( { cart, extensions } ) => {
	return <div className='my-component'>Hello WooCommerce</div>
}

const render = () => {
	return (
			<ExperimentalOrderMeta>
				<MyCustomComponent />
			</ExperimentalOrderMeta>
	);
};

registerPlugin( 'my-plugin-namespace', {
	render,
	scope: 'woocommerce-checkout',
} );
```

## registerPlugin

In the above example, we're using `registerPlugin`, this plugin will take our component and render it, but it won't make visible, the SlotFill part is the one responsible for actually having it show up on the correct place.

You use `registerPlugin` to feed in your plugin namespace, your component `render` and the scope of your `registerPlugin`, this value should always be `woocommerce-checkout`.

## Requirements
For this to work, you script must be enqueued after Cart and Checkout, you can follow the `IntegrationInterface` documentation to enqueue your script (TBD).