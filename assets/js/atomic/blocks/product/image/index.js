/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, image } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import registerAtomicBlock from '../register-atomic-block';
import edit from './edit';

const blockConfig = {
	title: __( 'Product Image', 'woo-gutenberg-products-block' ),
	description: __(
		'Display the main product image',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: <Icon srcElement={ image } />,
		foreground: '#96588a',
	},
	attributes: {
		productLink: {
			type: 'boolean',
			default: true,
		},
		showSaleBadge: {
			type: 'boolean',
			default: true,
		},
		saleBadgeAlign: {
			type: 'string',
			default: 'right',
		},
	},
	edit,
};

registerAtomicBlock( 'woocommerce/product-image', blockConfig );
