/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, grid } from '@woocommerce/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import save from './save';

const sharedConfig = {
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

const registerAtomicBlock = ( blockName, blockConfig ) => {
	registerBlockType( blockName, {
		...sharedConfig,
		...blockConfig,
	} );
};

export default registerAtomicBlock;
