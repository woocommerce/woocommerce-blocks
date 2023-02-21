/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo, useEffect, useState, useCallback } from '@wordpress/element';
import { useCheckoutAddress, noticeContexts } from '@woocommerce/base-context';
import {
	CheckboxControl,
	StoreNoticesContainer,
} from '@woocommerce/blocks-checkout';
import type {
	BillingAddress,
	AddressField,
	AddressFields,
} from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import AddressFormContainer from './address-form-container';

const Block = ( {
	showCompanyField = false,
	showApartmentField = false,
	showPhoneField = false,
	requireCompanyField = false,
	requirePhoneField = false,
}: {
	showCompanyField: boolean;
	showApartmentField: boolean;
	showPhoneField: boolean;
	requireCompanyField: boolean;
	requirePhoneField: boolean;
} ): JSX.Element => {
	const {
		setBillingAddress,
		shippingAddress,
		useShippingAsBilling,
		setUseShippingAsBilling,
	} = useCheckoutAddress();

	// This is used to track whether the "Use shipping as billing" checkbox was checked on first load and if we synced
	// the shipping address to the billing address if it was. This is not used on further toggles of the checkbox.
	const [ addressesSynced, setAddressesSynced ] = useState( false );

	// Sets the billing address to the shipping address.
	const syncBillingWithShipping = useCallback( () => {
		setBillingAddress( {
			...shippingAddress,
			phone: showPhoneField ? shippingAddress.phone : '',
		} as BillingAddress );
	}, [ setBillingAddress, shippingAddress, showPhoneField ] );

	// Run this on first render to ensure addresses sync if needed (this is not re-ran when toggling the checkbox).
	useEffect( () => {
		if ( addressesSynced ) {
			return;
		}
		if ( useShippingAsBilling ) {
			syncBillingWithShipping();
		}
		setAddressesSynced( true );
	}, [
		addressesSynced,
		setBillingAddress,
		syncBillingWithShipping,
		useShippingAsBilling,
	] );

	// Create address fields config from block attributes.
	const addressFieldsConfig = useMemo( () => {
		return {
			company: {
				hidden: ! showCompanyField,
				required: requireCompanyField,
			},
			address_2: {
				hidden: ! showApartmentField,
			},
		};
	}, [
		showCompanyField,
		requireCompanyField,
		showApartmentField,
	] ) as Record< keyof AddressFields, Partial< AddressField > >;

	const noticeContext = useShippingAsBilling
		? [ noticeContexts.SHIPPING_ADDRESS, noticeContexts.BILLING_ADDRESS ]
		: [ noticeContexts.SHIPPING_ADDRESS ];

	return (
		<>
			<StoreNoticesContainer context={ noticeContext } />
			<AddressFormContainer
				addressFieldsConfig={ addressFieldsConfig }
				showPhoneField={ showPhoneField }
				requirePhoneField={ requirePhoneField }
			/>
			<CheckboxControl
				className="wc-block-checkout__use-address-for-billing"
				label={ __(
					'Use same address for billing',
					'woo-gutenberg-products-block'
				) }
				checked={ useShippingAsBilling }
				onChange={ ( checked: boolean ) => {
					setUseShippingAsBilling( checked );
					if ( checked ) {
						syncBillingWithShipping();
					}
				} }
			/>
		</>
	);
};

export default Block;
