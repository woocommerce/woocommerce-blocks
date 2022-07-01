/**
 * External dependencies
 */
import type { Reducer } from 'redux';
import { pickBy } from 'lodash';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { isString } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { ValidationAction } from './actions';
import { ACTION_TYPES as types } from './action-types';
import { FieldValidationStatus } from '../types';

const reducer: Reducer< Record< string, FieldValidationStatus > > = (
	state: Record< string, FieldValidationStatus > = {},
	action: Partial< ValidationAction >
) => {
	switch ( action.type ) {
		case types.SET_VALIDATION_ERRORS:
			const newErrors = pickBy( action.errors, ( error, property ) => {
				if ( typeof error.message !== 'string' ) {
					return false;
				}
				if ( state.hasOwnProperty( property ) ) {
					return ! isShallowEqual( state[ property ], error );
				}
				return true;
			} );
			if ( Object.values( newErrors ).length === 0 ) {
				return state;
			}
			state = { ...state, ...action.errors };
			return state;
		case types.CLEAR_ALL_VALIDATION_ERRORS:
			state = {};
			return state;

		case types.CLEAR_VALIDATION_ERROR:
			if (
				! isString( action.error ) ||
				! state.hasOwnProperty( action.error )
			) {
				return state;
			}
			delete state[ action.error ];
			return state;
		case types.HIDE_VALIDATION_ERROR:
			if (
				! isString( action.error ) ||
				! state.hasOwnProperty( action.error )
			) {
				return state;
			}
			state[ action.error ].hidden = true;
			return state;
		case types.SHOW_VALIDATION_ERROR:
			if (
				! isString( action.error ) ||
				! state.hasOwnProperty( action.error )
			) {
				return state;
			}
			state[ action.error ].hidden = false;
			return state;
		case types.SHOW_ALL_VALIDATION_ERRORS:
			const newState = { ...state };
			Object.keys( newState ).forEach( ( property ) => {
				if ( newState[ property ].hidden ) {
					newState[ property ].hidden = false;
				}
			} );
			return { ...newState };

		default:
			return state;
	}
};

export type State = ReturnType< typeof reducer >;
export default reducer;
