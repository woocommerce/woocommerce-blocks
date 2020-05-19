/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useStoreCartCoupons, useStoreCart } from '@woocommerce/base-hooks';
import { getCurrencyFromPriceResponse } from '@woocommerce/base-utils';
import {
	SubtotalsItem,
	TotalsFeesItem,
	TotalsCouponCodeInput,
	TotalsDiscountItem,
	TotalsFooterItem,
	TotalsShippingItem,
	TotalsTaxesItem,
} from '@woocommerce/base-components/cart-checkout';
import {
	COUPONS_ENABLED,
	DISPLAY_CART_PRICES_INCLUDING_TAX,
} from '@woocommerce/block-settings';
import { Card, CardBody } from 'wordpress-components';
import { Sidebar } from '@woocommerce/base-components/sidebar-layout';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import CheckoutButton from '../checkout-button';

export default function CartSidebar( { attributes } ) {
	const { isShippingCalculatorEnabled, isShippingCostHidden } = attributes;
	const { cartTotals, cartNeedsShipping } = useStoreCart();

	const {
		applyCoupon,
		removeCoupon,
		isApplyingCoupon,
		isRemovingCoupon,
		appliedCoupons,
	} = useStoreCartCoupons();

	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<Sidebar className="wc-block-cart__sidebar">
			<Card isElevated={ true }>
				<CardBody>
					<h2 className="wc-block-cart__totals-title">
						{ __( 'Cart totals', 'woo-gutenberg-products-block' ) }
					</h2>
					<SubtotalsItem
						currency={ totalsCurrency }
						values={ cartTotals }
					/>
					<TotalsFeesItem
						currency={ totalsCurrency }
						values={ cartTotals }
					/>
					<TotalsDiscountItem
						cartCoupons={ appliedCoupons }
						currency={ totalsCurrency }
						isRemovingCoupon={ isRemovingCoupon }
						removeCoupon={ removeCoupon }
						values={ cartTotals }
					/>
					{ cartNeedsShipping && (
						<TotalsShippingItem
							showCalculator={ isShippingCalculatorEnabled }
							showRatesWithoutAddress={ ! isShippingCostHidden }
							values={ cartTotals }
							currency={ totalsCurrency }
						/>
					) }
					{ ! DISPLAY_CART_PRICES_INCLUDING_TAX && (
						<TotalsTaxesItem
							currency={ totalsCurrency }
							values={ cartTotals }
						/>
					) }
					{ COUPONS_ENABLED && (
						<TotalsCouponCodeInput
							onSubmit={ applyCoupon }
							isLoading={ isApplyingCoupon }
						/>
					) }
					<TotalsFooterItem
						currency={ totalsCurrency }
						values={ cartTotals }
					/>
					<CheckoutButton
						link={ getSetting(
							'page-' + attributes?.checkoutPageId,
							false
						) }
					/>
				</CardBody>
			</Card>
		</Sidebar>
	);
}
