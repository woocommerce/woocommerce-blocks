/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import classNames from 'classnames';
import { Icon, bill } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import edit from './edit.js';

registerBlockType( 'woocommerce/price-filter', {
	title: __( 'Filter Products by Price', 'woo-gutenberg-products-block' ),
	icon: {
		src: <Icon srcElement={ bill } />,
		foreground: '#7f54b3',
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Allow customers to filter the products by choosing a lower or upper price limit. Works in combination with the All Products block.',
		'woo-gutenberg-products-block'
	),
	supports: {
		html: false,
		multiple: false,
	},
	example: {},
	attributes: {
		showInputFields: {
			type: 'boolean',
			default: true,
		},
		showFilterButton: {
			type: 'boolean',
			default: false,
		},
		heading: {
			type: 'string',
			default: __( 'Filter by price', 'woo-gutenberg-products-block' ),
		},
		headingLevel: {
			type: 'number',
			default: 3,
		},
	},

	edit,

	// Save the props to post content.
	save( { attributes } ) {
		const {
			className,
			showInputFields,
			showFilterButton,
			heading,
			headingLevel,
		} = attributes;
		const data = {
			'data-showinputfields': showInputFields,
			'data-showfilterbutton': showFilterButton,
			'data-heading': heading,
			'data-heading-level': headingLevel,
		};
		return (
			<div
				className={ classNames( 'is-loading', className ) }
				{ ...data }
			>
				<span
					aria-hidden
					className="wc-block-product-categories__placeholder"
				/>
			</div>
		);
	},
} );
