/**
 * External dependencies
 */
import { WC_BLOCKS_BUILD_URL } from '@woocommerce/block-settings';
import { registerCheckoutBlock } from '@woocommerce/blocks-checkout';
import { lazy } from '@wordpress/element';
/**
 * Internal dependencies
 */
import emptyMiniCartContentsMetadata from './empty-mini-cart-contents-block/block.json';
import filledMiniCartMetadata from './filled-mini-cart-contents-block/block.json';
import miniCartTitleMetadata from './mini-cart-title-block/block.json';
import miniCartProductsTableMetadata from './mini-cart-products-table-block/block.json';
import miniCartFooterMetadata from './mini-cart-footer-block/block.json';
import miniCartItemsMetadata from './mini-cart-items-block/block.json';
import miniCartShoppingButtonMetadata from './mini-cart-shopping-button-block/block.json';

// Modify webpack publicPath at runtime based on location of WordPress Plugin.
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = WC_BLOCKS_BUILD_URL;

registerCheckoutBlock( {
	metadata: filledMiniCartMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/filled-cart" */ './filled-mini-cart-contents-block/frontend'
			)
	),
} );

registerCheckoutBlock( {
	metadata: emptyMiniCartContentsMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/empty-cart" */ './empty-mini-cart-contents-block/frontend'
			)
	),
} );

registerCheckoutBlock( {
	metadata: miniCartTitleMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/title" */ './mini-cart-title-block/block'
			)
	),
} );

registerCheckoutBlock( {
	metadata: miniCartItemsMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/items" */ './mini-cart-items-block/frontend'
			)
	),
} );

registerCheckoutBlock( {
	metadata: miniCartProductsTableMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/products-table" */ './mini-cart-products-table-block/block'
			)
	),
} );

registerCheckoutBlock( {
	metadata: miniCartFooterMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/footer" */ './mini-cart-footer-block/block'
			)
	),
} );

registerCheckoutBlock( {
	metadata: miniCartShoppingButtonMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/shopping-button" */ './mini-cart-shopping-button-block/block'
			)
	),
} );
