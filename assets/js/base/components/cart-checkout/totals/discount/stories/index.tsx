/**
 * External dependencies
 */
import { useArgs } from '@storybook/client-api';
import { Story, Meta } from '@storybook/react';
import { currencyControl } from '@woocommerce/storybook-controls';

/**
 * Internal dependencies
 */
import Discount, { TotalsDiscountProps } from '..';

export default {
	title: 'WooCommerce Blocks/@base-components/cart-checkout/totals/Discount',
	component: Discount,
	argTypes: {
		currency: currencyControl,
		removeCoupon: { action: 'Removing coupon with code' },
	},
	args: {
		cartCoupons: [ { code: 'AWSMSB', label: 'Awesome Storybook coupon' } ],
		isRemovingCoupon: false,
		values: { total_discount: '5000', total_discount_tax: '250' },
	},
} as Meta< TotalsDiscountProps >;

const Template: Story< TotalsDiscountProps > = ( args ) => {
	const [ {}, setArgs ] = useArgs();

	const removeCoupon = ( code: string ) => {
		args.removeCoupon( code );
		setArgs( { isRemovingCoupon: true } );

		const cartCoupons = args.cartCoupons.filter(
			( coupon ) => coupon.code !== code
		);

		setTimeout(
			() => setArgs( { cartCoupons, isRemovingCoupon: false } ),
			3500
		);
	};

	return <Discount { ...args } removeCoupon={ removeCoupon } />;
};

export const Default = Template.bind( {} );
Default.args = {};

export const RemovingCoupon = Template.bind( {} );
RemovingCoupon.args = {
	isRemovingCoupon: true,
};
