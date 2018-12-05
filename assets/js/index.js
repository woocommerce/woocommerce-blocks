/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { RawHTML } from '@wordpress/element';

/**
 * Internal dependencies
 */
import '../css/product-category-block.scss';
import getShortcode from './utils/get-shortcode';
import ProductByCategoryBlock from './product-category-block.js';
import sharedAttributes from './utils/shared-attributes';

const validAlignments = [ 'wide', 'full' ];

/**
 * Register and run the "Products by Category" block.
 */
registerBlockType( 'woocommerce/product-category', {
	title: __( 'Products by Category', 'woo-gutenberg-products-block' ),
	icon: 'category',
	category: 'widgets',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Display a grid of products from your selected categories.',
		'woo-gutenberg-products-block'
	),
	attributes: {
		...sharedAttributes,
		editMode: {
			type: 'boolean',
			default: true,
		},
		categories: {
			type: 'array',
			default: [],
		},
	},

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( -1 !== validAlignments.indexOf( align ) ) {
			return { 'data-align': align };
		}
	},

	/**
	 * Renders and manages the block.
	 */
	edit( props ) {
		return <ProductByCategoryBlock { ...props } />;
	},

	/**
	 * Save the block content in the post content. Block content is saved as a products shortcode.
	 *
	 * @return string
	 */
	save( props ) {
		const {
			align,
		} = props.attributes; /* eslint-disable-line react/prop-types */
		return (
			<RawHTML className={ align ? `align${ align }` : '' }>
				{ getShortcode( props ) }
			</RawHTML>
		);
	},
} );
