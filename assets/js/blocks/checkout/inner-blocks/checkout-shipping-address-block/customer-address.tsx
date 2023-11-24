/**
 * External dependencies
 */
import { useState, useCallback, useEffect } from '@wordpress/element';
import type {
	ShippingAddress,
	AddressField,
	AddressFields,
} from '@woocommerce/settings';
import { useSelect } from '@wordpress/data';
import { VALIDATION_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { useCheckoutAddress, useStoreEvents } from '~/base/context';
import { AddressForm } from '~/base/components/cart-checkout';
import AddressWrapper from '../../address-wrapper';
import AddressCard from '../../address-card';

const CustomerAddress = ( {
	addressFieldsConfig,
	defaultEditing = false,
}: {
	addressFieldsConfig: Record< keyof AddressFields, Partial< AddressField > >;
	defaultEditing?: boolean;
} ) => {
	const {
		defaultAddressFields,
		shippingAddress,
		setShippingAddress,
		setBillingAddress,
		useShippingAsBilling,
	} = useCheckoutAddress();
	const { dispatchCheckoutEvent } = useStoreEvents();
	const [ editing, setEditing ] = useState( defaultEditing );

	// Forces editing state if store has errors.
	const { hasValidationErrors, invalidProps } = useSelect( ( select ) => {
		const store = select( VALIDATION_STORE_KEY );
		return {
			hasValidationErrors: store.hasValidationErrors(),
			invalidProps: Object.keys( shippingAddress )
				.filter( ( key ) => {
					return (
						store.getValidationError( 'shipping_' + key ) !==
						undefined
					);
				} )
				.filter( Boolean ),
		};
	} );

	useEffect( () => {
		if ( invalidProps.length > 0 && editing === false ) {
			setEditing( true );
		}
	}, [ editing, hasValidationErrors, invalidProps.length ] );

	const addressFieldKeys = Object.keys(
		defaultAddressFields
	) as ( keyof AddressFields )[];
	const onChangeAddress = useCallback(
		( values: Partial< ShippingAddress > ) => {
			setShippingAddress( values );
			if ( useShippingAsBilling ) {
				setBillingAddress( values );
				dispatchCheckoutEvent( 'set-billing-address' );
			}
			dispatchCheckoutEvent( 'set-shipping-address' );
		},
		[
			dispatchCheckoutEvent,
			setBillingAddress,
			setShippingAddress,
			useShippingAsBilling,
		]
	);

	const renderAddressCardComponent = useCallback(
		() => (
			<AddressCard
				address={ shippingAddress }
				target="shipping"
				onEdit={ () => {
					setEditing( true );
				} }
				fieldConfig={ addressFieldsConfig }
			/>
		),
		[ shippingAddress, addressFieldsConfig ]
	);

	const renderAddressFormComponent = useCallback(
		() => (
			<AddressForm
				id="shipping"
				type="shipping"
				onChange={ onChangeAddress }
				values={ shippingAddress }
				fields={ addressFieldKeys }
				fieldConfig={ addressFieldsConfig }
			/>
		),
		[
			addressFieldKeys,
			addressFieldsConfig,
			onChangeAddress,
			shippingAddress,
		]
	);

	return (
		<AddressWrapper
			isEditing={ editing }
			addressCard={ renderAddressCardComponent }
			addressForm={ renderAddressFormComponent }
		/>
	);
};

export default CustomerAddress;
