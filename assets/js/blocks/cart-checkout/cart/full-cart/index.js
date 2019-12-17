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
import { COUPONS_ENABLED } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import CheckoutButton from './checkout-button';
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
	const totalItems = [
		{
			label: __( 'List items:', 'woo-gutenberg-products-block' ),
			value: '€300.00',
		},
		{
			label: __( 'Subtotals', 'woo-gutenberg-products-block' ),
			value: '€270.00',
		},
		{
			label: __(
				'Estimated shipping cost:',
				'woo-gutenberg-products-block'
			),
			value: '€6.00',
			description: __(
				'Shipping to location (change address)',
				'woo-gutenberg-products-block'
			),
		},
	];
	const shippingOptions = [
		{
			value: 'store',
			label: __( 'Click and collect', 'woo-gutenberg-products-block' ),
			description: __(
				'FREE - Pickup in store',
				'woo-gutenberg-products-block'
			),
		},
		{
			value: 'regular-shipping',
			label: __( 'Regular shipping', 'woo-gutenberg-products-block' ),
			description: __(
				'€5.00 - 5 business days',
				'woo-gutenberg-products-block'
			),
		},
		{
			value: 'express-shipping',
			label: __( 'Express shipping', 'woo-gutenberg-products-block' ),
			description: __(
				'$10.00 - 3 business days',
				'woo-gutenberg-products-block'
			),
		},
	];
	const totalValue = '€100';

	const [ selectedShippingOption, setSelectedShippingOption ] = useState(
		shippingOptions[ 0 ].value
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
				{ totalItems.map( ( { label, value, description } ) => (
					<TotalsItem
						key={ label }
						label={ label }
						value={ value }
						description={ description }
					/>
				) ) }
				<RadioControl
					id="wc-block-cart__shipping-options"
					className="wc-block-cart__shipping-options"
					selected={ selectedShippingOption }
					options={ shippingOptions }
					onChange={ ( newSelectedShippingOption ) =>
						setSelectedShippingOption( newSelectedShippingOption )
					}
				/>
				{ COUPONS_ENABLED && (
					<TotalsCouponCodeInput onSubmit={ onActivateCoupon } />
				) }
				<TotalsItem
					className="wc-block-cart__totals-footer"
					label={ __( 'Total', 'woo-gutenberg-products-block' ) }
					value={ totalValue }
				/>
				<CheckoutButton />
			</div>
		</div>
	);
};

Cart.propTypes = {};

export default Cart;
