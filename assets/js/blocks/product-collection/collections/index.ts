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
import blockJson from '../block.json';
import newArrivals from './new-arrivals';
import topSellers from './top-sellers';

const collections: BlockVariation[] = [ newArrivals, topSellers ];

const registerCollections = () => {
	collections.forEach( ( collection ) => {
		const isActive = (
			blockAttrs: BlockAttributes,
			variationAttributes: BlockAttributes
		) => {
			return blockAttrs.collection === variationAttributes.collection;
		};

		registerBlockVariation( blockJson.name, {
			isActive,
			...collection,
		} );
	} );
};

export default registerCollections;
