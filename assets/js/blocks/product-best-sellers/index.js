/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { createBlock, registerBlockType } from '@wordpress/blocks';
import { without } from 'lodash';
import Gridicon from 'gridicons';
import { RawHTML } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Block from './block';
import getShortcode from '../../utils/get-shortcode';
import sharedAttributes, { sharedAttributeBlockTypes } from '../../utils/shared-attributes';

registerBlockType( 'woocommerce/product-best-sellers', {
	title: __( 'Best Selling Products', 'woo-gutenberg-products-block' ),
	icon: <Gridicon icon="stats-up-alt" />,
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Display a grid of your all-time best selling products.',
		'woo-gutenberg-products-block'
	),
	supports: {
		align: [ 'wide', 'full' ],
	},
	attributes: {
		...sharedAttributes,
	},
	transforms: {
		from: [
			{
				type: 'block',
				blocks: without( sharedAttributeBlockTypes, 'woocommerce/product-best-sellers' ),
				transform: ( attributes ) => createBlock(
					'woocommerce/product-best-sellers',
					attributes
				),
			},
		],
	},

	/**
	 * Renders and manages the block.
	 */
	edit( props ) {
		return <Block { ...props } />;
	},

	/**
	 * Save the block content in the post content. Block content is saved as a products shortcode.
	 *
	 * @return string
	 */
	save( props ) {
		const {
			align,
			contentVisibility,
		} = props.attributes; /* eslint-disable-line react/prop-types */
		const classes = classnames(
			align ? `align${ align }` : '',
			{
				'is-hidden-title': ! contentVisibility.title,
				'is-hidden-price': ! contentVisibility.price,
				'is-hidden-rating': ! contentVisibility.rating,
				'is-hidden-button': ! contentVisibility.button,
			}
		);
		return (
			<RawHTML className={ classes }>
				{ getShortcode( props, 'woocommerce/product-best-sellers' ) }
			</RawHTML>
		);
	},
} );
