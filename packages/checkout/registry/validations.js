/**
 * External dependencies
 */
import { isValidElement } from '@wordpress/element';

export const __experimentalValidateElementOrString = ( value ) => {
	return (
		value === null || isValidElement( value ) || typeof value === 'string'
	);
};
