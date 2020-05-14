/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Icon, card } from '@woocommerce/icons';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import edit from './edit';
import blockAttributes from './attributes';
import './editor.scss';

const settings = {
	title: __( 'Checkout', 'woo-gutenberg-products-block' ),
	icon: {
		src: <Icon srcElement={ card } />,
		foreground: '#96588a',
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Display a checkout form so your customers can submit orders.',
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
			<div
				className={ classnames( 'is-loading', attributes.className ) }
			/>
		);
	},
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE > 1 ) {
	registerBlockType( 'woocommerce/checkout', settings );
}
