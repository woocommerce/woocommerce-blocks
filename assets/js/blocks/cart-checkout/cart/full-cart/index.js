/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	TotalsCouponCodeInput,
	TotalsItem,
} from '@woocommerce/base-components/totals';
import RadioControl from '@woocommerce/base-components/radio-control';
import {
	COUPONS_ENABLED,
	DISPLAY_PRICES_INCLUDING_TAXES,
} from '@woocommerce/block-settings';
import { getCurrencyFromPriceResponse } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import CheckoutButton from './checkout-button';
import placeholderShippingMethods from '../../placeholder-shipping-methods';
import './style.scss';

/**
 * Given an API response with cart totals, generates an array of rows to display in the Cart block.
 *
 * @param {Object} cartTotals - Cart totals data as provided by the API.
 * @returns {Object[]} Values to display in the cart block.
 */
const getTotalRows = ( cartTotals ) => {
	const totalItems = parseInt( cartTotals.total_items );
	const totalItemsTax = parseInt( cartTotals.total_items_tax );
	const totalRows = [
		{
			label: __( 'List items:', 'woo-gutenberg-products-block' ),
			value: DISPLAY_PRICES_INCLUDING_TAXES
				? totalItems + totalItemsTax
				: totalItems,
		},
	];
	const totalFees = parseInt( cartTotals.total_fees );
	if ( totalFees > 0 ) {
		const totalFeesTax = parseInt( cartTotals.total_fees_tax );
		totalRows.push( {
			label: __( 'Fees:', 'woo-gutenberg-products-block' ),
			value: DISPLAY_PRICES_INCLUDING_TAXES
				? totalFees + totalFeesTax
				: totalFees,
		} );
	}
	const totalDiscount = parseInt( cartTotals.total_discount );
	if ( parseInt( totalDiscount ) > 0 ) {
		const totalDiscountTax = parseInt( cartTotals.total_discount_tax );
		totalRows.push( {
			label: __( 'Discount:', 'woo-gutenberg-products-block' ),
			value: DISPLAY_PRICES_INCLUDING_TAXES
				? totalDiscount + totalDiscountTax
				: totalDiscount,
		} );
	}
	if ( ! DISPLAY_PRICES_INCLUDING_TAXES ) {
		const totalTax = parseInt( cartTotals.total_tax );
		totalRows.push( {
			label: __( 'Taxes:', 'woo-gutenberg-products-block' ),
			value: totalTax,
		} );
	}
	const totalShipping = parseInt( cartTotals.total_shipping );
	const totalShippingTax = parseInt( cartTotals.total_shipping_tax );
	totalRows.push( {
		label: __( 'Shipping:', 'woo-gutenberg-products-block' ),
		value: DISPLAY_PRICES_INCLUDING_TAXES
			? totalShipping + totalShippingTax
			: totalShipping,
		description: __(
			'Shipping to location (change address)',
			'woo-gutenberg-products-block'
		),
	} );

	return totalRows;
};

/**
 * Component that renders the Cart block when user has something in cart aka "full".
 */
const Cart = () => {
	// @todo this are placeholders
	const onActivateCoupon = ( couponCode ) => {
		// eslint-disable-next-line no-console
		console.log( 'coupon activated: ' + couponCode );
	};
	const cartTotals = {
		currency: 'EUR',
		currency_minor_unit: 2,
		total_items: '6000',
		total_items_tax: '0',
		total_fees: '0',
		total_fees_tax: '0',
		total_discount: '0',
		total_discount_tax: '0',
		total_shipping: '0',
		total_shipping_tax: '0',
		total_tax: '0',
		total_price: '6000',
	};

	const currency = getCurrencyFromPriceResponse( cartTotals );
	const totalRows = getTotalRows( cartTotals );

	const [ selectedShippingOption, setSelectedShippingOption ] = useState(
		placeholderShippingMethods[ 0 ].value
	);

	return (
		<div className="wc-block-cart">
			<div className="wc-block-cart__main">
				<span>
					Cart block <b>full state</b> coming soon…
				</span>
			</div>
			<div className="wc-block-cart__sidebar">
				<h2 className="wc-block-cart__totals-title">
					{ __( 'Cart totals', 'woo-gutenberg-products-block' ) }
				</h2>
				{ totalRows.map( ( { label, value, description } ) => (
					<TotalsItem
						key={ label }
						currency={ currency }
						label={ label }
						value={ value }
						description={ description }
					/>
				) ) }
				<fieldset className="wc-block-cart__shipping-options-fieldset">
					<legend
						id="wc-block-cart__shipping-options-label"
						className="screen-reader-text"
					>
						{ __(
							'Choose the shipping method.',
							'woo-gutenberg-products-block'
						) }
					</legend>
					<RadioControl
						id="wc-block-cart__shipping-options"
						className="wc-block-cart__shipping-options"
						selected={ selectedShippingOption }
						options={ placeholderShippingMethods.map(
							( option ) => ( {
								label: option.label,
								value: option.value,
								description: [ option.price, option.schedule ]
									.filter( Boolean )
									.join( ' — ' ),
							} )
						) }
						onChange={ ( newSelectedShippingOption ) =>
							setSelectedShippingOption(
								newSelectedShippingOption
							)
						}
					/>
				</fieldset>
				{ COUPONS_ENABLED && (
					<TotalsCouponCodeInput onSubmit={ onActivateCoupon } />
				) }
				<TotalsItem
					className="wc-block-cart__totals-footer"
					currency={ currency }
					label={ __( 'Total', 'woo-gutenberg-products-block' ) }
					value={ parseInt( cartTotals.total_price ) }
				/>
				<CheckoutButton />
			</div>
		</div>
	);
};

Cart.propTypes = {};

export default Cart;
