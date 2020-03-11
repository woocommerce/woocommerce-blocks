/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { DISPLAY_CART_PRICES_INCLUDING_TAX } from '@woocommerce/block-settings';
import ShippingCalculator from '@woocommerce/base-components/shipping-calculator';
import ShippingLocation from '@woocommerce/base-components/shipping-location';
import PropTypes from 'prop-types';
import { useState } from '@wordpress/element';
import { useShippingRates } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import TotalsItem from '../totals-item';
import ShippingRateSelector from './shipping-rate-selector';
import hasShippingRate from './has-shipping-rate';

/**
 * Renders the shipping totals row, rates, and calculator if enabled.
 */
const TotalsShippingItem = ( {
	currency,
	values,
	showCalculator = true,
	showRatesWithoutAddress = false,
} ) => {
	const [ isShippingCalculatorOpen, setIsShippingCalculatorOpen ] = useState(
		false
	);
	const defaultAddressFields = [ 'country', 'state', 'city', 'postcode' ];
	const {
		shippingRates,
		shippingAddress,
		setShippingAddress,
		shippingRatesLoading,
		hasShippingAddress,
	} = useShippingRates( defaultAddressFields );
	const totalShippingValue = DISPLAY_CART_PRICES_INCLUDING_TAX
		? parseInt( values.total_shipping, 10 ) +
		  parseInt( values.total_shipping_tax, 10 )
		: parseInt( values.total_shipping, 10 );
	const filteredShippingAddress = Object.values( shippingAddress ).filter(
		Boolean
	);
	const hasAddress = filteredShippingAddress.length > 1;
	const hasRates = hasShippingRate( shippingRates ) || totalShippingValue;
	const showRates = showRatesWithoutAddress || hasAddress;

	// No rates and calculations are disabled - show checkout prompt.
	if ( ! hasRates && ! showCalculator ) {
		return (
			<TotalsItem
				label={ __( 'Shipping', 'woo-gutenberg-products-block' ) }
				value={
					<em>
						{ __(
							'Calculated during checkout',
							'woo-gutenberg-products-block'
						) }
					</em>
				}
			/>
		);
	}

	// No rates, no address, and rates disabled until address is given.
	if ( ! hasRates && ! showRates && showCalculator ) {
		return (
			<TotalsItem
				label={ __( 'Shipping', 'woo-gutenberg-products-block' ) }
				value={
					<button
						className="wc-block-cart__change-address-button"
						onClick={ () => {
							setIsShippingCalculatorOpen(
								! isShippingCalculatorOpen
							);
						} }
					>
						{ __( 'Calculate', 'woo-gutenberg-products-block' ) }
					</button>
				}
				description={
					<ShippingCalculator
						address={ shippingAddress }
						setAddress={ setShippingAddress }
						onUpdate={ () => {
							setIsShippingCalculatorOpen( false );
						} }
						hidden={ ! isShippingCalculatorOpen }
						showToggle={ false }
					/>
				}
			/>
		);
	}

	return (
		<>
			<TotalsItem
				label={ __( 'Shipping', 'woo-gutenberg-products-block' ) }
				value={ totalShippingValue ? totalShippingValue : '' }
				description={
					<>
						<ShippingLocation address={ shippingAddress } />
						{ showCalculator && (
							<ShippingCalculator
								address={ shippingAddress }
								setAddress={ setShippingAddress }
								onUpdate={ () => {
									setIsShippingCalculatorOpen( false );
								} }
								hidden={ ! isShippingCalculatorOpen }
								showToggle={ true }
								onToggle={ () => {
									setIsShippingCalculatorOpen(
										! isShippingCalculatorOpen
									);
								} }
							/>
						) }
					</>
				}
				currency={ currency }
			/>
			{ showRates && (
				<fieldset className="wc-block-cart__shipping-options-fieldset">
					<legend className="screen-reader-text">
						{ __(
							'Choose a shipping method',
							'woo-gutenberg-products-block'
						) }
					</legend>
					<ShippingRateSelector
						shippingRates={ shippingRates }
						shippingRatesLoading={ shippingRatesLoading }
						hasShippingAddress={ hasShippingAddress }
					/>
				</fieldset>
			) }
		</>
	);
};

TotalsShippingItem.propTypes = {
	currency: PropTypes.object.isRequired,
	values: PropTypes.shape( {
		total_shipping: PropTypes.string,
		total_shipping_tax: PropTypes.string,
	} ).isRequired,
	showCalculator: PropTypes.bool,
	showRatesWithoutAddress: PropTypes.bool,
};

export default TotalsShippingItem;
