/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import Button from '@woocommerce/base-components/button';
import { useState } from '@wordpress/element';
import { AddressForm } from '@woocommerce/base-components/cart-checkout';
import { useCheckoutAddress, useStoreEvents } from '@woocommerce/base-context';
import type {
	BillingAddress,
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
		billingAddress,
		setShippingAddress,
		setBillingAddress,
		useBillingAsShipping,
	} = useCheckoutAddress();
	const { dispatchCheckoutEvent } = useStoreEvents();

	const [ editing, setEditing ] = useState( false );
	const [ addressState, setAddressState ] =
		useState< BillingAddress >( billingAddress );

	const addressFieldKeys = Object.keys(
		defaultAddressFields
	) as ( keyof AddressFields )[];

	const onSaveAddress = () => {
		const invalidProps = getInvalidAddressKeys(
			[ ...addressFieldKeys, 'phone' ],
			'billing'
		);

		if ( invalidProps.length ) {
			showValidationErrorsForAddressKeys( invalidProps, 'billing' );
			return;
		}

		const addressData = {
			...addressState,
			phone: showPhoneField ? addressState.phone : '',
		};

		setBillingAddress( addressData );
		if ( useBillingAsShipping ) {
			setShippingAddress( addressData );
		}
		dispatchCheckoutEvent( 'set-billing-address' );
		setEditing( false );
	};

	return (
		<>
			{ hasAddress ? (
				<AddressCard
					address={ billingAddress }
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
					title={ __( 'Billing', 'woo-gutenberg-products-block' ) }
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
						id="billing"
						type="billing"
						onChange={ ( values: Partial< BillingAddress > ) => {
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
							id="billing-phone"
							errorId={ 'billing_phone' }
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
