/**
 * External dependencies
 */
import { useState, useMemo, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import defaultAddressFields from '@woocommerce/base-components/cart-checkout/address-form/default-address-fields';
import {
	AddressForm,
	FormStep,
	CheckoutForm,
	PlaceOrderButton,
	Policies,
	ReturnToCartButton,
	ShippingRatesControl,
} from '@woocommerce/base-components/cart-checkout';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';
import CheckboxControl from '@woocommerce/base-components/checkbox-control';
import {
	getCurrencyFromPriceResponse,
	getShippingRatesPackageCount,
	getShippingRatesRateCount,
} from '@woocommerce/base-utils';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import {
	CheckoutProvider,
	useCheckoutContext,
	useEditorContext,
	useShippingDataContext,
	useBillingDataContext,
	useValidationContext,
	StoreNoticesProvider,
} from '@woocommerce/base-context';
import {
	useStoreCart,
	usePaymentMethods,
	useStoreNotices,
} from '@woocommerce/base-hooks';
import {
	ExpressCheckoutFormControl,
	PaymentMethods,
} from '@woocommerce/base-components/payment-methods';
import { decodeEntities } from '@wordpress/html-entities';
import {
	Sidebar,
	SidebarLayout,
	Main,
} from '@woocommerce/base-components/sidebar-layout';
import { getSetting } from '@woocommerce/settings';
import withScrollToTop from '@woocommerce/base-hocs/with-scroll-to-top';
import {
	CHECKOUT_SHOW_LOGIN_REMINDER,
	CHECKOUT_ALLOWS_GUEST,
} from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import CheckoutSidebar from './sidebar';
import CheckoutOrderError from './checkout-order-error';
import NoShippingPlaceholder from './no-shipping-placeholder';
import './style.scss';

/**
 * Renders the Checkout block wrapped within the CheckoutProvider.
 *
 * @param {Object} props Component props.
 * @return {*} The component.
 */
const Block = ( props ) => {
	return (
		<CheckoutProvider>
			<Checkout { ...props } />
		</CheckoutProvider>
	);
};

/**
 * Renders a shipping rate control option.
 *
 * @param {Object} option Shipping Rate.
 */
const renderShippingRatesControlOption = ( option ) => ( {
	label: decodeEntities( option.name ),
	value: option.rate_id,
	description: decodeEntities( option.description ),
	secondaryLabel: (
		<FormattedMonetaryAmount
			currency={ getCurrencyFromPriceResponse( option ) }
			value={ option.price }
		/>
	),
	secondaryDescription: decodeEntities( option.delivery_time ),
} );

/**
 * Compare two addresses and see if they are the same.
 *
 * @param {object} address1 First address.
 * @param {object} address2 Second address.
 */
const isSameAddress = ( address1, address2 ) => {
	const diff = Object.keys( defaultAddressFields ).filter( ( field ) => {
		return address1[ field ] !== address2[ field ];
	} );
	return diff.length === 0;
};

/**
 * Main Checkout Component.
 *
 * @param {Object} props Component props.
 * @return {*} The component.
 */
const Checkout = ( { attributes, scrollToTop } ) => {
	const { isEditor } = useEditorContext();
	const {
		cartItems,
		cartTotals,
		cartCoupons,
		cartNeedsPayment,
	} = useStoreCart();
	const {
		hasOrder,
		hasError: checkoutHasError,
		isIdle: checkoutIsIdle,
		isProcessing: checkoutIsProcessing,
		customerId,
	} = useCheckoutContext();
	const {
		hasValidationErrors,
		showAllValidationErrors,
	} = useValidationContext();
	const {
		shippingRates,
		shippingRatesLoading,
		shippingAddress,
		setShippingAddress,
		needsShipping,
	} = useShippingDataContext();
	const { billingData, setBillingData } = useBillingDataContext();
	const { paymentMethods } = usePaymentMethods();
	const { hasNoticesOfType } = useStoreNotices();
	const addressFields = useMemo( () => {
		return {
			...defaultAddressFields,
			company: {
				...defaultAddressFields.company,
				hidden: ! attributes.showCompanyField,
				required: attributes.requireCompanyField,
			},
			address_2: {
				...defaultAddressFields.address_2,
				hidden: ! attributes.showApartmentField,
			},
		};
	}, [ defaultAddressFields, attributes ] );

	const hasErrorsToDisplay =
		checkoutIsIdle &&
		checkoutHasError &&
		( hasValidationErrors || hasNoticesOfType( 'default' ) );

	useEffect( () => {
		if ( hasErrorsToDisplay ) {
			showAllValidationErrors();
			scrollToTop( { focusableSelector: 'input:invalid' } );
		}
	}, [ hasErrorsToDisplay ] );

	// These are the local states of address fields, which are persisted
	// globally when changed. They default to the global shipping address which
	// is populated from the current customer data or default location.
	const [ shippingFields, setShippingFields ] = useState( shippingAddress );
	const [ billingFields, setBillingFields ] = useState( billingData );

	// This tracks the state of the "shipping as billing" address checkbox. It's
	// initial value is true (if shipping is needed), however, if the user is
	// logged in and they have a different billing address, we can toggle this off.
	const [ shippingAsBilling, setShippingAsBilling ] = useState(
		() =>
			needsShipping &&
			( ! customerId || isSameAddress( shippingAddress, billingData ) )
	);

	// Pushes to global state when changes are made locally.
	useEffect( () => {
		setShippingAddress( shippingFields );

		if ( shippingAsBilling ) {
			setBillingData( shippingFields );
		}
	}, [ shippingFields ] );

	useEffect( () => {
		setBillingData( billingFields );
	}, [ billingFields ] );

	useEffect( () => {
		if ( shippingAsBilling ) {
			setBillingData( shippingFields );
		} else {
			setBillingData( billingFields );
		}
	}, [ shippingAsBilling ] );

	// Track if billing fields are visible.
	const showBillingFields = ! needsShipping || ! shippingAsBilling;

	if ( ! isEditor && ! hasOrder ) {
		return <CheckoutOrderError />;
	}

	const loginToCheckoutUrl = `/wp-login.php?redirect_to=${ encodeURIComponent(
		window.location.href
	) }`;

	if ( ! customerId && ! CHECKOUT_ALLOWS_GUEST ) {
		return (
			<>
				{ __(
					'You must be logged in to checkout. ',
					'woo-gutenberg-products-block'
				) }
				<a href={ loginToCheckoutUrl }>
					{ __(
						'Click here to log in.',
						'woo-gutenberg-products-block'
					) }
				</a>
			</>
		);
	}

	const loginPrompt = () =>
		CHECKOUT_SHOW_LOGIN_REMINDER &&
		! customerId && (
			<>
				{ __(
					'Already have an account? ',
					'woo-gutenberg-products-block'
				) }
				<a href={ loginToCheckoutUrl }>
					{ __( 'Log in.', 'woo-gutenberg-products-block' ) }
				</a>
			</>
		);

	return (
		<>
			<SidebarLayout className="wc-block-checkout">
				<Main className="wc-block-checkout__main">
					{ cartNeedsPayment && <ExpressCheckoutFormControl /> }
					<CheckoutForm>
						<FormStep
							id="contact-fields"
							disabled={ checkoutIsProcessing }
							className="wc-block-checkout__contact-fields"
							title={ __(
								'Contact information',
								'woo-gutenberg-products-block'
							) }
							description={ __(
								"We'll use this email to send you details and updates about your order.",
								'woo-gutenberg-products-block'
							) }
							stepHeadingContent={ loginPrompt }
						>
							<ValidatedTextInput
								id="email"
								type="email"
								label={ __(
									'Email address',
									'woo-gutenberg-products-block'
								) }
								value={ billingData.email }
								autoComplete="email"
								onChange={ ( newValue ) =>
									setBillingData( { email: newValue } )
								}
								required={ true }
							/>
						</FormStep>
						{ needsShipping && (
							<FormStep
								id="shipping-fields"
								disabled={ checkoutIsProcessing }
								className="wc-block-checkout__shipping-fields"
								title={ __(
									'Shipping address',
									'woo-gutenberg-products-block'
								) }
								description={ __(
									'Enter the physical address where you want us to deliver your order.',
									'woo-gutenberg-products-block'
								) }
							>
								<AddressForm
									id="shipping"
									onChange={ setShippingFields }
									values={ shippingAddress }
									fields={ Object.keys( addressFields ) }
									fieldConfig={ addressFields }
								/>
								{ attributes.showPhoneField && (
									<ValidatedTextInput
										id="phone"
										type="tel"
										label={
											attributes.requirePhoneField
												? __(
														'Phone',
														'woo-gutenberg-products-block'
												  )
												: __(
														'Phone (optional)',
														'woo-gutenberg-products-block'
												  )
										}
										value={ billingData.phone }
										autoComplete="tel"
										onChange={ ( newValue ) =>
											setBillingData( {
												phone: newValue,
											} )
										}
										required={
											attributes.requirePhoneField
										}
									/>
								) }
								<CheckboxControl
									className="wc-block-checkout__use-address-for-billing"
									label={ __(
										'Use same address for billing',
										'woo-gutenberg-products-block'
									) }
									checked={ shippingAsBilling }
									onChange={ ( isChecked ) =>
										setShippingAsBilling( isChecked )
									}
								/>
							</FormStep>
						) }
						{ showBillingFields && (
							<FormStep
								id="billing-fields"
								disabled={ checkoutIsProcessing }
								className="wc-block-checkout__billing-fields"
								title={ __(
									'Billing address',
									'woo-gutenberg-products-block'
								) }
								description={ __(
									'Enter the address that matches your card or payment method.',
									'woo-gutenberg-products-block'
								) }
							>
								<AddressForm
									id="billing"
									onChange={ setBillingData }
									type="billing"
									values={ billingData }
									fields={ Object.keys( addressFields ) }
									fieldConfig={ addressFields }
								/>
							</FormStep>
						) }
						{ needsShipping && (
							<FormStep
								id="shipping-option"
								disabled={ checkoutIsProcessing }
								className="wc-block-checkout__shipping-option"
								title={ __(
									'Shipping options',
									'woo-gutenberg-products-block'
								) }
								description={
									getShippingRatesRateCount( shippingRates ) >
									1
										? __(
												'Select shipping options below.',
												'woo-gutenberg-products-block'
										  )
										: ''
								}
							>
								{ getShippingRatesPackageCount(
									shippingRates
								) === 0 && isEditor ? (
									<NoShippingPlaceholder />
								) : (
									<ShippingRatesControl
										address={
											shippingAddress.country
												? {
														address_1:
															shippingAddress.address_1,
														address_2:
															shippingAddress.address_2,
														city:
															shippingAddress.city,
														state:
															shippingAddress.state,
														postcode:
															shippingAddress.postcode,
														country:
															shippingAddress.country,
												  }
												: null
										}
										noResultsMessage={ __(
											'There are no shipping options available. Please ensure that your address has been entered correctly, or contact us if you need any help.',
											'woo-gutenberg-products-block'
										) }
										renderOption={
											renderShippingRatesControlOption
										}
										shippingRates={ shippingRates }
										shippingRatesLoading={
											shippingRatesLoading
										}
									/>
								) }
							</FormStep>
						) }
						{ cartNeedsPayment && (
							<FormStep
								id="payment-method"
								disabled={ checkoutIsProcessing }
								className="wc-block-checkout__payment-method"
								title={ __(
									'Payment method',
									'woo-gutenberg-products-block'
								) }
								description={
									Object.keys( paymentMethods ).length > 1
										? __(
												'Select a payment method below.',
												'woo-gutenberg-products-block'
										  )
										: ''
								}
							>
								<StoreNoticesProvider context="wc/payment-area">
									<PaymentMethods />
								</StoreNoticesProvider>
							</FormStep>
						) }
					</CheckoutForm>
					<div className="wc-block-checkout__actions">
						{ attributes.showReturnToCart && (
							<ReturnToCartButton
								link={ getSetting(
									'page-' + attributes?.cartPageId,
									false
								) }
							/>
						) }
						<PlaceOrderButton />
					</div>
					{ attributes.showPolicyLinks && <Policies /> }
				</Main>
				<Sidebar className="wc-block-checkout__sidebar">
					<CheckoutSidebar
						cartCoupons={ cartCoupons }
						cartItems={ cartItems }
						cartTotals={ cartTotals }
					/>
				</Sidebar>
			</SidebarLayout>
		</>
	);
};

export default withScrollToTop( Block );
