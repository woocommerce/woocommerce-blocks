/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { isExperimentalBuild } from '@woocommerce/block-settings';
import { image, Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { Save } from './save';
import edit from './edit';

import metadata from './block.json';
import { supports } from './supports';

registerBlockType( metadata, {
	edit,
	save: Save,
	icon: {
		src: (
			<Icon
				icon={ image }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	supports,
	parent: isExperimentalBuild()
		? undefined
		: [ '@woocommerce/all-products', '@woocommerce/single-product' ],
	deprecated: [
		{
			attributes: {},
			save() {
				return null;
			},
		},
	],
} );
