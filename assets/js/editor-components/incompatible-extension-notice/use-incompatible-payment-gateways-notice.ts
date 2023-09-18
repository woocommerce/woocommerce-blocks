/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_KEY as PAYMENT_STORE_KEY } from '../../data/payment/constants';

export const useIncompatiblePaymentGatewaysNotice = (): [
	{ [ k: string ]: string },
	string[],
	number
] => {
	const { incompatiblePaymentMethods } = useSelect( ( select ) => {
		const { getIncompatiblePaymentMethods } = select( PAYMENT_STORE_KEY );
		return {
			incompatiblePaymentMethods: getIncompatiblePaymentMethods(),
		};
	}, [] );

	const incompatiblePaymentMethodSlugs = Object.keys(
		incompatiblePaymentMethods
	);

	const incompatiblePaymentMethodCount =
		incompatiblePaymentMethodSlugs.length;

	// console.clear();
	// console.log( {
	// 	incompatiblePaymentMethods,
	// 	incompatiblePaymentMethodSlugs,
	// 	incompatiblePaymentMethodCount,
	// } );

	return [
		incompatiblePaymentMethods,
		incompatiblePaymentMethodSlugs,
		incompatiblePaymentMethodCount,
	];
};
