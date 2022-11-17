/**
 * External dependencies
 */
import classnames from 'classnames';
import { SnackbarList } from 'wordpress-components';
import { useSelect, useDispatch } from '@wordpress/data';
import { PAYMENT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import './style.scss';
import type {
	NoticeType,
	NoticeOptions,
	SnackbarNoticesContainerProps,
} from './types';

const SnackbarNoticesContainer = ( {
	className,
	forceType = false,
	context = 'default',
}: SnackbarNoticesContainerProps ): JSX.Element | null => {
	const suppressNotices = useSelect( ( select ) =>
		select( PAYMENT_STORE_KEY ).isExpressPaymentMethodActive()
	);
	const { removeNotice } = useDispatch( 'core/notices' );

	const notices = useSelect< Array< NoticeType & NoticeOptions > >(
		( select ) =>
			select( 'core/notices' ).getNotices( context ) as Array<
				NoticeType & NoticeOptions
			>
	);

	if ( suppressNotices ) {
		return null;
	}

	return (
		<SnackbarList
			className={ classnames(
				className,
				'wc-block-components-notices__snackbar'
			) }
			notices={ notices
				.filter( ( notice ) => notice.type === 'snackbar' || forceType )
				.map( ( notice ) => {
					return {
						...notice,
						className:
							'components-snackbar--status-' + notice.status,
					};
				} ) }
			onRemove={ ( noticeId: string ) => {
				notices.forEach( ( notice ) => {
					if ( notice.explicitDismiss && notice.id === noticeId ) {
						removeNotice( notice.id, context );
					} else {
						removeNotice( notice.id, context );
					}
				} );
			} }
		/>
	);
};

export default SnackbarNoticesContainer;
