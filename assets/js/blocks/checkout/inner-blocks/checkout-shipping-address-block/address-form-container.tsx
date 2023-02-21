/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import Button from '@woocommerce/base-components/button';
import { Fragment, useState } from '@wordpress/element';
import { AddressForm } from '@woocommerce/base-components/cart-checkout';
import {
	useCheckoutAddress,
	useStoreEvents,
	useEditorContext,
} from '@woocommerce/base-context';
import { StoreNoticesContainer } from '@woocommerce/blocks-checkout';
import Noninteractive from '@woocommerce/base-components/noninteractive';
import type {
	ShippingAddress,
	AddressField,
	AddressFields,
} from '@woocommerce/settings';
import { useDispatch, useSelect, dispatch } from '@wordpress/data';
import {
	CART_STORE_KEY,
	VALIDATION_STORE_KEY,
	processErrorResponse,
} from '@woocommerce/block-data';
import { removeNoticesWithContext } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import PhoneNumber from '../../phone-number';
import AddressCard from './components/address-card';
import AddressModal from './components/address-modal';

const AddressFormContainer = ( {
	addressFieldsConfig,
	showPhoneField,
	requirePhoneField,
}: {
	addressFieldsConfig: Record< keyof AddressFields, Partial< AddressField > >;
	showPhoneField: boolean;
	requirePhoneField: boolean;
} ) => {
	const { defaultAddressFields, shippingAddress } = useCheckoutAddress();
	const { dispatchCheckoutEvent } = useStoreEvents();
	const { isEditor } = useEditorContext();
	const { showAllValidationErrors } = useDispatch( VALIDATION_STORE_KEY );
	const { hasValidationErrors, isCustomerDataUpdating } = useSelect(
		( select ) => {
			return {
				hasValidationErrors:
					select( VALIDATION_STORE_KEY ).hasValidationErrors,
				isCustomerDataUpdating:
					select( CART_STORE_KEY ).isCustomerDataUpdating(),
			};
		}
	);
	const [ editing, setEditing ] = useState( false );
	const [ modalShippingAddress, setModalShippingAddress ] =
		useState< ShippingAddress >( shippingAddress );
	const WrapperComponent = isEditor ? Noninteractive : Fragment;
	const noticeContext = 'wc/checkout/shipping-address-form';
	const hasAddress =
		shippingAddress.address_1 &&
		( shippingAddress.first_name || shippingAddress.last_name );

	const onSaveAddress = () => {
		showAllValidationErrors();

		if ( ! hasValidationErrors() ) {
			dispatch( CART_STORE_KEY )
				.updateCustomerData(
					{
						shipping_address: {
							...modalShippingAddress,
							phone: showPhoneField
								? modalShippingAddress.phone
								: '',
						},
					},
					false
				)
				.then( () => {
					removeNoticesWithContext( noticeContext );
					setEditing( false );
					dispatchCheckoutEvent( 'set-shipping-address' );
				} )
				.catch( ( response ) => {
					processErrorResponse( response, noticeContext );
				} );
		}
	};

	return (
		<WrapperComponent>
			{ hasAddress ? (
				<AddressCard
					address={ shippingAddress }
					onEdit={ () => {
						setEditing( true );
					} }
				/>
			) : (
				<Button
					className="wc-block-components-checkout-add-address-button"
					onClick={ () => {
						setEditing( true );
					} }
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
						<Button
							onClick={ onSaveAddress }
							showSpinner={ isCustomerDataUpdating }
						>
							{ __(
								'Save address',
								'woo-gutenberg-products-block'
							) }
						</Button>
					}
				>
					<StoreNoticesContainer context={ noticeContext } />
					<AddressForm
						id="shipping"
						type="shipping"
						onChange={ ( values: Partial< ShippingAddress > ) => {
							setModalShippingAddress( {
								...modalShippingAddress,
								...values,
							} );
						} }
						values={ modalShippingAddress }
						fields={
							Object.keys(
								defaultAddressFields
							) as ( keyof AddressFields )[]
						}
						fieldConfig={ addressFieldsConfig }
					/>
					{ showPhoneField && (
						<PhoneNumber
							id="shipping-phone"
							errorId={ 'shipping_phone' }
							isRequired={ requirePhoneField }
							value={ modalShippingAddress.phone }
							onChange={ ( value ) => {
								setModalShippingAddress( {
									...modalShippingAddress,
									phone: value,
								} );
							} }
						/>
					) }
				</AddressModal>
			) }
		</WrapperComponent>
	);
};

export default AddressFormContainer;
