export const hasError = ( state ) => {
	return state.hasError;
};

export const getCheckoutState = ( state, keys = [] ) => {
	if ( keys.length === 0 ) {
		return state;
	}

	return {
		...Object.fromEntries(
			Object.entries( state ).filter(
				( [ key ] ) => keys.indexOf( key ) !== -1
			)
		),
	};
};
