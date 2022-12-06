/**
 * Internal dependencies
 */
import { isPostcode } from '../isPostcode';
import type { IsPostcodeProps } from '../isPostcode';

describe( 'isPostcode', () => {
	const cases = [
		[ '0000', 'AT', true ],
		[ '00000', 'AT', false ],
		[ '12345', 'DE', false ],
	];

	test.each( cases )( '%s for %s returns %s', ( postcode, country, result ) =>
		expect( isPostcode( { postcode, country } as IsPostcodeProps ) ).toBe(
			result
		)
	);
} );
