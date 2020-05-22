/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, notes } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import registerAtomicBlock from '../register-atomic-block';
import edit from './edit';

const blockConfig = {
	title: __( 'Product Summary', 'woo-gutenberg-products-block' ),
	description: __(
		'Display a short description about a product.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: <Icon srcElement={ notes } />,
		foreground: '#96588a',
	},
	edit,
};

registerAtomicBlock( 'woocommerce/product-summary', blockConfig );
