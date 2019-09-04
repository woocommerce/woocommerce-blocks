/**
 * Given a JS error or a fetch response error, parse and format it so it can be displayed to the user.
 *
 * @param {object} error Error object.
 * @param {function} [error.json] If a json method is specified, it will try parsing the error first.
 * @param {string} [error.message] If a message is specified, it will be shown to the user.
 * @param {string} [error.type] The type will be used to determine how the error is shown to the user.
 * @return {object} Error object containing a message and type.
 */
export const formatError = async ( error ) => {
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
				type: 'frontend',
			};
		}
	}

	return {
		message: error.message,
		type: error.type || 'frontend',
	};
};
