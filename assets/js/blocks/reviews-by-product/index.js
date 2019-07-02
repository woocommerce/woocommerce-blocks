/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
// import { InnerBlocks } from '@wordpress/editor';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Block from './block';
import ReviewsByProductIcon from '../../components/icons/reviews-by-product';

/**
 * Register and run the "Reviews by Product" block.
 */
registerBlockType( 'woocommerce/reviews-by-product', {
	title: __( 'Reviews by Product', 'woo-gutenberg-products-block' ),
	icon: (
		<ReviewsByProductIcon fillColor="#96588a" />
	),
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Show reviews of your product to build trust.',
		'woo-gutenberg-products-block'
	),
	attributes: {
		/**
		 * Toggle for edit mode in the block preview.
		 */
		editMode: {
			type: 'boolean',
			default: true,
		},

		/**
		 * Order to use for the reviews listing.
		 */
		orderby: {
			type: 'string',
			default: 'comment_date-DESC',
		},

		/**
		 * The product ID to display.
		 */
		productId: {
			type: 'number',
		},

		/**
		 * Number of reviews to display.
		 */
		reviewsShown: {
			type: 'number',
			default: 10,
		},

		/**
		 * Show the product rating.
		 */
		showProductRating: {
			type: 'boolean',
			default: true,
		},

		/**
		 * Show the reviewer name.
		 */
		showReviewerName: {
			type: 'boolean',
			default: true,
		},

		/**
		 * Show the reviewer picture.
		 */
		showReviewerPicture: {
			type: 'boolean',
			default: true,
		},

		/**
		 * Show the review date.
		 */
		showReviewDate: {
			type: 'boolean',
			default: true,
		},
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
		return null;
	},
} );
