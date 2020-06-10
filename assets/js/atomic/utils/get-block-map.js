/**
 * External dependencies
 */
import { getRegisteredBlockComponents } from '@woocommerce/blocks-registry';

/**
 * Internal dependencies
 */
import '../blocks/component-init';

/**
 * Map blocks to components suitable for use on the frontend.
 *
 * @param {string} blockName Name of the parent block. Used to get extension children.
 */
export const getBlockMap = ( blockName ) =>
	getRegisteredBlockComponents( blockName );
