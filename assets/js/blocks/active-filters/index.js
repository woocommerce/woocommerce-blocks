/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import edit from './edit.js';

registerBlockType( 'woocommerce/active-filters', {
	title: __( 'Active Product Filters', 'woo-gutenberg-products-block' ),
	icon: {
		src: <Gridicon icon="list-checkmark" />,
		foreground: '#96588a',
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Display a list of active product filters.',
		'woo-gutenberg-products-block'
	),
	supports: {},
	attributes: {
		displayStyle: {
			type: 'string',
			default: 'list',
		},
	},
	edit,
	/**
	 * Save the props to post content.
	 */
	save( { attributes } ) {
		const { displayStyle } = attributes;
		const data = {
			'data-display-style': displayStyle,
		};
		return (
			<div className="is-loading" { ...data }>
				<span
					aria-hidden
					className="wc-block-active-product-filters__placeholder"
				/>
			</div>
		);
	},
} );
