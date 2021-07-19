/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { createInterpolateElement } from '@wordpress/element';
import { useStoreCart } from '@woocommerce/base-context/hooks';
import {
	CheckoutProvider,
	useCheckoutContext,
} from '@woocommerce/base-context';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import { SidebarLayout } from '@woocommerce/base-components/sidebar-layout';
import { CURRENT_USER_IS_ADMIN, getSetting } from '@woocommerce/settings';
import { SlotFillProvider } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import EmptyCart from './empty-cart';
import CheckoutOrderError from './checkout-order-error';
import CheckoutValidation from './validation';
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

const Block = ( {
	attributes,
	children,
}: {
	attributes: Attributes;
	scrollToTop: ( props: Record< string, unknown > ) => void;
	children: React.ReactChildren;
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
		<CheckoutValidation>
			<CheckoutProvider>
				<SlotFillProvider>
					<SidebarLayout
						className={ classnames( 'wc-block-checkout', {
							'has-dark-controls': attributes.hasDarkControls,
						} ) }
					>
						<Checkout attributes={ attributes }>
							{ children }
						</Checkout>
					</SidebarLayout>
				</SlotFillProvider>
			</CheckoutProvider>
		</CheckoutValidation>
	</BlockErrorBoundary>
);

export default Block;
