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
	const { query, namespace, ...restAttributes } = attributes;
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
	unsubscribe?: () => void
) => {
	const blocks = select( 'core/block-editor' ).getBlocks();
	const productsBlockClientIds = getProductsBlockClientIds( blocks );
	const amountOfReplacedBlocks = productsBlockClientIds.length;

	const replaced =
		!! amountOfReplacedBlocks &&
		replaceProductsBlocks( productsBlockClientIds );

	if ( replaced ) {
		displaySuccessNotice();
		if ( typeof unsubscribe === 'function' ) {
			unsubscribe();
		}
	}
};
