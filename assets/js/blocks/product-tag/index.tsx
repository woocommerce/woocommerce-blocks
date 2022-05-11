/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import './editor.scss';
import metadata from './block.json';
import { Edit } from './edit';

/**
 * Register and run the "Products by Tag" block.
 */
registerBlockType( metadata, {
	attributes: {
		...metadata.attributes,
		columns: {
			type: 'number',
			default: getSetting( 'default_columns', 3 ),
		},
		rows: {
			type: 'number',
			default: getSetting( 'default_rows', 3 ),
		},
		tags: {
			type: 'array',
			default: [],
		},
		stockStatus: {
			type: 'array',
			default: Object.keys( getSetting( 'stockStatusOptions', [] ) ),
		},
	},

	/**
	 * Renders and manages the block.
	 *
	 * @param {Object} props Props to pass to block.
	 */
	edit: Edit,

	save: () => {
		return null;
	},
} );
