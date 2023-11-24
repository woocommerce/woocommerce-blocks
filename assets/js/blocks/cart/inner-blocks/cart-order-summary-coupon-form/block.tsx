/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';
import { TotalsWrapper } from '@woocommerce/blocks-components';

/**
 * Internal dependencies
 */
import { useStoreCartCoupons } from '~/base/context/hooks';
import { TotalsCoupon } from '~/base/components/cart-checkout';

const Block = ( { className }: { className: string } ): JSX.Element | null => {
	const couponsEnabled = getSetting( 'couponsEnabled', true );

	const { applyCoupon, isApplyingCoupon } = useStoreCartCoupons( 'wc/cart' );

	if ( ! couponsEnabled ) {
		return null;
	}

	return (
		<TotalsWrapper className={ className }>
			<TotalsCoupon
				onSubmit={ applyCoupon }
				isLoading={ isApplyingCoupon }
			/>
		</TotalsWrapper>
	);
};

export default Block;
