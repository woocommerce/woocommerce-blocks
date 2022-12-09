/**
 * Internal dependencies
 */
import { isPostcode } from '../isPostcode';
import type { IsPostcodeProps } from '../isPostcode';

describe( 'isPostcode', () => {
	const cases = [
		// Austrian postcodes
		[ true, '1000', 'AT' ],
		[ true, '9999', 'AT' ],
		[ false, '0000', 'AT' ],
		[ false, '10000', 'AT' ],

		// Bosnian postcodes
		[ true, '71000', 'BA' ],
		[ true, '78256', 'BA' ],
		[ true, '89240', 'BA' ],
		[ false, '61000', 'BA' ],
		[ false, '7850', 'BA' ],

		// Belgian postcodes
		[ false, '1', 'BE' ],

		// Brazilian postcodes
		[ true, '99999-999', 'BR' ],
		[ true, '99999999', 'BR' ],
		[ false, '99999 999', 'BR' ],
		[ false, '99999-ABC', 'BR' ],

		// Canadian postcodes
		[ true, 'A9A 9A9', 'CA' ],
		[ true, 'A9A9A9', 'CA' ],
		[ true, 'a9a9a9', 'CA' ],
		[ false, 'D0A 9A9', 'CA' ],
		[ false, '99999', 'CA' ],
		[ false, 'ABC999', 'CA' ],
		[ false, '0A0A0A', 'CA' ],

		// Swiss postcodes
		[ true, '9999', 'CH' ],
		[ false, '99999', 'CH' ],
		[ false, 'ABCDE', 'CH' ],

		// Czech postcodes
		[ false, '1', 'CZ' ],

		// German postcodes
		[ false, '1', 'DE' ],

		// Danish postcodes
		[ false, '1', 'DK' ],

		// Spanish postcodes
		[ false, '1', 'ES' ],

		// French postcodes
		[ false, '1', 'FR' ],

		// British postcodes
		[ true, 'A9 9AA', 'GB' ],
		[ true, 'GIR 0AA', 'GB' ],
		[ false, 'GIRO 0AA', 'GB' ],
		[ false, '99999', 'GB' ],

		// Hungarian postcodes
		[ false, '1', 'HU' ],

		// Irish postcodes
		[ false, '1', 'IE' ],

		// Indian postcodes
		[ false, '1', 'IN' ],

		// Italian postcodes
		[ true, '99999', 'IT' ],
		[ false, '9999', 'IT' ],
		[ false, 'ABC 999', 'IT' ],
		[ false, 'ABC-999', 'IT' ],
		[ false, 'ABC_123', 'IT' ],

		// Japanese postcodes
		[ true, '1340088', 'JP' ],
		[ true, '134-0088', 'JP' ],
		[ false, '1340-088', 'JP' ],
		[ false, '12345', 'JP' ],
		[ false, '0123', 'JP' ],

		// Lithuanian postcodes
		[ false, '1', 'LI' ],

		// Dutch postcodes
		[ true, '3852GC', 'NL' ],
		[ true, '3852 GC', 'NL' ],
		[ true, '3852 gc', 'NL' ],
		[ false, '3852SA', 'NL' ],
		[ false, '3852 SA', 'NL' ],
		[ false, '3852 sa', 'NL' ],

		// Polish postcodes
		[ false, '1', 'PL' ],

		// Puerto Rican postcodes
		[ false, '1', 'PR' ],

		// Portuguese postcodes
		[ false, '1', 'PT' ],

		// Slovenian postcodes
		[ true, '1234', 'SI' ],
		[ true, '1000', 'SI' ],
		[ true, '9876', 'SI' ],
		[ false, '12345', 'SI' ],
		[ false, '0123', 'SI' ],

		// Slovak postcodes
		[ false, '1', 'SK' ],

		// United States postcodes
		[ true, '99999', 'US' ],
		[ true, '99999-9999', 'US' ],
		[ false, 'ABCDE', 'US' ],
		[ false, 'ABCDE-9999', 'US' ],
	];

	test.each( cases )( '%s: %s for %s', ( result, postcode, country ) =>
		expect( isPostcode( { postcode, country } as IsPostcodeProps ) ).toBe(
			result
		)
	);
} );
