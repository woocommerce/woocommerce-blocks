/**
 * External dependencies
 */
import type { Options as NoticeOptions } from '@wordpress/notices';
import {
	STORE_NOTICES_STORE_KEY,
	PAYMENT_STORE_KEY,
} from '@woocommerce/block-data';
import { select, dispatch } from '@wordpress/data';

const DEFAULT_CONTEXT = 'wc/global';

const hasContainer = ( container: string ): boolean => {
	const containers = select( STORE_NOTICES_STORE_KEY ).getContainers();
	return containers.includes( container );
};

const findParentContainer = ( container: string ): string => {
	let parentContainer = DEFAULT_CONTEXT;
	if (
		container.includes( 'wc/checkout/' ) &&
		hasContainer( 'wc/checkout' )
	) {
		parentContainer = 'wc/checkout';
	} else if (
		container.includes( 'wc/cart/' ) &&
		hasContainer( 'wc/cart' )
	) {
		parentContainer = 'wc/cart';
	}
	return parentContainer;
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
	let noticeContext = options?.context || DEFAULT_CONTEXT;

	const suppressNotices =
		select( PAYMENT_STORE_KEY ).isExpressPaymentMethodActive();

	if ( suppressNotices ) {
		return;
	}

	if ( ! hasContainer( noticeContext ) ) {
		// If the container ref was not registered, use the parent context instead.
		noticeContext = findParentContainer( noticeContext );
	}

	const { createNotice: dispatchCreateNotice } = dispatch( 'core/notices' );

	dispatchCreateNotice( status, message, {
		isDismissible: true,
		...options,
		context: noticeContext,
	} );
};
