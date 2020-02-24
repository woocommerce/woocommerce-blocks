/**
 * Retrieves add cart data from the state.
 *
 * @param {Object} state The current state.
 * @return {Object} The data to return.
 */
export const getCartData = ( state ) => {
	return {
		coupons: state.coupons || [],
		items: state.items || [],
		itemsCount: state.itemsCount || 0,
		itemsWeight: state.itemsWeight || 0,
		needsShipping: state.needsShipping || true,
		errors: state.errors || [],
	};
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
 * Returns true if any coupon is being applied.
 *
 * @param {Object} state The current state.
 * @return {boolean} True if a coupon is being applied.
 */
export const isApplyingCoupon = ( state ) => {
	return !! state.applyingCoupon;
};

/**
 * Retrieves the coupon code currently being applied.
 *
 * @param {Object} state The current state.
 * @return {string} The data to return.
 */
export const getCouponBeingApplied = ( state ) => {
	return state.applyingCoupon || '';
};

/**
 * Returns true if any coupon is being removed.
 *
 * @param {Object} state The current state.
 * @return {boolean} True if a coupon is being removed.
 */
export const isRemovingCoupon = ( state ) => {
	return !! state.removingCoupon;
};

/**
 * Retrieves the coupon code currently being removed.
 *
 * @param {Object} state The current state.
 * @return {string} The data to return.
 */
export const getCouponBeingRemoved = ( state ) => {
	return state.removingCoupon || '';
};
