/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	SelectControl,
	TextareaControl,
	TextControl,
} from '@wordpress/components';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import type { PickupLocation } from './types';

const CountryStateControl = ( {
	states,
	currentCountry,
	...props
}: {
	states: Record< string, Record< string, string > >;
	currentCountry: string;
} ): JSX.Element | null => {
	const filteredStates = states[ currentCountry ] || [];

	if ( filteredStates.length === 0 ) {
		return (
			<TextControl
				{ ...props }
				disabled={ ! currentCountry || props.disabled }
			/>
		);
	}
	return (
		<SelectControl
			{ ...props }
			options={ [
				{
					value: '',
					disabled: true,
					label: __( 'State', 'woo-gutenberg-products-block' ),
				},
				...Object.entries( filteredStates ).map(
					( [ code, state ] ) => ( {
						value: code,
						label: state,
					} )
				),
			] }
		/>
	);
};

const Form = ( {
	formRef,
	values,
	isSaving,
	setValues,
}: {
	formRef: React.RefObject< HTMLFormElement >;
	values: PickupLocation;
	setValues: ( values: PickupLocation ) => void;
	isSaving: boolean;
} ) => {
	const setLocationField =
		( field: keyof PickupLocation ) => ( newValue: string | boolean ) => {
			setValues( ( prevValue ) => ( {
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

	const countries = getSetting< Record< string, string > >( 'countries', [] );
	const states = getSetting< Record< string, Record< string, string > >[] >(
		'states',
		[]
	);

	return (
		<form ref={ formRef }>
			<TextControl
				label={ __( 'Location Name', 'woo-gutenberg-products-block' ) }
				value={ values.name }
				onChange={ setLocationField( 'name' ) }
				disabled={ isSaving }
				autoComplete="off"
			/>
			<TextControl
				label={ __( 'Pickup Address', 'woo-gutenberg-products-block' ) }
				placeholder={ __( 'Address', 'woo-gutenberg-products-block' ) }
				value={ values.address.address_1 }
				onChange={ setLocationAddressField( 'address_1' ) }
				disabled={ isSaving }
				autoComplete="off"
			/>
			<TextControl
				label={ __( 'City', 'woo-gutenberg-products-block' ) }
				hideLabelFromVision={ true }
				placeholder={ __( 'City', 'woo-gutenberg-products-block' ) }
				value={ values.address.city }
				onChange={ setLocationAddressField( 'city' ) }
				disabled={ isSaving }
				autoComplete="off"
			/>
			<TextControl
				label={ __( 'Postcode / ZIP', 'woo-gutenberg-products-block' ) }
				hideLabelFromVision={ true }
				placeholder={ __(
					'Postcode / ZIP',
					'woo-gutenberg-products-block'
				) }
				value={ values.address.postcode }
				onChange={ setLocationAddressField( 'postcode' ) }
				disabled={ isSaving }
				autoComplete="off"
			/>
			<CountryStateControl
				label={ __( 'State', 'woo-gutenberg-products-block' ) }
				hideLabelFromVision={ true }
				placeholder={ __( 'State', 'woo-gutenberg-products-block' ) }
				value={ values.address.state }
				onChange={ setLocationAddressField( 'state' ) }
				disabled={ isSaving }
				autoComplete="off"
				states={ states }
				currentCountry={ values.address.country }
			/>
			<SelectControl
				label={ __( 'Country', 'woo-gutenberg-products-block' ) }
				hideLabelFromVision={ true }
				placeholder={ __( 'Country', 'woo-gutenberg-products-block' ) }
				value={ values.address.country }
				onChange={ ( val: string ) => {
					setLocationAddressField( 'state' )( '' );
					setLocationAddressField( 'country' )( val );
				} }
				disabled={ isSaving }
				autoComplete="off"
				options={ [
					{
						value: '',
						disabled: true,
						label: __( 'Country', 'woo-gutenberg-products-block' ),
					},
					...Object.entries( countries ).map(
						( [ code, country ] ) => ( {
							value: code,
							label: country,
						} )
					),
				] }
			/>
			<TextareaControl
				label={ __( 'Pickup Details', 'woo-gutenberg-products-block' ) }
				value={ values.details }
				onChange={ setLocationField( 'details' ) }
				disabled={ isSaving }
				autoComplete="off"
			/>
		</form>
	);
};

export default Form;
