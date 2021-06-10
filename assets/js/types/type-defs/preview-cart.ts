/**
 * External dependencies
 */
import type { CartResponse } from '@woocommerce/type-defs/cart-response';
import type {
	CartItem,
	CartShippingRate,
	CartTotals,
} from '@woocommerce/type-defs/cart';

// @todo - Remove this type and replace its usages with Cart after all cart properties are converted to camelCase
export interface PreviewCart
	extends Omit< CartResponse, 'shipping_rates' | 'items' | 'totals' > {
	shippingRates: CartShippingRate[];
	items: CartItem[];
	totals: CartTotals;
}
