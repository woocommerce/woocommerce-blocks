/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useShippingData } from '@woocommerce/base-context/hooks';
import { ShippingRatesControl } from '@woocommerce/base-components/cart-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { decodeEntities } from '@wordpress/html-entities';
import { Notice } from 'wordpress-components';
import classnames from 'classnames';
import { getSetting } from '@woocommerce/settings';
import type { PackageRateOption } from '@woocommerce/type-defs/shipping';
import type { CartShippingPackageShippingRate } from '@woocommerce/type-defs/cart';

/**
 * Renders a shipping rate control option.
 *
 * @param {Object} option Shipping Rate.
 */
const renderShippingRatesControlOption = (
	option: CartShippingPackageShippingRate
): PackageRateOption => {
	const priceWithTaxes = getSetting( 'displayCartPricesIncludingTax', false )
		? parseInt( option.price, 10 ) + parseInt( option.taxes, 10 )
		: parseInt( option.price, 10 );
	return {
		label: decodeEntities( option.name ),
		value: option.rate_id,
		description: decodeEntities( option.description ),
		secondaryLabel: (
			<FormattedMonetaryAmount
				currency={ getCurrencyFromPriceResponse( option ) }
				value={ priceWithTaxes }
			/>
		),
		secondaryDescription: decodeEntities( option.delivery_time ),
	};
};

const Block = ( {}: {} ): JSX.Element | null => {
	const { shippingRates, needsShipping, isLoadingRates } = useShippingData();

	if ( ! needsShipping ) {
		return null;
	}

	return (
		<ShippingRatesControl
			noResultsMessage={
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
			}
			renderOption={ renderShippingRatesControlOption }
			shippingRates={ shippingRates }
			isLoadingRates={ isLoadingRates }
			context="woocommerce/checkout"
		/>
	);
};

export default Block;
