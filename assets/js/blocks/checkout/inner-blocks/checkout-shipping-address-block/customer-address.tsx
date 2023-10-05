/**
 * External dependencies
 */
import { useState, useCallback } from '@wordpress/element';
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

	const onChangeAddress = useCallback(
		( values: Partial< ShippingAddress > ) => {
			setShippingAddress( values );
			if ( useShippingAsBilling ) {
				// Sync billing with shipping. Ensure unwanted properties are omitted.
				const { ...syncBilling } = values;

				if ( ! showPhoneField ) {
					delete syncBilling.phone;
				}

				setBillingAddress( syncBilling );
				dispatchCheckoutEvent( 'set-billing-address' );
			}
			dispatchCheckoutEvent( 'set-shipping-address' );
		},
		[
			dispatchCheckoutEvent,
			setBillingAddress,
			setShippingAddress,
			useShippingAsBilling,
			showPhoneField,
		]
	);

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
						onChange={ onChangeAddress }
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
