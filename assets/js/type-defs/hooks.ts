/**
 * Internal dependencies
 */
import type {
	CartResponseErrorItem,
	CartResponseCouponItem,
} from './cart-response';

export interface StoreCartItemQuantity {
	isPendingDelete: boolean;
	quantity: number;
	changeQuantity: ( quantity: number ) => void;
	removeItem: () => boolean;
	cartItemQuantityErrors: Array< CartResponseErrorItem >;
}

export interface StoreCartCoupon {
	appliedCoupons: Array< CartResponseCouponItem >;
	isLoading: boolean;
	applyCoupon: ( coupon: string ) => void;
	removeCoupon: ( coupon: string ) => void;
	isApplyingCoupon: boolean;
	isRemovingCoupon: boolean;
}
