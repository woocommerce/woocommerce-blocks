/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock, BlockInstance } from '@wordpress/blocks';
import { select, dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	getProductCollectionBlockClientIds,
	checkIfBlockCanBeInserted,
	type TransformBlock,
	type IsBlockType,
} from './migration-utils';

const VARIATION_NAME = 'woocommerce/product-query';

const notice = __(
	'Product Collection block(s) has been reverted with Products block!',
	'woo-gutenberg-products-block'
);

const displaySuccessNotice = () => {
	dispatch( 'core/notices' ).createNotice( 'success', notice );
};

const mapAttributes = ( attributes ) => {
	const { query, ...restAttributes } = attributes;
	const {
		woocommerceAttributes,
		woocommerceStockStatus,
		woocommerceOnSale,
		woocommerceHandPickedProducts,
		taxQuery,
		parents,
		isProductCollectionBlock,
		...restQuery
	} = query;

	// These fields have to be explicitly removed if they are empty
	// otherwise incorrect data is fetched even if they are set as undefined.
	const mappedQuery = { ...restQuery };
	if ( woocommerceHandPickedProducts ) {
		mappedQuery.include = woocommerceHandPickedProducts;
	}

	if ( woocommerceOnSale ) {
		mappedQuery.__woocommerceOnSale = woocommerceOnSale;
	}

	return {
		...restAttributes,
		namespace: VARIATION_NAME,
		query: {
			__woocommerceAttributes: woocommerceAttributes || [],
			__woocommerceStockStatus: woocommerceStockStatus || [],
			...mappedQuery,
		},
	};
};

const isProductTemplate: IsBlockType = ( { name } ) =>
	name === 'woocommerce/product-template';

const isPostTitle: IsBlockType = ( { name, attributes } ) =>
	name === 'core/post-title' &&
	attributes.__woocommerceNamespace ===
		'woocommerce/product-collection/product-title';

const isPostSummary: IsBlockType = ( { name, attributes } ) =>
	name === 'core/post-excerpt' &&
	attributes.__woocommerceNamespace ===
		'woocommerce/product-collection/product-summary';

const transformProductTemplate: TransformBlock = ( block, innerBlocks ) => {
	return createBlock(
		'core/post-template',
		{
			className: 'products-block-post-template',
			layout: { type: 'grid', columnCount: 3 },
			__woocommerceNamespace:
				'woocommerce/product-query/product-template',
			...block.attributes,
		},
		innerBlocks
	);
};

const transformPostTitle: TransformBlock = ( block, innerBlocks ) => {
	const { __woocommerceNamespace, ...restAttrributes } = block.attributes;
	return createBlock(
		'core/post-title',
		{
			__woocommerceNamespace:
				'woocommerce/product-collection/product-title',
			...restAttrributes,
		},
		innerBlocks
	);
};

const transformPostSummary: TransformBlock = ( block, innerBlocks ) => {
	const { __woocommerceNamespace, ...restAttrributes } = block.attributes;
	return createBlock(
		'core/post-excerpt',
		{
			__woocommerceNamespace:
				'woocommerce/product-collection/product-summary',
			...restAttrributes,
		},
		innerBlocks
	);
};

const mapInnerBlocks = ( innerBlocks: BlockInstance[] ): BlockInstance[] => {
	const mappedInnerBlocks = innerBlocks.map( ( innerBlock ) => {
		const { name, attributes } = innerBlock;

		const mappedInnerInnerBlocks = mapInnerBlocks( innerBlock.innerBlocks );

		if ( isProductTemplate( innerBlock ) ) {
			return transformProductTemplate(
				innerBlock,
				mappedInnerInnerBlocks
			);
		}

		if ( isPostTitle( innerBlock ) ) {
			return transformPostTitle( innerBlock, mappedInnerInnerBlocks );
		}

		if ( isPostSummary( innerBlock ) ) {
			return transformPostSummary( innerBlock, mappedInnerInnerBlocks );
		}
		return createBlock( name, attributes, mappedInnerInnerBlocks );
	} );

	return mappedInnerBlocks;
};

const replaceProductCollectionBlock = ( clientId: string ) => {
	const productCollectionBlock =
		select( 'core/block-editor' ).getBlock( clientId );
	const canBeInserted = checkIfBlockCanBeInserted( clientId, 'core/query' );

	if ( productCollectionBlock && canBeInserted ) {
		const { attributes = {}, innerBlocks = [] } = productCollectionBlock;
		const adjustedAttributes = mapAttributes( attributes );
		const adjustedInnerBlocks = mapInnerBlocks( innerBlocks );

		const productsBlock = createBlock(
			'core/query',
			adjustedAttributes,
			adjustedInnerBlocks
		);
		dispatch( 'core/block-editor' ).replaceBlock( clientId, productsBlock );
		return true;
	}
	return false;
};

const replaceProductCollectionBlocks = (
	productCollectionBlockClientIds: string[]
) => {
	const results = productCollectionBlockClientIds.map(
		replaceProductCollectionBlock
	);
	return !! results.length && results.every( ( result ) => !! result );
};

export const replaceProductCollectionWithProducts = (
	unsubscribe?: () => void
) => {
	const blocks = select( 'core/block-editor' ).getBlocks();
	const productCollectionBlockClientIds =
		getProductCollectionBlockClientIds( blocks );
	const amountOfReplacedBlocks = productCollectionBlockClientIds.length;

	const replaced =
		amountOfReplacedBlocks &&
		replaceProductCollectionBlocks( productCollectionBlockClientIds );

	if ( !! replaced ) {
		displaySuccessNotice();
		if ( typeof unsubscribe === 'function' ) {
			unsubscribe();
		}
	}
};
