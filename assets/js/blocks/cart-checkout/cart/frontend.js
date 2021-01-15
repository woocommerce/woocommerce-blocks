/**
 * External dependencies
 */
import {
	withRestApiHydration,
	withStoreCartApiHydration,
} from '@woocommerce/block-hocs';
import { __ } from '@wordpress/i18n';
import { StoreNoticesProvider } from '@woocommerce/base-context';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';
import { createInterpolateElement } from 'wordpress-element';
import {
	renderFrontend,
	getValidBlockAttributes,
} from '@woocommerce/base-utils';
import { ExperimentalOrderMeta } from '@woocommerce/blocks-checkout';
import { registerPlugin } from '@wordpress/plugins';

import { ShippingRatesControl } from '@woocommerce/base-components/cart-checkout';
import { Notice } from 'wordpress-components';
import classnames from 'classnames';
import { decodeEntities } from '@wordpress/html-entities';
import { DISPLAY_CART_PRICES_INCLUDING_TAX } from '@woocommerce/block-settings';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { getCurrencyFromPriceResponse } from '@woocommerce/base-utils';
import { useStoreCart, useSelectShippingRate } from '@woocommerce/base-hooks';
import { useShallowEqual } from '@woocommerce/base-hooks';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Block from './block.js';
import blockAttributes from './attributes';

const reloadPage = () => void window.location.reload( true );
/**
 * Wrapper component to supply API data and show empty cart view as needed.
 *
 * @param {*} props
 */
const CartFrontend = ( props ) => {
	return (
		<StoreNoticesProvider context="wc/cart">
			<Block { ...props } />
		</StoreNoticesProvider>
	);
};

const getProps = ( el ) => {
	return {
		emptyCart: el.innerHTML,
		attributes: getValidBlockAttributes( blockAttributes, el.dataset ),
	};
};

const getErrorBoundaryProps = () => {
	return {
		header: __( 'Something went wrong…', 'woo-gutenberg-products-block' ),
		text: createInterpolateElement(
			__(
				'The cart has encountered an unexpected error. <button>Try reloading the page</button>. If the error persists, please get in touch with us so we can assist.',
				'woo-gutenberg-products-block'
			),
			{
				button: (
					<button
						className="wc-block-link-button"
						onClick={ reloadPage }
					/>
				),
			}
		),
		showErrorMessage: CURRENT_USER_IS_ADMIN,
	};
};

renderFrontend( {
	selector: '.wp-block-woocommerce-cart',
	Block: withStoreCartApiHydration( withRestApiHydration( CartFrontend ) ),
	getProps,
	getErrorBoundaryProps,
} );

const renderShippingRatesControlOption = ( option ) => {
	const priceWithTaxes = DISPLAY_CART_PRICES_INCLUDING_TAX
		? parseInt( option.price, 10 ) + parseInt( option.taxes, 10 )
		: parseInt( option.price, 10 );
	return {
		label: decodeEntities( option.name ),
		value: option.rate_id,
		description: (
			<>
				{ Number.isFinite( priceWithTaxes ) && (
					<FormattedMonetaryAmount
						currency={ getCurrencyFromPriceResponse( option ) }
						value={ priceWithTaxes }
					/>
				) }
				{ Number.isFinite( priceWithTaxes ) && option.delivery_time
					? ' — '
					: null }
				{ decodeEntities( option.delivery_time ) }
			</>
		),
	};
};

/**
 * Temporarily building this here - it will be moved to subs once packages are exported.
 */
const RenderSubscriptionPackages = () => {
	const { extensions, shippingRatesLoading } = useStoreCart();
	const recurringCarts = extensions.subscriptions || {};
	const currentRecurringCarts = useShallowEqual( recurringCarts );

	// Flatten all packages from recurring carts.
	const packages = useMemo( () => {
		const newPackages = [];

		Object.values( currentRecurringCarts ).forEach( ( recurringCart ) => {
			const recurringCartPackages = recurringCart.shipping_rates || [];

			recurringCartPackages.forEach( ( recurringCartPackage ) => {
				newPackages.push( recurringCartPackage );
			} );
		} );

		return newPackages;
	}, [ currentRecurringCarts ] );

	const { selectShippingRate } = useSelectShippingRate( packages );

	const SubscriptionShippingRates = () => {
		return (
			<div className="wc-block-components-totals-shipping">
				<fieldset className="wc-block-components-totals-shipping__fieldset">
					<legend className="screen-reader-text">
						{ __(
							'Recurring Shipping Options',
							'woo-gutenberg-products-block'
						) }
					</legend>
					<ShippingRatesControl
						className="wc-block-components-totals-shipping__options"
						collapsibleWhenMultiple={ true }
						noResultsMessage={
							<Notice
								isDismissible={ false }
								className={ classnames(
									'wc-block-components-shipping-rates-control__no-results-notice',
									'woocommerce-error'
								) }
							>
								{ __(
									'No shipping options were found.',
									'woo-gutenberg-products-block'
								) }
							</Notice>
						}
						renderOption={ renderShippingRatesControlOption }
						shippingRates={ packages }
						shippingRatesLoading={ shippingRatesLoading }
						selectShippingRate={ selectShippingRate }
					/>
				</fieldset>
			</div>
		);
	};

	return (
		<ExperimentalOrderMeta>
			<SubscriptionShippingRates />
		</ExperimentalOrderMeta>
	);
};

registerPlugin( 'woocommerce-subscriptions-shipping', {
	render: RenderSubscriptionPackages,
} );
