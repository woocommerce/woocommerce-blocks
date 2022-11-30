/**
 * External dependencies
 */
import { WC_BLOCKS_BUILD_URL } from '@woocommerce/block-settings';
import { registerBlockComponent } from '@woocommerce/blocks-registry';
import { lazy } from '@wordpress/element';

// Modify webpack publicPath at runtime based on location of WordPress Plugin.
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = WC_BLOCKS_BUILD_URL;

registerBlockComponent( {
	blockName: 'woocommerce/filled-mini-cart-contents-block',
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/filled-cart" */ './filled-mini-cart-contents-block/frontend'
			)
	),
} );

registerBlockComponent( {
	blockName: 'woocommerce/empty-mini-cart-contents-block',
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/empty-cart" */ './empty-mini-cart-contents-block/frontend'
			)
	),
} );

registerBlockComponent( {
	blockName: 'woocommerce/mini-cart-title-block',
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/title" */ './mini-cart-title-block/block'
			)
	),
} );

registerBlockComponent( {
	blockName: 'woocommerce/mini-cart-items-block',
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/items" */ './mini-cart-items-block/frontend'
			)
	),
} );

registerBlockComponent( {
	blockName: 'woocommerce/mini-cart-products-table-block',
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/products-table" */ './mini-cart-products-table-block/block'
			)
	),
} );

registerBlockComponent( {
	blockName: 'woocommerce/mini-cart-footer-block',
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/footer" */ './mini-cart-footer-block/block'
			)
	),
} );

registerBlockComponent( {
	blockName: 'woocommerce/mini-cart-shopping-button-block',
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/shopping-button" */ './mini-cart-shopping-button-block/block'
			)
	),
} );
