/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { getSetting } from '@woocommerce/settings';
import { createInterpolateElement } from '@wordpress/element';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import type { CartShippingPackageShippingRate } from '@woocommerce/type-defs/cart';

export const RatePrice = ( {
	minRate,
	maxRate,
}: {
	minRate: CartShippingPackageShippingRate | undefined;
	maxRate: CartShippingPackageShippingRate | undefined;
} ) => {
	if ( ! minRate && ! maxRate ) {
		return null;
	}
	const minRatePrice = getSetting( 'displayCartPricesIncludingTax', false )
		? parseInt( minRate.price, 10 ) + parseInt( minRate.taxes, 10 )
		: parseInt( minRate.price, 10 );
	const maxRatePrice = getSetting( 'displayCartPricesIncludingTax', false )
		? parseInt( maxRate.price, 10 ) + parseInt( maxRate.taxes, 10 )
		: parseInt( maxRate.price, 10 );

	return (
		<span className="wc-block-checkout__collection-item-price">
			{ minRatePrice === 0 && maxRatePrice === 0 ? (
				<em>{ __( 'free', 'woo-gutenberg-products-block' ) }</em>
			) : (
				createInterpolateElement(
					__( 'from <price />', 'woo-gutenberg-products-block' ),
					{
						price:
							minRatePrice === 0 ? (
								<em>
									{ __(
										'free',
										'woo-gutenberg-products-block'
									) }
								</em>
							) : (
								<FormattedMonetaryAmount
									currency={ getCurrencyFromPriceResponse(
										minRate
									) }
									value={ minRatePrice }
								/>
							),
					}
				)
			) }
		</span>
	);
};
