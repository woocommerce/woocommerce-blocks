/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { getSetting } from '@woocommerce/settings';
import { Icon, folderStarred } from '@woocommerce/icons';
import { isFeaturePluginBuild } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import { example } from './example';
import { Edit } from './edit';

/**
 * Register and run the "Featured Category" block.
 */
registerBlockType( 'woocommerce/featured-category', {
	apiVersion: 2,
	title: __( 'Featured Category', 'woo-gutenberg-products-block' ),
	icon: {
		src: (
			<Icon
				srcElement={ folderStarred }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Visually highlight a product category and encourage prompt action.',
		'woo-gutenberg-products-block'
	),
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
		color: {
			text: true,
			background: true,
		},
		typography: {
			fontSize: true,
		},
		...( isFeaturePluginBuild() && {
			__experimentalBorder: {
				color: true,
				radius: true,
				width: true,
				__experimentalSkipSerialization: false,
			},
		} ),
	},
	example,
	attributes: {
		/**
		 * Alignment of content inside block.
		 */
		contentAlign: {
			type: 'string',
			default: 'center',
		},

		/**
		 * Percentage opacity of overlay.
		 */
		dimRatio: {
			type: 'number',
			default: 50,
		},

		/**
		 * Toggle for edit mode in the block preview.
		 */
		editMode: {
			type: 'boolean',
			default: true,
		},

		/**
		 * Focus point for the background image
		 */
		focalPoint: {
			type: 'object',
		},

		/**
		 * A fixed height for the block.
		 */
		height: {
			type: 'number',
			default: getSetting( 'default_height', 500 ),
		},

		/**
		 * ID for a custom image, overriding the product's featured image.
		 */
		mediaId: {
			type: 'number',
			default: 0,
		},

		/**
		 * URL for a custom image, overriding the product's featured image.
		 */
		mediaSrc: {
			type: 'string',
			default: '',
		},

		/**
		 * The overlay color, from the color list.
		 */
		overlayColor: {
			type: 'string',
		},

		/**
		 * The overlay color, if a custom color value.
		 */
		customOverlayColor: {
			type: 'string',
		},

		/**
		 * Text for the category link.
		 */
		linkText: {
			type: 'string',
			default: __( 'Shop now', 'woo-gutenberg-products-block' ),
		},

		/**
		 * The category ID to display.
		 */
		categoryId: {
			type: 'number',
		},

		/**
		 * Show the category description.
		 */
		showDesc: {
			type: 'boolean',
			default: true,
		},

		/**
		 * Category preview.
		 */
		previewCategory: {
			type: 'object',
			default: null,
		},
		backgroundColor: {
			type: 'string',
			default: 'black',
		},
		textColor: {
			type: 'string',
			default: 'white',
		},
	},

	/**
	 * Renders and manages the block.
	 *
	 * @param {Object} props Props to pass to block.
	 */
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
