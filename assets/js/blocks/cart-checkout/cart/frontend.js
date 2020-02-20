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
	} = useStoreCart();

	if ( cartIsLoading ) {
		return null;
	}

	const isCartEmpty = cartItemsCount === 0;

	console.log( cartErrors );

	return isCartEmpty ? (
		<RawHTML>{ emptyCart }</RawHTML>
	) : (
		<>
			<div className="errors">
				{ // @todo This is a placeholder for error messages - this needs refactoring.
				cartErrors &&
					cartErrors.map( ( error = {}, i ) => (
						<div className="notice" key={ 'notice-' + i }>
							{ error.message }
						</div>
					) ) }
			</div>
			<FullCart
				cartItems={ cartItems }
				cartTotals={ cartTotals }
				isShippingCalculatorEnabled={ isShippingCalculatorEnabled }
				isShippingCostHidden={ isShippingCostHidden }
			/>
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
