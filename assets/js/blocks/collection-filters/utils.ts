/**
 * External dependencies
 */
import { objectHasProp } from '@woocommerce/types';
import type { BlockInstance } from '@wordpress/blocks';

function mergeAttributeParams(
	acc: Record< string, unknown >,
	innerBlock: BlockInstance
) {
	const current =
		( acc?.calculate_attribute_counts as Array< unknown > ) ?? [];
	acc.calculate_attribute_counts = [
		...current,
		innerBlock.attributes.queryParam.calculate_attribute_counts,
	];
	return acc;
}

function getInnerBlocksParams(
	block: BlockInstance,
	initial: Record< string, unknown > = {}
) {
	return block.innerBlocks.reduce(
		( acc, innerBlock ): Record< string, unknown > => {
			if (
				objectHasProp(
					innerBlock.attributes.queryParam,
					'calculate_attribute_counts'
				)
			) {
				acc = mergeAttributeParams( acc, innerBlock );
			} else {
				acc = { ...acc, ...innerBlock.attributes?.queryParam };
			}

			return getInnerBlocksParams( innerBlock, acc );
		},
		initial
	);
}

export function getQueryParams( block: BlockInstance | null ) {
	if ( ! block ) return {};

	return getInnerBlocksParams( block );
}
