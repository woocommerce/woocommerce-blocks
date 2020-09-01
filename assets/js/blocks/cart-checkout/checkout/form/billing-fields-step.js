/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	AddressForm,
	FormStep,
} from '@woocommerce/base-components/cart-checkout';
import { useCheckoutAddress } from '@woocommerce/base-hooks';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { useAddressFieldsConfig } from '../utils';

const BillingFieldsStep = ( {
	disabled,
	requireCompanyField,
	showApartmentField,
	showCompanyField,
} ) => {
	const {
		defaultAddressFields,
		billingFields,
		setBillingFields,
		showBillingFields,
	} = useCheckoutAddress();
	const addressFieldsConfig = useAddressFieldsConfig( {
		defaultAddressFields,
		showCompanyField,
		requireCompanyField,
		showApartmentField,
	} );

	if ( ! showBillingFields ) {
		return null;
	}

	return (
		<FormStep
			id="billing-fields"
			disabled={ disabled }
			className="wc-block-checkout__billing-fields"
			title={ __( 'Billing address', 'woo-gutenberg-products-block' ) }
			description={ __(
				'Enter the address that matches your card or payment method.',
				'woo-gutenberg-products-block'
			) }
		>
			<AddressForm
				id="billing"
				onChange={ setBillingFields }
				type="billing"
				values={ billingFields }
				fields={ Object.keys( defaultAddressFields ) }
				fieldConfig={ addressFieldsConfig }
			/>
		</FormStep>
	);
};

BillingFieldsStep.propTypes = {
	disabled: PropTypes.bool.isRequired,
	requireCompanyField: PropTypes.bool.isRequired,
	showApartmentField: PropTypes.bool.isRequired,
	showCompanyField: PropTypes.bool.isRequired,
};

export default BillingFieldsStep;
