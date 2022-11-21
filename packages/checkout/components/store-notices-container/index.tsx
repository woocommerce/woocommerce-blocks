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
import type { StoreNoticesContainerProps, StoreNotice } from './types';

const formatNotices = (
	notices: StoreNotice[],
	forceType: 'default' | 'snackbar' | null = null,
	context: string
): StoreNotice[] => {
	return notices.map( ( notice ) => ( {
		...notice,
		type: forceType !== null ? forceType : notice.type,
		context,
	} ) );
};

const StoreNoticesContainer = ( {
	className = '',
	context = 'wc/global',
	forceType = null,
	showGlobal = false,
	additionalNotices = [],
}: StoreNoticesContainerProps ): JSX.Element | null => {
	const suppressNotices = useSelect( ( select ) =>
		select( PAYMENT_STORE_KEY ).isExpressPaymentMethodActive()
	);

	const notices = useSelect< StoreNotice[] >( ( select ) => {
		const { getNotices } = select( 'core/notices' );

		const contextNotices = formatNotices(
			( getNotices( context ) as StoreNotice[] ).concat(
				additionalNotices
			),
			forceType,
			context
		);
		const globalNotices = showGlobal
			? formatNotices(
					getNotices( 'wc/global' ) as StoreNotice[],
					forceType,
					'wc/global'
			  )
			: [];

		return [ ...contextNotices, ...globalNotices ].filter(
			Boolean
		) as StoreNotice[];
	} );

	if ( suppressNotices ) {
		return null;
	}

	return (
		<>
			<StoreNotices
				className={ className }
				context={ context }
				notices={ notices.filter(
					( notice ) => notice.type === 'default'
				) }
			/>
			<SnackbarNotices
				className={ className }
				notices={ notices.filter(
					( notice ) => notice.type === 'snackbar'
				) }
			/>
		</>
	);
};

export default StoreNoticesContainer;
