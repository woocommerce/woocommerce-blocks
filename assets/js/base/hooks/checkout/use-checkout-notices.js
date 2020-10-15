/**
 * External dependencies
 */
import { useEmitResponse } from '@woocommerce/base-hooks';
import { useSelect } from '@wordpress/data';

export const useCheckoutNotices = () => {
	const { noticeContexts } = useEmitResponse();

	const checkoutNotices = useSelect(
		( select ) => select( 'core/notices' ).getNotices( 'wc/checkout' ),
		[]
	);
	const expressPaymentNotices = useSelect(
		( select ) =>
			select( 'core/notices' ).getNotices(
				noticeContexts.EXPRESS_PAYMENTS
			),
		[ noticeContexts.EXPRESS_PAYMENTS ]
	);
	const paymentNotices = useSelect(
		( select ) =>
			select( 'core/notices' ).getNotices( noticeContexts.PAYMENTS ),
		[ noticeContexts.PAYMENTS ]
	);

	return {
		checkoutNotices,
		expressPaymentNotices,
		paymentNotices,
	};
};
