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
import { select } from '@wordpress/data';
import { VALIDATION_STORE_KEY } from '@woocommerce/block-data';
import isShallowEqual from '@wordpress/is-shallow-equal';

/**
 * Internal dependencies
 */
import { AddressFormProps, FieldType, FieldConfig } from './types';
import prepareAddressFields from './prepare-address-fields';
import validateShippingCountry from './validate-shipping-country';
import customValidationHandler from './custom-validation-handler';

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
	// Holds local state of the field values.
	const [ values, setValues ] = useState( initialValues );
	const previousInitialValues = usePrevious( initialValues );

	// Memoize the address form fields passed in from the parent component.
	const currentFields = useShallowEqual( fields );
	const addressFormFields = useMemo( () => {
		const preparedFields = prepareAddressFields(
			currentFields,
			fieldConfig,
			values.country
		);
		return {
			fields: preparedFields,
			requiredFields: preparedFields.filter(
				( field ) => field.required
			),
			hiddenFields: preparedFields.filter( ( field ) => field.hidden ),
		};
	}, [ currentFields, fieldConfig, values.country ] );

	// Push when all values of required fields are complete.
	useEffect( () => {
		if ( ! isShallowEqual( values, initialValues ) ) {
			// Check required fields have values.
			const isComplete = addressFormFields.requiredFields.every(
				( field ) => {
					return values[ field.key ] !== '';
				}
			);
			if ( ! isComplete ) {
				return;
			}
			// Check if any fields have errors.
			const hasErrors = addressFormFields.fields.some( ( field ) => {
				const errorId = `${ type }_${ field.key }`;
				const validationError =
					select( VALIDATION_STORE_KEY ).getValidationError(
						errorId
					);
				const hasError = validationError?.message;
				return !! hasError;
			} );
			if ( hasErrors ) {
				return;
			}
			onChange( values );
		}
	}, [ values, initialValues, onChange, addressFormFields, type ] );

	// Clear values for hidden fields.
	useEffect( () => {
		const newValues = { ...values };
		addressFormFields.hiddenFields.forEach( ( field ) => {
			newValues[ field.key ] = '';
		} );
		if ( ! isShallowEqual( values, newValues ) ) {
			setValues( newValues );
		}
	}, [ addressFormFields.hiddenFields, onChange, values ] );

	// Sync incoming values with local state.
	useEffect( () => {
		if (
			previousInitialValues &&
			! isShallowEqual( initialValues, previousInitialValues )
		) {
			setValues( initialValues );
		}
	}, [ initialValues, previousInitialValues ] );

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
