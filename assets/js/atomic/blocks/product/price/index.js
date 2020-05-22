/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, bill } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import registerAtomicBlock from '../register-atomic-block';
import edit from './edit';

const blockConfig = {
	title: __( 'Product Price', 'woo-gutenberg-products-block' ),
	description: __(
		'Display the price of a product.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: <Icon srcElement={ bill } />,
		foreground: '#96588a',
	},
	edit,
};

registerAtomicBlock( 'woocommerce/product-price', blockConfig );
