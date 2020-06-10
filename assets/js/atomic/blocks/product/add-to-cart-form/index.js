/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Icon, cart } from '@woocommerce/icons';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import sharedConfig from '../shared-config';
import edit from './edit';
import './button';

const blockConfig = {
	title: __( 'Add to Cart Form', 'woo-gutenberg-products-block' ),
	description: __(
		'Display the add to cart form for a product.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: <Icon srcElement={ cart } />,
		foreground: '#96588a',
	},
	edit,
	save: ( { attributes } ) => {
		return (
			<div className={ classnames( 'is-loading', attributes.className ) }>
				<InnerBlocks.Content />
			</div>
		);
	},
};

registerBlockType( 'woocommerce/product-add-to-cart-form', {
	...sharedConfig,
	...blockConfig,
} );
