/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { PAYMENT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import NoPaymentMethods from './no-payment-methods';
import PaymentMethodOptions from './payment-method-options';
import SavedPaymentMethodOptions from './saved-payment-method-options';

/**
 * PaymentMethods component.
 *
 * @return {*} The rendered component.
 */
const PaymentMethods = () => {
	const { paymentMethodsInitialized, availablePaymentMethods } = useSelect(
		( select ) => {
			const store = select( PAYMENT_STORE_KEY );
			return {
				paymentMethodsInitialized: store.paymentMethodsInitialized(),
				availablePaymentMethods: store.getAvailablePaymentMethods(),
				savedPaymentMethods: store.getSavedPaymentMethods(),
			};
		}
	);

	if (
		paymentMethodsInitialized &&
		Object.keys( availablePaymentMethods ).length === 0
	) {
		return <NoPaymentMethods />;
	}

	return (
		<>
			<SavedPaymentMethodOptions />
			<PaymentMethodOptions />
		</>
	);
};

export default PaymentMethods;
