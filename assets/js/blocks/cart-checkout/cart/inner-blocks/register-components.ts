/**
 * External dependencies
 */
import { lazy } from '@wordpress/element';
import { WC_BLOCKS_BUILD_URL } from '@woocommerce/block-settings';
import { registerCheckoutBlock } from '@woocommerce/blocks-checkout';

// Modify webpack publicPath at runtime based on location of WordPress Plugin.
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = WC_BLOCKS_BUILD_URL;

/**
 * Internal dependencies
 */
import filledCartMetadata from './filled-cart-block/block.json';
import emptyCartMetadata from './empty-cart-block/block.json';
import cartItemsMetadata from './cart-items-block/block.json';
import cartExpressPaymentMetadata from './cart-express-payment-block/block.json';
import cartLineItemsMetadata from './cart-line-items-block/block.json';
import cartOrderSummaryMetadata from './cart-order-summary-block/block.json';
import cartTotalsMetadata from './cart-totals-block/block.json';
import cartProceedToCheckoutMetadata from './proceed-to-checkout-block/block.json';
import cartAcceptedPaymentMethodsMetadata from './cart-accepted-payment-methods-block/block.json';
import emptyCartComponent from './empty-cart-block/frontend';
import filledCartComponent from './filled-cart-block/frontend';
import cartItemsComponent from './cart-items-block/frontend';
import cartLineItemsComponent from './cart-line-items-block/block';
import cartTotalsComponent from './cart-totals-block/frontend';
import cartOrderSummaryComponent from './cart-order-summary-block/frontend';

registerCheckoutBlock( {
	metadata: emptyCartMetadata,
	component: emptyCartComponent,
} );

registerCheckoutBlock( {
	metadata: filledCartMetadata,
	component: filledCartComponent,
} );

registerCheckoutBlock( {
	metadata: cartItemsMetadata,
	component: cartItemsComponent,
} );

registerCheckoutBlock( {
	metadata: cartLineItemsMetadata,
	component: cartLineItemsComponent,
} );

registerCheckoutBlock( {
	metadata: cartTotalsMetadata,
	component: cartTotalsComponent,
} );

registerCheckoutBlock( {
	metadata: cartOrderSummaryMetadata,
	component: cartOrderSummaryComponent,
} );

registerCheckoutBlock( {
	metadata: cartExpressPaymentMetadata,
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/express-payment" */ './cart-express-payment-block/block'
		)
	),
} );

registerCheckoutBlock( {
	metadata: cartProceedToCheckoutMetadata,
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/checkout-button" */ './proceed-to-checkout-block/frontend'
		)
	),
} );

registerCheckoutBlock( {
	metadata: cartAcceptedPaymentMethodsMetadata,
	component: lazy( () =>
		import(
			/* webpackChunkName: "cart-blocks/accepted-payment-methods" */ './cart-accepted-payment-methods-block/frontend'
		)
	),
} );
