/**
 * Internal dependencies
 */
import { getSetting } from '../get-setting';
import { ADMIN_URL } from '../default-constants';

describe( 'getSetting', () => {
	it( 'returns provided default for non available setting', () => {
		expect( getSetting( 'nada', 'really nada' ) ).toBe( 'really nada' );
	} );
	it( 'returns expected value for existing setting', () => {
		expect( getSetting( 'adminUrl', 'not this' ) ).toEqual( ADMIN_URL );
	} );
	it( 'processes validation for provided validator', () => {
		expect( getSetting( 'some value', 'default', () => 42 ) ).toBe( 42 );
	} );
} );
