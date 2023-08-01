/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import type { ShippingAddress } from '@woocommerce/settings';
import { select, dispatch } from '@wordpress/data';
import { VALIDATION_STORE_KEY } from '@woocommerce/block-data';
import { isPostcode } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import { AddressFormFields } from './types';

/**
 * Custom validation handler for fields with field specific handling.
 */
export const customValidationHandler = (
	inputObject: HTMLInputElement,
	field: string,
	customValues: {
		country: string;
	}
): boolean => {
	// Pass validation if the field is not required and is empty.
	if ( ! inputObject.required && ! inputObject.value ) {
		return true;
	}

	if (
		field === 'postcode' &&
		customValues.country &&
		! isPostcode( {
			postcode: inputObject.value,
			country: customValues.country,
		} )
	) {
		inputObject.setCustomValidity(
			__(
				'Please enter a valid postcode',
				'woo-gutenberg-products-block'
			)
		);
		return false;
	}
	return true;
};

// If it's the shipping address form and the user starts entering address
// values without having set the country first, show an error.
export const validateShippingCountry = ( values: ShippingAddress ): void => {
	const validationErrorId = 'shipping_country';
	const hasValidationError =
		select( VALIDATION_STORE_KEY ).getValidationError( validationErrorId );
	if (
		! values.country &&
		( values.city || values.state || values.postcode )
	) {
		if ( hasValidationError ) {
			dispatch( VALIDATION_STORE_KEY ).showValidationError(
				validationErrorId
			);
		} else {
			dispatch( VALIDATION_STORE_KEY ).setValidationErrors( {
				[ validationErrorId ]: {
					message: __(
						'Please select your country',
						'woo-gutenberg-products-block'
					),
					hidden: false,
				},
			} );
		}
	}

	if ( hasValidationError && values.country ) {
		dispatch( VALIDATION_STORE_KEY ).clearValidationError(
			validationErrorId
		);
	}
};

export const validateRequiredFields = (
	values: ShippingAddress,
	addressFormFields: AddressFormFields
): boolean => {
	return addressFormFields.required.every( ( field ) => {
		return values[ field.key ] !== '';
	} );
};

export const hasValidationErrors = (
	addressFormFields: AddressFormFields
): boolean => {
	return addressFormFields.fields.some( ( field ) => {
		const errorId = `${ addressFormFields.type }_${ field.key }`;
		const validationError =
			select( VALIDATION_STORE_KEY ).getValidationError( errorId );
		return !! validationError?.message;
	} );
};
