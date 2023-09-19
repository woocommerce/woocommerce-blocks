/**
 * External dependencies
 */
import {
	type BlockVariation,
	registerBlockVariation,
	BlockAttributes,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import newArrivals from './new-arrivals';

const collections: BlockVariation[] = [ newArrivals ];

const registerCollections = () => {
	collections.forEach( ( collection ) => {
		const isActive = (
			blockAttrs: BlockAttributes,
			variationAttributes: BlockAttributes
		) => {
			return blockAttrs.collection === variationAttributes.collection;
		};

		registerBlockVariation( 'woocommerce/product-collection', {
			isActive,
			...collection,
		} );
	} );
};

export default registerCollections;
