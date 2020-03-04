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
import {
	COUNTRY_LOCALE,
	DEFAULT_ADDRESS_FIELDS,
} from '@woocommerce/block-settings';

const defaultFieldConfig = {
	first_name: {
		autocomplete: 'given-name',
	},
	last_name: {
		autocomplete: 'family-name',
	},
	company: {
		autocomplete: 'organization',
	},
	address_1: {
		autocomplete: 'address-line1',
	},
	address_2: {
		autocomplete: 'address-line2',
	},
	country: {
		autocomplete: 'country',
		priority: 65,
	},
	city: {
		autocomplete: 'address-level2',
	},
	postcode: {
		autocomplete: 'postal-code',
	},
	state: {
		autocomplete: 'address-level1',
	},
};

const AddressForm = ( {
	fields = Object.keys( defaultFieldConfig ),
	fieldConfig = defaultFieldConfig,
	onChange,
	type = 'shipping',
	values,
} ) => {
	const countryLocale = COUNTRY_LOCALE[ values.country ] || {};
	const addressFields = fields.map( ( field ) => ( {
		key: field,
		...DEFAULT_ADDRESS_FIELDS[ field ],
		...countryLocale[ field ],
		...fieldConfig[ field ],
	} ) );
	const sortedAddressFields = addressFields.sort(
		( a, b ) => a.priority - b.priority
	);

	return (
		<div className="wc-block-address-form">
			{ sortedAddressFields.map( ( addressField ) => {
				if ( addressField.hidden ) {
					return null;
				}
				if ( addressField.key === 'country' ) {
					const Tag =
						type === 'shipping'
							? ShippingCountryInput
							: BillingCountryInput;
					return (
						<Tag
							key={ addressField.key }
							label={ __(
								'Country / Region',
								'woo-gutenberg-products-block'
							) }
							value={ values.country }
							autoComplete={ addressField.autocomplete }
							onChange={ ( newValue ) =>
								onChange( {
									...values,
									country: newValue,
									state: '',
								} )
							}
							required={ true }
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
							label={ addressField.label }
							value={ values.state }
							autoComplete={ addressField.autocomplete }
							onChange={ ( newValue ) =>
								onChange( {
									...values,
									state: newValue,
								} )
							}
							required={
								! values.country || addressField.required
							}
						/>
					);
				}

				const optional = __(
					'(optional)',
					'woo-gutenberg-products-block'
				);
				let fieldLabel = addressField.label || addressField.placeholder;

				if (
					! addressField.required &&
					! fieldLabel.includes( optional )
				) {
					fieldLabel = fieldLabel + ' ' + optional;
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
						required={ addressField.required }
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
		PropTypes.oneOf( Object.keys( defaultFieldConfig ) )
	),
	fieldConfig: PropTypes.object,
	type: PropTypes.oneOf( [ 'billing', 'shipping' ] ),
};

export default AddressForm;
