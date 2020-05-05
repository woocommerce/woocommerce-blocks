/**
 * Converts inner blocks to a list of layout configs.
 *
 * @param {Object[]} innerBlocks Inner block components.
 */
export const getLayoutConfig = ( innerBlocks ) => {
	if ( ! innerBlocks || innerBlocks.length === 0 ) {
		return [];
	}

	return innerBlocks.map( ( block ) => {
		return [
			block.name,
			{
				...block.attributes,
				product: undefined,
				children:
					block.innerBlocks.length > 0
						? getLayoutConfig( block.innerBlocks )
						: [],
			},
		];
	} );
};
