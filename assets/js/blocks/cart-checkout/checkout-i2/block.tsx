/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { createInterpolateElement, useEffect } from '@wordpress/element';
import { useStoreCart, useStoreNotices } from '@woocommerce/base-context/hooks';
import {
	useCheckoutContext,
	useValidationContext,
	ValidationContextProvider,
	StoreNoticesProvider,
	CheckoutProvider,
} from '@woocommerce/base-context';
import { StoreSnackbarNoticesProvider } from '@woocommerce/base-context/providers';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import { SidebarLayout } from '@woocommerce/base-components/sidebar-layout';
import { CURRENT_USER_IS_ADMIN, getSetting } from '@woocommerce/settings';
import { SlotFillProvider } from '@woocommerce/blocks-checkout';
import withScrollToTop from '@woocommerce/base-hocs/with-scroll-to-top';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import EmptyCart from './empty-cart';
import CheckoutOrderError from './checkout-order-error';
import { LOGIN_TO_CHECKOUT_URL, isLoginRequired, reloadPage } from './utils';
import type { Attributes } from './types';
import { CheckoutBlockContext } from './context';

const LoginPrompt = () => {
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
};

const Checkout = ( {
	attributes,
	children,
}: {
	attributes: Attributes;
	children: React.ReactChildren;
} ): JSX.Element => {
	const { hasOrder, customerId } = useCheckoutContext();
	const { cartItems, cartIsLoading } = useStoreCart();

	const {
		allowCreateAccount,
		showCompanyField,
		requireCompanyField,
		showApartmentField,
		showPhoneField,
		requirePhoneField,
	} = attributes;

	if ( ! cartIsLoading && cartItems.length === 0 ) {
		return <EmptyCart />;
	}

	if ( ! hasOrder ) {
		return <CheckoutOrderError />;
	}

	if (
		isLoginRequired( customerId ) &&
		allowCreateAccount &&
		getSetting( 'checkoutAllowsSignup', false )
	) {
		<LoginPrompt />;
	}

	return (
		<CheckoutBlockContext.Provider
			value={ {
				allowCreateAccount,
				showCompanyField,
				requireCompanyField,
				showApartmentField,
				showPhoneField,
				requirePhoneField,
			} }
		>
			{ children }
		</CheckoutBlockContext.Provider>
	);
};

const ScrollOnError = ( {
	scrollToTop,
}: {
	scrollToTop: ( props: Record< string, unknown > ) => void;
} ): null => {
	const { hasNoticesOfType } = useStoreNotices();
	const {
		hasError: checkoutHasError,
		isIdle: checkoutIsIdle,
	} = useCheckoutContext();
	const {
		hasValidationErrors,
		showAllValidationErrors,
	} = useValidationContext();

	const hasErrorsToDisplay =
		checkoutIsIdle &&
		checkoutHasError &&
		( hasValidationErrors || hasNoticesOfType( 'default' ) );

	useEffect( () => {
		if ( hasErrorsToDisplay ) {
			showAllValidationErrors();
			scrollToTop( {
				focusableSelector: 'input:invalid, .has-error input',
			} );
		}
	}, [ hasErrorsToDisplay, scrollToTop, showAllValidationErrors ] );

	return null;
};

const Block = ( {
	attributes,
	children,
	scrollToTop,
}: {
	attributes: Attributes;
	children: React.ReactChildren;
	scrollToTop: ( props: Record< string, unknown > ) => void;
} ): JSX.Element => (
	<BlockErrorBoundary
		header={ __( 'Something went wrong…', 'woo-gutenberg-products-block' ) }
		text={ createInterpolateElement(
			__(
				'The checkout has encountered an unexpected error. <button>Try reloading the page</button>. If the error persists, please get in touch with us so we can assist.',
				'woo-gutenberg-products-block'
			),
			{
				button: (
					<button
						className="wc-block-link-button"
						onClick={ reloadPage }
					/>
				),
			}
		) }
		showErrorMessage={ CURRENT_USER_IS_ADMIN }
	>
		<StoreSnackbarNoticesProvider context="wc/checkout">
			<StoreNoticesProvider context="wc/checkout">
				<ValidationContextProvider>
					<CheckoutProvider>
						<SlotFillProvider>
							<SidebarLayout
								className={ classnames( 'wc-block-checkout', {
									'has-dark-controls':
										attributes.hasDarkControls,
								} ) }
							>
								<Checkout attributes={ attributes }>
									{ children }
								</Checkout>
								<ScrollOnError scrollToTop={ scrollToTop } />
							</SidebarLayout>
						</SlotFillProvider>
					</CheckoutProvider>
				</ValidationContextProvider>
			</StoreNoticesProvider>
		</StoreSnackbarNoticesProvider>
	</BlockErrorBoundary>
);

export default withScrollToTop( Block );
