/**
 * External dependencies
 */
import { registerCheckoutBlock } from '@woocommerce/blocks-checkout';
import { lazy } from '@wordpress/element';

registerCheckoutBlock( {
	metadata: require( './order-summary-subtotal/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "checkout-blocks/order-summary-subtotal" */
			'./order-summary-subtotal/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './order-summary-fee/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "checkout-blocks/order-summary-fee" */
			'./order-summary-fee/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './order-summary-discount/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "checkout-blocks/order-summary-discount" */
			'./order-summary-discount/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './order-summary-shipping/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "checkout-blocks/order-summary-shipping" */
			'./order-summary-shipping/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './order-summary-coupon-form/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "checkout-blocks/order-summary-coupon-form" */
			'./order-summary-coupon-form/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './order-summary-taxes/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "checkout-blocks/order-summary-taxes" */
			'./order-summary-taxes/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './order-summary-heading/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "checkout-blocks/order-summary-heading" */
			'./order-summary-heading/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './order-summary-cart-items/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "checkout-blocks/order-summary-cart-items" */
			'./order-summary-cart-items/frontend'
		)
	),
} );
