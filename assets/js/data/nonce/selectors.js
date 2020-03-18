/**
 * Retrieves cart nonce from state.
 *
 * @param {Object} state The current state.
 * @return {string} The data to return.
 */
export const getCurrentNonce = ( state ) => {
	return state.nonce;
};
