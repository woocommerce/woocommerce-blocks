/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import type { Options as NoticeOptions } from '@wordpress/notices';
import { select, dispatch } from '@wordpress/data';

export const GLOBAL_CONTEXT = 'wc/global';
export const DEFAULT_ERROR_MESSAGE = __(
	'Something went wrong. Please contact us to get assistance.',
	'woo-gutenberg-products-block'
);

export const hasStoreNoticeContainer = ( container: string ): boolean => {
	const containers = select( 'wc/store/notices' ).getContainers();
	return containers.includes( container );
};

const findParentContainer = ( container: string ): string => {
	let parentContainer = GLOBAL_CONTEXT;
	if (
		container.includes( 'wc/checkout/' ) &&
		hasStoreNoticeContainer( 'wc/checkout' )
	) {
		parentContainer = 'wc/checkout';
	} else if (
		container.includes( 'wc/cart/' ) &&
		hasStoreNoticeContainer( 'wc/cart' )
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
	let noticeContext = options?.context || GLOBAL_CONTEXT;

	const suppressNotices =
		select( 'wc/store/payment' ).isExpressPaymentMethodActive();

	if ( suppressNotices ) {
		return;
	}

	if ( ! hasStoreNoticeContainer( noticeContext ) ) {
		// If the container ref was not registered, use the parent context instead.
		noticeContext = findParentContainer( noticeContext );
	}

	const { createNotice: dispatchCreateNotice } = dispatch( 'core/notices' );

	dispatchCreateNotice( status, message, {
		isDismissible: true,
		__unstableHTML: true,
		...options,
		context: noticeContext,
	} );
};

/**
 * Creates a notice only if the Store Notice Container is visible.
 */
export const createNoticeIfVisible = (
	status: 'error' | 'warning' | 'info' | 'success',
	message: string,
	options: Partial< NoticeOptions >
) => {
	const noticeContext = options?.context || GLOBAL_CONTEXT;

	if ( hasStoreNoticeContainer( noticeContext ) ) {
		createNotice( status, message, options );
	}
};

/**
 * Remove notices from all contexts.
 */
export const removeAllNotices = () => {
	const containers = select( 'wc/store/notices' ).getContainers();
	const { removeNotice } = dispatch( 'core/notices' );
	const { getNotices } = select( 'core/notices' );

	containers.forEach( ( container ) => {
		getNotices( container ).forEach( ( notice ) => {
			removeNotice( notice.id, container );
		} );
	} );
};
