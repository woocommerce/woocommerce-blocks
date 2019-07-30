/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit.js';
import { IconFolder } from '../../components/icons';

registerBlockType( 'woocommerce/price-filter', {
	title: __( 'Filter Products by Price', 'woo-gutenberg-products-block' ),
	icon: {
		src: <IconFolder />,
		foreground: '#96588a',
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Display a slider to filter products in your store by price.',
		'woo-gutenberg-products-block'
	),
	supports: {
		align: [ 'wide', 'full' ],
	},

	attributes: {},

	edit,

	/**
	 * Save the props to post content.
	 */
	save() {
		const data = {};
		return (
			<div className="is-loading" { ...data }>
				<span aria-hidden className="wc-block-product-categories__placeholder" />
			</div>
		);
	},
} );
