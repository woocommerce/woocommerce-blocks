/**
 * External dependencies
 */
import {
	getBlockType,
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	type BlockInstance,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import {
	INNER_BLOCKS_TEMPLATE as productsInnerBlocksTemplate,
	QUERY_DEFAULT_ATTRIBUTES as productsQueryDefaultAttributes,
} from './constants';
import { VARIATION_NAME as productsVariationName } from './variations/product-query';

const createRowBlock = ( innerBlocks: Array< BlockInstance > ) => {
	const rowVariationName = `group-row`;
	const groupBlockVariations = getBlockType( 'core/group' )?.variations || [];
	const rowVariation = groupBlockVariations.find(
		( { name }: { name: string } ) => name === rowVariationName
	);

	if ( ! rowVariation ) return null;

	const { attributes } = rowVariation;
	const extendedAttributes = {
		...attributes,
		layout: {
			...attributes.layout,
			justifyContent: 'space-between',
		},
	};

	return createBlock( `core/group`, extendedAttributes, innerBlocks );
};

const createProductsBlock = () =>
	createBlock(
		'core/query',
		{
			...productsQueryDefaultAttributes,
			namespace: productsVariationName,
		},
		createBlocksFromInnerBlocksTemplate( productsInnerBlocksTemplate )
	);

export const getProductArchiveTemplate = () =>
	[
		createBlock( 'woocommerce/store-notices' ),
		createRowBlock( [
			createBlock( 'woocommerce/product-results-count' ),
			createBlock( 'woocommerce/catalog-sorting' ),
		] ),
		createProductsBlock(),
	].filter( Boolean ) as BlockInstance[];
