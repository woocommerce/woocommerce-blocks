/**
 * External dependencies
 */
import { useMemo } from '@wordpress/element';

export const useStoreOrder = () => {
	const isPayForOrder = () => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams( queryString );
		return urlParams.get( 'pay_for_order' );
	};

	const getOrderKey = () => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams( queryString );
		return urlParams.get( 'key' );
	};

	const getOrderId = () => {
		const path = window.location.pathname;
		const orderIdRegexp = new RegExp( /order-pay\/([0-9]*)/ );
		const matches = path.match( orderIdRegexp );
		return matches ? parseInt( matches[ 1 ], 10 ) : null;
	};

	const orderId = useMemo< number | null >( () => {
		return isPayForOrder() ? getOrderId() : null;
	}, [] );

	const orderKey = useMemo< string | null >( () => {
		return isPayForOrder() ? getOrderKey() : null;
	}, [] );

	return {
		orderId,
		orderKey,
	};
};
