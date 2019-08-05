/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import Editor from './edit';
import { IconReviewsByCategory } from '../../components/icons';
import { renderReview } from './utils';

/**
 * Register and run the "Reviews by Product" block.
 */
registerBlockType( 'woocommerce/reviews-by-product', {
	title: __( 'Reviews by Category', 'woo-gutenberg-products-block' ),
	icon: (
		<IconReviewsByCategory fillColor="#96588a" />
	),
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Show product reviews from a specific category.',
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
			default: 'most-recent',
		},

		/**
		 * Number of reviews to display per page.
		 */
		perPage: {
			type: 'number',
			default: 10,
		},

		/**
		 * The categry ID to display.
		 */
		categoryId: {
			type: 'number',
		},

		/**
		 * Show the reviewer avatar.
		 */
		showAvatar: {
			type: 'boolean',
			default: true,
		},

		/**
		 * Show the product rating.
		 */
		showProductRating: {
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
		const { className, orderby, perPage, categoryId, showAvatar, showProductRating, showReviewDate, showReviewerName } = attributes;

		const classes = classNames( 'wc-block-reviews-by-category', className, {
			'has-avatar': showAvatar,
			'has-date': showReviewDate,
			'has-name': showReviewerName,
			'has-rating': showProductRating,
		} );
		const data = {
			'data-orderby': orderby,
			'data-per-page': perPage,
			'data-category-id': categoryId,
		};

		return (
			<div className={ classes } { ...data }>
				<ul className="wc-block-reviews-by-category__list">
					{ renderReview( attributes ) }
				</ul>
			</div>
		);
	},
} );
