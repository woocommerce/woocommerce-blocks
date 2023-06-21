/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import icon from './icon';

// @ts-expect-error: `registerBlockType` is a function that is typed in WordPress core.
registerBlockType( metadata, {
	icon,
} );
