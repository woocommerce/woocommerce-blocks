/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl } from '@wordpress/components';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import type { PickupLocation } from '../types';

// Outputs the list of countries and states in a single dropdown select.
const countryStateDropdownOptions = () => {
	const countries = getSetting< Record< string, string > >( 'countries', [] );
	const states = getSetting< Record< string, Record< string, string > > >(
		'countryStates',
		[]
	);
	const countryStateOptions = Object.keys( countries ).map( ( country ) => {
		const countryStates = states[ country ] || {};

		if ( Object.keys( countryStates ).length === 0 ) {
			return {
				options: [
					{
						value: country,
						label: countries[ country ],
					},
				],
			};
		}

		const stateOptions = Object.keys( countryStates ).map( ( state ) => ( {
			value: `${ country }:${ state }`,
			label: `${ countries[ country ] } — ${ countryStates[ state ] }`,
		} ) );
		return {
			label: countries[ country ],
			options: [ ...stateOptions ],
		};
	} );
	return {
		options: countryStateOptions,
	};
};
const countryStateOptions = countryStateDropdownOptions();

const Form = ( {
	formRef,
	values,
	setValues,
}: {
	formRef: React.RefObject< HTMLFormElement >;
	values: PickupLocation;
	setValues: React.Dispatch< React.SetStateAction< PickupLocation > >;
} ) => {
	const { country: selectedCountry, state: selectedState } = values.address;
	const states = getSetting< Record< string, Record< string, string > > >(
		'countryStates',
		[]
	);
	const setLocationField =
		( field: keyof PickupLocation ) => ( newValue: string | boolean ) => {
			setValues( ( prevValue: PickupLocation ) => ( {
				...prevValue,
				[ field ]: newValue,
			} ) );
		};

	const setLocationAddressField =
		( field: keyof PickupLocation[ 'address' ] ) =>
		( newValue: string | boolean ) => {
			setValues( ( prevValue ) => ( {
				...prevValue,
				address: {
					...prevValue.address,
					[ field ]: newValue,
				},
			} ) );
		};

	const countryHasStates =
		states[ selectedCountry ] &&
		Object.keys( states[ selectedCountry ] ).length > 0;

	return (
		<form ref={ formRef }>
			<TextControl
				label={ __( 'Location name', 'woo-gutenberg-products-block' ) }
				name={ 'location_name' }
				value={ values.name }
				onChange={ setLocationField( 'name' ) }
				autoComplete="off"
				required={ true }
				onInvalid={ (
					event: React.InvalidEvent< HTMLInputElement >
				) => {
					event.target.setCustomValidity(
						__(
							'A Location title is required',
							'woo-gutenberg-products-block'
						)
					);
				} }
				onInput={ ( event: React.ChangeEvent< HTMLInputElement > ) => {
					event.target.setCustomValidity( '' );
				} }
			/>
			<TextControl
				label={ __( 'Address', 'woo-gutenberg-products-block' ) }
				name={ 'location_address' }
				placeholder={ __( 'Address', 'woo-gutenberg-products-block' ) }
				value={ values.address.address_1 }
				onChange={ setLocationAddressField( 'address_1' ) }
				autoComplete="off"
			/>
			<TextControl
				label={ __( 'City', 'woo-gutenberg-products-block' ) }
				name={ 'location_city' }
				hideLabelFromVision={ true }
				placeholder={ __( 'City', 'woo-gutenberg-products-block' ) }
				value={ values.address.city }
				onChange={ setLocationAddressField( 'city' ) }
				autoComplete="off"
			/>
			<TextControl
				label={ __( 'Postcode / ZIP', 'woo-gutenberg-products-block' ) }
				name={ 'location_postcode' }
				hideLabelFromVision={ true }
				placeholder={ __(
					'Postcode / ZIP',
					'woo-gutenberg-products-block'
				) }
				value={ values.address.postcode }
				onChange={ setLocationAddressField( 'postcode' ) }
				autoComplete="off"
			/>
			<SelectControl
				name="location_country_state"
				label={ __(
					'Country / State',
					'woo-gutenberg-products-block'
				) }
				hideLabelFromVision={ true }
				placeholder={ __(
					'Country / State',
					'woo-gutenberg-products-block'
				) }
				value={ `${ selectedCountry }${
					selectedState &&
					states[ selectedCountry ]?.[ selectedState ]
						? ':' + selectedState
						: ''
				}` }
				onChange={ ( val: string ) => {
					const [ country, state = '' ] = val.split( ':' );
					setLocationAddressField( 'country' )( country );
					setLocationAddressField( 'state' )( state );
				} }
			>
				{ countryStateOptions.options.map( ( option ) => {
					if ( option.label ) {
						return (
							<optgroup
								key={ option.label }
								label={ option.label }
							>
								{ option.options.map( ( subOption ) => (
									<option
										key={ subOption.value }
										value={ subOption.value }
									>
										{ subOption.label }
									</option>
								) ) }
							</optgroup>
						);
					}

					return (
						<option
							key={ option.options[ 0 ].value }
							value={ option.options[ 0 ].value }
						>
							{ option.options[ 0 ].label }
						</option>
					);
				} ) }
			</SelectControl>

			{ ! countryHasStates && (
				<TextControl
					placeholder={ __(
						'State',
						'woo-gutenberg-products-block'
					) }
					value={ selectedState }
					onChange={ setLocationAddressField( 'state' ) }
				/>
			) }
			<TextControl
				label={ __( 'Pickup details', 'woo-gutenberg-products-block' ) }
				name={ 'pickup_details' }
				value={ values.details }
				onChange={ setLocationField( 'details' ) }
				autoComplete="off"
			/>
		</form>
	);
};

export default Form;
