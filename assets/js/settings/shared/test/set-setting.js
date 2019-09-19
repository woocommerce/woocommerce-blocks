/**
 * Internal dependencies
 */
import { setSetting } from '../set-setting';
import { getSetting } from '../get-setting';

describe( 'setSetting', () => {
	it(
		'should add a new value to the settings state for value not' + ' present',
		() => {
			setSetting( 'aSetting', 42 );
			expect( getSetting( 'aSetting' ) ).toBe( 42 );
		}
	);
	it( 'should replace existing value', () => {
		const original = getSetting( 'adminUrl' );
		setSetting( 'adminUrl', 'not original' );
		expect( getSetting( 'adminUrl' ) ).not.toBe( original );
	} );
	it( 'should save the value run through the provided validator', () => {
		setSetting( 'aSetting', 'who', () => 42 );
		expect( getSetting( 'aSetting' ) ).toBe( 42 );
	} );
} );
