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

/**
 * Retrieves coupon currently being applied.
 *
 * @param {Object} state The current state.
 * @return {string} The data to return.
 */
export const getApplyingCoupon = ( state ) => {
	return state.applyingCoupon || '';
};

/**
 * Retrieves coupon currently being removed.
 *
 * @param {Object} state The current state.
 * @return {string} The data to return.
 */
export const getRemovingCoupon = ( state ) => {
	return state.removingCoupon || '';
};
