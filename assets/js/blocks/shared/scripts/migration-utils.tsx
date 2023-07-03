/**
 * External dependencies
 */
import { type BlockInstance } from '@wordpress/blocks';
import { select } from '@wordpress/data';

type GetBlocksClientIds = ( blocks: BlockInstance[] ) => string[];

const isProductsBlock = ( block: BlockInstance ) =>
	block.name === 'core/query' &&
	block.attributes.namespace === 'woocommerce/product-query';

const isProductCollectionBlock = ( block: BlockInstance ) =>
	block.name === 'woocommerce/product-collection';

const getBlockClientIdsByPredicate = (
	blocks: BlockInstance[],
	predicate: ( block: BlockInstance ) => boolean
): string[] => {
	let clientIds: string[] = [];
	blocks.forEach( ( block ) => {
		if ( predicate( block ) ) {
			clientIds = [ ...clientIds, block.clientId ];
		}
		clientIds = [
			...clientIds,
			...getBlockClientIdsByPredicate( block.innerBlocks, predicate ),
		];
	} );
	return clientIds;
};

const getProductsBlockClientIds: GetBlocksClientIds = ( blocks ) =>
	getBlockClientIdsByPredicate( blocks, isProductsBlock );

const getProductCollectionBlockClientIds: GetBlocksClientIds = ( blocks ) =>
	getBlockClientIdsByPredicate( blocks, isProductCollectionBlock );

const checkIfBlockCanBeInserted = (
	clientId: string,
	blockToBeInserted: string
) => {
	// We need to duplicate checks that are happening within replaceBlocks method
	// as replacement is initially blocked and there's no information returned
	// that would determine if replacement happened or not.
	// https://github.com/WordPress/gutenberg/issues/46740
	const rootClientId =
		select( 'core/block-editor' ).getBlockRootClientId( clientId ) ||
		undefined;
	return select( 'core/block-editor' ).canInsertBlockType(
		blockToBeInserted,
		rootClientId
	);
};

export {
	getProductsBlockClientIds,
	getProductCollectionBlockClientIds,
	checkIfBlockCanBeInserted,
};
