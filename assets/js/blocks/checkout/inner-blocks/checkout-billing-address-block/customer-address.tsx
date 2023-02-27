/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { AddressForm } from '@woocommerce/base-components/cart-checkout';
import { useCheckoutAddress, useStoreEvents } from '@woocommerce/base-context';
import { receipt } from '@wordpress/icons';
import type {
	BillingAddress,
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
		billingAddress,
		setShippingAddress,
		setBillingAddress,
		setBillingPhone,
		setShippingPhone,
		useBillingAsShipping,
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
					address={ billingAddress }
					target="billing"
					onEdit={ () => {
						setEditing( true );
					} }
					icon={ receipt }
				/>
			) }
			{ ( editing || ! hasAddress ) && (
				<>
					<AddressForm
						id="billing"
						type="billing"
						onChange={ ( values: Partial< BillingAddress > ) => {
							setBillingAddress( values );
							if ( useBillingAsShipping ) {
								setShippingAddress( values );
							}
							dispatchCheckoutEvent( 'set-shipping-address' );
						} }
						values={ billingAddress }
						fields={ addressFieldKeys }
						fieldConfig={ addressFieldsConfig }
					/>
					{ showPhoneField && (
						<PhoneNumber
							id="billing-phone"
							errorId={ 'billing_phone' }
							isRequired={ requirePhoneField }
							value={ billingAddress.phone }
							onChange={ ( value ) => {
								setBillingPhone( value );
								dispatchCheckoutEvent( 'set-phone-number', {
									step: 'shipping',
								} );
								if ( useBillingAsShipping ) {
									setShippingPhone( value );
									dispatchCheckoutEvent( 'set-phone-number', {
										step: 'shipping',
									} );
								}
							} }
						/>
					) }
				</>
			) }
		</>
	);
};

export default CustomerAddress;
