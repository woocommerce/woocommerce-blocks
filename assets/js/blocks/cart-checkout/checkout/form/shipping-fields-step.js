/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	AddressForm,
	FormStep,
} from '@woocommerce/base-components/cart-checkout';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';
import CheckboxControl from '@woocommerce/base-components/checkbox-control';
import { useShippingDataContext } from '@woocommerce/base-context';
import { useCheckoutAddress } from '@woocommerce/base-hooks';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { useAddressFieldsConfig } from '../utils';

const ShippingFieldsStep = ( {
	disabled,
	requireCompanyField,
	requirePhoneField,
	showApartmentField,
	showCompanyField,
	showPhoneField,
} ) => {
	const { needsShipping } = useShippingDataContext();
	const {
		defaultAddressFields,
		billingFields,
		setPhone,
		shippingAsBilling,
		shippingFields,
		setShippingFields,
		setShippingAsBilling,
	} = useCheckoutAddress();
	const addressFieldsConfig = useAddressFieldsConfig( {
		defaultAddressFields,
		showCompanyField,
		requireCompanyField,
		showApartmentField,
	} );

	if ( ! needsShipping ) {
		return null;
	}

	return (
		<FormStep
			id="shipping-fields"
			disabled={ disabled }
			className="wc-block-checkout__shipping-fields"
			title={ __( 'Shipping address', 'woo-gutenberg-products-block' ) }
			description={ __(
				'Enter the physical address where you want us to deliver your order.',
				'woo-gutenberg-products-block'
			) }
		>
			<AddressForm
				id="shipping"
				onChange={ setShippingFields }
				values={ shippingFields }
				fields={ Object.keys( defaultAddressFields ) }
				fieldConfig={ addressFieldsConfig }
			/>
			{ showPhoneField && (
				<ValidatedTextInput
					id="phone"
					type="tel"
					label={
						requirePhoneField
							? __( 'Phone', 'woo-gutenberg-products-block' )
							: __(
									'Phone (optional)',
									'woo-gutenberg-products-block'
							  )
					}
					value={ billingFields.phone }
					autoComplete="tel"
					onChange={ setPhone }
					required={ requirePhoneField }
				/>
			) }
			<CheckboxControl
				className="wc-block-checkout__use-address-for-billing"
				label={ __(
					'Use same address for billing',
					'woo-gutenberg-products-block'
				) }
				checked={ shippingAsBilling }
				onChange={ ( isChecked ) => setShippingAsBilling( isChecked ) }
			/>
		</FormStep>
	);
};

ShippingFieldsStep.propTypes = {
	disabled: PropTypes.bool.isRequired,
	requireCompanyField: PropTypes.bool.isRequired,
	requirePhoneField: PropTypes.bool.isRequired,
	showApartmentField: PropTypes.bool.isRequired,
	showCompanyField: PropTypes.bool.isRequired,
	showPhoneField: PropTypes.bool.isRequired,
};

export default ShippingFieldsStep;
