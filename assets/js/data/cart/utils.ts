/**
 * External dependencies
 */
import { Cart, CartResponse } from '@woocommerce/types';
import { select } from '@wordpress/data';
import { camelCaseKeys } from '@woocommerce/base-utils';
import { isEmail } from '@wordpress/url';
import type { BillingAddress, ShippingAddress } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import { STORE_KEY as VALIDATION_STORE_KEY } from '../validation/constants';

export const mapCartResponseToCart = ( responseCart: CartResponse ): Cart => {
	return camelCaseKeys( responseCart ) as unknown as Cart;
};

export const shippingAddressHasValidationErrors = () => {
	const validationStore = select( VALIDATION_STORE_KEY );
	// Check if the shipping address form has validation errors - if not then we know the full required
	// address has been pushed to the server.
	const stateValidationErrors =
		validationStore.getValidationError( 'shipping_state' );
	const address1ValidationErrors =
		validationStore.getValidationError( 'shipping_address_1' );
	const countryValidationErrors =
		validationStore.getValidationError( 'shipping_country' );
	const postcodeValidationErrors =
		validationStore.getValidationError( 'shipping_postcode' );
	const cityValidationErrors =
		validationStore.getValidationError( 'shipping_city' );
	return [
		cityValidationErrors,
		stateValidationErrors,
		address1ValidationErrors,
		countryValidationErrors,
		postcodeValidationErrors,
	].some( ( entry ) => typeof entry !== 'undefined' );
};

export const normalizeAddressProp = (
	key: keyof ( BillingAddress & ShippingAddress ),
	value: string | number | boolean
) => {
	// Skip normalizing for any non string field
	if ( typeof value !== 'string' ) {
		return value;
	}
	if ( key === 'email' ) {
		return isEmail( value ) ? value.trim() : '';
	}
	if ( key === 'postcode' ) {
		return value.replace( ' ', '' ).toUpperCase();
	}
	return value.trim();
};
