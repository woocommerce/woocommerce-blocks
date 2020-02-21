/**
 * Retrieves add cart data from the state.
 *
 * @param {Object} state The current state.
 * @return {Object} The data to return.
 */
export const getCartData = ( state ) => {
	return state;
};

/**
 * Retrieves add cart data from the state.
 *
 * @param {Object} state The current state.
 * @return {Object} The data to return.
 */
export const getCartTotals = ( state ) => {
	return state.totals || {};
};
