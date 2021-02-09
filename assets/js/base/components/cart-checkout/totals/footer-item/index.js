/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	TAXES_ENABLED,
	DISPLAY_CART_PRICES_INCLUDING_TAX,
} from '@woocommerce/block-settings';
import { createInterpolateElement } from 'wordpress-element';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import PropTypes from 'prop-types';
import {
	__experimentalApplyCheckoutFilter,
	TotalsItem,
} from '@woocommerce/blocks-checkout';
import { useStoreCart } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import './style.scss';

const SHOW_TAXES = TAXES_ENABLED && DISPLAY_CART_PRICES_INCLUDING_TAX;

const TotalsFooterItem = ( { currency, values } ) => {
	const { total_price: totalPrice, total_tax: totalTax } = values;
	const { extensions } = useStoreCart();
	const label = __experimentalApplyCheckoutFilter( {
		filterName: 'totalLabel',
		defaultValue: __( 'Total', 'woo-gutenberg-products-block' ),
		arg: {
			extensions,
		},
		// Only accept strings.
		validation: ( value ) => typeof value === 'string',
	} );

	return (
		<TotalsItem
			className="wc-block-components-totals-footer-item"
			currency={ currency }
			label={ label }
			value={ parseInt( totalPrice, 10 ) }
			description={
				SHOW_TAXES && (
					<p className="wc-block-components-totals-footer-item-tax">
						{ createInterpolateElement(
							__(
								'Including <TaxAmount/> in taxes',
								'woo-gutenberg-products-block'
							),
							{
								TaxAmount: (
									<FormattedMonetaryAmount
										className="wc-block-components-totals-footer-item-tax-value"
										currency={ currency }
										displayType="text"
										value={ parseInt( totalTax, 10 ) }
									/>
								),
							}
						) }
					</p>
				)
			}
		/>
	);
};

TotalsFooterItem.propTypes = {
	currency: PropTypes.object.isRequired,
	values: PropTypes.shape( {
		total_price: PropTypes.string,
		total_tax: PropTypes.string,
	} ).isRequired,
};

export default TotalsFooterItem;
