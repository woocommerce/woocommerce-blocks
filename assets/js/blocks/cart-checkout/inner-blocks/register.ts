/**
 * External dependencies
 */
import { registerCheckoutBlock } from '@woocommerce/blocks-checkout';
import { lazy } from '@wordpress/element';

registerCheckoutBlock( {
	metadata: require( './subtotal/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/order-summary-subtotal" */
			'./subtotal/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './fee/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/order-summary-fee" */
			'./fee/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './discount/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/order-summary-discount" */
			'./discount/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './shipping/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/order-summary-shipping" */
			'./shipping/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './coupon-form/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/order-summary-coupon-form" */
			'./coupon-form/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './taxes/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/order-summary-taxes" */
			'./taxes/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './heading/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/order-summary-heading" */
			'./heading/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './cart-items/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/order-summary-cart-items" */
			'./cart-items/frontend'
		)
	),
} );
