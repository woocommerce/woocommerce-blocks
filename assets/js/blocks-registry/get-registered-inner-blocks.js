/**
 * Internal dependencies
 */
import { registeredBlocks } from './registered-blocks-init';

export function getRegisteredInnerBlocks( main ) {
	return typeof registeredBlocks[ main ] === 'object' &&
		Object.keys( registeredBlocks[ main ] ).length > 0
		? registeredBlocks[ main ]
		: {};
}
