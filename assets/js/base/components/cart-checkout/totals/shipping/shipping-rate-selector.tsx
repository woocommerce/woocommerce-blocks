/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import type { CartResponseShippingRate } from '@woocommerce/types';
import { Notice } from 'wordpress-components';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import ShippingRatesControl from '../../shipping-rates-control';

export interface ShippingRateSelectorProps {
	hasRates: boolean;
	shippingRates: CartResponseShippingRate[];
	isLoadingRates: boolean;
	isAddressComplete: boolean;
}

export const ShippingRateSelector = ( {
	hasRates,
	shippingRates,
	isLoadingRates,
	isAddressComplete,
}: ShippingRateSelectorProps ): JSX.Element => {
	const legend = hasRates
		? __( 'Shipping options', 'woo-gutenberg-products-block' )
		: __( 'Choose a shipping option', 'woo-gutenberg-products-block' );
	return (
		<fieldset className="wc-block-components-totals-shipping__fieldset">
			<legend className="screen-reader-text">{ legend }</legend>
			<ShippingRatesControl
				className="wc-block-components-totals-shipping__options"
				noResultsMessage={
					<>
						{ isAddressComplete && (
							<Notice
								isDismissible={ false }
								className={ classnames(
									'wc-block-components-shipping-rates-control__no-results-notice',
									'woocommerce-error'
								) }
							>
								{ __(
									'There are no shipping options available. Please check your shipping address.',
									'woo-gutenberg-products-block'
								) }
							</Notice>
						) }
					</>
				}
				shippingRates={ shippingRates }
				isLoadingRates={ isLoadingRates }
				context="woocommerce/cart"
			/>
		</fieldset>
	);
};

export default ShippingRateSelector;
