/**
 * External dependencies
 */
import { isObject, isPlainObject, isString } from '@woocommerce/types';
import { camelCase } from 'lodash';

const mapKeysToCamelCase = < T, U >( obj: T ): U => {
	if ( ! isObject( obj ) ) {
		throw new Error(
			'Argument passed to mapKeysToCamelCase is not an object'
		);
	}
	const newObject: Record< string, unknown > = {};
	const keys = Object.keys( obj ) as Array< string >;

	keys.forEach( ( key ) => {
		const value = obj[ key ];
		if ( ! isString( key ) ) {
			newObject[ key ] = value;
			return;
		}
		const newKey = camelCase( key );
		// If this is a plain object, and not an array
		if ( isPlainObject( value ) ) {
			newObject[ newKey ] = mapKeysToCamelCase( value );
			return;
		}
		if ( Array.isArray( value ) ) {
			newObject[ newKey ] = value.map( ( a ) => {
				if ( isObject( a ) ) {
					return mapKeysToCamelCase( a );
				}
				return a;
			} );
			return;
		}
		newObject[ newKey ] = value;
	} );
	return newObject as U;
};

export default mapKeysToCamelCase;
