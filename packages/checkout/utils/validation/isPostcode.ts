export interface IsPostcodeProps {
	postcode: string;
	country: string;
}

/**
 * Validates that a given postcode is valid for a given country.
 */
export const isPostcode = ( {
	postcode,
	country,
}: IsPostcodeProps ): boolean => {
	switch ( country ) {
		case 'AT':
			return /^[0-9]{4}$/.test( postcode );
		case 'BA':
			return /^([7-8]{1})([0-9]{4})$/.test( postcode );
		case 'BE':
			return /^([0-9]{4})$/i.test( postcode );
		case 'BG':
			return true; // return /^[0-9]{4}$/.test( postcode );
		case 'BR':
			return /^[0-9]{5}[-]{0,1}[0-9]{3}$/.test( postcode );
		case 'CA':
			return /^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$/.test( postcode );
		case 'CH':
			return /^([0-9]{4})$/i.test( postcode );
		case 'CY':
			return true; // return /^[0-9]{4}$/.test( postcode );
		case 'CZ':
			return /^[0-9]{3}[ ]?[0-9]{2}$/.test( postcode );
		case 'DE':
			return /^[0-9]{5}$/.test( postcode );
		case 'DK':
			return /^[0-9]{4}$/.test( postcode );
		case 'EE':
			return true; // return /^[0-9]{5}$/.test( postcode );
		case 'ES':
			return /^[0-9]{5}$/.test( postcode );
		case 'FI':
			return true; // return /^[0-9]{5}$/.test( postcode );
		case 'FR':
			return /^[0-9]{5}$/.test( postcode );
		case 'GB':
			return true; // return /^(GIR 0AA|[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2})$/.test( postcode );
		case 'GR':
			return true; // return /^[0-9]{3}[ ]?[0-9]{2}$/.test( postcode );
		case 'HR':
			return true; // return /^[0-9]{5}$/.test( postcode );
		case 'HU':
			return /^[0-9]{4}$/.test( postcode );
		case 'IE':
			return /^(D6W|[AC-FHKNPRTV-Y][0-9][AC-FHKNPRTV-Y]? [0-9][AC-FHKNPRTV-Y]{4})$/.test(
				postcode
			);
		case 'IS':
			return true; // return /^[0-9]{3}$/.test( postcode );
		case 'IT':
			return /^[0-9]{5}$/.test( postcode );
		case 'JP':
			return true; // return /^[0-9]{3}-[0-9]{4}$/.test( postcode );
		case 'LI':
			return true; // return /^(948[5-9])|(949[0-7])$/.test( postcode );
		case 'LT':
			return true; // return /^[0-9]{5}$/.test( postcode );
		case 'LU':
			return true; // return /^[0-9]{4}$/.test( postcode );
		case 'LV':
			return true; // return /^[0-9]{4}$/.test( postcode );
		case 'MT':
			return true; // return /^[A-Z]{3}[ ]?[0-9]{4}$/.test( postcode );
		case 'NL':
			return /^[0-9]{4}[ ]?[A-Z]{2}$/.test( postcode );
		case 'NO':
			return true; // return /^[0-9]{4}$/.test( postcode );
		case 'PL':
			return /^[0-9]{2}-[0-9]{3}$/.test( postcode );
		case 'PT':
			return /^[0-9]{4}([-]{0,1}[0-9]{3})?$/.test( postcode );
		case 'RO':
			return true; // return /^[0-9]{6}$/.test( postcode );
		case 'SE':
			return true; // return /^[0-9]{3}[ ]?[0-9]{2}$/.test( postcode );
		case 'SI':
			return /^[0-9]{4}$/.test( postcode );
		case 'SK':
			return /^[0-9]{3}[ ]?[0-9]{2}$/.test( postcode );
		case 'SM':
			return /^[0-9]{5}$/.test( postcode );
		case 'TN':
			return true; // return /^[0-9]{4}$/.test( postcode );
		case 'TR':
			return true; // return /^[0-9]{5}$/.test( postcode );
		case 'TW':
			return true; // return /^[0-9]{3}([-]{0,1}[0-9]{2})?$/.test( postcode );
		case 'UA':
			return true; // return /^[0-9]{5}$/.test( postcode );
		case 'UAE':
			return true; // return /^[0-9]{3}$/.test( postcode );
		case 'US':
			return true; // return /^[0-9]{5}([-]{0,1}[0-9]{4})?$/.test( postcode );
		case 'ZA':
			return true; // return /^[0-9]{4}$/.test( postcode );
	}

	return false;
};
