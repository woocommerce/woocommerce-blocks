/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

registerBlockType( metadata, {
	edit,
	save() {
		return (
			<div { ...useBlockProps.save() }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
