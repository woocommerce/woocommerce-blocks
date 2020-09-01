/**
 * External dependencies
 */
import Form from '@woocommerce/base-components/form';
import { useCheckoutContext } from '@woocommerce/base-context';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import BillingFieldsStep from './billing-fields-step';
import ContactFieldsStep from './contact-fields-step';
import OrderNotesStep from './order-notes-step';
import PaymentMethodStep from './payment-method-step';
import ShippingFieldsStep from './shipping-fields-step';
import ShippingOptionsStep from './shipping-options-step';
import './style.scss';

const CheckoutForm = ( {
	requireCompanyField,
	requirePhoneField,
	showApartmentField,
	showCompanyField,
	showPhoneField,
	showOrderNotes,
} ) => {
	const {
		isProcessing: checkoutIsProcessing,
		onSubmit,
	} = useCheckoutContext();

	return (
		<Form className="wc-block-checkout__form" onSubmit={ onSubmit }>
			<ContactFieldsStep disabled={ checkoutIsProcessing } />
			<ShippingFieldsStep
				disabled={ checkoutIsProcessing }
				requireCompanyField={ requireCompanyField }
				requirePhoneField={ requirePhoneField }
				showApartmentField={ showApartmentField }
				showCompanyField={ showCompanyField }
				showPhoneField={ showPhoneField }
			/>
			<BillingFieldsStep
				disabled={ checkoutIsProcessing }
				requireCompanyField={ requireCompanyField }
				showApartmentField={ showApartmentField }
				showCompanyField={ showCompanyField }
			/>
			<ShippingOptionsStep disabled={ checkoutIsProcessing } />
			<PaymentMethodStep disabled={ checkoutIsProcessing } />
			<OrderNotesStep showOrderNotes={ showOrderNotes } />
		</Form>
	);
};

CheckoutForm.propTypes = {
	requireCompanyField: PropTypes.bool.isRequired,
	requirePhoneField: PropTypes.bool.isRequired,
	showApartmentField: PropTypes.bool.isRequired,
	showCompanyField: PropTypes.bool.isRequired,
	showOrderNotes: PropTypes.bool.isRequired,
	showPhoneField: PropTypes.bool.isRequired,
};

export default CheckoutForm;
