/**
 * External dependencies
 */
import {
	withRestApiHydration,
	withStoreCartApiHydration,
} from '@woocommerce/block-hocs';
import { __ } from '@wordpress/i18n';
import { useStoreCart } from '@woocommerce/base-hooks';
import { RawHTML } from '@wordpress/element';
import LoadingMask from '@woocommerce/base-components/loading-mask';
import { StoreNoticesProvider } from '@woocommerce/base-context';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';
import { __experimentalCreateInterpolateElement } from 'wordpress-element';

/**
 * Internal dependencies
 */
import FullCart from './full-cart';
import blockAttributes from './attributes';
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
		cartTotals,
		cartIsLoading,
		cartCoupons,
		shippingRates,
	} = useStoreCart();

	return (
		<StoreNoticesProvider context="wc/cart">
			{ ! cartIsLoading && ! cartItems.length ? (
				<RawHTML>{ emptyCart }</RawHTML>
			) : (
				<LoadingMask showSpinner={ true } isLoading={ cartIsLoading }>
					<FullCart
						cartItems={ cartItems }
						cartTotals={ cartTotals }
						cartCoupons={ cartCoupons }
						isShippingCalculatorEnabled={
							isShippingCalculatorEnabled
						}
						isShippingCostHidden={ isShippingCostHidden }
						isLoading={ cartIsLoading }
						shippingRates={ shippingRates }
					/>
				</LoadingMask>
			) }
		</StoreNoticesProvider>
	);
};

const getProps = ( el ) => {
	const attributes = {};

	Object.keys( blockAttributes ).forEach( ( key ) => {
		if ( typeof el.dataset[ key ] !== 'undefined' ) {
			if (
				el.dataset[ key ] === 'true' ||
				el.dataset[ key ] === 'false'
			) {
				attributes[ key ] = el.dataset[ key ] !== 'false';
			} else {
				attributes[ key ] = el.dataset[ key ];
			}
		} else {
			attributes[ key ] = blockAttributes[ key ].default;
		}
	} );

	return {
		emptyCart: el.innerHTML,
		attributes,
	};
};

const getErrorBoundaryProps = () => {
	return {
		header: __( 'Something went wrong…', 'woo-gutenberg-products-block' ),
		text: __experimentalCreateInterpolateElement(
			__(
				'The cart has encountered an unexpected error. <a>Try reloading the page</a>. If the error persists, please get in touch with us so we can assist.',
				'woo-gutenberg-products-block'
			),
			{
				a: (
					// eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
					<a href="javascript:window.location.reload(true)" />
				),
			}
		),
		showErrorMessage: CURRENT_USER_IS_ADMIN,
	};
};

renderFrontend(
	'.wp-block-woocommerce-cart',
	withStoreCartApiHydration( withRestApiHydration( CartFrontend ) ),
	getProps,
	getErrorBoundaryProps
);
