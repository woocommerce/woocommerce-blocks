/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import Button from '@woocommerce/base-components/button';
import { useState } from '@wordpress/element';
import { AddressForm } from '@woocommerce/base-components/cart-checkout';
import { useCheckoutAddress, useStoreEvents } from '@woocommerce/base-context';
import type {
	ShippingAddress,
	AddressField,
	AddressFields,
} from '@woocommerce/settings';
import {
	getInvalidAddressKeys,
	showValidationErrorsForAddressKeys,
} from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import PhoneNumber from '../../phone-number';
import AddressCard from '../../address-card';
import AddressModal from '../../address-modal';

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
		useShippingAsBilling,
	} = useCheckoutAddress();
	const { dispatchCheckoutEvent } = useStoreEvents();

	const [ editing, setEditing ] = useState( false );
	const [ addressState, setAddressState ] =
		useState< ShippingAddress >( shippingAddress );

	const addressFieldKeys = Object.keys(
		defaultAddressFields
	) as ( keyof AddressFields )[];

	const onSaveAddress = () => {
		const invalidProps = getInvalidAddressKeys(
			[ ...addressFieldKeys, 'phone' ],
			'shipping'
		);

		if ( invalidProps.length ) {
			showValidationErrorsForAddressKeys( invalidProps, 'shipping' );
			return;
		}

		const addressData = {
			...addressState,
			phone: showPhoneField ? addressState.phone : '',
		};

		setShippingAddress( addressData );
		if ( useShippingAsBilling ) {
			setBillingAddress( addressData );
		}
		dispatchCheckoutEvent( 'set-shipping-address' );
		setEditing( false );
	};

	return (
		<>
			{ hasAddress ? (
				<AddressCard
					address={ shippingAddress }
					onEdit={ () => {
						setEditing( true );
					} }
				/>
			) : (
				<Button
					onClick={ () => {
						setEditing( true );
					} }
					style={ { width: '100%', marginBottom: '1.5em' } }
				>
					{ __( 'Add address', 'woo-gutenberg-products-block' ) }
				</Button>
			) }
			{ editing && (
				<AddressModal
					title={ __( 'Ship to', 'woo-gutenberg-products-block' ) }
					onRequestClose={ () => {
						setEditing( false );
					} }
					actions={
						<Button onClick={ onSaveAddress }>
							{ __(
								'Save address',
								'woo-gutenberg-products-block'
							) }
						</Button>
					}
				>
					<AddressForm
						id="shipping"
						type="shipping"
						onChange={ ( values: Partial< ShippingAddress > ) => {
							setAddressState( {
								...addressState,
								...values,
							} );
						} }
						values={ addressState }
						fields={ addressFieldKeys }
						fieldConfig={ addressFieldsConfig }
					/>
					{ showPhoneField && (
						<PhoneNumber
							id="shipping-phone"
							errorId={ 'shipping_phone' }
							isRequired={ requirePhoneField }
							value={ addressState.phone }
							onChange={ ( value ) => {
								setAddressState( {
									...addressState,
									phone: value,
								} );
							} }
						/>
					) }
				</AddressModal>
			) }
		</>
	);
};

export default CustomerAddress;
