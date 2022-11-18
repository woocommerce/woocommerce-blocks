/**
 * External dependencies
 */
import type { Options as NoticeOptions } from '@wordpress/notices';
import {
	STORE_NOTICES_STORE_KEY,
	PAYMENT_STORE_KEY,
} from '@woocommerce/block-data';
import { select, dispatch } from '@wordpress/data';

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

	const suppressNotices =
		select( PAYMENT_STORE_KEY ).isExpressPaymentMethodActive();

	if ( suppressNotices ) {
		return;
	}

	const containerRefs = select( STORE_NOTICES_STORE_KEY ).getContainers();
	const registeredContext = Object.keys( containerRefs );

	// If the container ref was not registered, use the parent context instead.
	if ( ! registeredContext.includes( noticeContext ) ) {
		if (
			noticeContext.includes( 'wc/checkout/' ) &&
			registeredContext.includes( 'wc/checkout' )
		) {
			noticeContext = 'wc/checkout';
		} else if (
			noticeContext.includes( 'wc/cart/' ) &&
			registeredContext.includes( 'wc/cart' )
		) {
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
