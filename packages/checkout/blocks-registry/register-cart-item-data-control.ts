/**
 * External dependencies
 */
import { Cart, CartItem } from '@woocommerce/types';

export interface CartItemDataControlSettings {
	key: string;
	type: 'checkbox' | 'text' | 'select';
	onChange: ( value: string | boolean ) => void;
	isVisible: ( cart: Cart, cartItem: CartItem ) => boolean;
}

const registeredCartItemDataControls: Record<
	string,
	CartItemDataControlSettings[]
> = {};
export const registerCartItemDataControl = (
	namespace: string,
	settings: CartItemDataControlSettings
) => {
	if ( ! registeredCartItemDataControls[ namespace ] ) {
		registeredCartItemDataControls[ namespace ] = [];
	}

	// POC only so no hardening done.
	registeredCartItemDataControls[ namespace ].push( settings );
};

export const getRegisteredCartItemDataControls = () => {
	return registeredCartItemDataControls;
};
