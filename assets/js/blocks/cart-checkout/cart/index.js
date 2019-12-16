/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import { example } from './example';
import './style.scss';

/**
 * Register and run the Cart block.
 */
registerBlockType( 'woocommerce/cart', {
	title: __( 'Cart', 'woo-gutenberg-products-block' ),
	icon: {
		src: 'cart',
		foreground: '#96588a',
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __( 'Shopping cart.', 'woo-gutenberg-products-block' ),
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	example,
	attributes: {},

	edit: ( props ) => (
		<Edit
			{ ...props }
			feedbackPromptText={ __(
				'We are currently working on improving our checkout and providing merchants with tools and options to customize their checkout to their stores needs.',
				'woo-gutenberg-products-block'
			) }
			showFeedbackPrompt={ true }
		/>
	),

	/**
	 * Block content is rendered in PHP, not via save function.
	 */
	save() {
		return (
			<div className="is-loading">
				<InnerBlocks.Content />
			</div>
		);
	},
} );
