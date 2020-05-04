/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Icon, reader } from '@woocommerce/icons';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import edit from './edit';
import blockAttributes from './attributes';
import './style.scss';

const settings = {
	title: __( 'Single Product', 'woo-gutenberg-products-block' ),
	icon: {
		src: <Icon srcElement={ reader } />,
		foreground: '#96588a',
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Display a single product with its details and quantity.',
		'woo-gutenberg-products-block'
	),
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
		multiple: false,
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	attributes: blockAttributes,
	edit,

	/**
	 * Save the props to post content.
	 */
	save( { attributes } ) {
		return (
			<div className={ classnames( 'is-loading', attributes.className ) }>
				<InnerBlocks.Content />
			</div>
		);
	},
};

registerBlockType( 'woocommerce/single-product', settings );
