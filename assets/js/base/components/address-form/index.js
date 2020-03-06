/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import TextInput from '@woocommerce/base-components/text-input';
import {
	BillingCountryInput,
	ShippingCountryInput,
} from '@woocommerce/base-components/country-input';
import {
	BillingStateInput,
	ShippingStateInput,
} from '@woocommerce/base-components/state-input';
import { COUNTRY_LOCALE } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import defaultAddressFields from './default-address-fields';

/**
 * Checkout address form.
 */
const AddressForm = ( {
	fields = Object.keys( defaultAddressFields ),
	fieldConfig = defaultAddressFields,
	onChange,
	type = 'shipping',
	values,
} ) => {
	const countryLocale = COUNTRY_LOCALE[ values.country ] || {};
	const addressFields = fields.map( ( field ) => ( {
		key: field,
		...defaultAddressFields[ field ],
		...countryLocale[ field ],
		...fieldConfig[ field ],
	} ) );
	const sortedAddressFields = addressFields.sort(
		( a, b ) => a.index - b.index
	);

	const optionalText = __( '(optional)', 'woo-gutenberg-products-block' );

	return (
		<div className="wc-block-address-form">
			{ sortedAddressFields.map( ( addressField ) => {
				if ( addressField.hidden ) {
					return null;
				}

				const requiredField = addressField.required;
				let fieldLabel = addressField.label || addressField.placeholder;

				if (
					! addressField.required &&
					! fieldLabel.includes( optionalText )
				) {
					fieldLabel = fieldLabel + ' ' + optionalText;
				}

				if ( addressField.key === 'country' ) {
					const Tag =
						type === 'shipping'
							? ShippingCountryInput
							: BillingCountryInput;
					return (
						<Tag
							key={ addressField.key }
							label={ fieldLabel }
							value={ values.country }
							autoComplete={ addressField.autocomplete }
							onChange={ ( newValue ) =>
								onChange( {
									...values,
									country: newValue,
									state: '',
								} )
							}
							required={ requiredField }
						/>
					);
				}

				if ( addressField.key === 'state' ) {
					const Tag =
						type === 'shipping'
							? ShippingStateInput
							: BillingStateInput;
					return (
						<Tag
							key={ addressField.key }
							country={ values.country }
							label={ fieldLabel }
							value={ values.state }
							autoComplete={ addressField.autocomplete }
							onChange={ ( newValue ) =>
								onChange( {
									...values,
									state: newValue,
								} )
							}
							required={ requiredField }
						/>
					);
				}

				return (
					<TextInput
						key={ addressField.key }
						className={ `wc-block-address-form__${ addressField.key }` }
						label={ fieldLabel }
						value={ values[ addressField.key ] }
						autoComplete={ addressField.autocomplete }
						onChange={ ( newValue ) =>
							onChange( {
								...values,
								[ addressField.key ]: newValue,
							} )
						}
						required={ requiredField }
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

export default AddressForm;
