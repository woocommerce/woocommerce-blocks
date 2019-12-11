/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { FeedbackContextProvider } from '../../../context/feedback-context';
import Edit from './edit';
import { example } from './example';
import './editor.scss';

registerBlockType( 'woocommerce/checkout', {
	title: __( 'Checkout', 'woo-gutenberg-products-block' ),
	icon: {
		// @todo: Replace this once we have an icon for the checkout
		src: 'cart',
		// @todo: Revert this to #96588a once we have an icon for the checkout
		foreground: '#555d66',
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Display the checkout experience for customers.',
		'woo-gutenberg-products-block'
	),
	supports: {},
	example,
	attributes: {
		/**
		 * Are we previewing?
		 */
		isPreview: {
			type: 'boolean',
			default: false,
		},
	},
	edit( props ) {
		return (
			<FeedbackContextProvider
				value={ {
					text: __(
						'We are currently working on improving our checkout and providing merchants with tools and options to customize their checkout to their stores needs.',
						'woo-gutenberg-products-block'
					),
				} }
			>
				<Edit { ...props } />
			</FeedbackContextProvider>
		);
	},
	/**
	 * Save the props to post content.
	 */
	save( { attributes } ) {
		const { className } = attributes;
		return (
			<div className={ className }>
				Checkout block coming soon to store near you
			</div>
		);
	},
} );
