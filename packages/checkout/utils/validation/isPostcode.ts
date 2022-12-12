export interface PostcodeProps {
	postcode: string;
}

export interface IsPostcodeProps extends PostcodeProps {
	country: string;
}

/**
 * Check if a given postcode is valid for Canada.
 *
 * Canadian postcodes cannot contain D,F,I,O,Q,U and cannot start with W or Z.
 *
 * @see https://en.wikipedia.org/wiki/Postal_codes_in_Canada#Number_of_possible_postal_codes
 */
const isCAPostcode = ( { postcode }: PostcodeProps ): boolean => {
	return /^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ])([\ ])?(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$/i.test(
		postcode
	);
};

/**
 * Check if a given postcode is valid for the UK.
 *
 * @see https://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom#Validation
 */
const isGBPostcode = ( { postcode }: PostcodeProps ): boolean => {
	// Permitted letters depend upon their position in the postcode.
	// https://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom#Validation.
	const alpha1 = '[abcdefghijklmnoprstuwyz]'; // Character 1.
	const alpha2 = '[abcdefghklmnopqrstuvwxy]'; // Character 2.
	const alpha3 = '[abcdefghjkpstuw]'; // Character 3 == ABCDEFGHJKPSTUW.
	const alpha4 = '[abehmnprvwxy]'; // Character 4 == ABEHMNPRVWXY.
	const alpha5 = '[abdefghjlnpqrstuwxyz]'; // Character 5 != CIKMOV.

	const pcexp = [];

	// Expression for postcodes: AN NAA, ANN NAA, AAN NAA, and AANN NAA.
	pcexp[ 0 ] = new RegExp( '^(' + alpha1 + '{1}' + alpha2 + '{0,1}[0-9]{1,2})([0-9]{1}' + alpha5 + '{2})$' ); // prettier-ignore
	// Expression for postcodes: ANA NAA.
	pcexp[ 1 ] = new RegExp( '^(' + alpha1 + '{1}[0-9]{1}' + alpha3 + '{1})([0-9]{1}' + alpha5 + '{2})$' ); // prettier-ignore
	// Expression for postcodes: AANA NAA.
	pcexp[ 2 ] = new RegExp( '^(' + alpha1 + '{1}' + alpha2 + '[0-9]{1}' + alpha4 + ')([0-9]{1}' + alpha5 + '{2})$' ); // prettier-ignore
	// Exception for the special postcode GIR 0AA.
	pcexp[ 3 ] = new RegExp( '^(gir)(0aa)$' );
	// Standard BFPO numbers.
	pcexp[ 4 ] = new RegExp( '^(bfpo)([0-9]{1,4})$' );
	// c/o BFPO numbers.
	pcexp[ 5 ] = new RegExp( '^(bfpo)(c/o[0-9]{1,3})$' );

	// Load up the string to check, converting into lowercase and removing spaces.
	const input = postcode.toLowerCase().replace( ' ', '' );

	// Assume we are not going to find a valid postcode.
	let valid = false;

	// Check the string against the six types of postcodes.
	for ( const regexp of pcexp ) {
		if ( regexp.test( input ) ) {
			// Remember that we have found that the code is valid and break from loop.
			valid = true;
			break;
		}
	}

	return valid;
};

/**
 * Check if a given postcode is valid for a given country.
 *
 * @see https://github.com/woocommerce/woocommerce/blob/2a56407ba125ab281f901817af2485438c18a9b0/plugins/woocommerce/includes/class-wc-validation.php#L47
 */
const isPostcode = ( { postcode, country }: IsPostcodeProps ): boolean => {
	switch ( country ) {
		case 'AT':
			return /^[1-9]{1}[0-9]{3}$/.test( postcode );
		case 'BA':
			return /^([7-8]{1})([0-9]{4})$/.test( postcode );
		case 'BE':
			return /^([0-9]{4})$/i.test( postcode );
		case 'BR':
			return /^([0-9]{5})([-])?([0-9]{3})$/.test( postcode );
		case 'CA':
			return isCAPostcode( { postcode } );
		case 'CH':
			return /^([0-9]{4})$/i.test( postcode );
		case 'CZ':
			return /^([0-9]{3})(\s?)([0-9]{2})$/.test( postcode );
		case 'DE':
			return /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/.test( postcode ); // prettier-ignore
		case 'ES':
			return /^([0-9]{5})$/i.test( postcode );
		case 'FR':
			return /^([0-9]{5})$/i.test( postcode );
		case 'GB':
			return isGBPostcode( { postcode } );
		case 'HU':
			return /^([0-9]{4})$/i.test( postcode );
		case 'IE':
			return /([AC-FHKNPRTV-Y]\d{2}|D6W)(\s|-{0,1})[0-9AC-FHKNPRTV-Y]{4}/.test( postcode ); // prettier-ignore
		case 'IN':
			return /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test( postcode );
		case 'IT':
			return /^([0-9]{5})$/i.test( postcode );
		case 'JP':
			return /^([0-9]{3})([-]?)([0-9]{4})$/.test( postcode );
		case 'LI':
			return /^(94[8-9][0-9])$/.test( postcode );
		case 'NL':
			return /^([1-9][0-9]{3})(\s?)(?!SA|SD|SS)[A-Z]{2}$/i.test( postcode ); // prettier-ignore
		case 'PL':
			return /^([0-9]{2})([-])([0-9]{3})$/.test( postcode );
		case 'PR':
			return /^([0-9]{5})(-[0-9]{4})?$/i.test( postcode );
		case 'PT':
			return /^([0-9]{4})([-])([0-9]{3})$/.test( postcode );
		case 'SI':
			return /^([1-9][0-9]{3})$/.test( postcode );
		case 'SK':
			return /^([0-9]{3})(\s?)([0-9]{2})$/.test( postcode );
		case 'US':
			return /^([0-9]{5})(-[0-9]{4})?$/i.test( postcode );
		default:
			return true;
	}
};

export default isPostcode;
