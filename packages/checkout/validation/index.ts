/**
 * External dependencies
 */
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { VALIDATION_STORE_KEY } from '../../../assets/js/data/validation';
window.package_key = VALIDATION_STORE_KEY;

export const { getValidationError } = select( VALIDATION_STORE_KEY );
