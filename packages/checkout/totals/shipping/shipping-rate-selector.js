/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { decodeEntities } from '@wordpress/html-entities';
import { DISPLAY_CART_PRICES_INCLUDING_TAX } from '@woocommerce/block-settings';
import { Notice } from 'wordpress-components';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { getCurrencyFromPriceResponse } from '../../utils';
import { ShippingRatesControl } from '../../shipping';

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

const ShippingRateSelector = ( {
	hasRates,
	shippingRates,
	shippingRatesLoading,
} ) => {
	return (
		<fieldset className="wc-block-components-totals-shipping__fieldset">
			<legend className="screen-reader-text">
				{ hasRates
					? __( 'Shipping options', 'woo-gutenberg-products-block' )
					: __(
							'Choose a shipping option',
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
				shippingRates={ shippingRates }
				shippingRatesLoading={ shippingRatesLoading }
			/>
		</fieldset>
	);
};

export default ShippingRateSelector;
