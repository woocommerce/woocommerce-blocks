/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { ProductListSaleBadge } from '@woocommerce/atomic-components/product-list';
import sharedConfig from '../shared-config';
import { IconProductOnSale } from '@woocommerce/block-components/icons';

const blockConfig = {
	title: __( 'On-Sale Badge', 'woo-gutenberg-products-block' ),
	description: __(
		'Displays an on-sale badge if the product is on-sale.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: <IconProductOnSale />,
		foreground: '#96588a',
	},
	supports: {
		html: false,
		align: [ 'left', 'center', 'right' ],
	},
	edit( props ) {
		const { align, product } = props.attributes;

		return <ProductListSaleBadge product={ product } align={ align } />;
	},
};

registerBlockType( 'woocommerce/product-list-sale-badge', {
	...sharedConfig,
	...blockConfig,
} );
