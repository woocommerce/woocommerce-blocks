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
