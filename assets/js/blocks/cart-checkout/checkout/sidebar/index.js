/**
 * External dependencies
 */
import {
	OrderSummary,
	TotalsCoupon,
	TotalsDiscount,
	TotalsFooterItem,
} from '@woocommerce/base-components/cart-checkout';
<<<<<<< HEAD
import {
<<<<<<< HEAD
	Subtotal,
	TotalsFees,
	TotalsTaxes,
	TotalsShipping,
	ExperimentalOrderMeta,
	getCurrencyFromPriceResponse,
=======
	ExperimentalOrderMeta,
	ExperimentalOrderShipping,
>>>>>>> Shipping slot fill
} from '@woocommerce/blocks-checkout';
=======
import { ExperimentalOrderMeta } from '@woocommerce/blocks-checkout';
>>>>>>> Working slot fills
import { useShippingDataContext } from '@woocommerce/base-context';
import {
	COUPONS_ENABLED,
	DISPLAY_CART_PRICES_INCLUDING_TAX,
} from '@woocommerce/block-settings';
import { useStoreCartCoupons } from '@woocommerce/base-hooks';

const CheckoutSidebar = ( {
	cartCoupons = [],
	cartItems = [],
	cartFees = [],
	cartTotals = {},
} ) => {
	const {
		applyCoupon,
		removeCoupon,
		isApplyingCoupon,
		isRemovingCoupon,
	} = useStoreCartCoupons();

	const { needsShipping } = useShippingDataContext();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<>
			<OrderSummary cartItems={ cartItems } />
			<Subtotal currency={ totalsCurrency } values={ cartTotals } />
			<TotalsFees currency={ totalsCurrency } cartFees={ cartFees } />
			<TotalsDiscount
				cartCoupons={ cartCoupons }
				currency={ totalsCurrency }
				isRemovingCoupon={ isRemovingCoupon }
				removeCoupon={ removeCoupon }
				values={ cartTotals }
			/>
			{ needsShipping && (
				<TotalsShipping
					showCalculator={ false }
					showRateSelector={ false }
					values={ cartTotals }
					currency={ totalsCurrency }
				/>
			) }
			{ ! DISPLAY_CART_PRICES_INCLUDING_TAX && (
				<TotalsTaxes
					currency={ totalsCurrency }
					values={ cartTotals }
				/>
			) }
			{ COUPONS_ENABLED && (
				<TotalsCoupon
					onSubmit={ applyCoupon }
					initialOpen={ false }
					isLoading={ isApplyingCoupon }
				/>
			) }
			<TotalsFooterItem
				currency={ totalsCurrency }
				values={ cartTotals }
			/>
			<ExperimentalOrderMeta.Slot />
		</>
	);
};

export default CheckoutSidebar;
