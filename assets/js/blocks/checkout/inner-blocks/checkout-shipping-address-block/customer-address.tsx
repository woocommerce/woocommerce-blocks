/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { ValidationInputError } from '@woocommerce/blocks-checkout';
import Button from '@woocommerce/base-components/button';
import { AddressForm } from '@woocommerce/base-components/cart-checkout';
import { useCheckoutAddress, useStoreEvents } from '@woocommerce/base-context';
import { removeNoticesWithContext } from '@woocommerce/base-utils';
import { home } from '@wordpress/icons';
import type {
	ShippingAddress,
	AddressField,
	AddressFields,
} from '@woocommerce/settings';
import { dispatch, useDispatch } from '@wordpress/data';
import {
	getInvalidAddressKeys,
	showValidationErrorsForAddressKeys,
	CART_STORE_KEY,
	VALIDATION_STORE_KEY,
	processErrorResponse,
} from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import PhoneNumber from '../../phone-number';
import AddressCard from '../../address-card';

const CustomerAddress = ( {
	addressFieldsConfig,
	showPhoneField,
	requirePhoneField,
	noticeContext,
}: {
	addressFieldsConfig: Record< keyof AddressFields, Partial< AddressField > >;
	showPhoneField: boolean;
	requirePhoneField: boolean;
	noticeContext: string;
} ) => {
	const {
		defaultAddressFields,
		shippingAddress,
		useShippingAsBilling,
		isEditingShippingAddress,
		setEditingShippingAddress,
	} = useCheckoutAddress();
	const { dispatchCheckoutEvent } = useStoreEvents();
	const { setValidationErrors, clearValidationError } =
		useDispatch( VALIDATION_STORE_KEY );

	const [ addressState, setAddressState ] =
		useState< ShippingAddress >( shippingAddress );
	const [ isSaving, setIsSaving ] = useState( false );

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

		const newAddress = {
			...addressState,
			phone: showPhoneField ? addressState.phone : '',
		};

		setIsSaving( true );

		// Updates the address and waits for the result.
		dispatch( CART_STORE_KEY )
			.updateCustomerData(
				{
					shipping_address: newAddress,
					...( useShippingAsBilling
						? {
								billing_address: newAddress,
						  }
						: {} ),
				},
				false
			)
			.then( () => {
				removeNoticesWithContext( noticeContext );
				dispatchCheckoutEvent( 'set-shipping-address' );
				setEditingShippingAddress( false );
			} )
			.catch( ( response ) => {
				processErrorResponse( response, noticeContext );
			} )
			.finally( () => {
				setIsSaving( false );
			} );
	};

	const hasAddress = !! (
		addressState.address_1 &&
		( addressState.first_name || addressState.last_name )
	);

	const errorId = 'shipping_address';

	useEffect( () => {
		if ( ! isEditingShippingAddress ) {
			clearValidationError( errorId );
		} else {
			setValidationErrors( {
				[ errorId ]: {
					message: __(
						'Please complete the shipping address form before continuing.',
						'woo-gutenberg-products-block'
					),
					hidden: true,
				},
			} );
		}
	}, [
		isEditingShippingAddress,
		clearValidationError,
		setValidationErrors,
	] );

	useEffect(
		() => () => void clearValidationError( errorId ),
		[ clearValidationError ]
	);

	return (
		<>
			{ isEditingShippingAddress || ! hasAddress ? (
				<>
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
					<Button onClick={ onSaveAddress } showSpinner={ isSaving }>
						{ __( 'Save address', 'woo-gutenberg-products-block' ) }
					</Button>
					<ValidationInputError propertyName={ errorId } />
				</>
			) : (
				<AddressCard
					address={ shippingAddress }
					target="shipping"
					onEdit={ () => {
						setEditingShippingAddress( true );
					} }
					icon={ home }
				/>
			) }
		</>
	);
};

export default CustomerAddress;
