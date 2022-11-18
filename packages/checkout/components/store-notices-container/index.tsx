/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { PAYMENT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import './style.scss';
import StoreNotices from './store-notices';
import SnackbarNotices from './snackbar-notices';
import type {
	StoreNoticesContainerProps,
	NoticeType,
	NoticeOptions,
} from './types';

const StoreNoticesContainer = ( {
	className = '',
	context = 'default',
	additionalNotices = [],
}: StoreNoticesContainerProps ): JSX.Element | null => {
	const suppressNotices = useSelect( ( select ) =>
		select( PAYMENT_STORE_KEY ).isExpressPaymentMethodActive()
	);

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
		<>
			<StoreNotices
				className={ className }
				context={ context }
				notices={ notices
					.filter( ( notice ) => notice.type !== 'snackbar' )
					.concat( additionalNotices ) }
			/>
			<SnackbarNotices
				className={ className }
				context={ context }
				notices={ notices.filter(
					( notice ) => notice.type === 'snackbar'
				) }
			/>
		</>
	);
};

export default StoreNoticesContainer;
