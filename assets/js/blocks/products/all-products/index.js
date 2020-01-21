/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import Editor from './edit';
import sharedAttributes from '../attributes';
import { getBlockClassName } from '../utils.js';
import '../../../atomic/blocks/product';

const blockSettings = {
	title: __( 'All Products', 'woo-gutenberg-products-block' ),
	icon: {
		src: <Gridicon icon="grid" />,
		foreground: '#96588a',
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Display all products from your store as a grid.',
		'woo-gutenberg-products-block'
	),
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
		multiple: false,
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	attributes: {
		...sharedAttributes,
	},
	/**
	 * Renders and manages the block.
	 *
	 * @param {Object} props Props to pass to block.
	 */
	edit( props ) {
		return <Editor { ...props } />;
	},
	/**
	 * Save the props to post content.
	 *
	 * @param {Object} attributes Attributes to save.
	 */
	save( { attributes } ) {
		const data = {
			'data-attributes': JSON.stringify( attributes ),
		};

		return (
			<div
				className={ getBlockClassName(
					'wc-block-all-products',
					attributes
				) }
				{ ...data }
			>
				<InnerBlocks.Content />
			</div>
		);
	},
};

/**
 * Register and run the "All Products" block.
 */
registerBlockType( 'woocommerce/all-products', {
	...blockSettings,
	/**
	 * Deprecation rule to handle the previous default rows which was 1 instead of 3.
	 */
	deprecated: [
		{
			attributes: {
				...blockSettings.attributes,
				rows: {
					type: 'number',
					default: 1,
				},
			},
			save: blockSettings.save,
		},
	],
} );
