/**
 * External dependencies
 */
import { useState, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { STATUS } from './constants';

const usePaymentEvents = () => {
	const { paymentStatus, setPaymentStatus } = useState( STATUS.PRISTINE );
	const dispatch = useMemo(
		() => ( {
			pristine: () => setPaymentStatus( STATUS.PRISTINE ),
			started: () => setPaymentStatus( STATUS.STARTED ),
			finished: () => setPaymentStatus( STATUS.FINISHED ),
			error: () => setPaymentStatus( STATUS.ERROR ),
			failed: () => setPaymentStatus( STATUS.FAILED ),
			success: () => setPaymentStatus( STATUS.SUCCESS ),
		} ),
		[ setPaymentStatus ]
	);
	const select = useMemo(
		() => ( {
			isPristine: () => paymentStatus === STATUS.PRISTINE,
			isStarted: () => paymentStatus === STATUS.STARTED,
			isFinished: () => paymentStatus === STATUS.FINISHED,
			hasError: () => paymentStatus === STATUS.ERROR,
			hasFailed: () => paymentStatus === STATUS.FAILED,
			isSuccessful: () => paymentStatus === STATUS.SUCCESS,
		} ),
		[ paymentStatus ]
	);
	return { dispatch, select };
};

export default usePaymentEvents;
