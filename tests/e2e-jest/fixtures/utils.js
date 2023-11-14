/**
 * External dependencies
 */
import { request } from 'https';
import { URL } from 'url';

// A wrapper around https.request that returns a promise encapulating the response body and other response attributes.
export const requestAsync = ( fullUrl, options = {}, data ) => {
	return new Promise( ( resolve, reject ) => {
		// Parse the full URL
		const urlObject = new URL( fullUrl );

		// Merge the URL components with the provided options
		const finalOptions = {
			...options,
			protocol: urlObject.protocol,
			hostname: urlObject.hostname,
			port: urlObject.port,
			path: urlObject.pathname + urlObject.search,
		};

		// Create and handle the request
		const req = request( finalOptions, ( res ) => {
			let body = '';
			res.setEncoding( 'utf8' );
			res.on( 'data', ( chunk ) => {
				body += chunk;
			} );
			res.on( 'end', () => {
				const httpsResponse = {
					...res,
					body,
				};
				resolve( httpsResponse );
			} );
		} );

		req.on( 'error', ( err ) => {
			reject( err );
		} );

		if ( data ) {
			req.write( data );
		}

		req.end();
	} );
};
