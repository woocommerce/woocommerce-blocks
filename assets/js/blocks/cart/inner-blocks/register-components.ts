/**
 * External dependencies
 */
import { lazy } from '@wordpress/element';
import { WC_BLOCKS_BUILD_URL } from '@woocommerce/block-settings';
import { registerCheckoutBlock } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import metadata from './component-metadata';
import '../../cart-checkout/inner-blocks/register';

// Modify webpack publicPath at runtime based on location of WordPress Plugin.
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = WC_BLOCKS_BUILD_URL;

registerCheckoutBlock( {
	metadata: metadata.FILLED_CART,
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/filled-cart" */
			'./filled-cart-block/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: metadata.EMPTY_CART,
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/empty-cart" */
			'./empty-cart-block/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: metadata.FILLED_CART,
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/filled-cart" */
			'./filled-cart-block/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: metadata.CART_ITEMS,
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/cart-items" */
			'./cart-items-block/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: metadata.CART_LINE_ITEMS,
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/cart-line-items" */
			'./cart-line-items-block/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: metadata.CART_TOTALS,
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/cart-totals" */
			'./cart-totals-block/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: metadata.CART_EXPRESS_PAYMENT,
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/cart-express-payment" */
			'./cart-express-payment-block/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: metadata.PROCEED_TO_CHECKOUT,
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/proceed-to-checkout" */
			'./proceed-to-checkout-block/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: metadata.CART_ACCEPTED_PAYMENT_METHODS,
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/cart-accepted-payment-methods" */
			'./cart-accepted-payment-methods-block/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: metadata.CART_ORDER_SUMMARY,
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/cart-order-summary" */
			'./cart-order-summary/frontend'
		)
	),
} );
