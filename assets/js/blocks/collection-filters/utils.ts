/**
 * External dependencies
 */
import type { BlockInstance } from '@wordpress/blocks';

export function getQueryParams( block: BlockInstance | null ) {
	if ( ! block ) return {};

	return block.innerBlocks.reduce( ( acc, innerBlock ) => {
		acc = { ...acc, ...innerBlock.attributes?.queryParam };
		return acc;
	}, {} );
}
