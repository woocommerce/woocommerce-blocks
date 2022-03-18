/**
 * External dependencies
 */
import { registerCheckoutBlock } from '@woocommerce/blocks-checkout';
import { lazy } from '@wordpress/element';

/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * Called to register frontend components.
 */
registerCheckoutBlock( {
	metadata,
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/cart-order-summary" */
			'./frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './subtotal/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/cart-order-summary-subtotal" */
			'./subtotal/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './fee/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/cart-order-summary-fee" */
			'./fee/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './discount/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/cart-order-summary-discount" */
			'./discount/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './shipping/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/cart-order-summary-shipping" */
			'./shipping/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './coupon-form/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/cart-order-summary-coupon-form" */
			'./coupon-form/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './taxes/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/cart-order-summary-taxes" */
			'./taxes/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: require( './heading/block.json' ),
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/cart-order-summary-heading" */
			'./heading/frontend'
		)
	),
} );
