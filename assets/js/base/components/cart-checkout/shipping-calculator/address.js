/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { AddressForm } from '@woocommerce/base-components/cart-checkout';
import Button from '@woocommerce/base-components/button';
import { useState } from '@wordpress/element';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { useValidationContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import './style.scss';

const ShippingCalculatorAddress = ( {
	address: initialAddress,
	onUpdate,
	addressFields,
} ) => {
	const [ address, setAddress ] = useState( initialAddress );
	const {
		hasValidationErrors,
		showAllValidationErrors,
	} = useValidationContext();

	const validateSubmit = () => {
		showAllValidationErrors();
		return ! hasValidationErrors;
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
		<form className="wc-block-components-shipping-calculator-address">
			<AddressForm
				fields={ addressFields }
				fieldConfig={ fieldConfig }
				onChange={ setAddress }
				values={ address }
			/>
			<Button
				className="wc-block-components-shipping-calculator-address__button"
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
