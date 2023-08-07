/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Icon, mapMarker } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import attributes from './attributes';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ mapMarker }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit,
	save() {
		return (
			<div { ...useBlockProps.save() }>
				<InnerBlocks.Content />
			</div>
		);
	},
	attributes,
} );
