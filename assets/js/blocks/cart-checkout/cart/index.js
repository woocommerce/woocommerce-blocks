/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Icon, cart } from '@woocommerce/icons';
import classnames from 'classnames';
import { WOOCOMMERCE_BLOCKS_PHASE } from '@woocommerce/block-settings';
/**
 * Internal dependencies
 */
import edit from './edit';
import './style.scss';
import blockAttributes from './attributes';

/**
 * Register and run the Cart block.
 */
const settings = {
	title: __( 'Cart', 'woo-gutenberg-products-block' ),
	icon: {
		src: <Icon srcElement={ cart } />,
		foreground: '#96588a',
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __( 'Shopping cart.', 'woo-gutenberg-products-block' ),
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

if ( WOOCOMMERCE_BLOCKS_PHASE > 1 ) {
	registerBlockType( 'woocommerce/cart', settings );
}
