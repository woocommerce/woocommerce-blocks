/**
 * External dependencies
 */
import { APIFetchOptions } from '@wordpress/api-fetch';

export interface ResponseError {
	code: string;
	message: string;
	data: {
		status: number;
		[ key: string ]: unknown;
	};
}

export interface ApiFetchWithHeadersAction {
	type: string;
	options: APIFetchOptions;
}

export function assertBatchResponseIsValid(
	response: unknown
): asserts response is {
	responses: Record< string, unknown >;
	headers: Headers;
} {
	if (
		typeof response === 'object' &&
		response !== null &&
		response.hasOwnProperty( 'responses' )
	) {
		return;
	}
	throw new Error( 'Response not valid' );
}

export function assertResponseIsValid(
	response: unknown
): asserts response is {
	body: Record< string, unknown >;
	headers: Headers;
	status?: number;
} {
	if (
		typeof response === 'object' &&
		response !== null &&
		response.hasOwnProperty( 'body' ) &&
		response.hasOwnProperty( 'headers' )
	) {
		return;
	}
	throw new Error( 'Response not valid' );
}
