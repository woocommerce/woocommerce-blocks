/**
 * Internal dependencies
 */
import { registeredBlocks } from './registered-blocks-init';

export function getRegisteredInnerBlocks( main ) {
	return registeredBlocks[ main ];
}
