/**
 * External dependencies
 */
import { type BlockInstance } from '@wordpress/blocks';

const isProductsBlock = ( block: BlockInstance ) =>
	block.name === 'core/query' &&
	block.attributes.namespace === 'woocommerce/product-query';

export const getProductsBlockClientIds = ( blocks: BlockInstance[] ) => {
	let clientIds: string[] = [];
	blocks.forEach( ( block ) => {
		if ( isProductsBlock( block ) ) {
			clientIds = [ ...clientIds, block.clientId ];
		}
		clientIds = [
			...clientIds,
			...getProductsBlockClientIds( block.innerBlocks ),
		];
	} );
	return clientIds;
};
