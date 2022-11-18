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
	forceType = null,
	showGlobal = false,
	additionalNotices = [],
}: StoreNoticesContainerProps ): JSX.Element | null => {
	const suppressNotices = useSelect( ( select ) =>
		select( PAYMENT_STORE_KEY ).isExpressPaymentMethodActive()
	);

	let notices = useSelect< Array< NoticeType & NoticeOptions > >(
		( select ) => {
			const { getNotices } = select( 'core/notices' );

			const contextNotices = getNotices( context );
			const globalNotices = showGlobal ? getNotices( 'wc/global' ) : [];

			return [ ...contextNotices, ...globalNotices ].filter(
				Boolean
			) as Array< NoticeType & NoticeOptions >;
		}
	);

	if ( suppressNotices ) {
		return null;
	}

	if ( forceType !== null ) {
		notices = notices.map( ( notice ) => ( {
			...notice,
			type: forceType,
		} ) );
	}

	return (
		<>
			<StoreNotices
				className={ className }
				context={ context }
				notices={ notices
					.filter( ( notice ) => notice.type === 'default' )
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
