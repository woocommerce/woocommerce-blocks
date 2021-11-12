/**
 * Internal dependencies
 */
import {
	getIntegerValue,
	getDecimalValue,
	formatPrice,
	getCurrency,
} from '../price';

describe( 'testInteger', () => {
	test.each`
		value           | thousandSeparator | minorUnit | expected
		${ 1 }          | ${ ',' }          | ${ 2 }    | ${ '0' }
		${ 12 }         | ${ ',' }          | ${ 2 }    | ${ '0' }
		${ 123 }        | ${ ',' }          | ${ 2 }    | ${ '1' }
		${ 1000 }       | ${ ',' }          | ${ 2 }    | ${ '10' }
		${ 1234 }       | ${ ',' }          | ${ 2 }    | ${ '12' }
		${ 12345 }      | ${ ',' }          | ${ 2 }    | ${ '123' }
		${ 123456 }     | ${ ',' }          | ${ 2 }    | ${ '1,234' }
		${ 1234567 }    | ${ ',' }          | ${ 2 }    | ${ '12,345' }
		${ 12345678 }   | ${ ',' }          | ${ 2 }    | ${ '123,456' }
		${ 123456789 }  | ${ ',' }          | ${ 2 }    | ${ '1,234,567' }
		${ 123456789 }  | ${ ',' }          | ${ 3 }    | ${ '123,456' }
		${ 123456789 }  | ${ ',' }          | ${ 4 }    | ${ '12,345' }
		${ 123456789 }  | ${ ',' }          | ${ 5 }    | ${ '1,234' }
		${ 1234567890 } | ${ ',' }          | ${ 0 }    | ${ '1,234,567,890' }
		${ 1234567890 } | ${ '.' }          | ${ 0 }    | ${ '1.234.567.890' }
	`(
		'correctly returns integer value given "$value", "$thousandSeparator" thousandSeparator and "$minorUnit" minorUnit',
		( { value, thousandSeparator, minorUnit, expected } ) => {
			const formattedPrice = getIntegerValue(
				value,
				thousandSeparator,
				minorUnit
			);

			expect( formattedPrice ).toEqual( expected );
		}
	);
} );

describe( 'testDecimal', () => {
	test.each`
		value          | minorUnit | expected
		${ 0 }         | ${ 0 }    | ${ '' }
		${ 0 }         | ${ 1 }    | ${ '0' }
		${ 0 }         | ${ 2 }    | ${ '00' }
		${ 0 }         | ${ 3 }    | ${ '000' }
		${ 123456789 } | ${ 0 }    | ${ '' }
		${ 123456789 } | ${ 1 }    | ${ '9' }
		${ 123456789 } | ${ 2 }    | ${ '89' }
		${ 123456789 } | ${ 3 }    | ${ '789' }
		${ 123456789 } | ${ 4 }    | ${ '6789' }
		${ 123456789 } | ${ 5 }    | ${ '56789' }
		${ 123456789 } | ${ 6 }    | ${ '456789' }
	`(
		'correctly returns integer value given "$value" and "$minorUnit" minorUnit',
		( { value, minorUnit, expected } ) => {
			const formattedPrice = getDecimalValue( value, minorUnit );

			expect( formattedPrice ).toEqual( expected );
		}
	);
} );

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
