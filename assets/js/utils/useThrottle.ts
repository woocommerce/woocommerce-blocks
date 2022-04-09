/* eslint-disable you-dont-need-lodash-underscore/throttle */

/**
 * External dependencies
 */
import { DebouncedFunc, throttle, ThrottleSettings } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';

/**
 * Throttles a function inside a React functional component
 */
export function useThrottle< T extends ( ...args: unknown[] ) => unknown >(
	cb: T,
	delay: number,
	options?: ThrottleSettings
): DebouncedFunc< T > {
	const cbRef = useRef( cb );

	useEffect( () => {
		cbRef.current = cb;
	} );

	const throttledCb = useCallback(
		throttle( ( ...args ) => cbRef.current( ...args ), delay, options ),
		[ delay ]
	);

	return throttledCb;
}
