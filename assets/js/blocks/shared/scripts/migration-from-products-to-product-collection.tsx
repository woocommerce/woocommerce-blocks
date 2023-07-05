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

const mapInnerBlocks = ( innerBlocks: BlockInstance[] ) => {
	return innerBlocks;
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
