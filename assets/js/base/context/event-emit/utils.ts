/**
 * External dependencies
 */
import { isObject } from '@woocommerce/types';
import { noticeContexts as storeNoticeContexts } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import type { EventObserversType, ObserverType } from './types';

export const getObserversByPriority = (
	observers: EventObserversType,
	eventType: string
): ObserverType[] => {
	return observers[ eventType ]
		? Array.from( observers[ eventType ].values() ).sort( ( a, b ) => {
				return a.priority - b.priority;
		  } )
		: [];
};

export enum responseTypes {
	SUCCESS = 'success',
	FAIL = 'failure',
	ERROR = 'error',
}

export const noticeContexts = storeNoticeContexts;

export interface ResponseType extends Record< string, unknown > {
	type: responseTypes;
	retry?: boolean;
}

const isResponseOf = (
	response: unknown,
	type: string
): response is ResponseType => {
	return isObject( response ) && 'type' in response && response.type === type;
};

export const isSuccessResponse = (
	response: unknown
): response is ResponseType => {
	return isResponseOf( response, responseTypes.SUCCESS );
};

export const isErrorResponse = (
	response: unknown
): response is ResponseType => {
	return isResponseOf( response, responseTypes.ERROR );
};

export const isFailResponse = (
	response: unknown
): response is ResponseType => {
	return isResponseOf( response, responseTypes.FAIL );
};

export const shouldRetry = ( response: unknown ): boolean => {
	return (
		! isObject( response ) ||
		typeof response.retry === 'undefined' ||
		response.retry === true
	);
};
