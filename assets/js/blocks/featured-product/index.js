/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock, registerBlockType } from '@wordpress/blocks';
import { find } from 'lodash';
import { InnerBlocks } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import Block from './block';
import {
	getImageIdFromProduct,
	getImageSrcFromProduct,
} from '../../utils/products';

const transformToCover = {
	type: 'block',
	blocks: [ 'core/cover' ],
	transform: ( attributes, innerBlocks ) => {
		const { dimRatio, overlayColor, showDesc, showPrice } = attributes;
		// @todo transforms don't support async/await functions, so we
		// can't get the product via API 😩 Eventually we want to use
		// attributes.productId to get the correct data with apiFetch.
		const product = {
			name: 'Product Name',
			short_description: 'This is my short description',
			price_html: '$30.00',
			images: [
				{
					src:
						'https://vagrant.local/content/uploads/2018/09/beanie-with-logo-1.jpg',
				},
			],
		};
		// Pull media from product, unless we have a custom image set.
		const mediaId = attributes.mediaId || getImageIdFromProduct( product );
		const mediaSrc = attributes.mediaSrc || getImageSrcFromProduct( product );

		const title = createBlock( 'core/heading', { content: product.name } );
		const description = createBlock( 'core/paragraph', {
			content: product.short_description,
		} );
		const price = createBlock( 'core/paragraph', {
			content: product.price_html,
		} );

		// The button is already an innerBlock, so we don't need to re-create it.
		const button = find( innerBlocks, { name: 'core/button' }, false );

		// Build the inner blocks based on the content settings.
		const newInnerBlocks = [
			title,
			showDesc && description,
			showPrice && price,
			button,
		].filter( Boolean );

		return createBlock(
			'core/cover',
			{
				backgroundType: 'image',
				dimRatio,
				overlayColor,
				id: mediaId,
				url: mediaSrc,
			},
			newInnerBlocks
		);
	},
};

/**
 * Register and run the "Featured Product" block.
 */
registerBlockType( 'woocommerce/featured-product', {
	title: __( 'Featured Product', 'woo-gutenberg-products-block' ),
	icon: 'star-filled',
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Visually highlight a product and encourage prompt action.',
		'woo-gutenberg-products-block'
	),
	supports: {
		align: [ 'wide', 'full' ],
	},
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
		 * A fixed height for the block.
		 */
		height: {
			type: 'number',
			default: wc_product_block_data.default_height,
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
		 * The product ID to display.
		 */
		productId: {
			type: 'number',
		},

		/**
		 * Show the product description.
		 */
		showDesc: {
			type: 'boolean',
			default: true,
		},

		/**
		 * Show the product price.
		 */
		showPrice: {
			type: 'boolean',
			default: true,
		},
	},

	transforms: {
		to: [ transformToCover ],
	},

	/**
	 * Renders and manages the block.
	 */
	edit( props ) {
		return <Block { ...props } />;
	},

	/**
	 * Block content is rendered in PHP, not via save function.
	 */
	save() {
		return <InnerBlocks.Content />;
	},
} );
