/**
 * Internal dependencies
 */
import { registeredBlocks } from './registered-blocks-init';

/**
 * Registers an inner block that can be added as a child of another block.
 *
 * @export
 * @param {string}   main      Name of the parent block.
 * @param {string}   value     Name of the child block beeing registered.
 * @param {function} component React component used to render the child block.
 */
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
