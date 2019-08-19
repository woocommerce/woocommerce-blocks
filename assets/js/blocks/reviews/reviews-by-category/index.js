/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';
import Editor from './edit';
import { IconReviewsByCategory } from '../../../components/icons';

/**
 * Register and run the "Reviews by category" block.
 */
registerBlockType( 'woocommerce/reviews-by-category', {
	title: __( 'Reviews by Category', 'woo-gutenberg-products-block' ),
	icon: (
		<IconReviewsByCategory fillColor="#96588a" />
	),
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Show product reviews from specific categories.',
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
		 * Whether to display the reviewer or product image.
		 */
		imageType: {
			type: 'string',
			default: 'reviewer',
		},

		/**
		 * Order to use for the reviews listing.
		 */
		orderby: {
			type: 'string',
			default: 'most-recent',
		},

		/**
		 * The ids of the categories to load reviews for.
		 */
		categoryIds: {
			type: 'array',
			default: [],
		},

		/**
		 * Number of reviews to add when clicking on load more.
		 */
		reviewsOnLoadMore: {
			type: 'number',
			default: 10,
		},

		/**
		 * Number of reviews to display on page load.
		 */
		reviewsOnPageLoad: {
			type: 'number',
			default: 10,
		},

		/**
		 * Show the load more button.
		 */
		showLoadMore: {
			type: 'boolean',
			default: true,
		},

		/**
		 * Show the order by selector.
		 */
		showOrderby: {
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

		/**
		 * Show the reviewer name.
		 */
		showReviewerName: {
			type: 'boolean',
			default: true,
		},

		/**
		 * Show the review image..
		 */
		showReviewImage: {
			type: 'boolean',
			default: true,
		},

		/**
		 * Show the product rating.
		 */
		showReviewRating: {
			type: 'boolean',
			default: true,
		},

		/**
		 * Show the product content.
		 */
		showReviewContent: {
			type: 'boolean',
			default: true,
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
	save( { attributes } ) {
		const { className, imageType, orderby, categoryIds, reviewsOnPageLoad, reviewsOnLoadMore, showLoadMore, showOrderby, showReviewDate, showReviewerName, showReviewImage, showReviewRating, showReviewContent, showProductName } = attributes;

		const classes = classNames( 'wc-block-reviews-by-category', className, {
			'has-date': showReviewDate,
			'has-name': showReviewerName,
			'has-image': showReviewImage,
			'has-rating': showReviewRating,
			'has-content': showReviewContent,
			'has-product-name': showProductName,
		} );
		const data = {
			'data-image-type': imageType,
			'data-category-ids': categoryIds.join( ',' ),
			'data-orderby': orderby,
			'data-reviews-on-page-load': reviewsOnPageLoad,
			'data-reviews-on-load-more': reviewsOnLoadMore,
			'data-show-load-more': showLoadMore,
			'data-show-orderby': showOrderby,
		};

		return (
			<div className={ classes } { ...data } />
		);
	},
} );
