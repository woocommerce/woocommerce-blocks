/**
 * External dependencies
 */
import { isValidElement } from '@wordpress/element';

/**
 * Checks if the provided value is a React element, a string or null.
 *
 * @param {any} value Value to check.
 * @return {boolean} Whether the value is a valid element, string or null.
 */
export const __experimentalValidateElementOrString = ( value ) => {
	return (
		value === null || isValidElement( value ) || typeof value === 'string'
	);
};
