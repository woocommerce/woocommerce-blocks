/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { decodeEntities } from '@wordpress/html-entities';
import { getCurrencyFromPriceResponse } from '@woocommerce/base-utils';
import ShippingRatesControl from '@woocommerce/base-components/shipping-rates-control';

const renderShippingRatesControlOption = ( option ) => ( {
	label: decodeEntities( option.name ),
	value: option.rate_id,
	description: (
		<>
			{ option.price && (
				<FormattedMonetaryAmount
					currency={ getCurrencyFromPriceResponse( option ) }
					value={ option.price }
				/>
			) }
			{ option.price && option.delivery_time ? ' — ' : null }
			{ decodeEntities( option.delivery_time ) }
		</>
	),
} );

const ShippingRateSelector = ( {
	hasRates,
	shippingRates,
	shippingRatesLoading,
} ) => {
	return (
		<fieldset className="wc-block-totals__shipping-options-fieldset">
			<legend className="screen-reader-text">
				{ hasRates
					? __( 'Shipping methods', 'woo-gutenberg-products-block' )
					: __(
							'Choose a shipping method',
							'woo-gutenberg-products-block'
					  ) }
			</legend>
			<ShippingRatesControl
				className="wc-block-totals__shipping-options"
				collapsibleWhenMultiple={ true }
				noResultsMessage={ __(
					'No shipping options were found.',
					'woo-gutenberg-products-block'
				) }
				renderOption={ renderShippingRatesControlOption }
				shippingRates={ shippingRates }
				shippingRatesLoading={ shippingRatesLoading }
			/>
		</fieldset>
	);
};

export default ShippingRateSelector;
