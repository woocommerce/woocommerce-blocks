/**
 * External dependencies
 */
import { BlockInstance } from '@wordpress/blocks';

function getInnerFilterTypes( block: BlockInstance ): string[] {
	return block.innerBlocks.reduce< string[] >( ( acc, innerBlock ) => {
		return acc.concat(
			innerBlock.attributes?.filterType,
			getInnerFilterTypes( innerBlock )
		);
	}, [] );
}

export function getQueryParams( block: BlockInstance | null ) {
	if ( ! block ) return {};

	const innerFilterTypes = getInnerFilterTypes( block );
	const map = {
		queryPrices: 'price',
		queryAttributes: 'attribute',
		queryStock: 'stock',
		queryRating: 'rating',
	};

	return Object.entries( map ).reduce< Record< string, boolean > >(
		( acc, [ key, value ] ) => {
			acc[ key ] = innerFilterTypes.includes( value );
			return acc;
		},
		{}
	);
}
