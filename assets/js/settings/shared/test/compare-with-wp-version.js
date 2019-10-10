import { compareWithWpVersion, setSetting } from '..';

describe( 'compareWithWpVersion', () => {
	it.each`
		version             | operator | result
		${'5.3-beta1'}      | ${'>'}   | ${true}
		${'5.3'}            | ${'='}   | ${true}
		${'5.3-beta12-235'} | ${'>'}   | ${true}
		${'5.3-rc1'}        | ${'<'}   | ${false}
		${'5.3-rc12-235'}   | ${'>'}   | ${true}
		${'5.3.1'}          | ${'<'}   | ${true}
		${'5.4-beta1'}      | ${'<'}   | ${true}
	`(
		'should return $result when $version is the current wp_version ' +
			'and `5.3` is the version compared using `$operator`',
		( { version, operator, result } ) => {
			setSetting( 'wp_version', version );
			expect( compareWithWpVersion( '5.3', operator ) ).toBe( result );
		}
	);
} );
