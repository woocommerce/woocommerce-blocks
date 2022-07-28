import { Icon, currencyDollar } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { __ } from '@wordpress/i18n';
import { Edit } from './edit';

registerBlockType( metadata, {
	title: __( 'New Product Image', 'woo-gutenberg-products-block' ),
	description: __(
		'Allow customers to filter the products by choosing a lower or upper price limit. Works in combination with the All Products block.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: (
			<Icon
				icon={ currencyDollar }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	usesContext: [
		'queryId',
		'query',
		'postId',
		'queryContext',
		'displayLayout',
		'templateSlug',
	],
} );
