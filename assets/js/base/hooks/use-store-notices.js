/**
 * External dependencies
 */
import { useStoreNoticesContext } from '@woocommerce/base-context/store-notices-context';

export const useStoreNotices = () => {
	const { notices, setNotice } = useStoreNoticesContext();

	const addNotice = ( text, noticeType = 'default' ) => {
		if ( typeof setNotice[ noticeType ] === 'function' ) {
			setNotice[ noticeType ]( text );
		}
	};

	return {
		notices,
		addNotice,
	};
};
