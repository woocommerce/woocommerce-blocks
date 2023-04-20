/**
 * External dependencies
 */
import { camelCase } from 'change-case';

const mapKeys = (
	obj: object,
	mapper: ( value: unknown, key: string ) => string
) =>
	Object.entries( obj ).reduce(
		( acc, [ key, value ] ) => ( {
			...acc,
			[ mapper( value, key ) ]: value,
		} ),
		{}
	);

export const camelCaseKeys = ( obj: object ) =>
	mapKeys( obj, ( _, key ) => camelCase( key ) );
