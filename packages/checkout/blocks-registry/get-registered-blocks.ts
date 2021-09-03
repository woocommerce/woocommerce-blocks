/**
 * Internal dependencies
 */
import { innerBlockAreas, RegisteredBlock } from './types';
import { registeredBlocks } from './registered-blocks';

/**
 * Get a list of blocks available within a specific area.
 */
export const getRegisteredBlocks = (
	area: innerBlockAreas
): Array< RegisteredBlock > => {
	return Object.values( registeredBlocks ).filter( ( { metadata } ) =>
		( metadata?.parent || [] ).includes( area )
	);
};

/**
 * Check area is valid.
 */
export const isInnerBlockArea = ( area: string ): area is innerBlockAreas => {
	return Object.values( innerBlockAreas ).includes( area as innerBlockAreas );
};
