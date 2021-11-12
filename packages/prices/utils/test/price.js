/**
 * Internal dependencies
 */
import { formatPrice, getCurrency } from '../price';

describe( 'formatPrice', () => {
	test.each`
		value            | prefix     | suffix    | thousandSeparator | decimalSeparator | minorUnit | expected
		${ 1000 }        | ${ '€' }   | ${ '' }   | ${ '.' }          | ${ ',' }         | ${ 2 }    | ${ '€10,00' }
		${ 2305 }        | ${ '€' }   | ${ '' }   | ${ '.' }          | ${ ',' }         | ${ 2 }    | ${ '€23,05' }
		${ 12345 }       | ${ '' }    | ${ ' €' } | ${ '.' }          | ${ ',' }         | ${ 3 }    | ${ '12,345 €' }
		${ 1000 }        | ${ '' }    | ${ '$' }  | ${ ',' }          | ${ '.' }         | ${ 2 }    | ${ '10.00$' }
		${ '1000' }      | ${ '€' }   | ${ '' }   | ${ '.' }          | ${ ',' }         | ${ 2 }    | ${ '€10,00' }
		${ 0 }           | ${ '€' }   | ${ '' }   | ${ '.' }          | ${ ',' }         | ${ 2 }    | ${ '€0,00' }
		${ 0 }           | ${ '€' }   | ${ '' }   | ${ '.' }          | ${ ',' }         | ${ 0 }    | ${ '€0' }
		${ 12345678 }    | ${ 'Rp ' } | ${ '' }   | ${ '.' }          | ${ ',' }         | ${ 0 }    | ${ 'Rp 12.345.678' }
		${ 12345678000 } | ${ '€ ' }  | ${ '' }   | ${ '.' }          | ${ ',' }         | ${ 3 }    | ${ '€ 12.345.678,000' }
		${ '' }          | ${ '€' }   | ${ '' }   | ${ '.' }          | ${ ',' }         | ${ 2 }    | ${ '' }
		${ null }        | ${ '€' }   | ${ '' }   | ${ '.' }          | ${ ',' }         | ${ 2 }    | ${ '' }
		${ undefined }   | ${ '€' }   | ${ '' }   | ${ '.' }          | ${ ',' }         | ${ 2 }    | ${ '' }
	`(
		'correctly formats price given "$value", "$prefix" prefix, "$suffix" suffix, "$thousandSeparator" thousandSeparator, "$decimalSeparator" decimalSeparator and "$minorUnit" minorUnit',
		( {
			value,
			prefix,
			suffix,
			thousandSeparator,
			decimalSeparator,
			minorUnit,
			expected,
		} ) => {
			const formattedPrice = formatPrice(
				value,
				getCurrency( {
					prefix,
					suffix,
					thousandSeparator,
					decimalSeparator,
					minorUnit,
				} )
			);

			expect( formattedPrice ).toEqual( expected );
		}
	);

	test.each`
		value          | expected
		${ 1000 }      | ${ '$10.00' }
		${ 0 }         | ${ '$0.00' }
		${ '' }        | ${ '' }
		${ null }      | ${ '' }
		${ undefined } | ${ '' }
	`(
		'correctly formats price given "$value" only',
		( { value, expected } ) => {
			const formattedPrice = formatPrice( value );

			expect( formattedPrice ).toEqual( expected );
		}
	);
} );
