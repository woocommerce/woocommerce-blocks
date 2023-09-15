/**
 * External dependencies
 */
import { type BlockVariation, registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import newArrivals from './new-arrivals';

const collections: BlockVariation[] = [ newArrivals ];

const registerCollections = () => {
	collections.forEach( ( collection ) => {
		const isActive = ( blockAttrs ) =>
			blockAttrs.collection === collection.name;

		registerBlockVariation( 'woocommerce/product-collection', {
			isActive,
			...collection,
		} );
	} );
};

export default registerCollections;
