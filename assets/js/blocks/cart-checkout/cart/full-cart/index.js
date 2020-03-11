// @ts-nocheck
/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import {
	SubtotalsItem,
	TotalsFeesItem,
	TotalsCouponCodeInput,
	TotalsDiscountItem,
	TotalsFooterItem,
	TotalsShippingItem,
	TotalsTaxesItem,
} from '@woocommerce/base-components/totals';
import {
	COUPONS_ENABLED,
	DISPLAY_CART_PRICES_INCLUDING_TAX,
	SHIPPING_ENABLED,
} from '@woocommerce/block-settings';
import { getCurrencyFromPriceResponse } from '@woocommerce/base-utils';
import { Card, CardBody } from 'wordpress-components';
import { useStoreCartCoupons } from '@woocommerce/base-hooks';
import classnames from 'classnames';
import {
	Sidebar,
	SidebarLayout,
	Main,
} from '@woocommerce/base-components/sidebar-layout';

/**
 * Internal dependencies
 */
import CheckoutButton from './checkout-button';
import CartLineItemsTitle from './cart-line-items-title';
import CartLineItemsTable from './cart-line-items-table';

import './style.scss';
import './editor.scss';

/**
 * Component that renders the Cart block when user has something in cart aka "full".
 */
const Cart = ( {
	cartItems = [],
	cartTotals = {},
	cartCoupons = [],
	isShippingCalculatorEnabled,
	isShippingCostHidden,
	isLoading = false,
} ) => {
	const {
		applyCoupon,
		removeCoupon,
		isApplyingCoupon,
		isRemovingCoupon,
	} = useStoreCartCoupons();

	// @todo shippingRatesErrors
	const errors = [ ...cartCouponsErrors ];
	if ( errors.length > 0 ) {
		throw new Error( errors[ 0 ].message );
	}

	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	const cartClassName = classnames( 'wc-block-cart', {
		'wc-block-cart--is-loading': isLoading,
	} );

	return (
		<SidebarLayout className={ cartClassName }>
			<Main className="wc-block-cart__main">
				<CartLineItemsTitle itemCount={ cartItems.length } />
				<CartLineItemsTable
					lineItems={ cartItems }
					isLoading={ isLoading }
				/>
			</Main>
			<Sidebar className="wc-block-cart__sidebar">
				<Card isElevated={ true }>
					<CardBody>
						<h2 className="wc-block-cart__totals-title">
							{ __(
								'Cart totals',
								'woo-gutenberg-products-block'
							) }
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
							cartCoupons={ cartCoupons }
							currency={ totalsCurrency }
							isRemovingCoupon={ isRemovingCoupon }
							removeCoupon={ removeCoupon }
							values={ cartTotals }
						/>
						{ SHIPPING_ENABLED && (
							<TotalsShippingItem
								showCalculator={ isShippingCalculatorEnabled }
								showRatesWithoutAddress={ isShippingCostHidden }
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
								initialOpen={ true }
								isLoading={ isApplyingCoupon }
							/>
						) }
						<TotalsFooterItem
							currency={ totalsCurrency }
							values={ cartTotals }
						/>
						<CheckoutButton />
					</CardBody>
				</Card>
			</Sidebar>
		</SidebarLayout>
	);
};

Cart.propTypes = {
	cartItems: PropTypes.array,
	cartTotals: PropTypes.shape( {
		total_items: PropTypes.string,
		total_items_tax: PropTypes.string,
		total_fees: PropTypes.string,
		total_fees_tax: PropTypes.string,
		total_discount: PropTypes.string,
		total_discount_tax: PropTypes.string,
		total_shipping: PropTypes.string,
		total_shipping_tax: PropTypes.string,
		total_tax: PropTypes.string,
		total_price: PropTypes.string,
	} ),
	isShippingCalculatorEnabled: PropTypes.bool,
	isShippingCostHidden: PropTypes.bool,
	isLoading: PropTypes.bool,
};

export default Cart;
