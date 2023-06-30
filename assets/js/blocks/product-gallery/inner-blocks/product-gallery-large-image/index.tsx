/**
 * External dependencies
 */
import { Icon, image } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Edit, Save } from './edit';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- TypeScript expects some required properties which we already
// registered in PHP.
registerBlockType( 'woocommerce/product-gallery-large-image', {
	title: __( 'Large Image', 'woo-gutenberg-products-block' ),
	icon: {
		src: (
			<Icon
				icon={ image }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	save: Save,
	ancestor: [ 'woocommerce/product-gallery' ],
} );
