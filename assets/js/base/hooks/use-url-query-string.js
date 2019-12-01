/**
 * External dependencies
 */
import { useEffect, useRef } from '@wordpress/element';
import { addQueryArgs, getQueryArg, removeQueryArgs } from '@wordpress/url';
import { useQueryStateByContext } from '@woocommerce/base-hooks';
import { useQueryStateContext } from '@woocommerce/base-context/query-state-context';

const hasWindowDependencies =
	typeof window === 'object' &&
	window.hasOwnProperty( 'history' ) &&
	window.hasOwnProperty( 'location' ) &&
	typeof window.addEventListener === 'function' &&
	typeof window.removeEventListener === 'function';

const getInitialState = ( urlKeysAndDefaults, queryStateContext ) => {
	const urlState = {};
	if ( hasWindowDependencies ) {
		Object.keys( urlKeysAndDefaults ).forEach( ( urlKey ) => {
			const queryStringValue = getQueryArg(
				window.location.href,
				`${ urlKey }_${ queryStateContext }`
			);
			urlState[ urlKey ] =
				queryStringValue || urlKeysAndDefaults[ urlKey ];
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

		const existingUrl = window.location.href;
		const newUrl = addQueryArgs( window.location.href, queryStringValues );

		if ( newUrl !== existingUrl ) {
			window.history.pushState( null, '', newUrl );
		}
	}
};

const removeWindowHistory = ( keys, queryStateContext ) => {
	if ( hasWindowDependencies ) {
		keys = keys.map( ( key ) => `${ key }_${ queryStateContext }` );
		const existingUrl = window.location.href;
		const newUrl = removeQueryArgs( window.location.href, ...keys );
		if ( newUrl !== existingUrl ) {
			window.history.pushState( null, '', newUrl );
		}
	}
};

const extractSlice = ( keys, state ) => {
	let hasValues = false;
	return keys.reduce( ( newState, key ) => {
		if ( state[ key ] ) {
			hasValues = true;
			newState[ key ] = state[ key ];
		}
		return hasValues ? newState : null;
	}, {} );
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
export const useUrlQueryString = ( urlKeysAndDefaults ) => {
	const queryStateContext = useQueryStateContext();
	const sliceIndex = JSON.stringify( Object.keys( urlKeysAndDefaults ) );
	const urlStateContext = `queryString.${ queryStateContext }`;
	const [ urlState = {}, setUrlState ] = useQueryStateByContext(
		urlStateContext
	);
	const initialState = useRef(
		getInitialState( urlKeysAndDefaults, queryStateContext )
	);

	useEffect( () => {
		if ( ! urlState[ sliceIndex ] ) {
			const newState = {
				...urlState,
				...getInitialState( urlKeysAndDefaults, queryStateContext ),
			};
			setUrlState( newState );
		}
	}, [ urlState ] );

	const updateState = ( partialUpdate ) => {
		let doUpdate = false;
		Object.keys( partialUpdate ).forEach( ( key ) => {
			// only update if this is a key for this instance.
			if ( urlKeysAndDefaults[ key ] ) {
				urlState[ key ] = partialUpdate[ key ];
				doUpdate = true;
			}
		} );
		if ( doUpdate ) {
			setUrlState( urlState );
		}
	};

	const removeState = ( keys ) => {
		let doUpdate = false;
		keys.forEach( ( key ) => {
			// only update if this is a key for this instance.
			if ( urlKeysAndDefaults[ key ] ) {
				urlState[ key ] = urlKeysAndDefaults[ key ];
				doUpdate = true;
			}
		} );
		if ( doUpdate ) {
			setUrlState( urlState );
		}
	};

	const updateHistory = ( newValues ) => {
		updateWindowHistory( newValues, queryStateContext );
		updateState( newValues );
	};

	const deleteHistory = ( keys ) => {
		removeWindowHistory( keys, queryStateContext );
		removeState( keys );
	};

	// Update our state when the use navigates back/forward (history API).
	useEffect( () => {
		const updateStateFromUrl = () => {
			const newInitialState = getInitialState(
				urlKeysAndDefaults,
				queryStateContext
			);
			const newState = {
				...urlState,
				...newInitialState,
			};
			initialState.current = newInitialState;
			setUrlState( newState );
		};

		if ( hasWindowDependencies ) {
			window.addEventListener( 'popstate', updateStateFromUrl );
		}

		return () => {
			if ( hasWindowDependencies ) {
				window.removeEventListener( 'popstate', updateStateFromUrl );
			}
		};
	}, [ urlState ] );
	const stateSlice = extractSlice(
		Object.keys( urlKeysAndDefaults ),
		urlState
	);

	return [ stateSlice || initialState.current, updateHistory, deleteHistory ];
};
