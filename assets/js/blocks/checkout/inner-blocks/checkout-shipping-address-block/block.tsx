/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useMemo,
	useEffect,
	Fragment,
	useState,
	useRef,
} from '@wordpress/element';
import { AddressForm } from '@woocommerce/base-components/cart-checkout';
import {
	useCheckoutAddress,
	useStoreEvents,
	useEditorContext,
	noticeContexts,
} from '@woocommerce/base-context';
import {
	CheckboxControl,
	StoreNoticesContainer,
	TextInput,
} from '@woocommerce/blocks-checkout';
import Noninteractive from '@woocommerce/base-components/noninteractive';
import type {
	BillingAddress,
	ShippingAddress,
	AddressField,
	AddressFields,
} from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import PhoneNumber from '../../phone-number';

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
		defaultAddressFields,
		setShippingAddress,
		setBillingAddress,
		shippingAddress,
		billingAddress,
		setShippingPhone,
		useShippingAsBilling,
		setUseShippingAsBilling,
	} = useCheckoutAddress();
	const { dispatchCheckoutEvent } = useStoreEvents();
	const { isEditor } = useEditorContext();

	const { email } = billingAddress;
	// This is used to track whether the "Use shipping as billing" checkbox was checked on first load and if we synced
	// the shipping address to the billing address if it was. This is not used on further toggles of the checkbox.
	const [ addressesSynced, setAddressesSynced ] = useState( false );

	// Clears data if fields are hidden.
	useEffect( () => {
		if ( ! showPhoneField ) {
			setShippingPhone( '' );
		}
	}, [ showPhoneField, setShippingPhone ] );

	// Run this on first render to ensure addresses sync if needed, there is no need to re-run this when toggling the
	// checkbox.
	useEffect(
		() => {
			if ( addressesSynced ) {
				return;
			}
			if ( useShippingAsBilling ) {
				setBillingAddress( { ...shippingAddress, email } );
			}
			setAddressesSynced( true );
		},
		// Skip the `email` dependency since we don't want to re-run if that changes, but we do want to sync it on first render.
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			addressesSynced,
			setBillingAddress,
			shippingAddress,
			useShippingAsBilling,
		]
	);

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

	const AddressFormWrapperComponent = isEditor ? Noninteractive : Fragment;
	const noticeContext = useShippingAsBilling
		? [ noticeContexts.SHIPPING_ADDRESS, noticeContexts.BILLING_ADDRESS ]
		: [ noticeContexts.SHIPPING_ADDRESS ];

	const addressSearchRef = useRef< HTMLInputElement >( null );
	const autocompleteRef = useRef( null );

	const [ mapsApiInitialised, setMapsApiInitialised ] = useState( false );

	// Google Places Lookup
	useEffect( () => {
		if ( ! window.google.maps.places || mapsApiInitialised ) {
			return;
		}
		autocompleteRef.current = new window.google.maps.places.Autocomplete(
			addressSearchRef.current
		);
		setMapsApiInitialised( true );

		if ( ! autocompleteRef.current ) {
			return;
		}
		autocompleteRef.current.addListener( 'place_changed', async () => {
			const place = await autocompleteRef.current.getPlace();
			if ( ! place || ! place.address_components ) {
				return;
			}
			console.log( place );
			// We have an address, populate the address fields

			// Needs work  - this is England for everything in England
			const county = place.address_components.find( ( component ) =>
				component.types.includes( 'administrative_area_level_1' )
			);
			const country = place.address_components.find( ( component ) =>
				component.types.includes( 'country' )
			);
			const postalCode = place.address_components.find( ( component ) =>
				component.types.includes( 'postal_code' )
			);
			const town = place.address_components.find(
				( component ) =>
					component.types.includes( 'postal_town' ) ||
					component.types.includes( 'locality' )
			);

			const houseNumberOrName = place.address_components.find(
				( component ) =>
					component.types.includes( 'street_number' ) ||
					component.types.includes( 'premise' )
			);

			const street = place.address_components.find( ( component ) =>
				component.types.includes( 'route' )
			);

			const address1 =
				houseNumberOrName && street
					? `${ houseNumberOrName?.long_name } ${ street?.long_name }`
					: undefined;

			const address2 = place.address_components.find( ( component ) =>
				component.types.includes( 'sublocality' )
			);

			console.log(
				address1,
				address2?.long_name,
				town?.long_name,
				postalCode?.long_name,
				county?.long_name,
				country?.long_name
			);

			setShippingAddress( {
				address_1: address1,
				address_2: address2?.long_name,
				city: town?.long_name,
				postcode: postalCode?.long_name,
				state: county?.long_name,
				country: country?.short_name,
			} );
		} );
	} );

	return (
		<>
			<AddressFormWrapperComponent>
				<StoreNoticesContainer context={ noticeContext } />
				<TextInput
					ref={ addressSearchRef }
					type="text"
					placeholder="Search for an address"
					id="address-search"
					className="wc-block-components-address-form__address_2"
				></TextInput>
				<AddressForm
					id="shipping"
					type="shipping"
					onChange={ ( values: Partial< ShippingAddress > ) => {
						setShippingAddress( values );
						if ( useShippingAsBilling ) {
							setBillingAddress( { ...values, email } );
							dispatchCheckoutEvent( 'set-billing-address' );
						}
						dispatchCheckoutEvent( 'set-shipping-address' );
					} }
					values={ shippingAddress }
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
						value={ shippingAddress.phone }
						onChange={ ( value ) => {
							setShippingPhone( value );
							dispatchCheckoutEvent( 'set-phone-number', {
								step: 'shipping',
							} );
						} }
					/>
				) }
			</AddressFormWrapperComponent>
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
						setBillingAddress( shippingAddress as BillingAddress );
					}
				} }
			/>
		</>
	);
};

export default Block;
