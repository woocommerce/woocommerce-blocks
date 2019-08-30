const formatErrorMessage = ( error, messageProperty = 'frontendMessage' ) => {
	if ( typeof error === 'object' && error.hasOwnProperty( 'message' ) ) {
		return {
			[ messageProperty ]: error.message,
		};
	}

	return error;
};

export const formatError = async ( error ) => {
	if ( error.json ) {
		try {
			const parsedError = await error.json();
			return formatErrorMessage( parsedError, 'apiMessage' );
		} catch ( e ) {
			return formatErrorMessage( e );
		}
	}

	return formatErrorMessage( error );
};
