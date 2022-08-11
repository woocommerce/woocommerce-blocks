/**
 * External dependencies
 */
import { createContext, useContext } from '@wordpress/element';

/**
 * Context consumed by inner blocks.
 */
export type CheckoutBlockContextProps = {
	allowCreateAccount: boolean;
	showCompanyField: boolean;
	showApartmentField: boolean;
	showPhoneField: boolean;
	requireCompanyField: boolean;
	requirePhoneField: boolean;
	showOrderNotes: boolean;
	showPolicyLinks: boolean;
	showReturnToCart: boolean;
	cartPageId: number;
	showRateAfterTaxName: boolean;
};

export type CheckoutBlockControlsContextProps = {
	accountControls: () => JSX.Element | null;
};

export const CheckoutBlockContext: React.Context< CheckoutBlockContextProps > =
	createContext< CheckoutBlockContextProps >( {
		allowCreateAccount: false,
		showCompanyField: false,
		showApartmentField: false,
		showPhoneField: false,
		requireCompanyField: false,
		requirePhoneField: false,
		showOrderNotes: true,
		showPolicyLinks: true,
		showReturnToCart: true,
		cartPageId: 0,
		showRateAfterTaxName: false,
	} );

export const CheckoutBlockControlsContext: React.Context< CheckoutBlockControlsContextProps > =
	createContext< CheckoutBlockControlsContextProps >( {
		accountControls: () => null,
	} );

export const useCheckoutBlockContext = (): CheckoutBlockContextProps => {
	return useContext( CheckoutBlockContext );
};

export const useCheckoutBlockControlsContext =
	(): CheckoutBlockControlsContextProps => {
		return useContext( CheckoutBlockControlsContext );
	};
