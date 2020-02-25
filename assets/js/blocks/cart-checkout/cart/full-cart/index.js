/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	TotalsCouponCodeInput,
	TotalsItem,
} from '@woocommerce/base-components/totals';
import ShippingRatesControl, {
	Packages,
} from '@woocommerce/base-components/shipping-rates-control';
import ShippingCalculator from '@woocommerce/base-components/shipping-calculator';
import ShippingLocation from '@woocommerce/base-components/shipping-location';
import {
	COUPONS_ENABLED,
	SHIPPING_ENABLED,
	DISPLAY_PRICES_INCLUDING_TAXES,
} from '@woocommerce/block-settings';
import { getCurrencyFromPriceResponse } from '@woocommerce/base-utils';
import { Card, CardBody } from 'wordpress-components';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { decodeEntities } from '@wordpress/html-entities';
import { useStoreCart } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import CheckoutButton from './checkout-button';
import CartLineItemsTitle from './cart-line-items-title';
import CartLineItemsTable from './cart-line-items-table';

import './style.scss';
import './editor.scss';

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

/**
 * Component that renders the Cart block when user has something in cart aka "full".
 */
const Cart = ( {
	cartItems = [],
	cartTotals = {},
	isShippingCalculatorEnabled,
	isShippingCostHidden,
	shippingRates,
} ) => {
	const [ selectedShippingRate, setSelectedShippingRate ] = useState();
	const [
		shippingCalculatorAddress,
		setShippingCalculatorAddress,
	] = useState( {
		city: '',
		state: '',
		postcode: '',
		country: '',
	} );

	const [ showShippingCosts, setShowShippingCosts ] = useState(
		! isShippingCostHidden
	);

	useEffect( () => {
		if ( ! SHIPPING_ENABLED ) {
			return setShowShippingCosts( false );
		}
		if ( isShippingCalculatorEnabled ) {
			if ( isShippingCostHidden ) {
				if ( shippingCalculatorAddress.country ) {
					return setShowShippingCosts( true );
				}
			} else {
				return setShowShippingCosts( true );
			}
		}
		return setShowShippingCosts( false );
	}, [
		isShippingCalculatorEnabled,
		isShippingCostHidden,
		shippingCalculatorAddress,
	] );

	const { applyCoupon } = useStoreCart();

	const onActivateCoupon = useCallback( ( couponCode ) => {
		// eslint-disable-next-line no-console
		console.log( 'coupon activated: ' + couponCode );

		applyCoupon( couponCode );
	}, [] );

	/**
	 * Given an API response with cart totals, generates an array of rows to display in the Cart block.
	 *
	 * @return {Object[]} Values to display in the cart block.
	 */
	const getTotalRowsConfig = () => {
		const totalItems = parseInt( cartTotals.total_items, 10 );
		const totalItemsTax = parseInt( cartTotals.total_items_tax, 10 );
		const totalRowsConfig = [
			{
				label: __( 'List items:', 'woo-gutenberg-products-block' ),
				value: DISPLAY_PRICES_INCLUDING_TAXES
					? totalItems + totalItemsTax
					: totalItems,
			},
		];
		const totalFees = parseInt( cartTotals.total_fees, 10 );
		if ( totalFees > 0 ) {
			const totalFeesTax = parseInt( cartTotals.total_fees_tax, 10 );
			totalRowsConfig.push( {
				label: __( 'Fees:', 'woo-gutenberg-products-block' ),
				value: DISPLAY_PRICES_INCLUDING_TAXES
					? totalFees + totalFeesTax
					: totalFees,
			} );
		}
		const totalDiscount = parseInt( cartTotals.total_discount, 10 );
		if ( totalDiscount > 0 ) {
			const totalDiscountTax = parseInt(
				cartTotals.total_discount_tax,
				10
			);
			totalRowsConfig.push( {
				label: __( 'Discount:', 'woo-gutenberg-products-block' ),
				value: DISPLAY_PRICES_INCLUDING_TAXES
					? totalDiscount + totalDiscountTax
					: totalDiscount,
			} );
		}
		if ( ! DISPLAY_PRICES_INCLUDING_TAXES ) {
			const totalTax = parseInt( cartTotals.total_tax, 10 );
			totalRowsConfig.push( {
				label: __( 'Taxes:', 'woo-gutenberg-products-block' ),
				value: totalTax,
			} );
		}
		if ( SHIPPING_ENABLED && isShippingCalculatorEnabled ) {
			const totalShipping = parseInt( cartTotals.total_shipping, 10 );
			const totalShippingTax = parseInt(
				cartTotals.total_shipping_tax,
				10
			);
			totalRowsConfig.push( {
				label: __( 'Shipping:', 'woo-gutenberg-products-block' ),
				value: DISPLAY_PRICES_INCLUDING_TAXES
					? totalShipping + totalShippingTax
					: totalShipping,
				description: (
					<>
						<ShippingLocation
							address={ shippingCalculatorAddress }
						/>
						<ShippingCalculator
							address={ shippingCalculatorAddress }
							setAddress={ setShippingCalculatorAddress }
						/>
					</>
				),
			} );
		}
		return totalRowsConfig;
	};

	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );
	const totalRowsConfig = getTotalRowsConfig();

	const ShippingCalculatorOptions = () => (
		<fieldset className="wc-block-cart__shipping-options-fieldset">
			<legend className="screen-reader-text">
				{ __(
					'Choose the shipping method.',
					'woo-gutenberg-products-block'
				) }
			</legend>
			{ shippingRates ? (
				<Packages
					className="wc-block-cart__shipping-options"
					renderOption={ renderShippingRatesControlOption }
					shippingRates={ shippingRates }
					selected={ [
						shippingRates[ 0 ].shipping_rates[ 0 ].rate_id,
					] }
				/>
			) : (
				<ShippingRatesControl
					className="wc-block-cart__shipping-options"
					address={
						shippingCalculatorAddress.country
							? {
									city: shippingCalculatorAddress.city,
									state: shippingCalculatorAddress.state,
									postcode:
										shippingCalculatorAddress.postcode,
									country: shippingCalculatorAddress.country,
							  }
							: null
					}
					noResultsMessage={ __(
						'No shipping options were found.',
						'woo-gutenberg-products-block'
					) }
					selected={ selectedShippingRate }
					renderOption={ renderShippingRatesControlOption }
					onChange={ ( newSelectedShippingOption ) =>
						setSelectedShippingRate( newSelectedShippingOption )
					}
				/>
			) }
		</fieldset>
	);
	return (
		<div className="wc-block-cart">
			<div className="wc-block-cart__main">
				<CartLineItemsTitle itemCount={ cartItems.length } />
				<CartLineItemsTable lineItems={ cartItems } />
			</div>
			<div className="wc-block-cart__sidebar">
				<Card isElevated={ true }>
					<CardBody>
						<h2 className="wc-block-cart__totals-title">
							{ __(
								'Cart totals',
								'woo-gutenberg-products-block'
							) }
						</h2>
						{ totalRowsConfig.map(
							( { label, value, description } ) => (
								<TotalsItem
									key={ label }
									currency={ totalsCurrency }
									label={ label }
									value={ value }
									description={ description }
								/>
							)
						) }
						{ showShippingCosts && <ShippingCalculatorOptions /> }
						{ COUPONS_ENABLED && (
							<TotalsCouponCodeInput
								onSubmit={ onActivateCoupon }
							/>
						) }
						<TotalsItem
							className="wc-block-cart__totals-footer"
							currency={ totalsCurrency }
							label={ __(
								'Total',
								'woo-gutenberg-products-block'
							) }
							value={ parseInt( cartTotals.total_price, 10 ) }
						/>
						<CheckoutButton />
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

Cart.propTypes = {
	cartItems: PropTypes.array,
	cartTotals: PropTypes.shape( {
		total_items: PropTypes.string,
		total_items_tax: PropTypes.string,
		total_fees: PropTypes.string,
		total_fees_tax: PropTypes.string,
		total_discount: PropTypes.string,
		total_discount_tax: PropTypes.string,
		total_shipping: PropTypes.string,
		total_shipping_tax: PropTypes.string,
		total_tax: PropTypes.string,
		total_price: PropTypes.string,
	} ),
	isShippingCalculatorEnabled: PropTypes.bool,
	isShippingCostHidden: PropTypes.bool,
	/**
	 * List of shipping rates to display. If defined, shipping rates will not be fetched from the API (used for the block preview).
	 */
	shippingRates: PropTypes.array,
};

export default Cart;
