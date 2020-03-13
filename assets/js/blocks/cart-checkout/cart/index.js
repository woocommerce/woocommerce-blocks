/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Icon, cart } from '@woocommerce/icons';
import { kebabCase } from 'lodash';

/**
 * Internal dependencies
 */
import edit from './edit';
import { example } from './example';
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
	example,
	attributes: blockAttributes,
	edit,

	/**
	 * Save the props to post content.
	 */
	save( { attributes } ) {
		const data = {};

		Object.keys( blockAttributes ).forEach( ( key ) => {
			if (
				blockAttributes[ key ].save !== false &&
				typeof attributes[ key ] !== 'undefined'
			) {
				data[ 'data-' + kebabCase( key ) ] = attributes[ key ];
			}
		} );

		return (
			<div className={ attributes.className } { ...data }>
				<InnerBlocks.Content />
			</div>
		);
	},
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE === 'experimental' ) {
	registerBlockType( 'woocommerce/cart', settings );
}
