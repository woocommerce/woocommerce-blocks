/**
 * External dependencies
 */
import { useMemo } from '@wordpress/element';
import { LOGIN_URL } from '@woocommerce/block-settings';

export const LOGIN_TO_CHECKOUT_URL = `${ LOGIN_URL }?redirect_to=${ encodeURIComponent(
	window.location.href
) }`;

export const useAddressFieldsConfig = ( {
	defaultAddressFields,
	showCompanyField,
	requireCompanyField,
	showApartmentField,
} ) => {
	return useMemo( () => {
		return {
			company: {
				...defaultAddressFields.company,
				hidden: ! showCompanyField,
				required: requireCompanyField,
			},
			address_2: {
				...defaultAddressFields.address_2,
				hidden: ! showApartmentField,
			},
		};
	}, [
		defaultAddressFields,
		showCompanyField,
		requireCompanyField,
		showApartmentField,
	] );
};
