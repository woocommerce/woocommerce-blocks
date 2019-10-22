/**
 * Internal dependencies
 */
import { registeredBlocks } from './registered-blocks-init';

export function registerInnerBlock( { main, blockName, component } ) {
	if ( typeof main !== 'string' ) {
		throw new Error(
			'Wrong parent name when registering an inner block. `main` must be a string.'
		);
	}
	if ( typeof blockName !== 'string' ) {
		throw new Error(
			'Wrong block name when registering an inner block. `blockName` must be a string.'
		);
	}
	if ( typeof component !== 'function' ) {
		throw new Error(
			'Wrong component when registering an inner block. `component` must be a function.'
		);
	}

	if ( ! registeredBlocks[ main ] ) {
		registeredBlocks[ main ] = {};
	}

	registeredBlocks[ main ][ blockName ] = component;
}
