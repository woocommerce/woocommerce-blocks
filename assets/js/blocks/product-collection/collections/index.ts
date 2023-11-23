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
import topRated from './top-rated';
import bestSellers from './best-sellers';
import onSale from './on-sale';
import featured from './featured';

const collections: BlockVariation[] = [
	featured,
	topRated,
	onSale,
	bestSellers,
	newArrivals,
];

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
