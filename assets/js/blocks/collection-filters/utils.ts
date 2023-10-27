/**
 * External dependencies
 */
import type { BlockInstance } from '@wordpress/blocks';

function getInnerBlocksParams( block: BlockInstance, initial = {} ) {
	return block.innerBlocks.reduce(
		( acc, innerBlock ): Record< string, unknown > => {
			acc = { ...acc, ...innerBlock.attributes?.queryParam };
			return getInnerBlocksParams( innerBlock, acc );
		},
		initial
	);
}

export function getQueryParams( block: BlockInstance | null ) {
	if ( ! block ) return {};

	return getInnerBlocksParams( block );
}
