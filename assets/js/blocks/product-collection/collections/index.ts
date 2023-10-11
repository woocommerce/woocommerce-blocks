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
import productRecommendations from './product-recommendations';
import blockJson from '../block.json';

const collections: BlockVariation[] = [ newArrivals, productRecommendations ];

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
