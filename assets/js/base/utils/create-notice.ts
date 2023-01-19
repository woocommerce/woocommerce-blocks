/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import type { Options as NoticeOptions } from '@wordpress/notices';
import { select, dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { noticeContexts } from '../context/event-emit/utils';

export const DEFAULT_ERROR_MESSAGE = __(
	'Something went wrong. Please contact us to get assistance.',
	'woo-gutenberg-products-block'
);

export const getNoticeContexts = () => {
	return Object.values( noticeContexts );
};

const hasStoreNoticesContainer = ( container: string ): boolean => {
	const containers = select(
		'wc/store/store-notices'
	).getRegisteredContainers();
	return containers.includes( container );
};

/**
 * Wrapper for @wordpress/notices createNotice.
 */
export const createNotice = (
	status: 'error' | 'warning' | 'info' | 'success',
	message: string,
	options: Partial< NoticeOptions >
) => {
	const noticeContext = options?.context;
	const suppressNotices =
		select( 'wc/store/payment' ).isExpressPaymentMethodActive();

	if ( suppressNotices || noticeContext === undefined ) {
		return;
	}

	dispatch( 'core/notices' ).createNotice( status, message, {
		isDismissible: true,
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
	if ( options?.context && hasStoreNoticesContainer( options.context ) ) {
		createNotice( status, message, options );
	}
};

/**
 * Remove notices from all contexts.
 *
 * @todo Remove this when supported in Gutenberg.
 * @see https://github.com/WordPress/gutenberg/pull/44059
 */
export const removeAllNotices = () => {
	const containers = select(
		'wc/store/store-notices'
	).getRegisteredContainers();
	const { removeNotice } = dispatch( 'core/notices' );
	const { getNotices } = select( 'core/notices' );

	containers.forEach( ( container ) => {
		getNotices( container ).forEach( ( notice ) => {
			removeNotice( notice.id, container );
		} );
	} );
};

export const removeNoticesWithContext = ( context: string ) => {
	const { removeNotice } = dispatch( 'core/notices' );
	const { getNotices } = select( 'core/notices' );

	getNotices( context ).forEach( ( notice ) => {
		removeNotice( notice.id, context );
	} );
};
