/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { Button } from '@woocommerce/base-components/cart-checkout';
import { useState } from '@wordpress/element';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { useValidationContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import './style.scss';
import AddressForm from '../address-form';

const ShippingCalculatorAddress = ( {
	address: initialAddress,
	onUpdate,
	addressFields,
} ) => {
	const [ address, setAddress ] = useState( initialAddress );
	const {
		areThereValidationErrors,
		showAllValidationErrors,
	} = useValidationContext();

	const validateSubmit = () => {
		showAllValidationErrors();
		if ( areThereValidationErrors() ) {
			return false;
		}
		return true;
	};

	// Make all fields optional except 'country'.
	const fieldConfig = {};
	addressFields.forEach( ( field ) => {
		if ( field === 'country' ) {
			fieldConfig[ field ] = {
				...fieldConfig[ field ],
				errorMessage: __(
					'Please select a country to calculate rates.',
					'woo-gutenberg-products-block'
				),
				required: true,
			};
		} else {
			fieldConfig[ field ] = {
				...fieldConfig[ field ],
				required: false,
			};
		}
	} );

	return (
		<form className="wc-block-shipping-calculator-address">
			<AddressForm
				fields={ addressFields }
				fieldConfig={ fieldConfig }
				onChange={ setAddress }
				values={ address }
			/>
			<Button
				className="wc-block-shipping-calculator-address__button"
				disabled={ isShallowEqual( address, initialAddress ) }
				onClick={ ( e ) => {
					e.preventDefault();
					const isAddressValid = validateSubmit();
					if ( isAddressValid ) {
						return onUpdate( address );
					}
				} }
				type="submit"
			>
				{ __( 'Update', 'woo-gutenberg-products-block' ) }
			</Button>
		</form>
	);
};

ShippingCalculatorAddress.propTypes = {
	address: PropTypes.object.isRequired,
	onUpdate: PropTypes.func.isRequired,
	addressFields: PropTypes.array.isRequired,
};

export default ShippingCalculatorAddress;
