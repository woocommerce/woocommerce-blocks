/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { fields } from '@woocommerce/icons';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import attributes from './attributes';
import metadata from './block.json';
import { Edit, Save } from './edit';

registerBlockType( metadata, {
	title: __( 'Custom Field', 'woo-gutenberg-products-block' ),
	icon: {
		src: (
			<Icon
				icon={ fields }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	save: Save,
	attributes,
	parent: [ 'woocommerce/checkout' ],
} );
