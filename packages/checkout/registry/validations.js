/**
 * External dependencies
 */
import { isValidElement } from '@wordpress/element';

export const validateElementOrString = ( value ) => {
	return (
		value === null || isValidElement( value ) || typeof value === 'string'
	);
};
