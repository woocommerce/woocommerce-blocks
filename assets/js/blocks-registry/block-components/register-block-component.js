/**
 * Internal dependencies
 */
import { registeredBlockComponents } from './registered-block-components-init';

/**
 * Asserts that an option is of the given type. Otherwise, throws an error.
 *
 * @throws Will throw an error if the type of the option doesn't match the expected type.
 * @param {Object} options      Object containing the option to validate.
 * @param {string} optionName   Name of the option to validate.
 * @param {string} expectedType Type expected for the option.
 */
const assertOption = ( options, optionName, expectedType ) => {
	if ( typeof options[ optionName ] !== expectedType ) {
		throw new Error(
			`Incorrect value for the ${ optionName } argument when registering an inner block. It must be a ${ expectedType }.`
		);
	}
};

/**
 * Registers an inner block that can be added as a child of another block.
 *
 * @export
 * @param {Object}   options           Options to use when registering the block.
 * @param {string}   [options.parent]  Name of the parent block, or blank to register globally.
 * @param {string}   options.blockName Name of the child block being registered.
 * @param {Function} options.component React component used to render the child block.
 */
export function registerBlockComponent( options ) {
	if ( ! options.parent ) {
		options.parent = 'global';
	}

	assertOption( options, 'parent', 'string' );
	assertOption( options, 'blockName', 'string' );
	assertOption( options, 'component', 'function' );

	const { parent, blockName, component } = options;

	if ( ! registeredBlockComponents[ parent ] ) {
		registeredBlockComponents[ parent ] = {};
	}

	registeredBlockComponents[ parent ][ blockName ] = component;
}
