/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { IconReviewsByCategory } from '@woocommerce/block-components/icons';

/**
 * Internal dependencies
 */
import '../editor.scss';
import Editor from './edit';
import sharedAttributes from '../attributes';
import save from '../save.js';
import { example } from '../example';

/**
 * Register and run the "Reviews by category" block.
 */
registerBlockType( 'woocommerce/reviews-by-category', {
	title: __( 'Reviews by Category', 'woo-gutenberg-products-block' ),
	icon: {
		src: <IconReviewsByCategory />,
		foreground: '#96588a',
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Show product reviews from specific categories.',
		'woo-gutenberg-products-block'
	),
	example: {
		...example,
		attributes: {
			...example.attributes,
			categoryIds: [ 1 ],
			showProductName: true,
		},
	},
	attributes: {
		...sharedAttributes,
		/**
		 * The ids of the categories to load reviews for.
		 */
		categoryIds: {
			type: 'array',
			default: [],
		},
		/**
		 * Show the product name.
		 */
		showProductName: {
			type: 'boolean',
			default: true,
		},
	},

	/**
	 * Renders and manages the block.
	 */
	edit( props ) {
		return <Editor { ...props } />;
	},

	/**
	 * Save the props to post content.
	 */
	save,
} );
