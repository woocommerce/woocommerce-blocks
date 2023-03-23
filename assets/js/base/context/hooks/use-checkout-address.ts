/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	defaultAddressFields,
	AddressFields,
	ShippingAddress,
	BillingAddress,
	getSetting,
} from '@woocommerce/settings';
import { useCallback, useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { useCustomerData } from './use-customer-data';
import { useShippingData } from './shipping/use-shipping-data';
import { useCheckoutEventsContext } from '../providers/cart-checkout/checkout-events';

interface CheckoutAddress {
	shippingAddress: ShippingAddress;
	billingAddress: BillingAddress;
	setShippingAddress: ( data: Partial< ShippingAddress > ) => void;
	setBillingAddress: ( data: Partial< BillingAddress > ) => void;
	setEmail: ( value: string ) => void;
	setBillingPhone: ( value: string ) => void;
	setShippingPhone: ( value: string ) => void;
	useShippingAsBilling: boolean;
	setUseShippingAsBilling: ( useShippingAsBilling: boolean ) => void;
	defaultAddressFields: AddressFields;
	showShippingFields: boolean;
	showBillingFields: boolean;
	forcedBillingAddress: boolean;
	useBillingAsShipping: boolean;
	needsShipping: boolean;
	showShippingMethods: boolean;
	isEditingShippingAddress: boolean;
	setEditingShippingAddress: ( isEditing: boolean ) => void;
	isEditingBillingAddress: boolean;
	setEditingBillingAddress: ( isEditing: boolean ) => void;
}

/**
 * Custom hook for exposing address related functionality for the checkout address form.
 */
export const useCheckoutAddress = (): CheckoutAddress => {
	const { onCheckoutValidation } = useCheckoutEventsContext();
	const { needsShipping } = useShippingData();
	const {
		useShippingAsBilling,
		prefersCollection,
		isEditingShippingAddress,
		isEditingBillingAddress,
	} = useSelect( ( select ) => {
		const store = select( CHECKOUT_STORE_KEY );
		return {
			useShippingAsBilling: store.getUseShippingAsBilling(),
			prefersCollection: store.prefersCollection(),
			isEditingShippingAddress: store.isEditingShippingAddress(),
			isEditingBillingAddress: store.isEditingBillingAddress(),
		};
	} );
	const {
		__internalSetUseShippingAsBilling: setUseShippingAsBilling,
		setEditingShippingAddress,
		setEditingBillingAddress,
	} = useDispatch( CHECKOUT_STORE_KEY );
	const {
		billingAddress,
		setBillingAddress,
		shippingAddress,
		setShippingAddress,
	} = useCustomerData();

	const setEmail = useCallback(
		( value ) =>
			void setBillingAddress( {
				email: value,
			} ),
		[ setBillingAddress ]
	);

	const setBillingPhone = useCallback(
		( value ) =>
			void setBillingAddress( {
				phone: value,
			} ),
		[ setBillingAddress ]
	);

	const setShippingPhone = useCallback(
		( value ) =>
			void setShippingAddress( {
				phone: value,
			} ),
		[ setShippingAddress ]
	);

	// This is a core setting which determines if the user must ship to their billing address.
	const forcedBillingAddress: boolean = getSetting(
		'forcedBillingAddress',
		false
	);

	// Shipping fields (address form) are shown when the cart needs shipping and the customer has not chosen local pickup.
	const showShippingFields = needsShipping && ! prefersCollection;
	const showShippingMethods = showShippingFields;

	// Billing fields are shown when there is no need for a shipping address or the user has a different billing address to their chosen shipping address.
	const showBillingFields =
		! needsShipping || ! useShippingAsBilling || prefersCollection || false;

	// Billing is used for shipping if forced via the core setting, or if the user has chosen local pickup.
	const useBillingAsShipping =
		forcedBillingAddress || prefersCollection || false;

	useEffect( () => {
		const unsubscribeProcessing = onCheckoutValidation( () => {
			if ( isEditingShippingAddress && showShippingFields ) {
				return {
					errorMessage: __(
						'Save your shipping address to continue',
						'woo-gutenberg-products-block'
					),
					context: 'wc/checkout/shipping-address',
				};
			}
			if ( isEditingBillingAddress && showBillingFields ) {
				return {
					errorMessage: __(
						'Save your billing address to continue',
						'woo-gutenberg-products-block'
					),
					context: 'wc/checkout/billing-address',
				};
			}
		}, 0 );
		return () => {
			unsubscribeProcessing();
		};
	}, [
		onCheckoutValidation,
		isEditingShippingAddress,
		isEditingBillingAddress,
		showShippingFields,
		showBillingFields,
	] );

	return {
		shippingAddress,
		billingAddress,
		setShippingAddress,
		setBillingAddress,
		setEmail,
		setBillingPhone,
		setShippingPhone,
		defaultAddressFields,
		useShippingAsBilling,
		setUseShippingAsBilling,
		needsShipping,
		showShippingFields,
		showShippingMethods,
		showBillingFields,
		forcedBillingAddress,
		useBillingAsShipping,
		isEditingShippingAddress,
		setEditingShippingAddress,
		isEditingBillingAddress,
		setEditingBillingAddress,
	};
};
