/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon, grid } from '@wordpress/icons';
import '@woocommerce/atomic-blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import deprecated from './deprecated';
import Edit from './edit';
import Save from './save';
import defaults from './defaults';

const { name } = metadata;
export { metadata, name };

const settings = {
	icon: {
		src: (
			<Icon
				icon={ grid }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	// Save the props to post content.
	save: Save,
	deprecated,
	defaults,
};

registerBlockType( name, settings );
