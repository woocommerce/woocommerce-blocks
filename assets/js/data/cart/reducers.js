/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';

/**
 * Sub-reducer for cart items array.
 *
 * @param   {Array}  state   cartData.items state slice.
 * @param   {Object}  action  Action object.
 */
const cartItemsReducer = ( state = [], action ) => {
	switch ( action.type ) {
		case types.ITEM_QUANTITY_PENDING:
			return state.map( ( cartItem ) => {
				if ( cartItem.key === action.cartItemKey ) {
					return {
						...cartItem,
						isQuantityPending: action.isQuantityPending,
					};
				}
				return cartItem;
			} );

		case types.RECEIVE_REMOVED_ITEM:
			return state.filter( ( cartItem ) => {
				return cartItem.key !== action.cartItemKey;
			} );
	}
	return state;
};

/**
 * Reducer for receiving items related to the cart.
 *
 * @param   {Object}  state   The current state in the store.
 * @param   {Object}  action  Action object.
 *
 * @return  {Object}          New or existing state.
 */
const reducer = (
	state = {
		cartData: {
			coupons: [],
			items: [],
			itemsCount: 0,
			itemsWeight: 0,
			needsShipping: true,
			totals: {},
		},
		metaData: {},
		errors: [],
	},
	action
) => {
	switch ( action.type ) {
		case types.RECEIVE_ERROR:
			state = {
				...state,
				errors: state.errors.concat( action.error ),
			};
			break;
		case types.REPLACE_ERRORS:
			state = {
				...state,
				errors: [ action.error ],
			};
			break;
		case types.RECEIVE_CART:
			state = {
				...state,
				errors: [],
				cartData: action.response,
			};
			break;
		case types.APPLYING_COUPON:
			state = {
				...state,
				metaData: {
					...state.metaData,
					applyingCoupon: action.couponCode,
				},
			};
			break;
		case types.REMOVING_COUPON:
			state = {
				...state,
				metaData: {
					...state.metaData,
					removingCoupon: action.couponCode,
				},
			};
			break;

		// Delegate to cartItemsReducer.
		case types.RECEIVE_REMOVED_ITEM:
		case types.ITEM_QUANTITY_PENDING:
			state = {
				...state,
				cartData: {
					...state.cartData,
					items: cartItemsReducer( state.cartData.items, action ),
				},
			};
			break;
	}
	return state;
};

export default reducer;
