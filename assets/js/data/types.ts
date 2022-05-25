export interface ResponseError {
	code: string;
	message: string;
	data: {
		status: number;
		[ key: string ]: unknown;
	};
}

export interface ApiResponse {
	body: Record< string, unknown >;
	headers: Headers;
	status: number;
}

export function assertBatchResponseIsValid(
	response: unknown
): asserts response is {
	responses: ApiResponse[];
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

export const test = (): number => {
	return 'a';
};

export const test1 = (): number => {
	return 'a';
};

export function assertResponseIsValid(
	response: unknown
): asserts response is ApiResponse {
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
