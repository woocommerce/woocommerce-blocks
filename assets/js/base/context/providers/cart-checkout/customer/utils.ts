/**
 * External dependencies
 */
import { defaultAddressFields } from '@woocommerce/settings';
import type {
	CartShippingAddress,
	CartBillingAddress,
} from '@woocommerce/types';

/**
 * Compare two addresses and see if they are the same.
 */
export const isSameAddress = (
	address1: CartShippingAddress | CartBillingAddress,
	address2: CartShippingAddress | CartBillingAddress
): boolean => {
	return Object.keys( defaultAddressFields ).every(
		( field ) => address1[ field ] === address2[ field ]
	);
};
