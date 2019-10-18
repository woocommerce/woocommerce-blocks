/**
 * Internal dependencies
 */
import { registeredBlocks } from './registered-blocks-init';

export function registerInnerBlock( { main, blockName, component } ) {
	if ( ! registeredBlocks[ main ] ) {
		registeredBlocks[ main ] = {};
	}

	registeredBlocks[ main ][ blockName ] = component;
}
