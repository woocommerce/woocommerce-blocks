/**
 * External dependencies
 */
import { QUERY_STATE_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { useSelect, useDispatch } from '@wordpress/data';
import { useRef, useEffect } from '@wordpress/element';
import { useShallowEqual } from './use-shallow-equal';

/**
 * A custom hook that exposes the current query state and a setter for the query
 * state store for the given context.
 *
 * "Query State" is a wp.data store that keeps track of an arbitrary object of
 * query keys and their values.
 *
 * @param {string} context What context to retrieve the query state for.
 *
 * @return {array} An array that has two elements. The first element is the
 *                 query state value for the given context.  The second element
 *                 is a dispatcher function for setting the query state.
 */
export const useQueryStateContext = ( context ) => {
	const queryState = useSelect(
		( select ) => {
			const store = select( storeKey );
			return store.getValueForQueryContext( context, undefined );
		},
		[ context ]
	);
	const { setValueForQueryContext: setQueryState } = useDispatch( storeKey );
	return [ queryState, setQueryState ];
};

/**
 * A custom hook that exposes the current query state value and a setter for the
 * given context and query key.
 *
 * "Query State" is a wp.data store that keeps track of an arbitrary object of
 * query keys and their values.
 *
 * @param {string} context  What context to retrieve the query state for.
 * @param {*}      queryKey The specific query key to retrieve the value for.
 *
 * @return {*}  Whatever value is set at the query state index using the
 *              provided context and query key.
 */
export const useQueryStateByKey = ( context, queryKey ) => {
	const queryValue = useSelect(
		( select ) => {
			const store = select( storeKey );
			return store.getValueForQueryKey( context, queryKey, undefined );
		},
		[ context, queryKey ]
	);
	const { setQueryValue } = useDispatch( storeKey );
	return [ queryValue, setQueryValue ];
};

/**
 * A custom hook that works similarly to useQueryStateContext. However, this
 * hook allows for synchronizing with a provided queryState object.
 *
 * This hook does the following things with the provided `synchronizedQuery`
 * object:
 *
 * - whenever synchronizedQuery varies between renders, the queryState will be
 *   updated to a merged object of the internal queryState and the provided
 *   object.  Note, any values from the same properties between objects will
 *   be set from synchronizedQuery.
 * - if there are no changes between renders, then the existing internal
 *   queryState is always returned.
 * - on initial render, the synchronizedQuery value is returned.
 *
 * Typically, this hook would be used in a scenario where there may be external
 * triggers for updating the query state (i.e. initial population of query
 * state by hydration or component attributes, or routing url changes that
 * affect query state).
 *
 * @param {string} context           What context to retrieve the query state
 *                                   for.
 * @param {Object} synchronizedQuery A provided query state object to
 *                                   synchronize internal query state with.
 */
export const useSynchronizedQueryState = ( context, synchronizedQuery ) => {
	const [ queryState, setQueryState ] = useQueryStateContext( context );
	const currentSynchronizedQuery = useShallowEqual( synchronizedQuery );
	// used to ensure we allow initial synchronization to occur before
	// returning non-synced state.
	const isInitialized = useRef( false );
	// update queryState anytime incoming synchronizedQuery changes
	useEffect( () => {
		setQueryState( context, {
			...queryState,
			...currentSynchronizedQuery,
		} );
		isInitialized.current = true;
	}, [ currentSynchronizedQuery ] );
	return isInitialized.current
		? [ queryState, setQueryState ]
		: [ synchronizedQuery, setQueryState ];
};
