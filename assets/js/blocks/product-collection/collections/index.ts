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
		registerBlockVariation( 'woocommerce/product-collection', collection );
	} );
};

export default registerCollections;
