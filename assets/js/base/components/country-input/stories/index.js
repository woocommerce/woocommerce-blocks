/**
 * External dependencies
 */
import { text } from '@storybook/addon-knobs';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { CountryInput } from '../';
import { countries as exampleCountries } from './countries-filler';

export default {
	title: 'WooCommerce Blocks/@base-components/CountryInput',
	component: CountryInput,
};

export const Default = () => {
	const label = text( 'Input Label', 'Countries:' );
	const errorMessage = text( 'Error Message', '' );
	const [ selectedCountry, selectCountry ] = useState();
	return (
		<CountryInput
			countries={ exampleCountries }
			label={ label }
			errorMessage={ errorMessage }
			value={ selectedCountry }
			onChange={ ( country ) => selectCountry( country ) }
		/>
	);
};
