/**
 * External dependencies
 */
import { withRestApiHydration } from '@woocommerce/block-hocs';
import { useStoreCart } from '@woocommerce/base-hooks';
import { RawHTML } from '@wordpress/element';

/**
 * Internal dependencies
 */
import FullCart from './full-cart';
import renderFrontend from '../../../utils/render-frontend.js';

/**
 * Wrapper component to supply API data and show empty cart view as needed.
 */
const CartFrontend = ( {
	emptyCart,
	isShippingCalculatorEnabled,
	isShippingCostHidden,
} ) => {
	const {
		cartItems,
		cartItemsCount,
		cartTotals,
		cartIsLoading,
		cartErrors,
		applyCoupon,
		cartCoupons,
	} = useStoreCart();

	if ( cartIsLoading ) {
		return null;
	}

	return (
		<>
			<div className="errors">
				{ // @todo This is a placeholder for error messages - this needs refactoring.
				cartErrors &&
					cartErrors.map( ( error = {}, i ) => (
						<div className="woocommerce-info" key={ 'notice-' + i }>
							{ error.message }
						</div>
					) ) }
			</div>
			{ cartItemsCount === 0 ? (
				<RawHTML>{ emptyCart }</RawHTML>
			) : (
				<FullCart
					cartItems={ cartItems }
					cartTotals={ cartTotals }
					cartCoupons={ cartCoupons }
					isShippingCalculatorEnabled={ isShippingCalculatorEnabled }
					isShippingCostHidden={ isShippingCostHidden }
					onApplyCoupon={ applyCoupon }
				/>
			) }
		</>
	);
};

const getProps = ( el ) => ( {
	emptyCart: el.innerHTML,
	isShippingCalculatorEnabled:
		el.dataset.isshippingcalculatorenabled === 'true',
	isShippingCostHidden: el.dataset.isshippingcosthidden === 'true',
} );

renderFrontend(
	'.wp-block-woocommerce-cart',
	withRestApiHydration( CartFrontend ),
	getProps
);
