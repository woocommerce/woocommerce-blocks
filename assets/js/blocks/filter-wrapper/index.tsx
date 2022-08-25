/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { toggle } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ toggle }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit,
	save() {
		const innerBlocksProps = useInnerBlocksProps.save(
			useBlockProps.save()
		);
		return <div { ...innerBlocksProps } />;
	},
} );
