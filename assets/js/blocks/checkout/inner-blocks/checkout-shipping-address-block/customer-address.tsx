/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { AddressForm } from '@woocommerce/base-components/cart-checkout';
import { useCheckoutAddress, useStoreEvents } from '@woocommerce/base-context';
import { home } from '@wordpress/icons';
import type {
	ShippingAddress,
	AddressField,
	AddressFields,
} from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import PhoneNumber from '../../phone-number';
import AddressCard from '../../address-card';

const CustomerAddress = ( {
	addressFieldsConfig,
	showPhoneField,
	requirePhoneField,
	hasAddress,
}: {
	addressFieldsConfig: Record< keyof AddressFields, Partial< AddressField > >;
	showPhoneField: boolean;
	requirePhoneField: boolean;
	hasAddress: boolean;
} ) => {
	const {
		defaultAddressFields,
		shippingAddress,
		setShippingAddress,
		setBillingAddress,
		setShippingPhone,
		useShippingAsBilling,
	} = useCheckoutAddress();
	const { dispatchCheckoutEvent } = useStoreEvents();

	const [ editing, setEditing ] = useState( ! hasAddress );
	const addressFieldKeys = Object.keys(
		defaultAddressFields
	) as ( keyof AddressFields )[];

	return (
		<>
			{ hasAddress && ! editing && (
				<AddressCard
					address={ shippingAddress }
					target="shipping"
					onEdit={ () => {
						setEditing( true );
					} }
					icon={ home }
				/>
			) }
			{ ( editing || ! hasAddress ) && (
				<>
					<AddressForm
						id="shipping"
						type="shipping"
						onChange={ ( values: Partial< ShippingAddress > ) => {
							setShippingAddress( values );
							if ( useShippingAsBilling ) {
								setBillingAddress( values );
							}
							dispatchCheckoutEvent( 'set-shipping-address' );
						} }
						values={ shippingAddress }
						fields={ addressFieldKeys }
						fieldConfig={ addressFieldsConfig }
					/>
					{ showPhoneField && (
						<PhoneNumber
							id="shipping-phone"
							errorId={ 'shipping_phone' }
							isRequired={ requirePhoneField }
							value={ shippingAddress.phone }
							onChange={ ( value ) => {
								setShippingPhone( value );
								dispatchCheckoutEvent( 'set-phone-number', {
									step: 'shipping',
								} );
							} }
						/>
					) }
				</>
			) }
		</>
	);
};

export default CustomerAddress;
