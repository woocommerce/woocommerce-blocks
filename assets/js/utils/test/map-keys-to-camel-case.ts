/**
 * Internal dependencies
 */
import mapKeysToCamelCase from '../map-keys-to-camel-case';

describe( 'mapKeysToCamelCase', () => {
	it( 'Returns the same object if no keys are snake_cased', () => {
		const object = {
			no: 'snake',
			casedObjects: true,
			nested: {
				objects: {
					exist: true,
				},
			},
		};
		expect( mapKeysToCamelCase( object ) ).toEqual( object );
	} );

	it( "correctly maps an object's keys to camelCase", () => {
		const functionInObject = function () {
			return true;
		};
		const testObject = {
			some_snake: 'case',
			objects_exist: 'in this object',
			as_well_as_a: functionInObject,
			thereAreAlso: 'someCamelCased keys too',
			and_some: {
				nested_objects: {
					in: 'this object',
				},
			},
			also_included: [
				'is',
				1,
				{ array_type: 'containing', some_nested: { objects: true } },
			],
			howAbout: new Map( [
				[ 'a', '1' ],
				[ 'b', '2' ],
			] ),
		};
		const expectedObject = {
			someSnake: 'case',
			objectsExist: 'in this object',
			asWellAsA: functionInObject,
			thereAreAlso: 'someCamelCased keys too',
			andSome: {
				nestedObjects: {
					in: 'this object',
				},
			},
			alsoIncluded: [
				'is',
				1,
				{ arrayType: 'containing', someNested: { objects: true } },
			],
			howAbout: new Map( [
				[ 'a', '1' ],
				[ 'b', '2' ],
			] ),
		};
		expect( mapKeysToCamelCase( testObject ) ).toEqual( expectedObject );
	} );
} );
