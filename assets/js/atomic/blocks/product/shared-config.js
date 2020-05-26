/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, grid } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import save from './save';

export default {
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	icon: {
		src: <Icon srcElement={ grid } />,
		foreground: '#96588a',
	},
	supports: {
		html: false,
		lightBlockWrapper: true,
	},
	parent: [ 'woocommerce/all-products', 'woocommerce/single-product' ],
	save,
};
