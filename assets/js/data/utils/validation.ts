/**
 * External dependencies
 */
import { select, dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { VALIDATION_STORE_KEY } from '../validation';

/**
 * For a given list of keys, finds the invalid ones and returns them.
 *
 * This assumes that error ids are made by of ADDRESS_TYPE_KEY + '_' + KEY e.g. shipping_first_name
 *
 * @param  keys
 * @param  addressType
 */
export const getInvalidAddressKeys = (
	keys: string[],
	addressType: 'shipping' | 'billing' = 'shipping'
) => {
	if ( ! select( VALIDATION_STORE_KEY ).hasValidationErrors() ) {
		return [];
	}

	const getValidationError =
		select( VALIDATION_STORE_KEY ).getValidationError;

	return keys
		.filter( ( key ) => {
			return getValidationError( addressType + '_' + key ) !== undefined;
		} )
		.filter( Boolean );
};

/**
 * For a given list of keys, reveal the validation errors inline.
 *
 * @param  keys
 * @param  addressType
 */
export const showValidationErrorsForAddressKeys = (
	keys: string[],
	addressType: 'shipping' | 'billing' = 'shipping'
) => {
	keys.forEach( ( key ) => {
		dispatch( VALIDATION_STORE_KEY ).showValidationError(
			addressType + '_' + key
		);
	} );
};
