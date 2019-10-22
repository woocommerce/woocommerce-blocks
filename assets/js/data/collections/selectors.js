/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { hasInState } from '../utils';

const DEFAULT_EMPTY_ARRAY = [];

/**
 * Retrieves the collection from the state for the given arguments.
 *
 * @param {Object} state
 * @param {string} namespace
 * @param {string} modelName
 * @param {Object} [query=null]
 * @param {Array}  [ids=[]]
 * @returns
 */
export const getCollection = (
	state,
	namespace,
	modelName,
	query = null,
	ids = []
) => {
	// prep ids and query for state retrieval
	ids = JSON.stringify( ids );
	query = query !== null ? addQueryArgs( '', query ) : '';
	if ( hasInState( state, [ namespace, modelName, ids, query ] ) ) {
		return state[ namespace ][ modelName ][ ids ][ query ];
	}
	return DEFAULT_EMPTY_ARRAY;
};
