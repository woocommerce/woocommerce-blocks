/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock, BlockInstance } from '@wordpress/blocks';
import { select, dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { getProductsBlockClientIds } from './migration-utils';

const sinlgeBlockNotice = __(
	'Products (Beta) block has been replaced with Product Collection! Learn more.',
	'woo-gutenberg-products-block'
);
const multipleBlocksNotice = __(
	'Products (Beta) blocks have been replaced with Product Collection block! Learn more.',
	'woo-gutenberg-products-block'
);

const displaySuccessNotice = ( amount: number ) => {
	const notice = amount < 2 ? sinlgeBlockNotice : multipleBlocksNotice;
	dispatch( 'core/notices' ).createNotice( 'success', notice );
};

const checkIfBlockCanBeReplaced = ( clientId: string ) => {
	// We need to duplicate checks that are happening within replaceBlocks method
	// as replacement is initially blocked and there's no information returned
	// that would determine if replacement happened or not.
	// https://github.com/WordPress/gutenberg/issues/46740
	const rootClientId =
		select( 'core/block-editor' ).getBlockRootClientId( clientId ) ||
		undefined;
	return select( 'core/block-editor' ).canInsertBlockType(
		'woocommerce/product-collection',
		rootClientId
	);
};

const mapAttributes = ( atrributes: Record< string, unknown > ) => {
	const { query, namespace, ...restAttributes } = atrributes;
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
	const canBeReplaced = checkIfBlockCanBeReplaced( clientId );

	if ( productsBlock && canBeReplaced ) {
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
	const blocks = select( 'core/block-editor' ).getBlocks();
	const productsBlockClientIds = getProductsBlockClientIds( blocks );
	const amountOfReplacedBlocks = productsBlockClientIds.length;

	const replaced =
		amountOfReplacedBlocks &&
		replaceProductsBlocks( productsBlockClientIds );

	if ( replaced ) {
		displaySuccessNotice( amountOfReplacedBlocks );
		unsubscribe();
	}
};
