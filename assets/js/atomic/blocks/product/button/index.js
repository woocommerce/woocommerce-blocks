/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, cart } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import registerAtomicBlock from '../register-atomic-block';
import edit from './edit';

const blockConfig = {
	title: __( 'Add to Cart Button', 'woo-gutenberg-products-block' ),
	description: __(
		'Display a call to action button which either adds the product to the cart, or links to the product page.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: <Icon srcElement={ cart } />,
		foreground: '#96588a',
	},
	edit,
};

registerAtomicBlock( 'woocommerce/product-button', blockConfig );
