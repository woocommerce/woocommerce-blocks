/**
 * External dependencies
 */
import { usePaymentMethods } from '@woocommerce/base-hooks';
import { useRef, useEffect } from '@wordpress/element';
import { usePaymentMethodDataContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import NoPaymentMethods from './no-payment-methods';
import NewPaymentMethodOptions from './new-payment-method-options';
import SavedPaymentMethodOptions from './saved-payment-method-options';

/**
 * PaymentMethods component.
 *
 * @return {*} The rendered component.
 */
const PaymentMethods = () => {
	const {
		activePaymentMethod,
		customerPaymentMethods = {},
		paymentMethodData,
	} = usePaymentMethodDataContext();
	const { isInitialized, paymentMethods } = usePaymentMethods();
	const currentPaymentMethods = useRef( paymentMethods );

	// update ref on change.
	useEffect( () => {
		currentPaymentMethods.current = paymentMethods;
	}, [ paymentMethods, activePaymentMethod ] );

	if (
		isInitialized &&
		Object.keys( currentPaymentMethods.current ).length === 0
	) {
		return <NoPaymentMethods />;
	}

	return Object.keys( customerPaymentMethods ).length > 0 &&
		paymentMethodData.isSavedToken ? (
		<SavedPaymentMethodOptions />
	) : (
		<>
			<SavedPaymentMethodOptions />
			<NewPaymentMethodOptions />
		</>
	);
};

export default PaymentMethods;
