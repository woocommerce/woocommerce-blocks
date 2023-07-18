/**
 * External dependencies
 */
import { dispatch } from '@wordpress/data';

export const clearPostcodeValidationError = ( type: string ) => {
	const store = dispatch( 'wc/store/validation' );

	if ( type === 'shipping' ) {
		store.clearValidationError( 'shipping_postcode' );
	} else {
		store.clearValidationError( 'billing_postcode' );
	}
};
