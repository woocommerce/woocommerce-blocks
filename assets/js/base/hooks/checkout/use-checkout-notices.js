/**
 * External dependencies
 */
import useCheckoutContext from '@woocommerce/base-context/checkout-context';

const useCheckoutNotices = () => {
	const { notices, updateNotices } = useCheckoutContext();
	const addNotice = ( notice ) => {
		updateNotices( ( originalNotices ) => [ ...originalNotices, notice ] );
	};
	const removeNotice = ( notice ) => {
		// @todo...figure out how notices are saved - might need unique ids?
		// Do we have a special notice creator that takes care of that?
		// Use wp notice api?
		return notice;
	};
	return {
		notices,
		addNotice,
		removeNotice,
	};
};

export default useCheckoutNotices;
