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
};

export type CheckoutBlockControlsContextProps = {
	addressFieldControls: () => JSX.Element | null;
	accountControls: () => JSX.Element | null;
};

export const CheckoutBlockContext = createContext< CheckoutBlockContextProps >(
	{
		allowCreateAccount: false,
		showCompanyField: false,
		showApartmentField: false,
		showPhoneField: false,
		requireCompanyField: false,
		requirePhoneField: false,
	}
);

export const CheckoutBlockControlsContext = createContext<
	CheckoutBlockControlsContextProps
>( {
	addressFieldControls: () => null,
	accountControls: () => null,
} );

export const useCheckoutBlockContext = (): CheckoutBlockContextProps => {
	return useContext( CheckoutBlockContext );
};

export const useCheckoutBlockControlsContext = (): CheckoutBlockControlsContextProps => {
	return useContext( CheckoutBlockControlsContext );
};
