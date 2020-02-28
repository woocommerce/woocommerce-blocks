/**
 * External dependencies
 */
import useStoreNoticesContext from '@woocommerce/base-context/store-notices-context';

console.log( useStoreNoticesContext );

const useStoreNotices = () => {
	const { notices, setNotice, noticeTypes } = useStoreNoticesContext();
	const addNotice = ( text, noticeType = 'default' ) => {
		if ( noticetypes.includes( noticeType ) ) {
			setNotice[ noticeType ]( text );
		}
	};
	const clearNotices = ( noticeType = null ) => {
		setNotice.clear( noticeType );
	};
	return {
		notices,
		addNotice,
		clearNotices,
	};
};

export default useStoreNotices;
