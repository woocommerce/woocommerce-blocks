export interface ErrorObject {
	/**
	 * Human-readable error message to display.
	 */
	message: string;
	/**
	 * Context in which the error was triggered. That will determine how the error is displayed to the user.
	 */
	type: 'api' | 'general' | string;
}

interface IncomingError {
	json?: () => Promise< ErrorObject >;
	message?: string;
	type?: string;
}

export const formatError = async (
	error: IncomingError
): Promise< ErrorObject > => {
	if ( typeof error.json === 'function' ) {
		try {
			const parsedError = await error.json();
			return {
				message: parsedError.message,
				type: parsedError.type || 'api',
			};
		} catch ( e ) {
			return {
				message: e.message,
				type: 'general',
			};
		}
	}

	return {
		message: error.message,
		type: error.type || 'general',
	};
};
