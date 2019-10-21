import { ACTION_TYPES as types } from './action-types';

/**
 * Returns an action object used in updating the store with the provided items
 * retrieved from a request using the given querystring.
 *
 * This is a generic response action.
 *
 * @param {string}   namespace        The namespace for the collection route.
 * @param {string}   modelName        The model name for the collection route.
 *                                    string generating them.
 * @param {string}   [queryString=''] The query string for the collection
 * @param {array}    [ids=[]]         An array of ids (in correct order) for the
 *                                    model.
 * @param {Array<*>} [items=[]]       Items attached with the collection.
 * @param {bool}     [replace=false]  If true, signals to replace the current
 *                                    items in the state with the provided
 *                                    items.
 * @return {
 * 	{
 * 		type: string,
 * 		namespace: string,
 * 		modelName: string,
 * 		queryString: string,
 * 		ids: Array<*>,
 * 		items: Array<*>,
 *	}
 * } Object for action.
 */
export function receiveCollection(
	namespace,
	modelName,
	queryString = '',
	ids = [],
	items = [],
	replace = false
) {
	return {
		type: replace ? types.RESET_COLLECTION : types.RECEIVE_COLLECTION,
		namespace,
		modelName,
		queryString,
		ids,
		items,
	};
}
