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
	const { getValidationError } = useValidationContext();

	const updateAddress = ( newAddress ) => {
		setAddress( newAddress );
	};

	return (
		<form className="wc-block-shipping-calculator-address">
			<AddressForm
				fields={ addressFields }
				onChange={ updateAddress }
				values={ address }
			/>
			<Button
				className="wc-block-shipping-calculator-address__button"
				disabled={
					isShallowEqual( address, initialAddress ) ||
					getValidationError( 'country' )
				}
				onClick={ ( e ) => {
					e.preventDefault();
					return onUpdate( address );
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
