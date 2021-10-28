/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	TotalsCoupon,
	TotalsDiscount,
	TotalsFooterItem,
	TotalsShipping,
} from '@woocommerce/base-components/cart-checkout';
import {
	TotalsItem,
	Subtotal,
	TotalsFees,
	TotalsTaxes,
	TotalsWrapper,
	ExperimentalOrderMeta,
	ExperimentalDiscountsMeta,
} from '@woocommerce/blocks-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import {
	useStoreCartCoupons,
	useStoreCart,
} from '@woocommerce/base-context/hooks';
import { getSetting } from '@woocommerce/settings';
import Title from '@woocommerce/base-components/title';

const TotalsHeading = (): JSX.Element => {
	return (
		<Title headingLevel="2" className="wc-block-cart__totals-title">
			{ __( 'Cart totals', 'woo-gutenberg-products-block' ) }
		</Title>
	);
};

const TotalsCoupons = (): JSX.Element => {
	const { applyCoupon, isApplyingCoupon } = useStoreCartCoupons();

	if ( ! getSetting( 'couponsEnabled', true ) ) {
		return null;
	}
	return (
		<TotalsWrapper>
			<TotalsCoupon
				onSubmit={ applyCoupon }
				isLoading={ isApplyingCoupon }
			/>
		</TotalsWrapper>
	);
};

/**
 * Internal dependencies
 */

const Block = ( {
	className,
	showRateAfterTaxName = false,
	isShippingCalculatorEnabled = true,
}: {
	className: string;
	showRateAfterTaxName: boolean;
	isShippingCalculatorEnabled: boolean;
} ): JSX.Element => {
	const {
		cartFees,
		cartTotals,
		cartNeedsShipping,
		cartIsLoading,
	} = useStoreCart();

	const {
		removeCoupon,
		isRemovingCoupon,
		appliedCoupons,
	} = useStoreCartCoupons();

	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	// Prepare props to pass to the ExperimentalOrderMeta slot fill.
	// We need to pluck out receiveCart.
	// eslint-disable-next-line no-unused-vars
	const { extensions, receiveCart, ...cart } = useStoreCart();
	const slotFillProps = {
		extensions,
		cart,
	};

	const discountsSlotFillProps = {
		extensions,
		cart,
	};

	if ( cartIsLoading ) {
		return (
			<div className={ className }>
				<TotalsHeading />
				<TotalsWrapper>
					<TotalsItem
						label={ __(
							'Subtotal',
							'woo-gutenberg-products-block'
						) }
					/>
				</TotalsWrapper>
				<TotalsCoupons />
				<TotalsWrapper>
					<TotalsItem
						label={ __(
							'Shipping',
							'woo-gutenberg-products-block'
						) }
					/>
				</TotalsWrapper>
				<TotalsWrapper>
					<TotalsItem
						className="wc-block-components-totals-footer-item"
						label={ __( 'Total', 'woo-gutenberg-products-block' ) }
					/>
				</TotalsWrapper>
			</div>
		);
	}

	return (
		<div className={ className }>
			<TotalsHeading />
			<TotalsWrapper>
				<Subtotal currency={ totalsCurrency } values={ cartTotals } />
				<TotalsFees currency={ totalsCurrency } cartFees={ cartFees } />
				<TotalsDiscount
					cartCoupons={ appliedCoupons }
					currency={ totalsCurrency }
					isRemovingCoupon={ isRemovingCoupon }
					removeCoupon={ removeCoupon }
					values={ cartTotals }
				/>
			</TotalsWrapper>
			<TotalsCoupons />
			<ExperimentalDiscountsMeta.Slot { ...discountsSlotFillProps } />
			{ cartNeedsShipping && (
				<TotalsWrapper>
					<TotalsShipping
						showCalculator={ isShippingCalculatorEnabled }
						showRateSelector={ true }
						values={ cartTotals }
						currency={ totalsCurrency }
					/>
				</TotalsWrapper>
			) }
			{ ! getSetting( 'displayCartPricesIncludingTax', false ) &&
				parseInt( cartTotals.total_tax, 10 ) > 0 && (
					<TotalsWrapper>
						<TotalsTaxes
							showRateAfterTaxName={ showRateAfterTaxName }
							currency={ totalsCurrency }
							values={ cartTotals }
						/>
					</TotalsWrapper>
				) }
			<TotalsWrapper>
				<TotalsFooterItem
					currency={ totalsCurrency }
					values={ cartTotals }
				/>
			</TotalsWrapper>
			<ExperimentalOrderMeta.Slot { ...slotFillProps } />
		</div>
	);
};

export default Block;
