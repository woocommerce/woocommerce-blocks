# Product Collection - Collections

Collections are a variations of Product Collection block with the predefined attributes which includes:

- UI aspect - you can define layout, number of columns etc.
- Query - specify the filters and sorting of the products
- Inner blocks structure - define the Product Template structure

## Interface

Collections are in fact Variations and they are registered via Variation API. Hence they should follow the BlockVariation type, providing at least:

```typescript
{
	name: string;
	title: string,
	icon: Icon,
	description: string,
	attributes: ProductCollectionAttributes,
	innerBlocks: InnerBlockTemplate[]
}
```

Please be aware you can specify `isActive` function, but if not, the default one will compare the variation's `name` with `attributes.collection` value.

As an example please follow `./new-arrivals.tsx`.

## Registering Collection

To register collection import it in `./index.ts` file and add to the `collections` array.
