/**
 * External dependencies
 */
import { isObject, objectHasProp } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { ObserverResponse } from '~/base/context';

/**
 * Whether the passed object is an ObserverResponse.
 */
export const isObserverResponse = (
	response: unknown
): response is ObserverResponse => {
	return isObject( response ) && objectHasProp( response, 'type' );
};
