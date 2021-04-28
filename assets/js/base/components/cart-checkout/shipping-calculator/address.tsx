/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import Button from '@woocommerce/base-components/button';
import { useState } from '@wordpress/element';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { useValidationContext } from '@woocommerce/base-context';
import type { Address, AddressFields } from '@woocommerce/type-defs/customer';

/**
 * Internal dependencies
 */
import './style.scss';
import { AddressForm } from '../address-form';

interface ShippingCalculatorAddressProps {
	address: Address;
	onUpdate: ( address: Address ) => void;
	addressFields: Partial< keyof AddressFields >[];
}
const ShippingCalculatorAddress = ( {
	address: initialAddress,
	onUpdate,
	addressFields,
}: ShippingCalculatorAddressProps ): JSX.Element => {
	const [ address, setAddress ] = useState( initialAddress );
	const {
		hasValidationErrors,
		showAllValidationErrors,
	} = useValidationContext();

	const validateSubmit = () => {
		showAllValidationErrors();
		return ! hasValidationErrors;
	};

	return (
		<form className="wc-block-components-shipping-calculator-address">
			<AddressForm
				fields={ addressFields }
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

export default ShippingCalculatorAddress;
