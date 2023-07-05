/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon, download } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import './style.scss';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ download }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
	},
	edit,
	save() {
		return null;
	},
} );
