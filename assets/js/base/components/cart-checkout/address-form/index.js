/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';
import {
	BillingCountryInput,
	ShippingCountryInput,
} from '@woocommerce/base-components/country-input';
import {
	BillingStateInput,
	ShippingStateInput,
} from '@woocommerce/base-components/state-input';
import { useValidationContext } from '@woocommerce/base-context';
import { useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { withInstanceId } from '@woocommerce/base-hocs/with-instance-id';
import { useShallowEqual } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import defaultAddressFields from './default-address-fields';
import prepareAddressFields from './prepare-address-fields';

// If it's the shipping address form and the user starts entering address
// values without having set the country first, show an error.
const validateShippingCountry = (
	values,
	setValidationErrors,
	clearValidationError,
	hasValidationError
) => {
	if (
		! hasValidationError &&
		! values.country &&
		( values.city || values.state || values.postcode )
	) {
		setValidationErrors( {
			'shipping-missing-country': {
				message: __(
					'Please select a country to calculate rates.',
					'woo-gutenberg-products-block'
				),
				hidden: false,
			},
		} );
	}
	if ( hasValidationError && values.country ) {
		clearValidationError( 'shipping-missing-country' );
	}
};

/**
 * Checkout address form.
 *
 * @param {Object} props Incoming props for component.
 * @param {string} props.id Id for component.
 * @param {Array}  props.fields Array of fields in form.
 * @param {Object} props.fieldConfig Field configuration for fields in form.
 * @param {string} props.instanceId Unique id for form.
 * @param {function(any):any} props.onChange Function to all for an form onChange event.
 * @param {string} props.type Type of form.
 * @param {Object} props.values Values for fields.
 */
const AddressForm = ( {
	id,
	fields = Object.keys( defaultAddressFields ),
	fieldConfig = {},
	instanceId,
	onChange,
	type = 'shipping',
	values,
} ) => {
	const {
		getValidationError,
		setValidationErrors,
		clearValidationError,
	} = useValidationContext();

	const currentFields = useShallowEqual( fields );

	const countryValidationError =
		getValidationError( 'shipping-missing-country' ) || {};

	const addressFormFields = useMemo( () => {
		return prepareAddressFields(
			currentFields,
			fieldConfig,
			values.country
		);
	}, [ currentFields, fieldConfig, values.country ] );

	useEffect( () => {
		if ( type === 'shipping' ) {
			validateShippingCountry(
				values,
				setValidationErrors,
				clearValidationError,
				countryValidationError.message &&
					! countryValidationError.hidden
			);
		}
	}, [
		values,
		countryValidationError.message,
		countryValidationError.hidden,
		setValidationErrors,
		clearValidationError,
		type,
	] );

	id = id || instanceId;

	return (
		<div id={ id } className="wc-block-components-address-form">
			{ addressFormFields.map( ( field ) => {
				if ( field.hidden ) {
					return null;
				}

				if ( field.key === 'country' ) {
					const Tag =
						type === 'shipping'
							? ShippingCountryInput
							: BillingCountryInput;
					return (
						<Tag
							key={ field.key }
							id={ `${ id }-${ field.key }` }
							label={
								field.required
									? field.label
									: field.optionalLabel
							}
							value={ values.country }
							autoComplete={ field.autocomplete }
							onChange={ ( newValue ) =>
								onChange( {
									...values,
									country: newValue,
									state: '',
									city: '',
									postcode: '',
								} )
							}
							errorId={
								type === 'shipping'
									? 'shipping-missing-country'
									: null
							}
							errorMessage={ field.errorMessage }
							required={ field.required }
						/>
					);
				}

				if ( field.key === 'state' ) {
					const Tag =
						type === 'shipping'
							? ShippingStateInput
							: BillingStateInput;
					return (
						<Tag
							key={ field.key }
							id={ `${ id }-${ field.key }` }
							country={ values.country }
							label={
								field.required
									? field.label
									: field.optionalLabel
							}
							value={ values.state }
							autoComplete={ field.autocomplete }
							onChange={ ( newValue ) =>
								onChange( {
									...values,
									state: newValue,
								} )
							}
							errorMessage={ field.errorMessage }
							required={ field.required }
						/>
					);
				}

				return (
					<ValidatedTextInput
						key={ field.key }
						id={ `${ id }-${ field.key }` }
						className={ `wc-block-components-address-form__${ field.key }` }
						label={
							field.required ? field.label : field.optionalLabel
						}
						value={ values[ field.key ] }
						autoCapitalize={ field.autocapitalize }
						autoComplete={ field.autocomplete }
						onChange={ ( newValue ) =>
							onChange( {
								...values,
								[ field.key ]: newValue,
							} )
						}
						errorMessage={ field.errorMessage }
						required={ field.required }
					/>
				);
			} ) }
		</div>
	);
};

AddressForm.propTypes = {
	onChange: PropTypes.func.isRequired,
	values: PropTypes.object.isRequired,
	fields: PropTypes.arrayOf(
		PropTypes.oneOf( Object.keys( defaultAddressFields ) )
	),
	fieldConfig: PropTypes.object,
	type: PropTypes.oneOf( [ 'billing', 'shipping' ] ),
};

export default withInstanceId( AddressForm );
