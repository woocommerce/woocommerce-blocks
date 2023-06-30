/**
 * External dependencies
 */
import { getCategories, setCategories } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/icons';
import { woo } from '@woocommerce/icons';

setCategories( [
	...getCategories().filter(
		( { slug } ) =>
			slug !== 'woocommerce' && slug !== 'woocommerce-product-elements'
	),
	{
		slug: 'woocommerce',
		title: __( 'WooCommerce', 'woo-gutenberg-products-block' ),
		icon: <Icon icon={ woo } />,
	},
	{
		slug: 'woocommerce-product-elements',
		title: __(
			'WooCommerce Product Elements',
			'woo-gutenberg-products-block'
		),
		icon: (
			<Icon
				icon={ woo }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
] );
