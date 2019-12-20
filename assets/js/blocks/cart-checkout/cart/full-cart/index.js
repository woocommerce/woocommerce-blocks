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
	const totalValue = '€100';

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
						label={ __( 'Total', 'woo-gutenberg-products-block' ) }
						value={ totalValue }
					/>
					<CheckoutButton />
				</CardBody>
			</Card>
		</div>
	);
};

Cart.propTypes = {};

export default Cart;
