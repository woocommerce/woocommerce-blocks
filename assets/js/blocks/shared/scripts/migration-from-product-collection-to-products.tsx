/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { select, dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	getProductCollectionBlockClientIds,
	checkIfBlockCanBeInserted,
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
	return {
		...restAttributes,
		namespace: VARIATION_NAME,
		query: {
			__woocommerceAttributes: woocommerceAttributes || [],
			__woocommerceStockStatus: woocommerceStockStatus || [],
			__woocommerceOnSale: woocommerceOnSale || false,
			include: woocommerceHandPickedProducts || [],
			...restQuery,
		},
	};
};
const mapInnerBlocks = ( innerBlocks ) => innerBlocks;

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
