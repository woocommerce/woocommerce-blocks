/**
 * External dependencies
 */
import { TotalsDiscount } from '@woocommerce/base-components/cart-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import {
	useStoreCartCoupons,
	useStoreCart,
} from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import { DiscountSlotFill } from '../slotfills';

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
