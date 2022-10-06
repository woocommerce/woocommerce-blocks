/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useShippingData } from '@woocommerce/base-context/hooks';
import { useMemo } from '@wordpress/element';
import { ShippingRatesControl } from '@woocommerce/base-components/cart-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { decodeEntities } from '@wordpress/html-entities';
import { Notice } from 'wordpress-components';
import classnames from 'classnames';
import { getSetting } from '@woocommerce/settings';
import type { PackageRateOption } from '@woocommerce/type-defs/shipping';
import type {
	CartShippingRate,
	CartShippingPackageShippingRate,
} from '@woocommerce/type-defs/cart';
import { Icon, mapMarker } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './style.scss';

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
		value: option.rate_id,
		label: decodeEntities( option.name ),
		secondaryLabel: (
			<FormattedMonetaryAmount
				currency={ getCurrencyFromPriceResponse( option ) }
				value={ priceWithTaxes }
			/>
		),
		description: decodeEntities( option.description ),
		secondaryDescription: option.meta_data.local_pickup_address && (
			<>
				<Icon
					icon={ mapMarker }
					className="wc-block-editor-components-block-icon"
				/>
				{ decodeEntities( option.meta_data.local_pickup_address ) }
			</>
		),
	};
};

const filterLocalPickupRates = ( shippingRates: CartShippingRate[] ) => {
	return shippingRates.map( ( shippingRatesPackage ) => {
		return {
			...shippingRatesPackage,
			shipping_rates: shippingRatesPackage.shipping_rates
				.filter(
					( shippingRatesPackageRate ) =>
						shippingRatesPackageRate.method_id === 'local_pickup' ||
						shippingRatesPackageRate.method_id ===
							'blocks_local_pickup'
				)
				.map( ( shippingRatesPackageRate ) => {
					return {
						...shippingRatesPackageRate,
						// @todo This is a placeholder until we introduce new fields in the shipping method.
						description:
							shippingRatesPackageRate.description ||
							'You can pick up your order from our store.',
						meta_data: {
							...shippingRatesPackageRate.meta_data,
							// @todo This is a placeholder until we introduce new fields in the shipping method.
							local_pickup_address:
								'123 Main Street, Anytown, USA',
						},
					};
				} ),
		};
	} );
};

const Block = ( {}: {} ): JSX.Element | null => {
	const { shippingRates, needsShipping, isLoadingRates } = useShippingData();

	const filteredShippingRates = useMemo(
		() => filterLocalPickupRates( shippingRates ),
		[ shippingRates ]
	);

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
						'There are no pickup options available.',
						'woo-gutenberg-products-block'
					) }
				</Notice>
			}
			renderOption={ renderShippingRatesControlOption }
			shippingRates={ filteredShippingRates }
			isLoadingRates={ isLoadingRates }
			context="woocommerce/checkout"
		/>
	);
};

export default Block;
