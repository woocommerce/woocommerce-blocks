/**
 * Internal dependencies
 */
import { ALLOWED_COUNTRIES } from '~/settings/blocks';
import CountryInput from './country-input';
import type { CountryInputProps } from './CountryInputProps';

const BillingCountryInput = ( props: CountryInputProps ): JSX.Element => {
	return <CountryInput countries={ ALLOWED_COUNTRIES } { ...props } />;
};

export default BillingCountryInput;
