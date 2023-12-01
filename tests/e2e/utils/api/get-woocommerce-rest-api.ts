/**
 * External dependencies
 */
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

export const getWooCommerceRestApi = ( baseURL: string | undefined ) => {
	if ( typeof baseURL !== 'string' || baseURL === '' ) {
		throw new Error( 'baseURL is not set.' );
	}
	if (
		typeof process.env.CONSUMER_KEY !== 'string' ||
		process.env.CONSUMER_KEY === ''
	) {
		throw new Error( 'CONSUMER_KEY is not set.' );
	}
	if (
		typeof process.env.CONSUMER_SECRET !== 'string' ||
		process.env.CONSUMER_SECRET === ''
	) {
		throw new Error( 'CONSUMER_SECRET is not set.' );
	}
	return new WooCommerceRestApi( {
		url: baseURL || '',
		consumerKey: process.env.CONSUMER_KEY || '',
		consumerSecret: process.env.CONSUMER_SECRET || '',
		version: 'wc/v3',
	} );
};
