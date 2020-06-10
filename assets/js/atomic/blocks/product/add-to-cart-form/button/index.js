/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Icon, cart } from '@woocommerce/icons';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import sharedConfig from '../../shared-config';
import edit from './edit';
import attributes from './attributes';

const blockConfig = {
	title: __( 'Add to Cart Form Button', 'woo-gutenberg-products-block' ),
	description: __(
		'Displays a call to action for the add to cart form.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: <Icon srcElement={ cart } />,
		foreground: '#96588a',
	},
	edit,
	attributes,
	save: ( { attributes: atts } ) => {
		return <div className={ classnames( 'is-loading', atts.className ) } />;
	},
};

registerBlockType( 'woocommerce/product-add-to-cart-form-button', {
	...sharedConfig,
	...blockConfig,
} );
