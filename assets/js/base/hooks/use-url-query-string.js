/**
 * External dependencies
 */
import { useEffect, useReducer } from '@wordpress/element';
import { addQueryArgs, getQueryArg } from '@wordpress/url';
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

/**
 * A custom hook that tbc
 *
 * @param {} [] tbc
 *
 * @return {} tbc
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

	const updateHistory = ( newValues ) => {
		updateState( newValues );
		updateWindowHistory( newValues, queryStateContext );
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

	return [ urlState, updateHistory ];
};
