/**
 * External dependencies
 */
import { type BlockInstance } from '@wordpress/blocks';

const isProductsBlock = ( block: BlockInstance ) =>
	block.name === 'core/query' &&
	block.attributes.namespace === 'woocommerce/product-query';

const isProductCollectionBlock = ( block: BlockInstance ) =>
	block.name === 'woocommerce/product-collection';

export const getBlockClientIdsByPredicate = (
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

export const getProductsBlockClientIds = ( blocks: BlockInstance[] ) => {
	getBlockClientIdsByPredicate( blocks, isProductsBlock );
};

export const getProductCollectionBlockClientIds = (
	blocks: BlockInstance[]
) => {
	getBlockClientIdsByPredicate( blocks, isProductCollectionBlock );
};
