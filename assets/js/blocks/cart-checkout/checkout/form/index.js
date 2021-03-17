/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useMemo } from '@wordpress/element';
import {
	useCheckoutContext,
	useShippingDataContext,
} from '@woocommerce/base-context';
import { useCheckoutAddress } from '@woocommerce/base-hooks';
import { AddressForm } from '@woocommerce/base-components/cart-checkout';
import Form from '@woocommerce/base-components/form';

/**
 * Internal dependencies
 */
import BillingFieldsStep from './billing-fields-step';
import ContactFieldsStep from './contact-fields-step';
import ShippingFieldsStep from './shipping-fields-step';
import PhoneNumber from './phone-number';
import OrderNotesStep from './order-notes-step';
import PaymentMethodStep from './payment-method-step';
import ShippingOptionsStep from './shipping-options-step';
import './style.scss';

const CheckoutForm = ( {
	requireCompanyField,
	requirePhoneField,
	showApartmentField,
	showCompanyField,
	showOrderNotes,
	showPhoneField,
	allowCreateAccount,
} ) => {
	const { onSubmit } = useCheckoutContext();
	const {
		defaultAddressFields,
		billingFields,
		setBillingFields,
		setEmail,
		setPhone,
		setShippingAsBilling,
		setShippingFields,
		shippingAsBilling,
		shippingFields,
		showBillingFields,
	} = useCheckoutAddress();
	const { needsShipping } = useShippingDataContext();

	const addressFieldsConfig = useMemo( () => {
		return {
			company: {
				hidden: ! showCompanyField,
				required: requireCompanyField,
			},
			address_2: {
				hidden: ! showApartmentField,
			},
		};
	}, [ showCompanyField, requireCompanyField, showApartmentField ] );

	return (
		<Form className="wc-block-checkout__form" onSubmit={ onSubmit }>
			<ContactFieldsStep
				emailValue={ billingFields.email }
				onChangeEmail={ ( value ) => {
					setEmail( value );
				} }
				allowCreateAccount={ allowCreateAccount }
			/>
			{ needsShipping && (
				<ShippingFieldsStep
					shippingAsBilling={ shippingAsBilling }
					setShippingAsBilling={ setShippingAsBilling }
				>
					<AddressForm
						id="shipping"
						type="shipping"
						onChange={ ( values ) => {
							setShippingFields( values );
						} }
						values={ shippingFields }
						fields={ Object.keys( defaultAddressFields ) }
						fieldConfig={ addressFieldsConfig }
					/>
					{ showPhoneField && (
						<PhoneNumber
							isRequired={ requirePhoneField }
							value={ billingFields.phone }
							onChange={ ( value ) => {
								setPhone( value );
							} }
						/>
					) }
				</ShippingFieldsStep>
			) }
			{ showBillingFields && (
				<BillingFieldsStep>
					<AddressForm
						id="billing"
						type="billing"
						onChange={ ( values ) => {
							setBillingFields( values );
						} }
						values={ billingFields }
						fields={ Object.keys( defaultAddressFields ) }
						fieldConfig={ addressFieldsConfig }
					/>
					{ showPhoneField && ! needsShipping && (
						<PhoneNumber
							isRequired={ requirePhoneField }
							value={ billingFields.phone }
							onChange={ ( value ) => {
								setPhone( value );
							} }
						/>
					) }
				</BillingFieldsStep>
			) }
			<ShippingOptionsStep />
			<PaymentMethodStep />
			{ showOrderNotes && <OrderNotesStep /> }
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
	allowCreateAccount: PropTypes.bool.isRequired,
};

export default CheckoutForm;
