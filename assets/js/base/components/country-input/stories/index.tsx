/**
 * External dependencies
 */
import { Story, Meta } from '@storybook/react';
import { ValidationContextProvider } from '@woocommerce/base-context';
import { useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { CountryInput, CountryInputWithCountriesProps } from '..';
import { countries } from './countries-filler';
import { VALIDATION_STORE_KEY } from '../../../../../../packages/checkout/validation';

type CountryCode = keyof typeof countries;

export default {
	title: 'WooCommerce Blocks/@base-components/CountryInput',
	component: CountryInput,
	args: {
		countries,
		autoComplete: 'off',
		id: 'country',
		label: 'Countries: ',
		required: false,
	},
	argTypes: {
		countries: { control: false },
		options: { table: { disable: true } },
		value: { control: false },
	},
	decorators: [
		( StoryComponent ) => (
			<ValidationContextProvider>
				<StoryComponent />
			</ValidationContextProvider>
		),
	],
} as Meta< CountryInputWithCountriesProps >;

const Template: Story< CountryInputWithCountriesProps > = ( args ) => {
	const [ selectedCountry, selectCountry ] = useState< CountryCode | '' >(
		''
	);

	const { showValidationError, clearValidationError } = useDispatch(
		VALIDATION_STORE_KEY
	);

	useEffect( () => {
		showValidationError( 'country' );
	}, [ showValidationError ] );

	function updateCountry( country: CountryCode ) {
		clearValidationError( 'country' );
		selectCountry( country );
	}

	return (
		<CountryInput
			{ ...args }
			onChange={ ( value ) => updateCountry( value as CountryCode ) }
			value={ selectedCountry }
		/>
	);
};

export const Default = Template.bind( {} );

export const WithError = Template.bind( {} );
WithError.args = {
	errorId: 'country',
	errorMessage: 'Please select a country',
	required: true,
};
