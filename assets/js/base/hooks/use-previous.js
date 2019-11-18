/**
 * External dependencies
 */
import { useRef, useEffect } from 'react';

/**
 * Use Previous based on https://usehooks.com/usePrevious/.
 * @param {mixed}    value
 * @param {Function} validation Function that needs to validate for the value
 *                              to be updated.
 */
export const usePrevious = ( value, validation ) => {
	const ref = useRef();

	useEffect( () => {
		if ( ! validation || validation( value ) ) {
			ref.current = value;
		}
	}, [ value ] );

	return ref.current;
};
