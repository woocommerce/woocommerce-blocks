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
import ReviewsByProductIcon from '../../components/icons/reviews-by-product';
import { renderReview } from './utils';

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
		 * The product ID to display.
		 */
		productId: {
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
		const { className, orderby, perPage, productId, showAvatar, showProductRating, showReviewDate, showReviewerName } = attributes;

		const classes = classNames( 'wc-block-reviews-by-product', className, {
			'has-avatar': showAvatar,
			'has-date': showReviewDate,
			'has-name': showReviewerName,
			'has-rating': showProductRating,
		} );

		return (
			<div data-product-id={ productId } data-orderby={ orderby } data-per-page={ perPage } className={ classes }>
				<ul className="wc-block-reviews-by-product__list">
					{ renderReview( attributes ) }
				</ul>
			</div>
		);
	},
} );
