/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { FieldValidationStatus } from '@woocommerce/types';
import { type ShippingAddress } from '@woocommerce/settings';

// If it's the shipping address form and the user starts entering address
// values without having set the country first, show an error.
const validateShippingCountry = (
	values: ShippingAddress,
	setValidationErrors: (
		errors: Record< string, FieldValidationStatus >
	) => void,
	clearValidationError: ( error: string ) => void,
	hasValidationError: boolean
): void => {
	const validationErrorId = 'shipping_country';
	if (
		! hasValidationError &&
		! values.country &&
		( values.city || values.state || values.postcode )
	) {
		setValidationErrors( {
			[ validationErrorId ]: {
				message: __(
					'Please select a country to calculate rates.',
					'woo-gutenberg-products-block'
				),
				hidden: false,
			},
		} );
	}
	if ( hasValidationError && values.country ) {
		clearValidationError( validationErrorId );
	}
};

export default validateShippingCountry;
