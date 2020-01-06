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
import { Card, CardBody } from 'wordpress-components';

/**
 * Internal dependencies
 */
import CheckoutButton from './checkout-button';
import placeholderShippingMethods from '../../placeholder-shipping-methods';
import './style.scss';

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
		total_items: 6000,
		total_items_tax: 0,
		total_fees: 0,
		total_fees_tax: 0,
		total_discount: 0,
		total_discount_tax: 0,
		total_shipping: 0,
		total_shipping_tax: 0,
		total_tax: 0,
		total_price: 6000,
	};

	const currency = getCurrencyFromPriceResponse( cartTotals );
	const totalItems = [
		{
			label: __( 'List items:', 'woo-gutenberg-products-block' ),
			value: DISPLAY_PRICES_INCLUDING_TAXES
				? cartTotals.total_items + cartTotals.total_items_tax
				: cartTotals.total_items,
		},
	];
	if ( cartTotals.total_fees > 0 ) {
		totalItems.push( {
			label: __( 'Fees:', 'woo-gutenberg-products-block' ),
			value: DISPLAY_PRICES_INCLUDING_TAXES
				? cartTotals.total_fees + cartTotals.total_fees_tax
				: cartTotals.total_fees,
		} );
	}
	if ( cartTotals.total_discount > 0 ) {
		totalItems.push( {
			label: __( 'Discount:', 'woo-gutenberg-products-block' ),
			value: DISPLAY_PRICES_INCLUDING_TAXES
				? cartTotals.total_discount + cartTotals.total_discount_tax
				: cartTotals.total_discount,
		} );
	}
	if ( ! DISPLAY_PRICES_INCLUDING_TAXES ) {
		totalItems.push( {
			label: __( 'Taxes:', 'woo-gutenberg-products-block' ),
			value: cartTotals.total_tax,
		} );
	}
	totalItems.push( {
		label: __( 'Shipping:', 'woo-gutenberg-products-block' ),
		value: DISPLAY_PRICES_INCLUDING_TAXES
			? cartTotals.total_shipping + cartTotals.total_shipping_tax
			: cartTotals.total_shipping,
		description: __(
			'Shipping to location (change address)',
			'woo-gutenberg-products-block'
		),
	} );

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
			<Card className="wc-block-cart__sidebar" isElevated={ true }>
				<CardBody>
					<h2 className="wc-block-cart__totals-title">
						{ __( 'Cart totals', 'woo-gutenberg-products-block' ) }
					</h2>
					{ totalItems.map( ( { label, value, description } ) => (
						<TotalsItem
							key={ label }
							currency={ currency }
							label={ label }
							value={ value }
							description={ description }
						/>
					) ) }
					<fieldset className="wc-block-cart__shipping-options-fieldset">
						<legend className="screen-reader-text">
							{ __(
								'Choose the shipping method.',
								'woo-gutenberg-products-block'
							) }
						</legend>
						<RadioControl
							className="wc-block-cart__shipping-options"
							selected={ selectedShippingOption }
							options={ placeholderShippingMethods.map(
								( option ) => ( {
									label: option.label,
									value: option.value,
									description: [
										option.price,
										option.schedule,
									]
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
						value={ cartTotals.total_price }
					/>
					<CheckoutButton />
				</CardBody>
			</Card>
		</div>
	);
};

Cart.propTypes = {};

export default Cart;
