/**
 * Internal dependencies
 */
import { InnerBlockAreas, RegisteredBlock } from './types';
import { registeredBlocks } from './registered-blocks';

/**
 * Get a list of blocks available within a specific area.
 */
export const getRegisteredBlocks = (
	area: InnerBlockAreas
): Array< RegisteredBlock > => {
	return [ ...( registeredBlocks[ area ] || [] ) ];
};

/**
 * Get a list of blocks names in inner block template format.
 */
export const getRegisteredBlockTemplate = (
	area: InnerBlockAreas
): Array< string > =>
	getRegisteredBlocks( area ).map(
		( block: RegisteredBlock ) => block.block
	);

/**
 * Check area is valid.
 */
export const isInnerBlockArea = ( area: string ): area is InnerBlockAreas => {
	return Object.values( InnerBlockAreas ).includes( area as InnerBlockAreas );
};
