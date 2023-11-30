/**
 * External dependencies
 */
import {
	type BlockVariation,
	registerBlockVariation,
	BlockAttributes,
} from '@wordpress/blocks';
import { Icon, loop } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import blockJson from '../block.json';
import newArrivals from './new-arrivals';
import topRated from './top-rated';
import bestSellers from './best-sellers';
import onSale from './on-sale';
import featured from './featured';

const defaultQuery = {
	name: 'woocommerce-blocks/product-collection/default-query',
	title: 'All Products',
	icon: <Icon icon={ loop } />,
	description:
		'Display all products. Results may be limited by the current template context.',
};

export const collections = {
	newArrivals,
	topRated,
	bestSellers,
	onSale,
	featured,
	defaultQuery,
};

const collectionsArray: BlockVariation[] = [
	featured,
	topRated,
	onSale,
	bestSellers,
	newArrivals,
];

export const registerCollections = () => {
	collectionsArray.forEach( ( collection ) => {
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

export const getCollectionByName = ( collectionName ) => {
	return collectionsArray.find( ( { name } ) => name === collectionName );
};

export const getUnchangeableFilters = ( collectionName ) => {
	const collection = getCollectionByName( collectionName );

	if ( ! collection ) {
		return [];
	}

	return collection.unchangeableFilters;
};

export default registerCollections;
