/**
 * External dependencies
 */
import { useStoreNoticesContext } from '@woocommerce/base-context/store-notices-context';
import { useCallback } from '@wordpress/element';

export const useStoreNotices = () => {
	const { notices, setNotice } = useStoreNoticesContext();

	const addNotice = useCallback(
		( text, noticeType = 'default' ) => {
			if ( typeof setNotice[ noticeType ] === 'function' ) {
				setNotice[ noticeType ]( text );
			}
		},
		[ setNotice ]
	);

	const clearNotices = useCallback(
		( noticeType = 'default' ) => {
			setNotice.clear( noticeType );
		},
		[ setNotice ]
	);

	return {
		notices,
		addNotice,
		clearNotices,
	};
};
