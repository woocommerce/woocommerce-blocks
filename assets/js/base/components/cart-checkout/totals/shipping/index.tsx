/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useStoreCart } from '@woocommerce/base-context/hooks';
import { TotalsItem } from '@woocommerce/blocks-checkout';
import type { Currency } from '@woocommerce/price-format';
import type { ReactElement } from 'react';
import { ShippingAddress as ShippingAddressType } from '@woocommerce/settings';
import { ShippingVia } from '@woocommerce/base-components/cart-checkout/totals/shipping/shipping-via';
import { useSelect } from '@wordpress/data';
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import ShippingCalculator from '../../shipping-calculator';
import ShippingRateSelector from './shipping-rate-selector';
import { hasShippingRate, getTotalShippingValue } from './utils';
import ShippingPlaceholder from './shipping-placeholder';
import ShippingAddress from './shipping-address';
import './style.scss';

interface CalculatorButtonProps {
	label?: string;
	isShippingCalculatorOpen: boolean;
	setIsShippingCalculatorOpen: ( isShippingCalculatorOpen: boolean ) => void;
}

const CalculatorButton = ( {
	label = __( 'Calculate', 'woo-gutenberg-products-block' ),
	isShippingCalculatorOpen,
	setIsShippingCalculatorOpen,
}: CalculatorButtonProps ): ReactElement => {
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

interface ShippingAddressProps {
	showCalculator: boolean;
	isShippingCalculatorOpen: boolean;
	setIsShippingCalculatorOpen: CalculatorButtonProps[ 'setIsShippingCalculatorOpen' ];
	shippingAddress: ShippingAddressType;
}

const ShippingAddress = ( {
	showCalculator,
	isShippingCalculatorOpen,
	setIsShippingCalculatorOpen,
	shippingAddress,
}: ShippingAddressProps ): ReactElement | null => {
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

interface NoShippingPlaceholderProps {
	showCalculator: boolean;
	isShippingCalculatorOpen: boolean;
	isCheckout?: boolean;
	setIsShippingCalculatorOpen: CalculatorButtonProps[ 'setIsShippingCalculatorOpen' ];
}

const NoShippingPlaceholder = ( {
	showCalculator,
	isShippingCalculatorOpen,
	setIsShippingCalculatorOpen,
	isCheckout = false,
}: NoShippingPlaceholderProps ): ReactElement => {
	if ( ! showCalculator ) {
		return (
			<em>
				{ isCheckout
					? __(
							'No shipping options available',
							'woo-gutenberg-products-block'
					  )
					: __(
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

export interface TotalShippingProps {
	currency: Currency;
	values: {
		total_shipping: string;
		total_shipping_tax: string;
	}; // Values in use
	showCalculator?: boolean; //Whether to display the rate selector below the shipping total.
	showRateSelector?: boolean; // Whether to show shipping calculator or not.
	className?: string;
	isCheckout?: boolean;
}

export const TotalsShipping = ( {
	currency,
	values,
	showCalculator = true,
	showRateSelector = true,
	isCheckout = false,
	className,
}: TotalShippingProps ): JSX.Element => {
	const [ isShippingCalculatorOpen, setIsShippingCalculatorOpen ] =
		useState( false );
	const {
		shippingAddress,
		cartHasCalculatedShipping,
		shippingRates,
		isLoadingRates,
	} = useStoreCart();
	const { prefersCollection } = useSelect( ( select ) => {
		const checkoutStore = select( CHECKOUT_STORE_KEY );
		return {
			prefersCollection: checkoutStore.prefersCollection(),
		};
	} );
	const totalShippingValue = getTotalShippingValue( values );
	const hasRates = hasShippingRate( shippingRates ) || totalShippingValue > 0;
	const selectedShippingRates = shippingRates.flatMap(
		( shippingPackage ) => {
			return shippingPackage.shipping_rates
				.filter( ( rate ) => rate.selected )
				.flatMap( ( rate ) => rate.name );
		}
	);

	return (
		<div
			className={ classnames(
				'wc-block-components-totals-shipping',
				className
			) }
		>
			<TotalsItem
				label={ __( 'Shipping', 'woo-gutenberg-products-block' ) }
				value={
					hasRates && cartHasCalculatedShipping ? (
						totalShippingValue
					) : (
						<ShippingPlaceholder
							showCalculator={ showCalculator }
							isCheckout={ isCheckout }
							isShippingCalculatorOpen={
								isShippingCalculatorOpen
							}
							setIsShippingCalculatorOpen={
								setIsShippingCalculatorOpen
							}
						/>
					)
				}
				description={
					hasRates && cartHasCalculatedShipping ? (
						<>
							<ShippingVia
								selectedShippingRates={ selectedShippingRates }
							/>
							{ ! prefersCollection && (
								<ShippingAddress
									shippingAddress={ shippingAddress }
									showCalculator={ showCalculator }
									isShippingCalculatorOpen={
										isShippingCalculatorOpen
									}
									setIsShippingCalculatorOpen={
										setIsShippingCalculatorOpen
									}
								/>
							) }
						</>
					) : null
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
					isLoadingRates={ isLoadingRates }
				/>
			) }
		</div>
	);
};

export default TotalsShipping;
