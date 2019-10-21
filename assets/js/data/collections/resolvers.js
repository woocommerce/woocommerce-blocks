/**
 * Internal dependencies
 */
import { receiveCollection } from './actions';
import { STORE_KEY as SCHEMA_STORE_KEY } from '../schema/constants';

/**
 * External dependencies
 */
import { apiFetch, select } from '@wordpress/data-controls';
import { addQueryArgs } from '@wordpress/url';

const DEFAULT_EMPTY_ARRAY = [];

/**
 * Resolver for retrieving a collection via a api route.
 *
 * @param {string} namespace
 * @param {string} modelName
 * @param {Object} query
 * @param {Array}  [ids=[]]
 */
export function* getCollection( namespace, modelName, query, ids = [] ) {
	const route = yield select(
		SCHEMA_STORE_KEY,
		'getRoute',
		namespace,
		modelName,
		ids
	);
	const queryString = addQueryArgs( '', query );
	if ( ! route ) {
		yield receiveCollection(
			namespace,
			modelName,
			queryString,
			ids,
			DEFAULT_EMPTY_ARRAY
		);
		return;
	}
	let items = yield apiFetch( { path: route + queryString } );
	items = items || DEFAULT_EMPTY_ARRAY;
	yield receiveCollection( namespace, modelName, queryString, ids, items );
}
