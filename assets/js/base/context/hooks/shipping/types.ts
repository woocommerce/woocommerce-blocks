/**
 * External dependencies
 */
import { Cart } from '@woocommerce/type-defs/cart';

export interface ShippingData {
	needsShipping: Cart[ 'needsShipping' ];
	hasCalculatedShipping: Cart[ 'hasCalculatedShipping' ];
	shippingRates: Cart[ 'shippingRates' ];
	isLoadingRates: boolean;
	selectedRates: Record< string, string | unknown >;
	// Returns a function that accepts a shipping rate ID and a package ID.
	selectShippingRate: (
		newShippingRateId: string,
		packageId: string | number
	) => unknown;
	isCollectable: boolean;
	// True when a rate is currently being selected and persisted to the server.
	isSelectingRate: boolean;
}
