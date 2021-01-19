/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { DISPLAY_CART_PRICES_INCLUDING_TAX } from '@woocommerce/block-settings';
import PropTypes from 'prop-types';
import { useState } from '@wordpress/element';
import { useStoreCart } from '@woocommerce/base-hooks';
import { TotalsItem } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import ShippingRateSelector from './shipping-rate-selector';
import hasShippingRate from './has-shipping-rate';
import ShippingCalculator from '../../shipping-calculator';
import ShippingLocation from '../../shipping-location';
import './style.scss';

/**
 * Renders the shipping totals row, rates, and calculator if enabled.
 *
 * @param {Object} props Incoming props for the component.
 * @param {Object} props.currency Currency information.
 * @param {Object} props.values Values in use.
 * @param {boolean} props.showRateSelector Whether to display the rate selector below the shipping total.
 * @param {boolean} props.showCalculator Whether to show shipping calculator or not.
 */
const TotalsShipping = ( {
	currency,
	values,
	showCalculator = true,
	showRateSelector = true,
} ) => {
	const [ isShippingCalculatorOpen, setIsShippingCalculatorOpen ] = useState(
		false
	);
	const {
		shippingRates,
		shippingRatesLoading,
		shippingAddress,
		cartHasCalculatedShipping,
	} = useStoreCart();

	const totalShippingValue = DISPLAY_CART_PRICES_INCLUDING_TAX
		? parseInt( values.total_shipping, 10 ) +
		  parseInt( values.total_shipping_tax, 10 )
		: parseInt( values.total_shipping, 10 );
	const hasRates = hasShippingRate( shippingRates ) || totalShippingValue;
	const calculatorButtonProps = {
		isShippingCalculatorOpen,
		setIsShippingCalculatorOpen,
	};

	return (
		<div className="wc-block-components-totals-shipping">
			<TotalsItem
				label={ __( 'Shipping', 'woo-gutenberg-products-block' ) }
				value={
					cartHasCalculatedShipping ? (
						totalShippingValue
					) : (
						<NoShippingPlaceholder
							showCalculator={ showCalculator }
							{ ...calculatorButtonProps }
						/>
					)
				}
				description={
					<>
						{ cartHasCalculatedShipping && (
							<ShippingAddress
								shippingAddress={ shippingAddress }
								showCalculator={ showCalculator }
								{ ...calculatorButtonProps }
							/>
						) }
					</>
				}
				currency={ currency }
			/>
			{ showCalculator && isShippingCalculatorOpen && (
				<ShippingCalculator
					onUpdate={ () => {
						setIsShippingCalculatorOpen( false );
					} }
				/>
			) }
			{ showRateSelector && cartHasCalculatedShipping && (
				<ShippingRateSelector
					hasRates={ hasRates }
					shippingRates={ shippingRates }
					shippingRatesLoading={ shippingRatesLoading }
				/>
			) }
		</div>
	);
};

const ShippingAddress = ( {
	showCalculator,
	isShippingCalculatorOpen,
	setIsShippingCalculatorOpen,
	shippingAddress,
} ) => {
	return (
		<>
			<ShippingLocation address={ shippingAddress } />
			{ showCalculator && (
				<CalculatorButton
					label={ __(
						'(change address)',
						'woo-gutenberg-products-block'
					) }
					isShippingCalculatorOpen={ isShippingCalculatorOpen }
					setIsShippingCalculatorOpen={ setIsShippingCalculatorOpen }
				/>
			) }
		</>
	);
};

const NoShippingPlaceholder = ( {
	showCalculator,
	isShippingCalculatorOpen,
	setIsShippingCalculatorOpen,
} ) => {
	if ( ! showCalculator ) {
		return (
			<em>
				{ __(
					'Calculated during checkout',
					'woo-gutenberg-products-block'
				) }
			</em>
		);
	}

	return (
		<CalculatorButton
			isShippingCalculatorOpen={ isShippingCalculatorOpen }
			setIsShippingCalculatorOpen={ setIsShippingCalculatorOpen }
		/>
	);
};

const CalculatorButton = ( {
	label = __( 'Calculate', 'woo-gutenberg-products-block' ),
	isShippingCalculatorOpen,
	setIsShippingCalculatorOpen,
} ) => {
	return (
		<button
			className="wc-block-components-totals-shipping__change-address-button"
			onClick={ () => {
				setIsShippingCalculatorOpen( ! isShippingCalculatorOpen );
			} }
			aria-expanded={ isShippingCalculatorOpen }
		>
			{ label }
		</button>
	);
};

TotalsShipping.propTypes = {
	currency: PropTypes.object.isRequired,
	values: PropTypes.shape( {
		total_shipping: PropTypes.string,
		total_shipping_tax: PropTypes.string,
	} ).isRequired,
	showRateSelector: PropTypes.bool,
	showCalculator: PropTypes.bool,
};

export default TotalsShipping;
