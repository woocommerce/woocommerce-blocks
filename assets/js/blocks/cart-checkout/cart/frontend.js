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
import { ExperimentalOrderShipping } from '@woocommerce/blocks-checkout';
import { registerPlugin } from '@wordpress/plugins';
import { ShippingRatesControl } from '@woocommerce/base-components/cart-checkout';
import { Notice } from 'wordpress-components';
import classnames from 'classnames';
import { useStoreCart } from '@woocommerce/base-hooks';
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

/**
 * Temporarily building this here - it will be moved to subs once packages are exported.
 */
const SubscriptionShippingRates = () => {
	const { extensions, shippingRatesLoading } = useStoreCart();
	const { subscriptions = {} } = extensions;

	// Flatten all packages from recurring carts.
	const packages = useMemo( () => {
		const newPackages = [];

		Object.values( subscriptions ).forEach( ( recurringCart ) => {
			const recurringCartPackages = recurringCart.shipping_rates || [];

			recurringCartPackages.forEach( ( recurringCartPackage ) => {
				newPackages.push( recurringCartPackage );
			} );
		} );

		return newPackages;
	}, [ subscriptions ] );

	if ( ! packages ) {
		return null;
	}

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
					shippingRates={ packages }
					shippingRatesLoading={ shippingRatesLoading }
				/>
			</fieldset>
		</div>
	);
};

const RenderSubscriptionPackages = () => (
	<ExperimentalOrderShipping>
		<SubscriptionShippingRates />
	</ExperimentalOrderShipping>
);

registerPlugin( 'woocommerce-subscriptions-shipping', {
	render: RenderSubscriptionPackages,
} );
