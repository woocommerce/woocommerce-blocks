/**
 * External dependencies
 */
import { loadStripe } from '@stripe/stripe-js';

/**
 * Internal dependencies
 */
import { getApiKey } from './utils';

const stripePromise = () =>
	new Promise( ( resolve ) => {
		try {
			resolve( loadStripe( getApiKey() ) );
		} catch ( error ) {
			resolve( { error } );
		}
	} );

export { stripePromise as loadStripe };
