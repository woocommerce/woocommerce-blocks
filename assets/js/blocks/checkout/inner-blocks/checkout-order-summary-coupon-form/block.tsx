/**
 * External dependencies
 */
import { TotalsCoupon } from '@woocommerce/base-components/cart-checkout';
import { useStoreCartCoupons } from '@woocommerce/base-context/hooks';
import { getSetting } from '@woocommerce/settings';

const Block = ( {
	className = '',
}: {
	className?: string;
} ): JSX.Element | null => {
	const couponsEnabled = getSetting( 'couponsEnabled', true );

	const { applyCoupon, isApplyingCoupon } = useStoreCartCoupons();

	if ( ! couponsEnabled ) {
		return null;
	}

	return (
		<TotalsCoupon
			className={ className }
			onSubmit={ applyCoupon }
			isLoading={ isApplyingCoupon }
		/>
	);
};

export default Block;
