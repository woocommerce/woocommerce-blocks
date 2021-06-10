/**
 * External dependencies
 */
import { isPlainObject } from '@woocommerce/types';

describe( 'Type guards', () => {
	describe( 'isPlainObject', () => {
		it( 'Returns true if an object is a plain old JavaScript object', () => {
			const plainObject = {
				plain: 'old',
				object: true,
			};
			expect( isPlainObject( plainObject ) ).toBe( true );
		} );

		it( 'Returns true if an object is a plain old JavaScript object (Object constructor)', () => {
			const plainObject = new Object();
			expect( isPlainObject( plainObject ) ).toBe( true );
		} );

		it( 'Returns false if an object is null', () => {
			expect( isPlainObject( null ) ).toBe( false );
		} );

		it( 'Returns false if an object is not a plain old JavaScript object (Map)', () => {
			expect( isPlainObject( new Map() ) ).toBe( false );
		} );

		it( 'Returns false if an object is not a plain old JavaScript object (function)', () => {
			expect( isPlainObject( () => null ) ).toBe( false );
		} );

		it( 'Returns false if an object is not a plain old JavaScript object (function)', () => {
			expect( isPlainObject( () => null ) ).toBe( false );
		} );
	} );
} );
