/**
 * External dependencies
 */
import { Icon, column } from '@wordpress/icons';
import { registerExperimentalBlockType } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import { Edit, Save } from './edit';
import metadata from './block.json';

registerExperimentalBlockType( metadata, {
	icon: {
		src: <Icon icon={ column } />,
		foreground: '#7f54b3',
	},
	edit: Edit,
	save: Save,
} );
