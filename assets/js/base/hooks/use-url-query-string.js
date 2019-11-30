/**
 * External dependencies
 */
import { useEffect, useReducer } from '@wordpress/element';
import { addQueryArgs, getQueryArg, removeQueryArgs } from '@wordpress/url';
import { useQueryStateContext } from '@woocommerce/base-context/query-state-context';
import isShallowEqual from '@wordpress/is-shallow-equal';

const hasWindowDependencies =
	typeof window === 'object' &&
	window.hasOwnProperty( 'history' ) &&
	window.hasOwnProperty( 'location' ) &&
	typeof window.addEventListener === 'function' &&
	typeof window.removeEventListener === 'function';

const update = ( urlKey, urlValue ) => {
	return {
		type: 'update',
		urlKey,
		urlValue,
	};
};

const deleteEntry = ( urlKey ) => {
	return {
		type: 'delete',
		urlKey,
	};
};

const reset = ( initializationValues ) => {
	return {
		type: 'reset',
		initializationValues,
	};
};

const reducer = ( state, action ) => {
	const { type, urlKey, urlValue, initializationValues } = action;
	switch ( type ) {
		case 'reset':
			state = initializationValues || state;
			break;
		case 'update':
			state =
				! state[ urlKey ] ||
				! isShallowEqual( state[ urlKey ], urlValue )
					? { ...state, [ urlKey ]: urlValue }
					: state;
			break;
		case 'delete':
			if ( state[ urlKey ] );
			// eslint-disable-next-line no-unused-vars
			const { urlKey: deletedKey, ...rest } = state;
			return { ...rest };
		default:
			throw new Error( 'Invalid action type for reducer.' );
	}
	return state;
};

const initializeState = ( { urlKeys, queryStateContext } ) => {
	const urlState = {};

	if ( hasWindowDependencies ) {
		Object.keys( urlKeys ).forEach( ( urlKey ) => {
			const queryStringValue = getQueryArg(
				window.location.href,
				`${ urlKey }_${ queryStateContext }`
			);
			urlState[ urlKey ] = queryStringValue || urlKeys[ urlKey ];
		} );
	}
	return urlState;
};

const updateWindowHistory = ( values, queryStateContext ) => {
	if ( hasWindowDependencies ) {
		const queryStringValues = {};

		Object.keys( values ).forEach( ( key ) => {
			queryStringValues[ `${ key }_${ queryStateContext }` ] =
				values[ key ];
		} );

		window.history.pushState(
			null,
			'',
			addQueryArgs( window.location.href, queryStringValues )
		);
	}
};

const deleteWindowHistory = ( keys, queryStateContext ) => {
	if ( hasWindowDependencies ) {
		keys = keys.map( ( key ) => `${ key }_${ queryStateContext }` );
		window.history.pushState(
			null,
			'',
			removeQueryArgs( window.location.href, ...keys )
		);
	}
};

/**
 * A custom hook that handles exposes current query string values from the
 * url and a function for updating browser window history (if it's available
 * in the given environment).
 *
 * This hook also registers event handlers for acting on forward and back
 * actions on the url.
 *
 * @param {Object} urlKeys An object where the keys are the whitelisted query
 *                         string keys to extract/update and the values are the
 *                         default value to use if not found in the url.
 *
 * @return {Array} An array where the first item is the current urlState and the
 *                 second item is a function for updating the window history with
 *                 a new state.
 */
export const useUrlQueryString = ( urlKeys ) => {
	const queryStateContext = useQueryStateContext();
	const [ urlState, dispatch ] = useReducer(
		reducer,
		{ urlKeys, queryStateContext },
		initializeState
	);

	const updateState = ( partialUpdate ) => {
		Object.keys( partialUpdate ).forEach( ( key ) => {
			dispatch( update( key, partialUpdate[ key ] ) );
		} );
	};

	const deleteState = ( keys ) => {
		Object.keys( keys ).forEach( ( key ) => {
			dispatch( deleteEntry( key ) );
		} );
	};

	const updateHistory = ( newValues ) => {
		updateState( newValues );
		updateWindowHistory( newValues, queryStateContext );
	};

	const deleteHistory = ( keys ) => {
		deleteState( keys );
		deleteWindowHistory( keys, queryStateContext );
	};

	// Update our state when the use navigates back/forward (history API).
	useEffect( () => {
		const updateStateFromUrl = () => {
			dispatch(
				reset( initializeState( { urlKeys, queryStateContext } ) )
			);
		};

		if ( hasWindowDependencies ) {
			window.addEventListener( 'popstate', updateStateFromUrl );
		}

		return () => {
			if ( hasWindowDependencies ) {
				window.removeEventListener( 'popstate', updateStateFromUrl );
			}
		};
	}, [ dispatch ] );

	return [ urlState, updateHistory, deleteHistory ];
};
