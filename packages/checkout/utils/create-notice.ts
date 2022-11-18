/**
 * External dependencies
 */
import type { Options as NoticeOptions } from '@wordpress/notices';
import {
	STORE_NOTICE_CONTAINERS_STORE_KEY,
	PAYMENT_STORE_KEY,
} from '@woocommerce/block-data';
import { select, dispatch } from '@wordpress/data';

/**
 * List of valid notice contexts included in blocks.
 */
export const noticeContexts = {
	CART: 'wc/cart',
	CHECKOUT: 'wc/checkout',
	PAYMENTS: 'wc/checkout/payments',
	EXPRESS_PAYMENTS: 'wc/checkout/express-payments',
	SHIPPING_ADDRESS: 'wc/checkout/shipping-address',
	SHIPPING_METHODS: 'wc/checkout/shipping-methods',
};

/**
 * Wrapper for @wordpress/notices createNotice.
 *
 * This is used to create the correct type of notice based on the provided context, and to ensure the notice container
 * exists first, otherwise it uses the default context instead.
 */
export const createNotice = (
	status: 'error' | 'warning' | 'info' | 'success',
	message: string,
	options: Partial< NoticeOptions >
) => {
	let noticeContext = options?.context || 'wc';

	const containerRefs = select(
		STORE_NOTICE_CONTAINERS_STORE_KEY
	).getContainers() as Record<
		string,
		React.MutableRefObject< HTMLDivElement | null >
	>;

	const suppressNotices =
		select( PAYMENT_STORE_KEY ).isExpressPaymentMethodActive();

	if ( suppressNotices ) {
		return;
	}

	// If the container ref was not registered, use the parent context instead.
	if ( ! Object.keys( containerRefs ).includes( noticeContext ) ) {
		if ( noticeContext.includes( 'wc/checkout/' ) ) {
			noticeContext = 'wc/checkout';
		} else if ( noticeContext.includes( 'wc/cart/' ) ) {
			noticeContext = 'wc/cart';
		} else {
			noticeContext = 'wc/global';
		}
	}

	const { createNotice: dispatchCreateNotice } = dispatch( 'core/notices' );

	dispatchCreateNotice( status, message, {
		isDismissible: true,
		...options,
		context: noticeContext,
	} );
};
