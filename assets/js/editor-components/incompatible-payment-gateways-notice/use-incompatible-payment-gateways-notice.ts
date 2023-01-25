/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { useLocalStorageState } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import { STORE_KEY as PAYMENT_STORE_KEY } from '../../data/payment/constants';

const initialDismissedNotices: string[] = [];

export const useIncompatiblePaymentGatewaysNotice = (
	blockName: string
): [ boolean, () => void, { [ k: string ]: string }, number ] => {
	const [ dismissedNotices, setDismissedNotices ] = useLocalStorageState(
		`wc-blocks_dismissed_incompatible_payment_gateways_notices`,
		initialDismissedNotices
	);
	const [ isVisible, setIsVisible ] = useState( false );

	const { incompatiblePaymentMethods } = useSelect( ( select ) => {
		const { getIncompatiblePaymentMethods } = select( PAYMENT_STORE_KEY );
		return {
			incompatiblePaymentMethods: getIncompatiblePaymentMethods(),
		};
	}, [] );
	const numberOfIncompatiblePaymentMethods = Object.keys(
		incompatiblePaymentMethods
	).length;

	const isDismissed =
		numberOfIncompatiblePaymentMethods === 0 ||
		dismissedNotices.includes( blockName );
	const dismissNotice = () => {
		const dismissedNoticesSet = new Set( dismissedNotices );
		dismissedNoticesSet.add( blockName );
		setDismissedNotices( [ ...dismissedNoticesSet ] );
	};

	// This ensures the modal is not loaded on first render. This is required so
	// Gutenberg doesn't steal the focus from the Guide and focuses the block.
	useEffect( () => {
		setIsVisible( ! isDismissed );
	}, [ isDismissed ] );

	return [
		isVisible,
		dismissNotice,
		incompatiblePaymentMethods,
		numberOfIncompatiblePaymentMethods,
	];
};
