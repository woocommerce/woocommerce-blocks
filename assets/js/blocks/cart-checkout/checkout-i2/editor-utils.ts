/**
 * External dependencies
 */
import { getBlockTypes } from '@wordpress/blocks';

export const getRegisteredBlockNamesByParent = (
	parentBlockName: string
): string[] =>
	getBlockTypes()
		.filter( ( blockType ) =>
			( blockType?.parent || [] ).includes( parentBlockName )
		)
		.map( ( { name } ) => name );
