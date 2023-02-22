/**
 * External dependencies
 */
import { POSTCODE_REGEXES } from 'postcode-validator/lib/cjs/postcode-regexes.js';

const getCustomRegexes = () => {
	POSTCODE_REGEXES.set( 'BA', /^([7-8]{1})([0-9]{4})$/ );
	POSTCODE_REGEXES.set(
		'GB',
		/^([A-Z]){1}([0-9]{1,2}|[A-Z][0-9][A-Z]|[A-Z][0-9]{2}|[A-Z][0-9]|[0-9][A-Z]){1}([ ])?([0-9][A-z]{2}){1}|BFPO(?:\s)?([0-9]{1,4})$|BFPO(c\/o[0-9]{1,3})$/i
	);
	POSTCODE_REGEXES.set( 'IN', /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/ );
	POSTCODE_REGEXES.set( 'JP', /^([0-9]{3})([-]?)([0-9]{4})$/ );
	POSTCODE_REGEXES.set( 'LI', /^(94[8-9][0-9])$/ );
	POSTCODE_REGEXES.set( 'NL', /^([1-9][0-9]{3})(\s?)(?!SA|SD|SS)[A-Z]{2}$/i );
	POSTCODE_REGEXES.set( 'SI', /^([1-9][0-9]{3})$/ );

	return POSTCODE_REGEXES;
};
export interface IsPostcodeProps {
	postcode: string;
	country: string;
}

const isPostcode = ( { postcode, country }: IsPostcodeProps ) => {
	const CUSTOM_POSTCODE_REGEXES = getCustomRegexes();
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return CUSTOM_POSTCODE_REGEXES.get( country )!.test( postcode );
};

export default isPostcode;
