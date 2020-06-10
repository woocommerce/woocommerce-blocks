/**
 * Internal dependencies
 */
import { registeredBlockComponents } from './registered-block-components-init';

/**
 * Retrieves the inner blocks registered as a child of a specific block, or globally.
 *
 * @export
 * @param {string} parent Name of the parent block to retrieve children of.
 *
 * @return {Object} List of registered inner blocks.
 */
export function getRegisteredBlockComponents( parent ) {
	const parentInnerBlocks =
		typeof registeredBlockComponents[ parent ] === 'object' &&
		Object.keys( registeredBlockComponents[ parent ] ).length > 0
			? registeredBlockComponents[ parent ]
			: {};

	return {
		...parentInnerBlocks,
		...registeredBlockComponents.global,
	};
}
