/**
 * External dependencies
 */
import classnames from 'classnames';
import { useMemo, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	PlaceOrderButton,
	Policies,
	ReturnToCartButton,
	ShippingRatesControl,
} from '@woocommerce/base-components/cart-checkout';
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
	useValidationContext,
} from '@woocommerce/base-context';
import {
	useStoreCart,
	usePaymentMethods,
	useStoreNotices,
	useCheckoutAddress,
import { useStoreCart, useStoreNotices } from '@woocommerce/base-hooks';
import {
	CheckoutExpressPayment,
	PaymentMethods,
import { CheckoutExpressPayment } from '@woocommerce/base-components/payment-methods';
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
	DISPLAY_CART_PRICES_INCLUDING_TAX,
} from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import CheckoutForm from './form';
import CheckoutSidebar from './sidebar';
import CheckoutOrderError from './checkout-order-error';
import { LOGIN_TO_CHECKOUT_URL } from './utils';
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
const renderShippingRatesControlOption = ( option ) => {
	const priceWithTaxes = DISPLAY_CART_PRICES_INCLUDING_TAX
		? parseInt( option.price, 10 ) + parseInt( option.taxes, 10 )
		: parseInt( option.price, 10 );
	return {
		label: decodeEntities( option.name ),
		value: option.rate_id,
		description: decodeEntities( option.description ),
		secondaryLabel: (
			<FormattedMonetaryAmount
				currency={ getCurrencyFromPriceResponse( option ) }
				value={ priceWithTaxes }
			/>
		),
		secondaryDescription: decodeEntities( option.delivery_time ),
	};
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
		customerId,
		onSubmit,
		orderNotes,
		dispatchActions,
		createAccount,
		setCreateAccount,
	} = useCheckoutContext();
	const { setOrderNotes } = dispatchActions;
	const {
		createAccount,
		username,
		password,
		setCreateAccount,
		setUsername,
		setPassword,
	} = useSignupDataContext();
	const {
		hasValidationErrors,
		showAllValidationErrors,
	} = useValidationContext();
	const { hasNoticesOfType } = useStoreNotices();

	// Temporary :) - this will move to appropriate context.
	const [ createAccount, setCreateAccount ] = useState( false );

	const hasErrorsToDisplay =
		checkoutIsIdle &&
		checkoutHasError &&
		( hasValidationErrors || hasNoticesOfType( 'default' ) );

	useEffect( () => {
		if ( hasErrorsToDisplay ) {
			showAllValidationErrors();
			scrollToTop( { focusableSelector: 'input:invalid' } );
		}
	}, [ hasErrorsToDisplay, scrollToTop, showAllValidationErrors ] );

	if ( ! isEditor && ! hasOrder ) {
		return <CheckoutOrderError />;
	}

	const loginToCheckoutUrl = `/wp-login.php?redirect_to=${ encodeURIComponent(
		window.location.href
	) }`;

	if (
		! isEditor &&
		! customerId &&
		! CHECKOUT_ALLOWS_GUEST &&
		! attributes.allowCreateAccount
	) {
		return (
			<>
				{ __(
					'You must be logged in to checkout. ',
					'woo-gutenberg-products-block'
				) }
				<a href={ LOGIN_TO_CHECKOUT_URL }>
					{ __(
						'Click here to log in.',
						'woo-gutenberg-products-block'
					) }
				</a>
			</>
		);
	}

	const createAccountUI = ! customerId &&
		attributes.allowCreateAccount &&
		CHECKOUT_ALLOWS_GUEST && (
			<CheckboxControl
				className="wc-block-checkout__create-account"
				label={ __(
					'Create an account?',
					'woo-gutenberg-products-block'
				) }
				checked={ createAccount }
				onChange={ ( value ) => setCreateAccount( value ) }
			/>
		);

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

	const checkoutClassName = classnames( 'wc-block-checkout', {
		'has-dark-controls': attributes.hasDarkControls,
	} );
	return (
		<>
			<SidebarLayout className={ checkoutClassName }>
				<Main className="wc-block-checkout__main">
					{ cartNeedsPayment && <CheckoutExpressPayment /> }
					<CheckoutForm
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
								value={ billingFields.email }
								autoComplete="email"
								onChange={ setEmail }
								required={ true }
							/>
							{ createAccountUI }
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
						showApartmentField={ attributes.showApartmentField }
						showCompanyField={ attributes.showCompanyField }
						showOrderNotes={ attributes.showOrderNotes }
						showPhoneField={ attributes.showPhoneField }
						requireCompanyField={ attributes.requireCompanyField }
						requirePhoneField={ attributes.requirePhoneField }
					/>
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
