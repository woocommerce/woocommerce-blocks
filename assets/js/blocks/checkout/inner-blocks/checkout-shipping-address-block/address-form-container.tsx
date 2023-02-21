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
import Noninteractive from '@woocommerce/base-components/noninteractive';
import type {
	ShippingAddress,
	AddressField,
	AddressFields,
} from '@woocommerce/settings';
import { useDispatch, useSelect } from '@wordpress/data';
import { CART_STORE_KEY, VALIDATION_STORE_KEY } from '@woocommerce/block-data';

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

	const onSaveAddress = () => {
		showAllValidationErrors();

		if ( ! hasValidationErrors() ) {
			setShippingAddress( {
				...modalShippingAddress,
				phone: showPhoneField ? modalShippingAddress.phone : '',
			} );
			if ( useShippingAsBilling ) {
				setBillingAddress( {
					...modalShippingAddress,
					phone: showPhoneField ? modalShippingAddress.phone : '',
				} );
			}
			dispatchCheckoutEvent( 'set-shipping-address' );
			setEditing( false );
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
