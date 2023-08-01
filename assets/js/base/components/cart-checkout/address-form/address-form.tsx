/**
 * External dependencies
 */
import { ValidatedTextInput } from '@woocommerce/blocks-checkout';
import {
	BillingCountryInput,
	ShippingCountryInput,
} from '@woocommerce/base-components/country-input';
import {
	BillingStateInput,
	ShippingStateInput,
} from '@woocommerce/base-components/state-input';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { withInstanceId } from '@wordpress/compose';
import { useShallowEqual, usePrevious } from '@woocommerce/base-hooks';
import { defaultAddressFields } from '@woocommerce/settings';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { pick } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import {
	AddressFormProps,
	FieldType,
	FieldConfig,
	AddressFormFields,
} from './types';
import prepareAddressFields from './prepare-address-fields';
import {
	validateShippingCountry,
	customValidationHandler,
	hasValidationErrors,
	validateRequiredFields,
} from './validation';

const defaultFields = Object.keys(
	defaultAddressFields
) as unknown as FieldType[];

/**
 * Checkout address form. Holds local state while fields are not yet complete.
 */
const AddressForm = ( {
	id = '',
	fields = defaultFields,
	fieldConfig = {} as FieldConfig,
	instanceId,
	onChange,
	type = 'shipping',
	values: initialValues,
}: AddressFormProps ): JSX.Element => {
	const currentFields = useShallowEqual( fields );
	const previousInitialValues = usePrevious( initialValues );

	// Holds local state of the field values. Filters values to include only those in the fields prop.
	const [ values, setValues ] = useState( () =>
		pick( initialValues, currentFields )
	);

	// Memoize the address form fields passed in from the parent component.
	const addressFormFields = useMemo( (): AddressFormFields => {
		const preparedFields = prepareAddressFields(
			currentFields,
			fieldConfig,
			values.country
		);
		return {
			fields: preparedFields,
			type,
			required: preparedFields.filter( ( field ) => field.required ),
			hidden: preparedFields.filter( ( field ) => field.hidden ),
		};
	}, [ currentFields, fieldConfig, values.country, type ] );

	// Sync incoming changed values with local state.
	useEffect( () => {
		if (
			previousInitialValues &&
			! isShallowEqual( previousInitialValues, initialValues )
		) {
			setValues( initialValues );
		}
	}, [ initialValues, previousInitialValues ] );

	// Push to parent when all values of required fields are complete.
	useEffect( () => {
		if (
			validateRequiredFields( values, addressFormFields ) &&
			! hasValidationErrors( addressFormFields )
		) {
			onChange( values );
		}
	}, [ values, onChange, addressFormFields ] );

	// Clear values for hidden fields.
	useEffect( () => {
		const newValues = {
			...values,
			...Object.fromEntries(
				addressFormFields.hidden.map( ( field ) => [ field.key, '' ] )
			),
		};
		if ( ! isShallowEqual( values, newValues ) ) {
			setValues( newValues );
		}
	}, [ addressFormFields, values ] );

	// Maybe validate country when other fields change so user is notified that it's required.
	useEffect( () => {
		if ( type === 'shipping' ) {
			validateShippingCountry( values );
		}
	}, [ values, type ] );

	id = id || instanceId;

	return (
		<div id={ id } className="wc-block-components-address-form">
			{ addressFormFields.fields.map( ( field ) => {
				if ( field.hidden ) {
					return null;
				}

				const fieldProps = {
					id: `${ id }-${ field.key }`,
					errorId: `${ type }_${ field.key }`,
					label: field.required ? field.label : field.optionalLabel,
					autoCapitalize: field.autocapitalize,
					autoComplete: field.autocomplete,
					errorMessage: field.errorMessage,
					required: field.required,
					className: `wc-block-components-address-form__${ field.key }`,
				};

				if ( field.key === 'country' ) {
					const Tag =
						type === 'shipping'
							? ShippingCountryInput
							: BillingCountryInput;
					return (
						<Tag
							key={ field.key }
							{ ...fieldProps }
							value={ values.country }
							onChange={ ( newValue ) =>
								setValues( {
									...values,
									country: newValue,
									state: '',
									postcode: '',
								} )
							}
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
							{ ...fieldProps }
							country={ values.country }
							value={ values.state }
							onChange={ ( newValue ) =>
								setValues( {
									...values,
									state: newValue,
								} )
							}
						/>
					);
				}

				return (
					<ValidatedTextInput
						key={ field.key }
						{ ...fieldProps }
						value={ values[ field.key ] }
						onChange={ ( newValue: string ) =>
							setValues( {
								...values,
								[ field.key ]: newValue,
							} )
						}
						customFormatter={ ( value: string ) => {
							if ( field.key === 'postcode' ) {
								return value.trimStart().toUpperCase();
							}
							return value;
						} }
						customValidation={ ( inputObject: HTMLInputElement ) =>
							customValidationHandler(
								inputObject,
								field.key,
								values
							)
						}
					/>
				);
			} ) }
		</div>
	);
};

export default withInstanceId( AddressForm );
