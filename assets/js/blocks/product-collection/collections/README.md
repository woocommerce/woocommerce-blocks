# Product Collection - Collections

Collections are a variations of Product Collection block with the predefined attributes which includes:

- UI aspect - you can define layout, number of columns etc.
- Query - specify the filters and sorting of the products
- Inner blocks structure - define the Product Template structure

## Interface

Collections are in fact Variations and they are registred via Variation API. Hence they should follow the BlockVariation type, providing at least:

```javascript
{
	name: 'woocommerce-blocks/product-collection/new-arrivals',
	title: 'New Arrivals',
	icon: <Icon icon={ 'star-filled' } />,
	description: 'Display a grid of your newest products.',
	attributes: ProductCollectionAttributes,
	innerBlocks: InnerBlockTemplate[]
}
```

Please be aware you can specify `isActive` function, but if not, the default one will compare the variation's `name` with `attributes.collection` value.

As an example please follow `./new-arrivals.tsx`.
