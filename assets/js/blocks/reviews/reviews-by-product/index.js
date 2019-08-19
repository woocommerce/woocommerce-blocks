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
import { IconReviewsByProduct } from '../../../components/icons';
import sharedAttributes from '../attributes';

/**
 * Register and run the "Reviews by Product" block.
 */
registerBlockType( 'woocommerce/reviews-by-product', {
	title: __( 'Reviews by Product', 'woo-gutenberg-products-block' ),
	icon: (
		<IconReviewsByProduct fillColor="#96588a" />
	),
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Show reviews of your product to build trust.',
		'woo-gutenberg-products-block'
	),
	attributes: {
		...sharedAttributes,
		/**
		 * The id of the product to load reviews for.
		 */
		productId: {
			type: 'number',
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
		const { className, imageType, orderby, productId, reviewsOnPageLoad, reviewsOnLoadMore, showLoadMore, showOrderby, showReviewDate, showReviewerName, showReviewImage, showReviewRating, showReviewContent } = attributes;

		const classes = classNames( 'wc-block-reviews-by-product', className, {
			'has-date': showReviewDate,
			'has-name': showReviewerName,
			'has-image': showReviewImage,
			'has-rating': showReviewRating,
			'has-content': showReviewContent,
		} );
		const data = {
			'data-image-type': imageType,
			'data-product-id': productId,
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
