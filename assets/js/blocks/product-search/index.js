/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import Block from './block.js';

registerBlockType( 'woocommerce/product-search', {
	title: __( 'Product Search', 'woo-gutenberg-products-block' ),
	icon: {
		src: 'search',
		foreground: '#96588a',
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Help visitors find your products.',
		'woo-gutenberg-products-block'
	),
	supports: {
		align: [ 'wide', 'full' ],
	},

	attributes: {

		/**
		 * Search field label.
		 */
		label: {
			type: 'string',
			default: __( 'Search', 'woo-gutenberg-products-block' ),
		},

		/**
		 * Search field placeholder.
		 */
		placeholder: {
			type: 'string',
			default: __( 'Search products...', 'woo-gutenberg-products-block' ),
		},
	},

	/**
	 * Renders and manages the block.
	 */
	edit( props ) {
		return <Block { ...props } isPreview />;
	},

	/**
	 * Block content is rendered in PHP, not via save function.
	 */
	save( props ) {
		return <Block { ...props } />;
	},
} );
