export type ResponseError = {
	code: string;
	message: string;
	data: {
		status: number;
		[ key: string ]: unknown;
	};
};
