/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { Icon } from '@wordpress/icons';
import { customerAccount } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import { Attributes } from './types';
import metadata from './block.json';
import edit from './edit';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ customerAccount }
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
