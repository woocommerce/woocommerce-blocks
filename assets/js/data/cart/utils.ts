/**
 * External dependencies
 */
import { camelCase, mapKeys } from 'lodash';
import { Cart, CartResponse } from '@woocommerce/types';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { VALIDATION_STORE_KEY } from '../validation';

export const mapCartResponseToCart = ( responseCart: CartResponse ): Cart => {
	return mapKeys( responseCart, ( _, key ) =>
		camelCase( key )
	) as unknown as Cart;
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
