/**
 * External dependencies
 */
import { TotalsDiscount } from '@woocommerce/base-components/cart-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import {
	useStoreCartCoupons,
	useStoreCart,
	useCheckoutContext,
} from '@woocommerce/base-context';
import { ExperimentalDiscountsMeta } from '@woocommerce/blocks-checkout';

const DiscountSlotFill = (): JSX.Element => {
	const { isCart } = useCheckoutContext();

	// Prepare props to pass to the ExperimentalOrderMeta slot fill. We need to pluck out receiveCart.
	// eslint-disable-next-line no-unused-vars
	const { extensions, receiveCart, ...cart } = useStoreCart();
	const discountsSlotFillProps = {
		extensions,
		cart,
		context: isCart ? 'woocommerce/cart' : 'woocommerce/checkout',
	};

	return <ExperimentalDiscountsMeta.Slot { ...discountsSlotFillProps } />;
};

const Block = ( { className }: { className: string } ): JSX.Element => {
	const { cartTotals } = useStoreCart();

	const {
		removeCoupon,
		isRemovingCoupon,
		appliedCoupons,
	} = useStoreCartCoupons();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<>
			<TotalsDiscount
				className={ className }
				cartCoupons={ appliedCoupons }
				currency={ totalsCurrency }
				isRemovingCoupon={ isRemovingCoupon }
				removeCoupon={ removeCoupon }
				values={ cartTotals }
			/>
			<DiscountSlotFill />
		</>
	);
};

export default Block;
