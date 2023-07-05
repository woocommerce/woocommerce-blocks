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
	getProductsBlockClientIds,
	checkIfBlockCanBeInserted,
} from './migration-utils';

const notice = __(
	'Products (Beta) block(s) has been replaced with Product Collection! Learn more.',
	'woo-gutenberg-products-block'
);

const displaySuccessNotice = () => {
	dispatch( 'core/notices' ).createNotice( 'success', notice );
};

const mapAttributes = ( attributes: Record< string, unknown > ) => {
	const { query, namespace, displayUpgradeNotice, ...restAttributes } =
		attributes;
	const {
		__woocommerceAttributes,
		__woocommerceStockStatus,
		__woocommerceOnSale,
		include,
		...restQuery
	} = query;

	return {
		...restAttributes,
		query: {
			woocommerceAttributes: __woocommerceAttributes,
			woocommerceStockStatus: __woocommerceStockStatus,
			woocommerceOnSale: __woocommerceOnSale,
			woocommerceHandPickedProducts: include,
			taxQuery: {},
			parents: [],
			isProductCollectionBlock: true,
			...restQuery,
		},
		displayUpgradeNotice: true,
	};
};

type IsBlockType = ( block: BlockInstance ) => boolean;
type TransformBlock = (
	block: BlockInstance,
	innerBlock: BlockInstance[]
) => BlockInstance;

const isPostTemplate: IsBlockType = ( { name, attributes } ) =>
	name === 'core/post-template' &&
	attributes.__woocommerceNamespace ===
		'woocommerce/product-query/product-template';

const isPostTitle: IsBlockType = ( { name, attributes } ) =>
	name === 'core/post-title' &&
	attributes.__woocommerceNamespace ===
		'woocommerce/product-query/product-title';

const isPostSummary: IsBlockType = ( { name, attributes } ) =>
	name === 'core/post-excerpt' &&
	attributes.__woocommerceNamespace ===
		'woocommerce/product-query/product-summary';

const transformPostTemplate: TransformBlock = ( block, innerBlocks ) => {
	const { __woocommerceNamespace, className, layout, ...restAttrributes } =
		block.attributes;
	return createBlock(
		'woocommerce/product-template',
		restAttrributes,
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

		if ( isPostTemplate( innerBlock ) ) {
			return transformPostTemplate( innerBlock, mappedInnerInnerBlocks );
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

const replaceProductsBlock = ( clientId: string ) => {
	const productsBlock = select( 'core/block-editor' ).getBlock( clientId );
	const canBeInserted = checkIfBlockCanBeInserted(
		clientId,
		'woocommerce/product-collection'
	);

	if ( productsBlock && canBeInserted ) {
		const { attributes = {}, innerBlocks = [] } = productsBlock;
		const adjustedAttributes = mapAttributes( attributes );
		const adjustedInnerBlocks = mapInnerBlocks( innerBlocks );

		const productCollectionBlock = createBlock(
			'woocommerce/product-collection',
			adjustedAttributes,
			adjustedInnerBlocks
		);
		dispatch( 'core/block-editor' ).replaceBlock(
			clientId,
			productCollectionBlock
		);
		return true;
	}
	return false;
};

const replaceProductsBlocks = ( productsBlockClientIds: string[] ) => {
	const results = productsBlockClientIds.map( replaceProductsBlock );
	return !! results.length && results.every( ( result ) => !! result );
};

export const replaceProductsWithProductCollection = (
	unsubscribe: () => void
) => {
	const queryBlocksCount =
		select( 'core/block-editor' ).getGlobalBlockCount( 'core/query' );
	if ( queryBlocksCount === 0 ) {
		return;
	}

	const blocks = select( 'core/block-editor' ).getBlocks();
	const productsBlockClientIds = getProductsBlockClientIds( blocks );
	const productsBlocksCount = productsBlockClientIds.length;

	if ( productsBlocksCount === 0 ) {
		return;
	}

	const replaced = replaceProductsBlocks( productsBlockClientIds );

	if ( replaced ) {
		// @todo: remove notice before final PR
		displaySuccessNotice();
		// @todo: unsubscribe on user reverting migration
		unsubscribe();
	}
};
